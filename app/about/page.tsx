"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Brain,
  HeartHandshake,
  Sparkles,
  GraduationCap,
  Calendar,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import drAdodoImg from "../../assests/images/dr-adodo.png";
import jenniferImg from "../../assests/images/jennifer-arenas.png";

const coreValues = [
  {
    icon: Brain,
    title: "Evidence-Based Insights",
    desc: "We combine standard clinical research practices with customized diagnostics to truly understand the mind's inner workings.",
    color: "bg-[#023B37]/10 text-[#023B37]",
  },
  {
    icon: HeartHandshake,
    title: "Compassionate Support",
    desc: "Psychological testing isn't just about hard data. We emphasize comfort, psychological safety, and validating paths to growth.",
    color: "bg-[#067F76]/10 text-[#067F76]",
  },
  {
    icon: Sparkles,
    title: "Neurodiversity Affirming",
    desc: "We view differences as unique frameworks, not deficits. Our insights celebrate neurodiversity while building tools for challenges.",
    color: "bg-[#8C6D53]/10 text-[#8C6D53]",
  },
];

const faqs = [
  {
    id: "faq-0",
    q: "What types of psychological testing do you offer?",
    a: "We provide comprehensive assessments for ADHD, autism, learning disabilities, mood disorders (e.g., anxiety, depression), cognitive functioning, and more. Our evaluations are tailored to children, teens, and adults.",
  },
  {
    id: "faq-1",
    q: "How long does testing take, and what’s the process?",
    a: "Testing typically involves 1–3 sessions (2–6 hours total), including clinical interviews, standardized testing batteries, and a comprehensive feedback meeting. A detailed report with diagnoses and highly specific recommendations is delivered within a few weeks.",
  },
  {
    id: "faq-2",
    q: "Do you accept insurance for psychological testing?",
    a: "Yes! We work with United Healthcare, BlueCross/BlueShield, AETNA, and Cigna providers for testing services. Coverage varies, so we highly recommend verifying your benefits beforehand. Self-pay options and dynamic payment plans are also readily available.",
  },
  {
    id: "faq-3",
    q: "Can testing help with school or workplace accommodations?",
    a: "Absolutely. Our clinical reports include evidence-based diagnoses and tailored recommendations explicitly mapped to legal requirements for IEP/504 plans, collegiate accommodations, or workplace adjustments.",
  },
  {
    id: "faq-4",
    q: "How do I prepare for my testing appointment?",
    a: "Bring any prior medical or school records, secure a great night's sleep, and eat a balanced meal beforehand. For young children, explain the process positively: 'We're going to see a friendly specialist to play some games and figure out how your brain learns best!'",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15 
      } as const, // Adding 'as const' helps TypeScript infer the specific string literals
    },
  };
export default function AboutUs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FCFDFD] text-slate-800 overflow-x-hidden selection:bg-[#067F76] selection:text-white">
      {/* --- HERO SECTION (DARK GREEN) --- */}
      <section className="relative py-28 sm:py-40 bg-gradient-to-b from-[#011211] to-[#023B37] text-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#067F76]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8C6D53]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <span className="font-semibold tracking-wider uppercase text-xs text-emerald-300/90">
              Meet Ariad Psychological
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white"
          >
            Guiding Minds. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E1CE] via-[#067F76] to-[#CBB199]">
              Empowering Growth.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-emerald-100/70 font-light leading-relaxed"
          >
            Meet the dedicated, multi-disciplinary clinicians combining
            cutting-edge clinical research with deep empathy to help your family
            thrive.
          </motion.p>
        </div>
      </section>

      {/* --- OUR CORE VALUES (WHITE BG) --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#067F76]/30 hover:shadow-[0_20px_50px_rgba(6,127,118,0.06)] transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#023B37] mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- CLINICAL TEAM SECTION (WHITE BG) --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FCFDFD]">
        <div className="text-center lg:text-left mb-24">
          <span className="text-sm font-bold text-[#067F76] tracking-widest uppercase block mb-2">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#023B37]">
            The Medical Experts
          </h2>
        </div>

        <div className="space-y-40">
          {/* Clinician 1: Dr. Adodo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="grid lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 group relative">
              <div className="absolute inset-0 bg-[#067F76]/10 rounded-[3rem] transform rotate-3 scale-102 group-hover:rotate-1 transition-transform duration-500 pointer-events-none" />
              <div className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-slate-100 relative shadow-xl z-10 border border-slate-200">
                <Image
                  src={drAdodoImg}
                  alt="Dr. Isoken Adodo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#023B37]/5 text-[#023B37] text-xs font-semibold border border-[#023B37]/10">
                <ShieldCheck className="w-3.5 h-3.5" /> Clinical Director
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-[#023B37] tracking-tight">
                Isoken Adodo,{" "}
                <span className="font-light text-[#067F76]">PhD, LP</span>
              </h3>
              <p className="text-lg text-[#067F76] font-semibold tracking-wide">
                Owner & Founder of Ariad Psychological Services
              </p>
              <div className="h-0.5 w-20 bg-[#8C6D53]" />
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                Dr. Adodo is a highly revered Licensed Psychologist and
                Certified School Psychologist specializing in detailed
                neurodevelopmental and psychological diagnostics across the
                lifespan. With foundational doctoral training from the{" "}
                <strong className="text-slate-900 font-medium">
                  University of Arizona
                </strong>
                , she launched ARIAD to bridge the gap between meticulous
                empirical diagnostics and patient-first, welcoming care. Her
                practice focuses heavily on ADHD mapping, subtle presentations
                of autism, and intricate adolescent mood disorders.
              </p>
            </div>
          </motion.div>

          {/* Clinician 2: Jennifer Arenas-Cárdenas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="grid lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 lg:order-2 group relative">
              <div className="absolute inset-0 bg-[#8C6D53]/10 rounded-[3rem] transform -rotate-3 scale-102 group-hover:-rotate-1 transition-transform duration-500 pointer-events-none" />
              <div className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-slate-100 relative shadow-xl z-10 border border-slate-200">
                <Image
                  src={jenniferImg}
                  alt="Jennifer Arenas-Cárdenas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                />
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1 space-y-6 lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C6D53]/10 text-[#8C6D53] text-xs font-semibold border border-[#8C6D53]/20">
                <GraduationCap className="w-3.5 h-3.5" /> Advocacy & Operations
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-[#023B37] tracking-tight">
                Jennifer Arenas-Cárdenas,{" "}
                <span className="font-light text-[#8C6D53]">Ed.S.</span>
              </h3>
              <p className="text-lg text-[#8C6D53] font-semibold tracking-wide">
                Practice Manager & Certified School Psychologist
              </p>
              <div className="h-0.5 w-20 bg-[#067F76]" />
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                With a stellar track record spanning over 15 years within
                regional public educational ecosystems, Jennifer acts as the
                driving operational heart of ARIAD. She holds her Specialist in
                Education degree (Ed.S.) from the{" "}
                <strong className="text-slate-900 font-medium">
                  University of Arizona
                </strong>
                . Jennifer leverages unrivaled knowledge in multi-tiered
                psychoeducational assessments to fiercely champion culturally
                and linguistically diverse populations, converting data barriers
                into straightforward pathways for educational success.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION (WHITE BG) --- */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#067F76] uppercase bg-[#067F76]/10 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#023B37] mt-4">
              Testing Clarified
            </h2>
            <p className="text-slate-500 mt-2">
              Everything you need to know about setting up your assessment
              pathway.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl transition-all duration-300 ${
                    isOpen
                      ? "shadow-[0_15px_30px_rgba(2,59,55,0.04)] border-[#067F76]"
                      : "shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:border-slate-300"
                  } border border-slate-200 overflow-hidden`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left font-bold text-[#023B37] text-lg gap-4 group"
                  >
                    <span className="group-hover:text-[#067F76] transition-colors duration-200">
                      {faq.q}
                    </span>
                    <div
                      className={`p-2 rounded-xl transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#023B37] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 pt-1 text-slate-600 leading-relaxed font-light border-t border-slate-100">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CONNECT WITH US / CONTACT SECTION (DARK GREEN BG) ---  
      bg-gradient-to-b from-[#023B37] to-[#011C1A]
      
      */}
      <section className="bg-[#022A27] text-white py-24 relative border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Two Offices Intake details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#CBB199] uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  Connect With Us
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
                  Start Your Journey.
                </h2>
                <p className="text-emerald-100/60 mt-4 font-light leading-relaxed">
                  Have questions regarding timelines, pricing, or specific
                  evaluation scopes? Reach out to our intake coordinator or
                  submit the form for a confidential call back.
                </p>
              </div>

              <div className="space-y-6">
                {/* Dallas Office Group */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#00E1CE]">
                    Dallas Office
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#CBB199] mt-1 shrink-0" />
                    <p className="text-sm text-white/90">
                      4131 N Central Expy Suite 900, Dallas, TX 75204
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#CBB199] shrink-0" />
                    <p className="text-sm text-white/90">(469) 733-9976</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#CBB199] shrink-0" />
                    <p className="text-sm text-white/90">
                      info@ariadpsychservices.com
                    </p>
                  </div>
                </div>

                {/* Tucson Office Group */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#CBB199]">
                    Tucson Office
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#00E1CE] mt-1 shrink-0" />
                    <p className="text-sm text-white/90">
                      5055 E Broadway Blvd Suite C215, Tucson, AZ 85711
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#00E1CE] shrink-0" />
                    <p className="text-sm text-white/90">(520) 369-7037</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#00E1CE] shrink-0" />
                    <p className="text-sm text-white/90">
                      admin@ariadpsychservices.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Intake Interactive Form */}
            <div className="lg:col-span-7 w-full">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-[#022A27]/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-emerald-100/60">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full bg-[#011C1A]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00E1CE] focus:ring-1 focus:ring-[#00E1CE] transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-emerald-100/60">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="johndoe@example.com"
                            className="w-full bg-[#011C1A]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00E1CE] focus:ring-1 focus:ring-[#00E1CE] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-emerald-100/60">
                          Reason for Assessment
                        </label>
                        <select className="w-full bg-[#011C1A]/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E1CE] transition-all">
                          <option className="bg-[#023B37]">
                            ADHD / Autism Evaluation
                          </option>
                          <option className="bg-[#023B37]">
                            Learning Disability Assessment
                          </option>
                          <option className="bg-[#023B37]">
                            Mood & Cognitive Functioning
                          </option>
                          <option className="bg-[#023B37]">
                            General Clinical Consultation
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-emerald-100/60">
                          Detailed Message
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Please provide details regarding scheduling preferences or clinical questions..."
                          className="w-full bg-[#011C1A]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00E1CE] focus:ring-1 focus:ring-[#00E1CE] transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00E1CE] to-[#067F76] text-white font-bold rounded-xl shadow-lg hover:shadow-[#067F76]/20 hover:brightness-110 active:scale-[0.99] transition-all duration-200"
                      >
                        <Send className="w-4 h-4" /> Send Secure Inquiry
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 bg-[#00E1CE]/10 text-[#00E1CE] border border-[#00E1CE]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Inquiry Received Successfully
                      </h3>
                      <p className="text-emerald-100/60 max-w-md mx-auto font-light">
                        Thank you for reaching out to Ariad Psychological
                        Services. Our intake coordinator will review your
                        parameters and follow up within 24–48 business hours.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-[#00E1CE] hover:underline text-sm font-medium pt-2 block mx-auto"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
