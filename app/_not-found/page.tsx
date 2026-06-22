"use client";

import Link from "next/link";
import { ArrowLeft, Send, Search, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFDFD] flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-9xl font-black text-[#023B37]/10 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#023B37] mb-6">
          Lost in the Details?
        </h2>
        <p className="text-slate-600 mb-10 leading-relaxed">
          It looks like you've taken a wrong turn. Let's get you back to the
          care and clarity you were looking for at Ariad Support Services.
        </p>

        {/* SEO-Friendly Navigation Links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <Link
            href="/services/learning-support"
            className="p-4 border border-slate-200 rounded-xl hover:border-[#067F76] transition-all flex items-center gap-3 text-left"
          >
            <BookOpen className="w-5 h-5 text-[#067F76]" />
            <span className="font-semibold text-[#023B37]">
              Learning Support
            </span>
          </Link>
          <Link
            href="/services/additional-support"
            className="p-4 border border-slate-200 rounded-xl hover:border-[#067F76] transition-all flex items-center gap-3 text-left"
          >
            <Users className="w-5 h-5 text-[#067F76]" />
            <span className="font-semibold text-[#023B37]">
              Family Advocacy
            </span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#023B37] text-white font-bold rounded-xl hover:bg-[#067F76] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#023B37] border border-[#023B37] font-bold rounded-xl hover:bg-slate-50 transition-all"
          >
            <Send className="w-4 h-4" />
            Contact Our Team
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
