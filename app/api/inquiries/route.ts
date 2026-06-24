import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import OTP from '@/lib/models/OTP';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

// ==================== MAIL TRANSPORTER ====================

const getTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // SSL
        auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_APP_PASSWORD,
        },
    });
};

// ==================== AUTH HELPER ====================
// Verifies a Bearer token and checks for superadmin role.
// Use this to protect destructive/admin-only routes.

function requireSuperAdmin(req: Request): { ok: true } | { ok: false; status: number; error: string } {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { ok: false, status: 401, error: 'Unauthorized' };
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role?: string };
        if (decoded.role !== 'superadmin') {
            return { ok: false, status: 403, error: 'Forbidden: superadmin role required' };
        }
        return { ok: true };
    } catch {
        return { ok: false, status: 401, error: 'Invalid or expired token' };
    }
}

// ==================== DELETE ALL ADMINS (PROTECTED) ====================
// ⚠️ Still extremely dangerous. Requires a valid superadmin JWT.
// Your Admin model/JWT payload will need a `role` field for this to work —
// add `role: 'superadmin'` when signing the token for trusted accounts.

export async function DELETE(req: Request) {
    await connectDB();

    const auth = requireSuperAdmin(req);
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const result = await Admin.deleteMany({});
        return NextResponse.json({
            success: true,
            message: `Deleted ${result.deletedCount} admin(s)`,
            deletedCount: result.deletedCount,
        });
    } catch (error: any) {
        console.error('❌ Delete All Admins Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ==================== POST ROUTER ====================

export async function POST(
    req: Request,
    { params }: { params: Promise<{ action: string | string[] }> }
) {
    const rawAction = (await params).action;

    // Works whether this route folder is [action] (string) or [...action] (array).
    const action = Array.isArray(rawAction)
        ? rawAction[0]?.trim().toLowerCase()
        : rawAction?.trim().toLowerCase();

    console.log('🔎 action received:', JSON.stringify(rawAction), '→ normalized:', action);

    await connectDB();
    const body = await req.json();

    try {
        if (action === 'signin') {
            const { email, password } = body;
            if (!email || !password) {
                return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
            }

            let admin = await Admin.findOne({ email });
            let isNewAdmin = false;

            if (!admin) {
                const hashedPassword = await bcrypt.hash(password, 12);
                admin = await Admin.create({ email, password: hashedPassword });
                isNewAdmin = true;

                await sendWelcomeEmail(email);
            } else if (!(await bcrypt.compare(password, admin.password))) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }

            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            return NextResponse.json({
                success: true,
                token,
                message: isNewAdmin ? 'Account created' : 'Login successful',
            });
        }

        if (action === 'forgot-password') {
            const { email } = body;
            if (!email) {
                return NextResponse.json({ error: 'Email is required' }, { status: 400 });
            }

            // Only send an OTP if an admin with this email actually exists.
            const admin = await Admin.findOne({ email });
            if (!admin) {
                // Don't reveal whether the account exists — respond the same either way.
                return NextResponse.json({ success: true, message: 'OTP sent successfully' });
            }

            const otp = crypto.randomInt(100000, 999999).toString();

            await OTP.findOneAndUpdate(
                { email },
                { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
                { upsert: true }
            );

            await sendOTPEmail(email, otp);
            return NextResponse.json({ success: true, message: 'OTP sent successfully' });
        }

        if (action === 'reset-password') {
            const { email, otp, newPassword } = body;

            if (!email || !otp || !newPassword) {
                return NextResponse.json({ error: 'Email, OTP, and new password are required' }, { status: 400 });
            }

            if (newPassword.length < 8) {
                return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
            }

            const otpRecord = await OTP.findOne({ email });

            if (!otpRecord) {
                return NextResponse.json({ error: 'No OTP request found for this email' }, { status: 400 });
            }

            if (otpRecord.otp !== otp) {
                return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
            }

            if (otpRecord.expiresAt < new Date()) {
                await OTP.deleteOne({ email });
                return NextResponse.json({ error: 'OTP has expired. Please request a new one' }, { status: 401 });
            }

            const admin = await Admin.findOne({ email });
            if (!admin) {
                return NextResponse.json({ error: 'Admin account not found' }, { status: 404 });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            admin.password = hashedPassword;
            await admin.save();

            // OTP is single-use — remove it once it's been consumed.
            await OTP.deleteOne({ email });

            await sendPasswordChangedEmail(email);

            return NextResponse.json({ success: true, message: 'Password reset successfully' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 404 });
    } catch (error: any) {
        console.error('❌ API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ==================== EMAIL FUNCTIONS ====================

async function sendOTPEmail(email: string, otp: string) {
    try {
        const transporter = getTransporter();

        await transporter.sendMail({
            from: `"Ariad Psychological Services" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: "Your OTP for Ariad Psychological Services",
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f5; padding: 32px 0;">
                    <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #067F76, #0a9c91); padding: 24px 32px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">Ariad Psychological Services</h1>
                        </div>
                        <div style="padding: 32px;">
                            <h2 style="color: #1a1a1a; margin: 0 0 8px; font-size: 18px;">Verification Code</h2>
                            <p style="color: #555; margin: 0 0 24px; font-size: 14px;">Use the code below to reset your password. It expires in 5 minutes.</p>
                            <div style="background: #f0f9f7; border: 1px solid #d7ece9; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
                                <span style="color: #067F76; font-size: 32px; font-weight: 700; letter-spacing: 6px;">${otp}</span>
                            </div>
                            <p style="color: #888; font-size: 13px; margin: 0;">If you didn't request this code, you can safely ignore this email.</p>
                        </div>
                        <div style="background: #fafafa; padding: 16px 32px; text-align: center;">
                            <p style="color: #aaa; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Ariad Psychological Services</p>
                        </div>
                    </div>
                </div>
            `,
        });
    } catch (error) {
        console.error('❌ Send OTP Error:', error);
        throw error;
    }
}

async function sendWelcomeEmail(email: string) {
    try {
        const transporter = getTransporter();

        await transporter.sendMail({
            from: `"Ariad Psychological Services" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: "Welcome to the Ariad Psychological Services Admin Panel",
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f5; padding: 32px 0;">
                    <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">

                        <div style="background: linear-gradient(135deg, #067F76, #0a9c91); padding: 32px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Welcome to Ariad Psychological Services</h1>
                            <p style="color: #d6f0ec; margin: 8px 0 0; font-size: 14px;">Your admin account is ready</p>
                        </div>

                        <div style="padding: 32px;">
                            <p style="color: #333; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
                                Hi there, your admin account for <strong>Ariad Psychological Services</strong> has been created successfully. You can sign in with the email and password you just used.
                            </p>

                            <p style="color: #333; font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
                                From the admin panel, you'll be able to:
                            </p>

                            <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 10px 0; vertical-align: top; width: 32px;">
                                        <div style="background:#e6f5f3; color:#067F76; width:24px; height:24px; border-radius:50%; text-align:center; line-height:24px; font-size:13px; font-weight:700;">✓</div>
                                    </td>
                                    <td style="padding: 10px 0; color:#333; font-size:14px; line-height:1.5;">
                                        <strong>Create blogs</strong> — publish new articles and resources for visitors
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; vertical-align: top; width: 32px;">
                                        <div style="background:#e6f5f3; color:#067F76; width:24px; height:24px; border-radius:50%; text-align:center; line-height:24px; font-size:13px; font-weight:700;">✓</div>
                                    </td>
                                    <td style="padding: 10px 0; color:#333; font-size:14px; line-height:1.5;">
                                        <strong>Edit &amp; delete blogs</strong> — keep existing content accurate and up to date
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; vertical-align: top; width: 32px;">
                                        <div style="background:#e6f5f3; color:#067F76; width:24px; height:24px; border-radius:50%; text-align:center; line-height:24px; font-size:13px; font-weight:700;">✓</div>
                                    </td>
                                    <td style="padding: 10px 0; color:#333; font-size:14px; line-height:1.5;">
                                        <strong>View inquiries &amp; submissions</strong> — see messages and form submissions from clients as they come in
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #888; font-size: 13px; line-height: 1.6; margin: 0;">
                                If you didn't create this account, please contact your site administrator right away.
                            </p>
                        </div>

                        <div style="background: #fafafa; padding: 16px 32px; text-align: center;">
                            <p style="color: #aaa; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Ariad Psychological Services</p>
                        </div>
                    </div>
                </div>
            `,
        });
    } catch (error) {
        console.error('❌ Send Welcome Email Error:', error);
        throw error;
    }
}

async function sendPasswordChangedEmail(email: string) {
    try {
        const transporter = getTransporter();

        await transporter.sendMail({
            from: `"Ariad Psychological Services" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: "Your password has been changed",
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f5; padding: 32px 0;">
                    <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #067F76, #0a9c91); padding: 24px 32px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">Ariad Psychological Services</h1>
                        </div>
                        <div style="padding: 32px;">
                            <h2 style="color: #1a1a1a; margin: 0 0 8px; font-size: 18px;">Password changed</h2>
                            <p style="color: #555; margin: 0 0 16px; font-size: 14px; line-height: 1.6;">
                                The password for your admin account (<strong>${email}</strong>) was just changed successfully.
                            </p>
                            <p style="color: #888; font-size: 13px; margin: 0;">If you didn't make this change, contact your site administrator immediately.</p>
                        </div>
                        <div style="background: #fafafa; padding: 16px 32px; text-align: center;">
                            <p style="color: #aaa; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Ariad Psychological Services</p>
                        </div>
                    </div>
                </div>
            `,
        });
    } catch (error) {
        console.error('❌ Send Password Changed Email Error:', error);
        // Non-critical — don't block the reset-password response on this.
    }
}