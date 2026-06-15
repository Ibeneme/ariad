"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  DollarSign,
  Info,
  CheckCircle,
  Brain,
  FileText,
  UserCheck,
  Activity,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function PsychologicalTestingAlternativePage() {
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const evaluationSteps = [
    {
      icon: UserCheck,
      phase: "01",
      title: "Initial Consultation",
      desc: "Your testing journey begins with an in-depth conversation. We discuss your current symptoms, personal history, and lifestyle factors to tailor the upcoming evaluation specifically to your life.",
    },
    {
      icon: Brain,
      phase: "02",
      title: "Comprehensive Evaluation",
      desc: "We administer structured diagnostic interviews, research-backed questionnaires, and standardized tasks. This multi-layered approach tracks emotional regulation, behavioral patterns, and core cognitive habits.",
    },
    {
      icon: FileText,
      phase: "03",
      title: "Results & Action Plan",
      desc: "We sit down for a thorough feedback session to review your personalized diagnostic report. We deliver clear, straightforward insights alongside definitive recommendations for therapy, lifestyle adjustments, or medical support.",
    },
  ];

  const valueProps = [
    {
      title: "Experienced Assessment Specialists",
      desc: "Our licensed clinicians specialize in complex diagnostic profiles, ensuring your testing results are reliable, objective, and clinically precise.",
      metric: "Expert Quality",
    },
    {
      title: "A Highly Tailored Diagnostic Battery",
      desc: "We look closely at your specific clinical concerns, adjusting our instruments to match your personal context instead of running rigid, generalized tracks.",
      metric: "1:1 Customization",
    },
    {
      title: "Deep Context of Local Pressures",
      desc: "From corporate workplace stress to hyper-competitive academic settings, we understand the exact lifestyle dynamics facing residents in Highland Park, Plano, and Richardson.",
      metric: "Dallas Centric",
    },
  ];

  return (
    <section
      className="bg-[#FCFAF7] text-[#112421] antialiased selection:bg-[#067F76]/20"
      id="psych-testing-alt"
    >
      {/* ================= HERO SECTION: Clean Minimalist Asymmetric Layout ================= */}
      <div className="relative min-h-[95vh] flex items-center bg-gradient-to-b from-[#F5F1EA] to-[#FCFAF7] pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#023B37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#023B37]/5 border border-[#023B37]/10 text-[#023B37] text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-[#067F76]" />
              ARIAD PSYCHOLOGICAL SERVICES • DALLAS, TX
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#012321] tracking-tight leading-[1.05]">
              Objective Insight.
              <br />
              <span className="text-[#067F76] font-serif italic font-normal">
                Authentic Guidance.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 max-w-xl font-normal leading-relaxed">
              Gain a definitive, empirical look into your emotional, behavioral,
              and cognitive health. We provide meticulously structured
              psychological evaluations designed to offer absolute diagnosis
              accuracy and customized therapeutic direction.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-[#023B37] hover:bg-[#067F76] text-white px-7 py-4 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
              >
                View Transparent Pricing
              </a>
              <a
                href="/contact"
                className="border border-[#023B37]/20 hover:border-[#023B37]/60 px-7 py-4 rounded-xl font-bold text-sm transition-all text-[#023B37] flex items-center gap-2"
              >
                Schedule Assessment
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Image/Graphic Column */}
          <div className="lg:col-span-6 relative w-full h-[500px] flex items-center justify-end">
            <div className="absolute right-0 top-0 w-11/12 h-[90%] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
                alt="Safe and calm clinical evaluation room"
                fill
                className="object-cover grayscale-[25%] contrast-[105%]"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollTriggerConfig}
              className="absolute left-0 bottom-4 bg-white border-l-4 border-[#067F76] p-6 rounded-r-xl shadow-lg max-w-[260px] z-20"
            >
              <Activity className="w-5 h-5 text-[#067F76] mb-2" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Clinical Framework
              </p>
              <p className="text-sm font-bold text-[#023B37] mt-0.5 leading-snug">
                Standardized tracking designed to clear away mental ambiguity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= PHILOSOPHY CALLOUT: Split Balanced Blocks ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-200/60">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#067F76] uppercase block">
              Core Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#023B37] tracking-tight">
              What defines an evidence-based assessment?
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-slate-600 text-base leading-relaxed font-normal">
            <p>
              Psychological testing is an evidence-based method used to evaluate
              your overarching mental health and cognitive baseline. Through
              specialized structured diagnostic assessments, we capture how your
              emotional and behavioral processes interact day-to-day.
            </p>
            <p className="p-4 bg-[#F5F1EA] rounded-xl text-[#023B37] font-medium border-l-2 border-[#023B37]">
              At Ariad Psychological Services, we remove the guesswork from your
              care. Our rigorous evaluations provide families and individuals
              throughout Uptown, Oak Lawn, and Lakewood with accurate diagnoses
              and functional, practical roadmaps.
            </p>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US: Alternating Linear Rows ================= */}
      <div className="bg-white border-y border-slate-200/80 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
              The Ariad Advantage
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#023B37]">
              Thorough diagnostics for the Dallas community
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {valueProps.map((card, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-12 gap-6 py-8 items-center first:pt-0 last:pb-0 group"
              >
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {card.metric}
                  </span>
                  <span className="text-lg font-mono font-bold text-[#067F76]">
                    // 0{idx + 1}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold text-[#023B37] tracking-tight group-hover:text-[#067F76] transition-colors">
                    {card.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= EVALUATION TIMELINE: Clean Grid Step Layout ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase">
            The Process
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#023B37] tracking-tight">
            Your structured assessment roadmap
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {evaluationSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-8 relative space-y-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#023B37]/5 border border-[#023B37]/10 rounded-xl flex items-center justify-center text-[#023B37]">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                    Phase {step.phase}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#023B37] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#067F76] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Empirical Validation
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= REGIONAL CALLOUT: Minimalist Card ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-[#023B37] text-white rounded-3xl p-8 sm:p-12 shadow-xl grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="md:col-span-5 space-y-2 relative z-10">
            <span className="text-xs font-bold tracking-widest text-[#67E8D6] uppercase block">
              Dallas Context
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Supporting individuals in a fast-paced environment
            </h3>
          </div>
          <div className="md:col-span-7 text-slate-300 font-normal text-sm sm:text-base leading-relaxed relative z-10">
            Living and working in Dallas means managing a rapid rhythm of life.
            Whether you are dealing with hidden trauma, intense professional
            anxiety, persistent mood shifts, or unmapped executive struggles,
            comprehensive psychological testing provides the foundational
            clarity required to improve overall daily function and long-term
            well-being across Oak Lawn, Deep Ellum, and the Park Cities.
          </div>
        </div>
      </div>

      {/* ================= PRICING SECTION: Clean Split Container ================= */}
      <div
        id="pricing"
        className="bg-[#F3EFE9] border-t border-slate-200 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Pricing Left Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#023B37]/5 text-[#023B37] text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                Assessment Rates
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#023B37] tracking-tight leading-tight">
                Honest hourly metrics with absolute clarity.
              </h3>
              <p className="text-slate-600 font-normal text-base leading-relaxed">
                A comprehensive psychological evaluation requires detailed
                clinical runtime, observation analysis, and extensive
                multi-trait data integration. We break our schedule down with
                total transparency so you can choose care comfortably.
              </p>

              <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 max-w-md">
                <Info className="w-4 h-4 text-[#067F76] shrink-0 mt-0.5" />
                <span>
                  Testing batteries generally require between 8 to 12 total
                  hours, depending strictly on your specific evaluation path.
                </span>
              </div>
            </div>

            {/* Pricing Right Rate Card */}
            <div className="lg:col-span-6 w-full max-w-md mx-auto lg:ml-auto">
              <div className="bg-white border-2 border-[#023B37] rounded-2xl p-8 sm:p-10 space-y-6 shadow-md relative">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                    Standard Framework
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#023B37] tracking-tight">
                      $200–$250
                    </span>
                    <span className="text-slate-500 text-xs font-bold font-mono">
                      / HR
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#067F76] bg-[#067F76]/5 px-3 py-1.5 rounded inline-block">
                  Expected window: 8–12 Total Hours
                </div>

                <hr className="border-slate-200" />

                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                    All-Inclusive Path Elements:
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    <li className="flex items-center gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                      Initial Consultation & Intake Mapping
                    </li>
                    <li className="flex items-center gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                      Direct Testing & Standardized Surveys
                    </li>
                    <li className="flex items-center gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                      Detailed Feedback Meeting & Report
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <a
                    href="/contact"
                    className="w-full text-center block bg-[#023B37] hover:bg-[#067F76] text-white font-bold py-4 rounded-xl transition-all text-sm shadow-sm"
                  >
                    Begin Assessment Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FINAL CALL TO ACTION: Editorial Banner ================= */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
        id="contact"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-[#012321] tracking-tight leading-tight">
            Begin your path to mental focus.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Our clinical team provides a secure, expert environment to map your
            mental health and secure the tools you deserve. Contact us today to
            secure your assessment slot.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#023B37] hover:bg-[#067F76] text-white font-bold px-8 py-4.5 rounded-xl shadow-md transition-all text-sm group"
            >
              Schedule Your Psychological Assessment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
