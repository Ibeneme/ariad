"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  Info,
  BookOpen,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function PsychoedPage() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const reasons = [
    {
      title: "Learning Disabilities",
      desc: "Struggling with reading, writing, math, or processing information at school or work.",
    },
    {
      title: "Attention Issues",
      desc: "Difficulty concentrating, organizing, or completing tasks, which may indicate ADHD.",
    },
    {
      title: "Emotional Concerns",
      desc: "Signs of anxiety, depression, or other challenges that impact learning performance.",
    },
    {
      title: "Academic Underachievement",
      desc: "When potential does not match performance, our evaluations provide necessary clarity.",
    },
  ];

  const evaluationSteps = [
    {
      icon: Clock,
      phase: "Phase 1",
      title: "Learning Your History",
      desc: "We begin with an intake consultation and a parent conversation. We look at past school work, developmental history, and identify the exact areas where you or your child are struggling.",
    },
    {
      icon: BookOpen,
      phase: "Phase 2",
      title: "Direct Learning Tasks",
      desc: "We perform comprehensive testing through tailored interactive puzzles, reading exercises, and memory tasks. This helps us see exactly how your brain processes numbers, words, and logic.",
    },
    {
      icon: Award,
      phase: "Phase 3",
      title: "Results and Solutions",
      desc: "We hold a dedicated feedback session to share our findings. You get a clear, personalized action plan detailing how to request accommodations at school or your workplace.",
    },
  ];

  return (
    <section
      className="bg-[#FCFAF7] text-[#112421] antialiased overflow-hidden selection:bg-[#067F76]/20"
      id="psychoed-testing"
    >
      {/* Editorial Gallery Split Hero */}
      <div className="relative min-h-[90vh] flex items-center bg-[#012321] text-white pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(103,232,214,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#067F76]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#67E8D6] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Dallas Educational Services
            </div>

            <div className="text-white/60 font-semibold text-xs uppercase tracking-widest">
              Services / Evaluations
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Dyslexia & Learning <br />
              <span className="text-[#67E8D6]">Evaluations in Dallas.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Uncover true cognitive potential. We provide welcoming, deep
              psychoeducational assessments to clear up classroom struggles and
              maximize learning capabilities for all ages.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-white text-[#012321] hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                View Transparent Pricing
              </a>
              <a
                href="/contact"
                className="border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-xl font-bold text-sm transition-all text-white flex items-center gap-2"
              >
                Speak With Our Team
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hero Right Content - Artistic Layered Frames */}
          <div className="lg:col-span-5 relative h-[480px] w-full hidden sm:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.8 }}
              className="absolute left-4 top-4 w-5/6 aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-[#012321] shadow-2xl z-20"
            >
              <Image
                src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=1035&auto=format&fit=crop"
                alt="Comfortable private assessment room"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ zIndex: 99 }}
              className="absolute right-0 bottom-4 w-1/2 aspect-square rounded-[2rem] overflow-hidden border-4 border-[#012321] shadow-xl z-10 opacity-60 bg-[#067F76]"
            >
              <div className="w-full h-full p-6 flex flex-col justify-end text-white">
                <Sparkles className="w-8 h-8 text-[#67E8D6] mb-4" />
                <p className="font-bold text-base leading-snug">
                  Designed completely for your personal testing pace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Philosophy Callout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 sm:p-12 shadow-sm grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase">
              What it is
            </h2>
            <p className="text-3xl font-bold text-[#023B37] tracking-tight">
              What is a Psychoeducational Evaluation?
            </p>
          </div>
          <div className="md:col-span-7 space-y-4">
            <p className="text-slate-600 font-normal text-base leading-relaxed">
              At Ariad Psychological Services, we perform thorough learning
              assessments in Dallas, TX. These allow children, teens, and adults
              to identify their exact cognitive layout, strengths, and
              underlying struggles.
            </p>
            <p className="text-slate-600 font-normal text-base leading-relaxed">
              Whether you are trying to overcome challenges with learning
              disabilities, reading issues like dyslexia, or unexpected academic
              shifts, our license specialists are ready to support your goals
              across Uptown, Lakewood, and Highland Park.
            </p>
          </div>
        </div>
      </div>

      {/* Asymmetric Three-Card Pillars (Why Choose Us) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
            Why Choose Our Team
          </h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-[#023B37]">
            Trusted partners in educational growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              title: "Licensed Psychologists",
              desc: "Our experienced, local specialists bring deep knowledge directly to the unique academic standards of Dallas schools.",
            },
            {
              icon: BookOpen,
              title: "Deep Personalized Plans",
              desc: "We skip cookie-cutter strategies to craft custom, comprehensive evaluation maps matching your history.",
            },
            {
              icon: MapPin,
              title: "Serving Local Communities",
              desc: "Convenient access for families across Dallas, Uptown, Lakewood, Highland Park, and surrounding areas.",
            },
            {
              icon: ShieldCheck,
              title: "Safe, Confidential Care",
              desc: "Every session occurs inside a protective, compassionate environment where you feel heard and completely secure.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all min-h-[220px]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#067F76]/5 text-[#067F76] flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1 mt-4">
                <h4 className="font-bold text-base text-[#023B37] tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-500 font-normal text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Interactive Sliding Process Split */}
      <div className="bg-[#023B37] text-white py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Steps Controller Left */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-[#67E8D6] uppercase">
                The Simple Path
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Our collaborative evaluation timeline
              </h3>

              <div className="space-y-3 pt-4">
                {evaluationSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-white text-[#023B37] border-white shadow-xl scale-[1.01]"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          activeStep === idx
                            ? "bg-[#023B37]/10 text-[#023B37]"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {step.phase}
                      </span>
                      <span className="font-semibold tracking-tight text-base">
                        {step.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeStep === idx ? "rotate-90 text-[#023B37]" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Display Window Right */}
            <div className="lg:col-span-7 bg-[#012321] rounded-[2.5rem] p-8 sm:p-12 min-h-[320px] flex flex-col justify-between border border-white/5 relative shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#67E8D6]">
                    {React.createElement(evaluationSteps[activeStep].icon, {
                      className: "w-6 h-6",
                    })}
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    {evaluationSteps[activeStep].title}
                  </h4>
                  <p className="text-slate-300 font-normal text-base leading-relaxed max-w-xl">
                    {evaluationSteps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2 mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#67E8D6]" />
                <span>
                  Valid assessments • Guided metrics • Absolute privacy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Reasons Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
            Recognizing Challenges
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-[#023B37] tracking-tight">
            Common reasons for seeking evaluation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex gap-5 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/60 hover:shadow-lg transition-all"
            >
              <div className="shrink-0 text-xl font-bold text-[#067F76] bg-[#067F76]/5 w-10 h-10 rounded-xl flex items-center justify-center select-none">
                0{i + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-[#023B37] tracking-tight">
                  {r.title}
                </h4>
                <p className="text-slate-500 font-normal text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent Pricing Section */}
      <div
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="bg-[#F3EFE9] rounded-[2.5rem] p-8 sm:p-16 border border-slate-200 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#023B37]/5 text-[#067F76] text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              Evaluation Rates
            </div>
            <h3 className="text-3xl sm:text-5xl font-bold text-[#023B37] tracking-tight leading-tight">
              Straightforward pricing without surprise terms.
            </h3>
            <p className="text-slate-600 font-normal text-base leading-relaxed">
              Psychoeducational testing combines standard analytical exercises
              with comprehensive academic reviews and direct observations. We
              map all hours plainly so your family can schedule reliably.
            </p>

            <div className="flex items-start gap-3 bg-white/60 p-4 rounded-xl border border-slate-300/50 text-xs text-slate-500 max-w-md">
              <Info className="w-4 h-4 text-[#067F76] shrink-0 mt-0.5" />
              <span>
                Assessments normally require roughly 8 to 12 total hours,
                directly varying based on testing needs.
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#023B37] text-white rounded-[2rem] p-8 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-xs font-bold uppercase tracking-widest bg-white/10 rounded-bl-xl text-[#67E8D6]">
                Full Assessment
              </div>

              <div className="space-y-1">
                <p className="text-sm uppercase tracking-wider text-slate-300 font-semibold">
                  Rate Matrix
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold text-white">
                    $200–$250
                  </span>
                  <span className="text-slate-400 text-sm">/ per hour</span>
                </div>
              </div>

              <hr className="border-white/10" />

              <div className="space-y-3">
                <p className="text-xs font-bold text-[#67E8D6] uppercase tracking-wider">
                  What is completely included:
                </p>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67E8D6] shrink-0" />
                    Initial Consultation & Intake Review
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67E8D6] shrink-0" />
                    Direct Comprehensive Cognitive & Learning Testing
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67E8D6] shrink-0" />
                    Dedicated Feedback Meeting & Action Plan Guide
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <a
                  href="/contact"
                  className="w-full text-center block bg-[#67E8D6] hover:bg-[#52d1bf] text-[#012321] font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  Schedule Assessment Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modernist Final Call-To-Action Block */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        id="contact"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollTriggerConfig}
          className="bg-gradient-to-br from-[#012321] to-[#023B37] text-white rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Gain clarity on your learning journey.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
              Our professional specialists are here to guide you toward concrete
              cognitive answers. Contact us today to set up your consultation.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#67E8D6] to-[#067F76] text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-[#067F76]/10 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-98 group"
              >
                Schedule Your Psychoeducational Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
