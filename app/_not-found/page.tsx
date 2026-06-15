"use client";

import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFDFD] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-9xl font-black text-[#023B37]/10 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#023B37] mb-6">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-10 leading-relaxed">
          It seems like the page you are looking for has been moved or doesn't
          exist. Let’s get you back to the right place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#067F76] text-white font-bold rounded-xl hover:bg-[#056b63] transition-all"
          >
            <Send className="w-4 h-4" />
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
