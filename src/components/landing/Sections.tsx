import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import student4 from "@/assets/student-4.jpg";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Flame,
  Globe,
  Wrench,
  FolderGit2,
  FileCode2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Briefcase,
  HelpCircle,
  BookOpen,
  DollarSign,
  Lock,
  MessageCircle,
  Play,
  Terminal,
  Zap,
  TrendingUp,
  TrendingDown,
  XCircle,
  Cpu,
  Copy,
  DownloadCloud,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useEnrollmentModal } from "@/components/landing/EnrollmentModal";

/* --------------------------------- Section Header Component --------------------------------- */
export function SectionTitle({
  tag,
  title,
  subtitle,
  centered = true,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl mb-12 sm:mb-16", centered ? "mx-auto text-center" : "text-left")}>
      {tag && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f934]/10 border border-[#d4f934]/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#d4f934] mb-4 shadow-[0_0_15px_rgba(212,249,52,0.2)]">
          <Sparkles className="h-3.5 w-3.5 text-[#d4f934]" />
          <span>{tag}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* --------------------------------- 1. HERO SECTION --------------------------------- */
export function Hero() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[380px] w-[380px] sm:h-[600px] sm:w-[600px] rounded-full bg-[#d4f934]/10 blur-[130px]" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Launch Discount Badge — Ultra-Sleek Dual Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={openModal}
          className="group inline-flex items-center gap-2.5 rounded-full bg-[#0d1015]/95 border border-[#d4f934]/50 p-1 pr-4 text-xs font-semibold text-gray-200 shadow-[0_0_30px_rgba(212,249,52,0.22)] backdrop-blur-xl mb-6 cursor-pointer hover:border-[#d4f934] hover:shadow-[0_0_40px_rgba(212,249,52,0.4)] transition-all duration-300 transform-gpu hover:scale-[1.02]"
        >
          {/* Inner Highlight Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f934] px-3 py-1 text-[11px] font-black text-black shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="uppercase tracking-wide font-mono">
              {isPa ? "ਲਾਈਵ ਬੈਚ" : "MASTERCLASS ACCESS"}
            </span>
          </div>

          {/* Right Offer Text */}
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-[12px] sm:text-xs">
              {isPa ? "80% ਛੋਟ • ਸਿਰਫ ₹999" : "80% OFF • Lifetime Access ₹999"}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#d4f934] transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-4xl font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]"
        >
          {isPa ? (
            <>
              ਸਿਰਫ AI ਦੀਆਂ ਵੀਡੀਓਜ਼ ਨਾ ਦੇਖੋ, <br className="hidden sm:inline" />
              <span className="text-[#d4f934] drop-shadow-[0_0_35px_rgba(212,249,52,0.4)]">
                ਖੁਦ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਓ
              </span>{" "}
              ਅਤੇ ਕਮਾਈ ਸ਼ੁਰੂ ਕਰੋ।
            </>
          ) : (
            <>
              Stop just watching people use AI. <br className="hidden sm:inline" />
              <span className="text-[#d4f934] drop-shadow-[0_0_35px_rgba(212,249,52,0.4)]">
                Start building with it.
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed"
        >
          {isPa ? (
            <>
              ਇਸ ਮਾਸਟਰਕਲਾਸ ਤੋਂ ਬਾਅਦ ਤੁਸੀਂ <strong className="text-white font-bold">ਬਿਨਾਂ ਕੋਈ ਪੇਡ AI ਟੂਲ ਖਰੀਦੇ ਜਾਂ ਵਾਧੂ ਪੈਸਾ ਖਰਚੇ</strong>, 100% ਖੁਦ ਅਸੀਮਤ ਕਲਾਇੰਟ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣ, ਡੋਮੇਨ 'ਤੇ ਲਾਈਵ ਕਰਨ ਅਤੇ ₹15k–₹50k ਕਮਾਉਣ ਦੇ ਕਾਬਲ ਹੋ ਜਾਵੋਗੇ।
            </>
          ) : (
            <>
              After this masterclass, you can build production-ready websites <strong className="text-white font-bold">100% by yourself — without buying any paid AI tools or spending extra money</strong> on expensive subscriptions.
            </>
          )}
        </motion.p>

        {/* Pricing Card & CTA Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Main ₹999 CTA Button */}
          <button
            type="button"
            onClick={openModal}
            className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base sm:text-lg font-black text-black shadow-[0_0_40px_rgba(212,249,52,0.5)] cursor-pointer"
          >
            <span>
              {isPa ? "ਹੁਣੇ ਐਕਸੈਸ ਲਵੋ — " : "Start Learning Now — "}
              <span className="line-through decoration-red-600 decoration-2 text-black/70 text-sm sm:text-base font-bold mr-1">
                ₹4,999
              </span>
              <span className="text-black font-black text-lg sm:text-xl">₹999</span>
            </span>
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Secondary Curriculum Jump */}
          <a
            href="#curriculum"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-800 bg-[#121212] px-6 py-4 text-sm font-bold text-gray-300 hover:text-white hover:border-[#d4f934]/50 hover:bg-[#181818] transition-all"
          >
            <BookOpen className="h-4 w-4 text-[#d4f934]" />
            <span>{isPa ? "ਸਿਲੇਬਸ ਦੇਖੋ (7 ਕਲਾਸਾਂ)" : "View 7-Class Syllabus"}</span>
          </a>
        </motion.div>

        {/* Micro Trust Indicators — Ultra-Premium Glassmorphic Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold"
        >
          {/* Badge 1: Zero Paid AI Tools Required */}
          <div className="flex items-center gap-2 rounded-full border border-[#d4f934]/60 bg-gradient-to-r from-[#1a230a] via-[#141b08] to-[#1a230a] px-3.5 py-1.5 text-white font-bold shadow-[0_0_20px_rgba(212,249,52,0.18)] hover:border-[#d4f934] transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4f934] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4f934]"></span>
            </span>
            <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934]" />
            <span>
              {isPa
                ? "🚫 ਬਿਨਾਂ ਕੋਈ ਪੇਡ AI ਟੂਲ ਖਰੀਦੇ (100% ਮੁਫ਼ਤ)"
                : "🚫 Zero Paid AI Tools Needed (100% Free Workflow)"}
            </span>
          </div>

          {/* Badge 2: One-time payment • Lifetime access */}
          <div className="flex items-center gap-2 rounded-full border border-gray-800/90 bg-[#101318]/90 px-3.5 py-1.5 text-gray-300 font-medium hover:border-gray-700 hover:text-white transition-all shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934]" />
            <span>
              {isPa
                ? "ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ • ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ"
                : "One-Time Payment • Lifetime Access"}
            </span>
          </div>

          {/* Badge 3: Google Drive course folder included */}
          <div className="flex items-center gap-2 rounded-full border border-gray-800/90 bg-[#101318]/90 px-3.5 py-1.5 text-gray-300 font-medium hover:border-gray-700 hover:text-white transition-all shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934]" />
            <span>
              {isPa
                ? "ਗੂਗਲ ਡਰਾਈਵ ਫੋਲਡਰ ਸ਼ਾਮਲ"
                : "Google Drive Course Folder Included"}
            </span>
          </div>

          {/* Badge 4: Build 100% by yourself */}
          <div className="flex items-center gap-2 rounded-full border border-gray-800/90 bg-[#101318]/90 px-3.5 py-1.5 text-gray-300 font-medium hover:border-gray-700 hover:text-white transition-all shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934]" />
            <span>
              {isPa
                ? "100% ਖੁਦ ਬਣਾਓ (Beginner Friendly)"
                : "Build 100% By Yourself (Zero Code Barrier)"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Helper Component: Smooth Animated Number Counter */
function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    if (end === 0) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Smooth cubic ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* --------------------------------- 2. KEY STATS STRIP --------------------------------- */
export function Stats() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  const stats = [
    {
      id: "students",
      headerIcon: <Users className="h-5 w-5 text-[#d4f934]" />,
      badge: "⭐ 4.9/5 Trust Score",
      valueElement: <CountUp end={1200} suffix="+" duration={1.6} />,
      label: isPa ? "ਸਿੱਖ ਚੁੱਕੇ ਵਿਦਿਆਰਥੀ" : "Students Trained & Building",
      subtext: isPa ? "ਜ਼ੀਰੋ ਕੋਡਿੰਗ ਬੈਕਗਰਾਊਂਡ ਤੋਂ ਸ਼ੁਰੂ" : "Zero coding background needed",
      visual: (
        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-black/50 border border-gray-800 my-2.5 w-full">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            <img src={student1} alt="Student" className="h-6 w-6 rounded-full border border-[#d4f934]/60 object-cover" />
            <img src={student2} alt="Student" className="h-6 w-6 rounded-full border border-[#d4f934]/60 object-cover" />
            <img src={student3} alt="Student" className="h-6 w-6 rounded-full border border-[#d4f934]/60 object-cover" />
            <img src={student4} alt="Student" className="h-6 w-6 rounded-full border border-[#d4f934]/60 object-cover" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-200">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>98% Pass Rate</span>
          </div>
        </div>
      ),
      highlight: isPa ? "✓ ਅਸਲ ਕਲਾਇੰਟ ਕਮਾਈ ਸ਼ੁਰੂ" : "✓ Real Client Earnings",
    },
    {
      id: "classes",
      headerIcon: <Rocket className="h-5 w-5 text-[#d4f934]" />,
      badge: "🎬 100% Practical",
      valueElement: <CountUp end={7} suffix=" Classes" duration={1.2} />,
      label: isPa ? "ਪੂਰਾ ਪ੍ਰੈਕਟੀਕਲ ਸਿਲੇਬਸ" : "Deep Practical AI Modules",
      subtext: isPa ? "ਪ੍ਰੌਂਪਟਿੰਗ ਤੋਂ ਲੈ ਕੇ ਲਾਈਵ ਹੋਸਟਿੰਗ" : "From prompts to custom domain",
      visual: (
        <div className="py-2 px-3 rounded-xl bg-black/50 border border-gray-800 my-2.5 w-full space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-gray-300 font-bold">
            <span className="text-[#d4f934] flex items-center gap-1">
              <Play className="h-2.5 w-2.5 fill-[#d4f934]" /> HD Blueprint
            </span>
            <span className="text-gray-400">0% Dry Theory</span>
          </div>
          {/* Visual step bar */}
          <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden flex">
            <div className="h-full w-full bg-gradient-to-r from-lime-500 to-[#d4f934] rounded-full shadow-[0_0_8px_rgba(212,249,52,0.6)]" />
          </div>
        </div>
      ),
      highlight: isPa ? "✓ ਲਾਈਵ ਪ੍ਰੋਜੈਕਟ ਸਿਲੇਬਸ" : "✓ Prompt to Live Domain",
    },
    {
      id: "toolcost",
      headerIcon: <Zap className="h-5 w-5 text-[#d4f934]" />,
      badge: "💸 Save ₹30k/Yr",
      valueElement: (
        <span>
          <span className="text-[#d4f934]">₹0</span> Tool Cost
        </span>
      ),
      label: isPa ? "ਬਿਨਾਂ ਕੋਈ ਪੇਡ ਟੂਲ ਖਰੀਦੇ" : "Zero Paid AI Tools Needed",
      subtext: isPa ? "100% ਮੁਫਤ ਡਿਵੈਲਪਰ ਤਕਨੀਕ" : "100% Free developer workflow",
      visual: (
        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-black/50 border border-gray-800 my-2.5 w-full text-[11px] font-extrabold">
          <span className="line-through text-red-400 decoration-red-500 text-[10px]">₹3,500/Mo</span>
          <span className="text-green-400 bg-green-950/80 px-2 py-0.5 rounded border border-green-500/30 text-[10px] font-black">
            ₹0 Forever
          </span>
        </div>
      ),
      highlight: isPa ? "✓ ਕੋਈ ਮਹੀਨਾਵਾਰ ਖਰਚਾ ਨਹੀਂ" : "✓ No Credit Card Needed",
    },
    {
      id: "offer",
      headerIcon: <ShieldCheck className="h-5 w-5 text-[#d4f934]" />,
      badge: "🏷️ 80% Discount",
      valueElement: <CountUp end={999} prefix="₹" duration={1.5} />,
      label: isPa ? "ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ (ਲਾਈਫਟਾਈਮ)" : "One-Time (Lifetime Access)",
      subtext: isPa ? "ਗੂਗਲ ਡਰਾਈਵ ਫੋਲਡਰ ਐਕਸੈਸ" : "Slashed from ₹4,999 today",
      visual: (
        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-black/50 border border-gray-800 my-2.5 w-full text-[11px] font-bold">
          <span className="text-gray-300 text-[10px] flex items-center gap-1">📁 Drive Folder</span>
          <span className="text-[#d4f934] font-black bg-[#d4f934]/15 px-2 py-0.5 rounded border border-[#d4f934]/30 text-[10px]">
            Instant Unlock
          </span>
        </div>
      ),
      highlight: isPa ? "✓ 100+ ਪ੍ਰੌਂਪਟਸ ਤੇ ਸੋਰਸ ਕੋਡ" : "✓ 100+ Prompts Included",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#080808] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-3/4 rounded-full bg-[#d4f934]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Glow Shadow Edge Border Container */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-[#d4f934]/60 via-[#d4f934]/20 to-[#d4f934]/60 shadow-[0_0_60px_rgba(212,249,52,0.18)] group transition-all">
          
          {/* Inner Card */}
          <div className="rounded-[23px] bg-gradient-to-b from-[#13160e]/95 via-[#0e1013]/95 to-[#08080a]/95 p-6 sm:p-10 backdrop-blur-2xl">
            
            {/* Catchy Marketing Hook Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f934]/15 border border-[#d4f934]/35 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#d4f934] mb-3 shadow-[0_0_15px_rgba(212,249,52,0.2)]">
                <Flame className="h-3.5 w-3.5 fill-[#d4f934]" />
                <span>{isPa ? "ਤੁਹਾਡੇ ਪੈਸੇ ਅਤੇ ਸਮੇਂ ਦੀ ਬਚਤ" : "THE ZERO-EXPENSE AI FORMULA"}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif font-black text-white leading-snug">
                {isPa ? (
                  <>
                    ਮਹੀਨਾਵਾਰ ਮਹਿੰਗੇ AI ਟੂਲ ਖਰੀਦਣੇ ਬੰਦ ਕਰੋ — <span className="text-[#d4f934]">100% ਖੁਦ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਓ</span>
                  </>
                ) : (
                  <>
                    Stop Paying ₹2,000–₹5,000/Month For AI Tools — <span className="text-[#d4f934]">Build Everything 100% By Yourself</span>
                  </>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                {isPa
                  ? "ਪ੍ਰੈਕਟੀਕਲ ਪ੍ਰੌਂਪਟਸ, ਲਾਈਵ ਡੋਮੇਨ ਡਿਪਲੋਇਮੈਂਟ ਅਤੇ ਕਲਾਇੰਟ ਵਰਕਫਲੋਅ ਸਿੱਖ ਕੇ ਪਹਿਲੇ ਹੀ ਹਫ਼ਤੇ ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਲਾਈਵ ਕਰੋ।"
                  : "Master the exact developer prompts and deployment secrets used to build high-converting websites with zero recurring software bills."}
              </p>
            </div>

            {/* 4 High-Converting Stat Tiles with Animated Numbers & Rich Visuals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl border border-gray-800/90 bg-gradient-to-b from-[#14161b]/90 to-[#0d0e12]/90 p-5 sm:p-6 text-center hover:border-[#d4f934]/60 hover:shadow-[0_0_30px_rgba(212,249,52,0.18)] hover:from-[#171b13] hover:to-[#0f1115] transition-all transform-gpu hover:-translate-y-1 flex flex-col items-center justify-between group"
                >
                  {/* Top Tile Row: Icon + Badge */}
                  <div className="w-full flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4f934]/10 border border-[#d4f934]/30 shadow-inner group-hover:scale-110 transition-transform">
                      {s.headerIcon}
                    </div>
                    <span className="rounded-full bg-[#1b2207] border border-[#d4f934]/30 px-2.5 py-0.5 text-[10px] font-black text-[#d4f934]">
                      {s.badge}
                    </span>
                  </div>

                  {/* Big Animated Number Counter */}
                  <div className="my-1.5 w-full">
                    <div className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight group-hover:text-[#d4f934] transition-colors">
                      {s.valueElement}
                    </div>
                    <div className="mt-1 text-xs sm:text-sm font-extrabold text-gray-200">
                      {s.label}
                    </div>
                  </div>

                  {/* High Converting Embedded Visual */}
                  {s.visual}

                  {/* Benefit Highlight Tag */}
                  <div className="w-full text-center">
                    <span className="inline-block text-[10px] font-extrabold text-[#d4f934] bg-[#d4f934]/10 px-2 py-0.5 rounded-full border border-[#d4f934]/20">
                      {s.highlight}
                    </span>
                  </div>

                  {/* Subtext */}
                  <div className="mt-3 pt-2.5 border-t border-gray-800/80 w-full text-[11px] font-medium text-gray-400">
                    {s.subtext}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Micro-CTA Strip inside the Glow Box */}
            <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="h-4 w-4 text-[#d4f934] shrink-0" />
                <span>
                  {isPa
                    ? "ਲਾਈਫਟਾਈਮ ਗੂਗਲ ਡਰਾਈਵ ਐਕਸੈਸ • ਸਾਰੇ ਸੋਰਸ ਕੋਡ ਅਤੇ 100+ ਪ੍ਰੌਂਪਟ ਟੈਂਪਲੇਟਸ ਸ਼ਾਮਲ"
                    : "Includes Full Google Drive Access • All Source Code & 100+ Prompt Templates"}
                </span>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="lime-button px-5 py-2 rounded-full text-xs font-black text-black inline-flex items-center gap-2 cursor-pointer shrink-0 shadow-[0_0_20px_rgba(212,249,52,0.35)]"
              >
                <span>{isPa ? "ਹੁਣੇ ਐਨਰੋਲ ਕਰੋ — ₹999" : "Claim ₹999 Access Now"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 2.5. DIRECT HERO/STATS WHATSAPP PROOF --------------------------------- */
export function HeroTestimonialProof() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  return (
    <section className="py-10 sm:py-14 bg-[#080808] relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-3/4 rounded-full bg-[#d4f934]/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-xl px-4 sm:px-6 relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1b2207] border border-[#d4f934]/40 px-4 py-1.5 text-xs font-black text-[#d4f934] shadow-[0_0_20px_rgba(212,249,52,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-[#d4f934] animate-ping" />
            <span>{isPa ? "PenduGPT ਨਾਲ ਪਹਿਲਾਂ ਹੀ ਸਿੱਖ ਰਹੇ ਹਨ 👇" : "Already learning with PenduGPT 👇"}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-white mt-2">
            {isPa ? "ਅਸਲ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਤੀਜੇ ਤੇ ਰੀਵਿਊ" : "Real Student Feedback • WhatsApp Review"}
          </h3>
        </div>

        {/* Real WhatsApp Chat Screenshot Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border-2 border-[#d4f934]/40 bg-[#0d1015] p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
        >
          {/* Screenshot Container */}
          <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-black flex items-center justify-center">
            <img
              src="/whatsapp-review-1.jpg"
              alt="Real WhatsApp Chat Review - Paras Ghai"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-auto max-h-[440px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Verification & Direct Join Action */}
          <div className="mt-4 pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> 100% Genuine Student Message
            </span>
            <button
              type="button"
              onClick={openModal}
              className="text-[#d4f934] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              Join 1,200+ Students for ₹999 <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- 2.8. THE PROBLEM --------------------------------- */
export function TheProblem() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  const problems = [
    {
      icon: <XCircle className="h-6 w-6 text-red-400" />,
      tag: isPa ? "ਸਮੱਸਿਆ 1" : "Problem 01",
      title: isPa ? "ਵੀਡੀਓ ਦੇਖਣ ਦਾ ਚੱਕਰਵਿਊਹ (The Tutorial Trap)" : "The YouTube Tutorial Trap",
      desc: isPa
        ? "ਲੋਕ ਘੰਟਿਆਂ ਬੱਧੀ AI ਦੀਆਂ ਵੀਡੀਓਜ਼ ਦੇਖਦੇ ਹਨ, ਪਰ ਜਦੋਂ ਖੁਦ ਕੰਮ ਕਰਨ ਬੈਠਦੇ ਹਨ ਤਾਂ ਕੁਝ ਸਮਝ ਨਹੀਂ ਆਉਂਦਾ।"
        : "You spend 3+ hours daily watching fancy AI demo videos, but when you open a blank screen, you don't know where to start.",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-red-400" />,
      tag: isPa ? "ਸਮੱਸਿਆ 2" : "Problem 02",
      title: isPa ? "ਮਹਿੰਗੇ AI ਟੂਲਸ ਦਾ ਬੋਝ (Tool Subscriptions)" : "The $50/Month Tool Subscription Trap",
      desc: isPa
        ? "ਹਰ ਮਹੀਨੇ ਨਵੇਂ-ਨਵੇਂ AI ਟੂਲਸ ਖਰੀਦ ਕੇ ਪੈਸੇ ਬਰਬਾਦ ਕਰਨਾ ਬਿਨਾਂ ਕੋਈ ਅਸਲ ਆਮਦਨ ਬਣਾਏ।"
        : "Most creators push expensive paid tools ($20-$50/month) that eat into your profits before you even earn your first ₹1,000.",
    },
    {
      icon: <Lock className="h-6 w-6 text-red-400" />,
      tag: isPa ? "ਸਮੱਸਿਆ 3" : "Problem 03",
      title: isPa ? "ਕੋਡਿੰਗ ਤੇ ਕੰਟਰੋਲ ਦੀ ਕਮੀ (Vendor Lock-in)" : "The 'No-Code' Builder Limitation",
      desc: isPa
        ? "ਸਧਾਰਨ ਵੈੱਬਸਾਈਟ ਬਿਲਡਰਾਂ 'ਤੇ ਕੋਡ ਤੁਹਾਡਾ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਕਲਾਇੰਟ ਮੁਤਾਬਕ ਕਸਟਮਾਈਜ਼ ਕਰਨਾ ਮੁਸ਼ਕਲ ਹੋ ਜਾਂਦਾ ਹੈ।"
        : "Drag-and-drop builders keep you trapped in their platform. You don't own the source code and can't customize advanced client features.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#07080a] border-t border-gray-800/80 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          tag={isPa ? "ਅਸਲ ਸਮੱਸਿਆ" : "THE REAL PROBLEM"}
          title={
            isPa
              ? "AI ਹਰ ਪਾਸੇ ਹੈ, ਪਰ ਜ਼ਿਆਦਾਤਰ ਲੋਕਾਂ ਨੂੰ ਇਹ ਨਹੀਂ ਪਤਾ ਕਿ ਇਸ ਨਾਲ ਕੀ ਕਰਨਾ ਹੈ।"
              : "AI is everywhere. But most people still don't know what to actually DO with it."
          }
          subtitle={
            isPa
              ? "ਸਿਰਫ AI ਦੀਆਂ ਵੀਡੀਓਜ਼ ਦੇਖ ਕੇ ਪੈਸੇ ਨਹੀਂ ਬਣਦੇ। ਤੁਹਾਨੂੰ ਇੱਕ ਅਸਲ, ਪ੍ਰੈਕਟੀਕਲ ਬਿਲਡਿੰਗ ਸਿਸਟਮ ਦੀ ਲੋੜ ਹੈ।"
              : "Watching YouTube videos and reading Twitter threads will never make you money. You need an actual practical building workflow."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {problems.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-3xl border border-red-900/30 bg-gradient-to-b from-[#140a0a] via-[#0d0707] to-[#070404] p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_25px_rgba(239,68,68,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-red-500/15 border border-red-500/30 px-3 py-0.5 text-[10px] font-black uppercase text-red-400">
                    {p.tag}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/30">
                    {p.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-100 leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-[13px] text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-red-900/30 text-[11px] text-red-400 font-semibold flex items-center gap-1.5">
                <span>🚫 Broken Old Approach</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 3. TRANSFORMATION OUTCOMES --------------------------------- */
export function Audience() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  const outcomes = [
    {
      icon: <Sparkles className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "ਬਿਨਾਂ ਕੋਈ ਪੇਡ ਟੂਲ ਖਰੀਦੇ ਖੁਦ ਬਣਾਓ" : "Build 100% By Yourself (Zero Paid Tools)",
      desc: isPa
        ? "ਤੁਹਾਨੂੰ ਕਦੇ ਵੀ ਮਹੀਨਾਵਾਰ ਪੇਡ AI ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਜਾਂ ਸਾਫਟਵੇਅਰ ਖਰੀਦਣ ਦੀ ਲੋੜ ਨਹੀਂ ਪਵੇਗੀ। ਬਿਨਾਂ ਵਾਧੂ ਪੈਸਾ ਖਰਚੇ ਖੁਦ ਅਸੀਮਤ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਓ।"
        : "Never buy expensive monthly AI subscriptions ($20-$50/mo). Master the complete free developer workflow to build unlimited client sites completely on your own.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "AI ਪ੍ਰੌਂਪਟਸ ਨਾਲ ਪੂਰੀ ਵੈੱਬਸਾਈਟ ਤਿਆਰ ਕਰੋ" : "Create Full Websites with AI Prompts",
      desc: isPa
        ? "ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪ੍ਰੌਂਪਟ ਲਿਖ ਕੇ ਕੁਝ ਹੀ ਮਿੰਟਾਂ ਵਿੱਚ ਰਿਸਪਾਂਸਿਵ, ਸਟਾਈਲਿਸ਼ ਅਤੇ ਹਾਈ-ਕਨਵਰਟਿੰਗ ਲੈਂਡਿੰਗ ਪੇਜ ਬਣਾਉਣਾ ਸਿੱਖੋ।"
        : "Generate complete responsive, high-converting modern websites in minutes using AI prompts without writing tedious boilerplate code.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "ਡੀਪ ਕੋਡ ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ ਤੇ ਡਿਵੈਲਪਮੈਂਟ" : "Deep Customization & Feature Engineering",
      desc: isPa
        ? "ਸੋਰਸ ਕੋਡ ਐਕਸਪੋਰਟ ਕਰਕੇ ਪ੍ਰੋ ਐਡੀਟਰ ਵਿੱਚ ਖੋਲ੍ਹੋ, ਕੰਪੋਨੈਂਟਸ ਬਦਲੋ ਅਤੇ ਕਲਾਇੰਟ ਮੁਤਾਬਕ ਕਸਟਮ ਫੀਚਰ ਜੋੜੋ।"
        : "Take 100% control of clean source code in developer editors to customize components, animations, APIs, and business logic effortlessly.",
    },
    {
      icon: <Wrench className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "ਐਰਰਜ਼ ਫਿਕਸ ਤੇ ਡੀਬੱਗਿੰਗ ਕਰੋ" : "Fix Common Errors & Debug Confidently",
      desc: isPa
        ? "ਕਿਸੇ ਵੀ ਬੱਗ ਜਾਂ ਸਟਾਈਲਿੰਗ ਖਰਾਬੀ ਨੂੰ ਪਛਾਣੋ ਅਤੇ ਸਕਿੰਟਾਂ ਵਿੱਚ ਠੀਕ ਕਰੋ ਤਾਂ ਜੋ ਵੈੱਬਸਾਈਟ ਬਿਨਾਂ ਰੁਕਾਵਟ ਚੱਲੇ।"
        : "Understand runtime errors, console issues, responsive glitches, and apply website security best practices.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "ਕਸਟਮ ਡੋਮੇਨ ਤੇ ਲਾਈਵ ਹੋਸਟਿੰਗ" : "Deploy Live on Custom Domains & Hosting",
      desc: isPa
        ? ".com/.in ਡੋਮੇਨ ਕਨੈਕਟ ਕਰਨਾ, DNS ਸੈੱਟਅੱਪ, SSL ਸਰਟੀਫਿਕੇਟ ਅਤੇ 100% ਲਾਈਵ ਹੋਸਟਿੰਗ ਮੁਕੰਮਲ ਕਰੋ।"
        : "Connect custom domains (.com, .in), configure DNS records, automated SSL certificates, and deploy live on cloud hosting.",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "ਸਰਵਿਸਿਜ਼ ਦੀ ਸਹੀ ਕੀਮਤ ਤੈਅ ਕਰੋ (₹15k–₹50k)" : "Price Your Services (₹15k – ₹50k+)",
      desc: isPa
        ? "ਸਿੱਖੋ ਕਿਵੇਂ ਵੈੱਬਸਾਈਟ ਪ੍ਰੋਜੈਕਟ ਲਈ ₹15,000 ਤੋਂ ₹50,000+ ਤੱਕ ਚਾਰਜ ਕਰਨਾ ਹੈ ਬਿਨਾਂ ਘੱਟ ਰੇਟ ਲਏ।"
        : "Know exactly how to price your AI website services from ₹15,000 to ₹50,000+ per project with high profit margins.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#d4f934]" />,
      title: isPa ? "ਕਲਾਇੰਟ ਲੱਭੋ ਅਤੇ ਕਮਾਈ ਸ਼ੁਰੂ ਕਰੋ" : "Find & Approach High-Paying Clients",
      desc: isPa
        ? "ਸਾਬਤ ਕੀਤੇ ਆਊਟਰੀਚ ਸਕ੍ਰਿਪਟਸ, ਪੋਰਟਫੋਲੀਓ ਪਿਚਿੰਗ ਅਤੇ ਫ੍ਰੀਲਾਂਸਿੰਗ ਰਾਹੀਂ ਨਵੇਂ ਕਲਾਇੰਟ ਹਾਸਲ ਕਰੋ।"
        : "Use ready cold outreach scripts, portfolio pitching frameworks, and freelance client acquisition tactics to start earning.",
    },
  ];

  return (
    <section id="outcomes" className="py-20 sm:py-28 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={isPa ? "ਪੂਰਾ ਬਦਲਾਅ" : "THE TRANSFORMATION"}
          title={
            isPa
              ? "ਇਸ ਮਾਸਟਰਕਲਾਸ ਤੋਂ ਬਾਅਦ ਤੁਸੀਂ ਸਿੱਖੋਗੇ..."
              : "After this Masterclass, you'll know how to..."
          }
          subtitle={
            isPa
              ? "ਬਣਾਓ → ਤਿਆਰ ਕਰੋ → ਲਾਈਵ ਡਿਪਲੋਏ ਕਰੋ → ਵੇਚੋ → ਕਮਾਓ (Build → Create → Deploy → Sell → Earn)"
              : "Build → Create → Deploy → Sell → Earn (Zero Boring Theory — 100% Practical Action)"
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {outcomes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="glass-card rounded-2xl p-6 border border-gray-800/80 hover:border-[#d4f934]/40 bg-gradient-to-b from-[#121212] to-[#0a0a0a] transition-all hover:-translate-y-1 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4f934]/10 border border-[#d4f934]/20 mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-extrabold text-white group-hover:text-[#d4f934] transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}

          {/* Quick CTA Card */}
          <div className="rounded-2xl p-6 border-2 border-dashed border-[#d4f934]/40 bg-[#12150a] flex flex-col justify-between text-left">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#d4f934]">
                {isPa ? "ਪੂਰਾ ਪੈਕੇਜ" : "ALL-IN-ONE PACK"}
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                {isPa ? "ਸਾਰੀਆਂ 7 ਕਲਾਸਾਂ ਸਿਰਫ ₹999 ਵਿੱਚ" : "All 7 Classes Included in ₹999"}
              </h3>
              <p className="mt-2 text-xs text-gray-400">
                {isPa
                  ? "ਗੂਗਲ ਡਰਾਈਵ ਫੋਲਡਰ, ਪ੍ਰੌਂਪਟਸ ਅਤੇ ਪੋਰਟਫੋਲੀਓ ਪ੍ਰੋਜੈਕਟਸ ਨਾਲ ਤੁਰੰਤ ਸ਼ੁਰੂ ਕਰੋ।"
                  : "Includes Google Drive lifetime access, ready prompts, templates, and project source files."}
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="lime-button mt-4 w-full py-3 px-4 rounded-xl text-xs font-black text-black cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isPa ? "ਹੁਣੇ ਸ਼ੁਰੂ ਕਰੋ (₹999)" : "Start Learning Now (₹999)"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 4. VISUAL ROADMAP / TIMELINE --------------------------------- */
export function Curriculum() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  const classes = [
    {
      step: "01",
      number: "Class 01",
      badge: "Foundation",
      phase: "Phase 1",
      icon: <Sparkles className="h-5 w-5 text-[#d4f934]" />,
      title: isPa ? "AI ਪ੍ਰੌਂਪਟਿੰਗ ਨਾਲ ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ" : "Create Websites Using AI Prompts",
      desc: isPa
        ? "AI ਪ੍ਰੌਂਪਟ ਨਾਲ 45 ਮਿੰਟ ਵਿੱਚ ਪੂਰੀ ਰਿਸਪਾਂਸਿਵ ਵੈੱਬਸਾਈਟ ਬਣਾਓ।"
        : "Turn simple prompts into complete responsive landing pages in 45 minutes.",
      deliverable: isPa ? "ਪਹਿਲਾ AI ਲੈਂਡਿੰਗ ਪੇਜ ਤਿਆਰ" : "Deploy your first responsive AI landing page in 45 mins",
      skills: ["AI Prompts", "Visual UI Builder", "Zero Code Barrier"],
    },
    {
      step: "02",
      number: "Class 02",
      badge: "Design Mastery",
      phase: "Phase 1",
      icon: <FolderGit2 className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਪ੍ਰੀਮੀਅਮ ਵੈੱਬ ਡਿਜ਼ਾਈਨ + ਐਡਵਾਂਸਡ ਪ੍ਰੌਂਪਟ ਲਾਇਬ੍ਰੇਰੀ"
        : "Premium Website Design + Advanced Prompting & Library",
      desc: isPa
        ? "Apple-ਵਰਗਾ ਡਾਰਕ ਥੀਮ, ਗਲਾਸਮੋਰਫਿਜ਼ਮ ਅਤੇ 100+ ਰੈਡੀ ਪ੍ਰੌਂਪਟਸ।"
        : "Master Apple-style dark UI, glassmorphism, and our 100+ proven prompt vault.",
      deliverable: isPa ? "ਪ੍ਰੀਮੀਅਮ ਐਪਲ ਸਟਾਈਲ ਵੈੱਬਸਾਈਟ" : "Luxury dark SaaS UI with smooth animations",
      skills: ["Apple Dark Mode", "Glassmorphism", "100+ Prompt Pack"],
    },
    {
      step: "03",
      number: "Class 03",
      badge: "Developer Workflow",
      phase: "Phase 2",
      icon: <FileCode2 className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਸੋਰਸ ਕੋਡ ਐਕਸਪੋਰਟ ਤੇ 100% ਕੰਟਰੋਲ ਲੈਣਾ"
        : "Export Source Code & Move to Pro Workspace",
      desc: isPa
        ? "ਪੂਰਾ ਸੋਰਸ ਕੋਡ ਡਾਊਨਲੋਡ ਕਰੋ ਅਤੇ GitHub 'ਤੇ ਆਪਣੇ ਕੰਪਿਊਟਰ 'ਚ ਰੱਖੋ।"
        : "Export 100% production source code to GitHub with zero platform lock-in.",
      deliverable: isPa ? "100% ਸੋਰਸ ਕੋਡ ਦੀ ਮਾਲਕੀ" : "Complete GitHub repository and local workspace",
      skills: ["Source Code Export", "GitHub Sync", "100% Code Ownership"],
    },
    {
      step: "04",
      number: "Class 04",
      badge: "Customization",
      phase: "Phase 2",
      icon: <Cpu className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਪ੍ਰੋ ਐਡੀਟਰ ਨਾਲ ਵੈੱਬਸਾਈਟ ਕਸਟਮਾਈਜ਼ ਤੇ ਡਿਵੈਲਪ ਕਰਨਾ"
        : "Customize & Develop Websites with Advanced AI Coding",
      desc: isPa
        ? "ਬਟਨ, ਟੈਕਸਟ, ਐਨੀਮੇਸ਼ਨ ਅਤੇ ਨਵੇਂ ਫੀਚਰਜ਼ ਆਸਾਨੀ ਨਾਲ ਬਦਲੋ।"
        : "Easily edit components, add custom animations, and connect dynamic forms.",
      deliverable: isPa ? "ਕਸਟਮ ਫੀਚਰਜ਼ ਵਾਲੀ ਵੈੱਬਸਾਈਟ" : "Custom dynamic features & animated components",
      skills: ["Component Tweaks", "Dynamic Forms", "Custom Styling"],
    },
    {
      step: "05",
      number: "Class 05",
      badge: "Problem Solving",
      phase: "Phase 3",
      icon: <Wrench className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਡੀਬੱਗਿੰਗ, ਐਰਰਜ਼ ਫਿਕਸ ਕਰਨਾ ਤੇ ਵੈੱਬਸਾਈਟ ਸੁਰੱਖਿਆ"
        : "Debugging, Fixing Errors & Basic Website Security",
      desc: isPa
        ? "ਸਾਰੇ ਬਿਲਡ ਐਰਰਜ਼ 1 ਮਿੰਟ 'ਚ ਠੀਕ ਕਰੋ ਅਤੇ SSL ਸੁਰੱਖਿਆ ਲਗਾਓ।"
        : "Troubleshoot errors in 60 seconds and enable complete SSL & form protection.",
      deliverable: isPa ? "ਬੱਗ-ਮੁਕਤ ਸੁਰੱਖਿਅਤ ਕੋਡ" : "Clean build with zero errors & SSL security",
      skills: ["1-Click Error Fixes", "SSL Security", "Clean Build"],
    },
    {
      step: "06",
      number: "Class 06",
      badge: "Going Live",
      phase: "Phase 3",
      icon: <Globe className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਡੋਮੇਨ, ਹੋਸਟਿੰਗ ਅਤੇ ਕੰਪਲੀਟ ਲਾਈਵ ਡਿਪਲੋਇਮੈਂਟ"
        : "Domain, Hosting & Complete Live Deployment",
      desc: isPa
        ? "ਆਪਣਾ .com/.in ਡੋਮੇਨ ਲਗਾਓ ਅਤੇ 1 ਕਲਿੱਕ 'ਚ ਦੁਨੀਆ ਭਰ 'ਚ ਲਾਈਵ ਕਰੋ।"
        : "Connect custom domains (.com/.in) with automated free cloud hosting.",
      deliverable: isPa ? "ਲਾਈਵ ਕਸਟਮ ਡੋਮੇਨ ਵੈੱਬਸਾਈਟ" : "Live website online worldwide with custom domain",
      skills: [".com & .in Domains", "1-Click Cloud Hosting", "Free Fast CDN"],
    },
    {
      step: "07",
      number: "Class 07",
      badge: "Business & Delivery",
      phase: "Phase 4",
      icon: <Briefcase className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਕਲਾਇੰਟ ਵਰਕਫਲੋਅ, ਵੈੱਬਸਾਈਟ ਹੈਂਡਓਵਰ, ਪ੍ਰਾਈਸਿੰਗ ਤੇ ਡਿਲੀਵਰੀ"
        : "Client Workflow, Website Handover, Pricing & Delivery",
      desc: isPa
        ? "ਕਲਾਇੰਟ ਨੂੰ ਵੈੱਬਸਾਈਟ ਹੈਂਡਓਵਰ ਕਰੋ ਅਤੇ ₹15,000–₹50,000 ਚਾਰਜ ਕਰੋ।"
        : "Deliver turnkey websites with ready contracts and charge ₹15,000–₹50,000.",
      deliverable: isPa ? "ਕਲਾਇੰਟ ਹੈਂਡਓਵਰ ਕਿੱਟ ਤੇ ਕੰਟਰੈਕਟ" : "Turnkey client handover package + ready contract",
      skills: ["Client Handover Kit", "Invoice Templates", "₹15k–₹50k Pricing"],
    },
    {
      step: "08",
      number: "Final Capstone",
      badge: "Monetization",
      phase: "Phase 4",
      icon: <DollarSign className="h-5 w-5 text-[#d4f934]" />,
      title: isPa
        ? "ਪੂਰਾ ਪ੍ਰੋਜੈਕਟ ਬਿਲਡ + ਕਲਾਇੰਟ ਆਊਟਰੀਚ + ਮੋਨੇਟਾਈਜ਼ੇਸ਼ਨ"
        : "Build Complete Project + Client Outreach + Monetization",
      desc: isPa
        ? "ਪੂਰੀ ਲਾਈਵ ਵੈੱਬਸਾਈਟ ਬਣਾਓ + 5 ਕੋਲਡ DM ਸਕ੍ਰਿਪਟਸ ਨਾਲ ਪਹਿਲਾ ਕਲਾਇੰਟ ਕਲੋਜ਼ ਕਰੋ।"
        : "Build an end-to-end client website and close your first ₹15k–₹50k client using 5 tested outreach scripts.",
      deliverable: isPa ? "ਲਾਈਵ ਪੋਰਟਫੋਲੀਓ + 5 ਆਊਟਰੀਚ ਸਕ੍ਰਿਪਟਸ" : "Live portfolio website + 5 ready client outreach templates",
      skills: ["Full Client Project", "5 Outreach Scripts", "Deal Closing Scripts"],
      isCapstone: true,
    },
  ];

  const phases = [
    { num: "01", name: isPa ? "AI ਪ੍ਰੌਂਪਟਿੰਗ ਤੇ ਡਿਜ਼ਾਈਨ" : "AI Prompting & Design", classes: "Class 01–02" },
    { num: "02", name: isPa ? "ਕੋਡ ਐਕਸਪੋਰਟ ਤੇ ਕਸਟਮਾਈਜ਼" : "Code Control & Dev", classes: "Class 03–04" },
    { num: "03", name: isPa ? "ਸੁਰੱਖਿਆ ਤੇ ਲਾਈਵ ਡੋਮੇਨ" : "Security & Live Launch", classes: "Class 05–06" },
    { num: "04", name: isPa ? "ਕਲਾਇੰਟ ਤੇ ਕਮਾਈ" : "Client Handover & Income", classes: "Class 07 & Capstone" },
  ];

  return (
    <section id="curriculum" className="py-20 sm:py-28 bg-[#080808] border-t border-gray-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-4/5 rounded-full bg-[#d4f934]/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          tag={isPa ? "ਸਿਲੇਬਸ ਰੋਡਮੈਪ" : "STEP-BY-STEP ROADMAP"}
          title={isPa ? "ਸੰਪੂਰਨ ਕਲਾਸ ਵਾਈਜ਼ ਸਿਲੇਬਸ" : "What You’ll Learn — Complete Class Breakdown"}
          subtitle={
            isPa
              ? "7 ਪ੍ਰੈਕਟੀਕਲ ਕਲਾਸਾਂ ਅਤੇ 1 ਫਾਈਨਲ ਕੈਪਸਟੋਨ ਪ੍ਰੋਜੈਕਟ। ਕੋਈ ਬੋਰਿੰਗ ਥਿਊਰੀ ਨਹੀਂ — ਸਿਰਫ ਅਸਲ ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ।"
              : "Presented as a practical visual roadmap. Zero boring theory — 100% actionable building from Class 1 to your first client."
          }
        />

        {/* 4-Phase High-Level Progression Pipeline */}
        <div className="mt-10 mb-8 hidden lg:grid grid-cols-4 gap-3 p-2 rounded-2xl bg-[#0e1014] border border-gray-800/90 shadow-xl">
          {phases.map((ph, pi) => (
            <div
              key={pi}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#13161c]/80 border border-gray-800/60"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d4f934]/15 border border-[#d4f934]/30 text-xs font-black text-[#d4f934]">
                {ph.num}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase text-[#d4f934] block truncate">
                  {ph.classes}
                </span>
                <span className="text-xs font-bold text-white block truncate">
                  {ph.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Clean, Short & Elegant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6">
          {classes.map((cls, idx) => {
            const isCap = cls.isCapstone;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={cn(
                  "relative rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 group gap-3.5",
                  isCap
                    ? "md:col-span-2 border-[#d4f934]/80 bg-gradient-to-r from-[#141a0d] via-[#101318] to-[#141a0d] shadow-[0_0_35px_rgba(212,249,52,0.15)]"
                    : "border-gray-800/90 bg-[#0e1014]/90 hover:border-[#d4f934]/50 hover:shadow-[0_0_20px_rgba(212,249,52,0.06)]"
                )}
              >
                <div>
                  {/* Top Bar: Number + Class Label + Badge + Icon */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-black",
                        isCap
                          ? "bg-[#d4f934] text-black"
                          : "bg-[#1b2207] border border-[#d4f934]/40 text-[#d4f934]"
                      )}>
                        {cls.step}
                      </div>

                      <span className="font-mono text-xs font-black text-[#d4f934]">
                        {cls.number}
                      </span>
                      <span className="rounded-full bg-[#181e28] border border-gray-700/80 px-2 py-0.5 text-[9px] font-bold text-gray-300 uppercase">
                        {cls.badge}
                      </span>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/40 border border-gray-800 text-gray-400">
                      {cls.icon}
                    </div>
                  </div>

                  {/* Class Title */}
                  <h3 className={cn(
                    "font-bold text-white leading-snug group-hover:text-[#d4f934] transition-colors",
                    isCap ? "text-lg sm:text-xl text-[#d4f934]" : "text-base sm:text-lg"
                  )}>
                    {cls.title}
                  </h3>

                  {/* Short 1-Line Description */}
                  <p className="mt-1 text-xs sm:text-[13px] text-gray-400 leading-relaxed">
                    {cls.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-800/60">
                  {/* Practical Deliverable */}
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934] shrink-0" />
                    <span className="text-gray-200 font-medium truncate">
                      {cls.deliverable}
                    </span>
                  </div>

                  {/* Clean Skill Chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {cls.skills.map((sk, ski) => (
                      <span
                        key={ski}
                        className="rounded-md bg-[#13161f] border border-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Summary CTA */}
        <div className="mt-10 rounded-2xl border border-[#d4f934]/40 bg-gradient-to-r from-[#14180d] via-[#0f1115] to-[#14180d] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left shadow-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4f934]/15 border border-[#d4f934]/30 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-[#d4f934] mb-1">
              <Flame className="h-3.5 w-3.5 fill-[#d4f934]" />
              <span>{isPa ? "ਸਾਰਾ ਕੁਝ ਸ਼ਾਮਲ" : "COMPLETE 8-PART MASTERCLASS"}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {isPa ? "ਅੱਜ ਹੀ ਸਾਰੀਆਂ 7 ਕਲਾਸਾਂ + ਕੈਪਸਟੋਨ ਦਾ ਐਕਸੈਸ ਲਵੋ" : "Get Instant Access to All 7 Classes + Capstone"}
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {isPa
                ? "ਲਾਈਫਟਾਈਮ ਗੂਗਲ ਡਰਾਈਵ ਫੋਲਡਰ, 100+ ਪ੍ਰੌਂਪਟਸ, ਸਾਰੇ ਸੋਰਸ ਕੋਡ ਅਤੇ ਕਲਾਇੰਟ ਆਊਟਰੀਚ ਕਿੱਟ ਸ਼ਾਮਲ ਹੈ।"
                : "Includes lifetime Google Drive folder, 100+ tested prompts, source code starter kits, and ready client outreach scripts."}
            </p>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="lime-button shrink-0 py-3.5 px-7 rounded-full text-sm font-black text-black shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isPa ? "ਹੁਣੇ ਐਨਰੋਲ ਕਰੋ — ₹999" : "Start Learning Now — ₹999"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 5. WHAT'S INCLUDED (REALISTIC GOOGLE DRIVE & DISTINCT PERKS VAULT) --------------------------------- */
export function Bonuses() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();
  const [selectedFolder, setSelectedFolder] = useState<number>(0);

  const driveFolders = [
    {
      id: "outreach",
      name: "Client Outreaching",
      badge: "Monetization Kit",
      tag: "Client Acquisition",
      files: "5 Templates • Scripts & Decks",
      desc: isPa
        ? "ਸਿੱਧੇ ਕਲਾਇੰਟ ਆਊਟਰੀਚ ਸੁਨੇਹੇ, ਕੋਲਡ ਈਮੇਲ ਸਕ੍ਰਿਪਟਸ ਅਤੇ ਪ੍ਰਪੋਜ਼ਲ ਫਾਰਮੈਟ।"
        : "Direct DM outreach templates, proposal pitch decks, cold email frameworks, and client contract templates.",
    },
    {
      id: "day1",
      name: "Day 1",
      badge: "Class 01",
      tag: "AI Foundation",
      files: "Prompts & Setup Files",
      desc: isPa
        ? "AI ਪ੍ਰੌਂਪਟ ਆਰਕੀਟੈਕਚਰ ਅਤੇ ਮੁੱਢਲਾ ਵੈੱਬ ਡਿਜ਼ਾਈਨ ਸਿਸਟਮ।"
        : "Natural language prompt engineering, initial workspace setup, and full-page layout generation.",
    },
    {
      id: "day2",
      name: "Day 2",
      badge: "Class 02",
      tag: "Design Mastery",
      files: "Design Assets & Layouts",
      desc: isPa
        ? "ਡਿਜ਼ਾਈਨ ਸਿਸਟਮ, ਰੰਗਾਂ ਦੀ ਚੋਣ ਅਤੇ ਸੁੰਦਰ ਕੰਪੋਨੈਂਟ ਲਾਇਬ੍ਰੇਰੀ।"
        : "Dark aesthetic UI principles, typography guidelines, responsive spacing, and modern web styling.",
    },
    {
      id: "day3",
      name: "Day 3",
      badge: "Class 03",
      tag: "Developer IDE",
      files: "Source Repositories",
      desc: isPa
        ? "ਸੋਰਸ ਕੋਡ ਐਕਸਪੋਰਟ ਕਰਨਾ ਅਤੇ ਪ੍ਰੋਫੈਸ਼ਨਲ ਐਡੀਟਰ ਵਰਕਫਲੋਅ।"
        : "Exporting clean source code, GitHub repository synchronization, and setting up local developer environments.",
    },
    {
      id: "day4",
      name: "Day 4",
      badge: "Class 04",
      tag: "Customization",
      files: "Code Snippets & Logic",
      desc: isPa
        ? "AI ਕੋਡਿੰਗ, ਕੰਪੋਨੈਂਟਸ ਬਦਲਣਾ ਅਤੇ ਕਸਟਮ ਫੀਚਰਜ਼।"
        : "Hands-on component editing, integrating animated interactive elements, and custom feature customization.",
    },
    {
      id: "day5",
      name: "Day 5",
      badge: "Class 05",
      tag: "Debugging & Security",
      files: "Security Checklists",
      desc: isPa
        ? "ਗਲਤੀਆਂ ਠੀਕ ਕਰਨਾ, ਕੰਸੋਲ ਐਰਰਜ਼ ਅਤੇ ਸੁਰੱਖਿਆ ਚੈੱਕਲਿਸਟ।"
        : "Debugging console warnings, fixing responsive layout breaks, and bulletproofing site performance.",
    },
    {
      id: "day6",
      name: "Day 6",
      badge: "Class 06",
      tag: "Live Deployment",
      files: "DNS & Hosting Guides",
      desc: isPa
        ? "ਕਸਟਮ ਡੋਮੇਨ ਕਨੈਕਸ਼ਨ, DNS ਰਿਕਾਰਡਸ ਅਤੇ 100% ਲਾਈਵ ਹੋਸਟਿੰਗ।"
        : "Domain purchasing guide, DNS records routing, SSL certification, and cloud production deployment.",
    },
    {
      id: "day7",
      name: "Day 7",
      badge: "Class 07",
      tag: "Business & Delivery",
      files: "Invoice & Delivery Decks",
      desc: isPa
        ? "ਕਲਾਇੰਟ ਹੈਂਡਓਵਰ, ਇਨਵੌਇਸ ਬਣਾਉਣਾ ਅਤੇ ਪ੍ਰੋਜੈਕਟ ਡਿਲੀਵਰੀ।"
        : "Client onboarding systems, project handover checklists, maintenance retainers, and pricing frameworks.",
    },
    {
      id: "final-project",
      name: "Final Project",
      badge: "Capstone Build",
      tag: "Production Portfolio",
      files: "Complete Production Code",
      desc: isPa
        ? "ਮੁਕੰਮਲ ਪੋਰਟਫੋਲੀਓ ਪ੍ਰੋਜੈਕਟ ਕੋਡ ਜੋ ਕਲਾਇੰਟਸ ਨੂੰ ਦਿਖਾਇਆ ਜਾ ਸਕਦਾ ਹੈ।"
        : "Complete end-to-end production web application source code ready to demonstrate to prospective clients.",
    },
  ];

  const includedItems = [
    {
      icon: <Play className="h-6 w-6 text-[#d4f934]" />,
      badge: "HD Masterclass",
      valuation: isPa ? "ਮੁੱਲ: ₹4,999" : "Value: ₹4,999",
      title: isPa ? "ਪੂਰੀਆਂ ਰਿਕਾਰਡ ਕੀਤੀਆਂ 4K ਕਲਾਸਾਂ" : "Complete Recorded 4K Classes",
      desc: isPa
        ? "ਸਟੈਪ-ਬਾਈ-ਸਟੈਪ ਸਕ੍ਰੀਨ-ਰਿਕਾਰਡ ਕੀਤੀਆਂ ਪ੍ਰੈਕਟੀਕਲ ਕਲਾਸਾਂ ਜਿਸ ਵਿੱਚ ਹਰ ਟੂਲ ਤੇ ਵਰਕਫਲੋਅ ਵਿਸਥਾਰ ਨਾਲ ਦਿਖਾਇਆ ਗਿਆ ਹੈ।"
        : "Step-by-step, screen-recorded practical lessons covering every tool and workflow from start to finish.",
    },
    {
      icon: <FolderGit2 className="h-6 w-6 text-[#d4f934]" />,
      badge: "Cloud Storage",
      valuation: isPa ? "ਮੁੱਲ: ₹2,999" : "Value: ₹2,999",
      title: isPa ? "ਗੂਗਲ ਡਰਾਈਵ ਕੋਰਸ ਫੋਲਡਰ" : "Google Drive Course Folder",
      desc: isPa
        ? "ਸਾਰੇ 9 ਫੋਲਡਰਾਂ ਦਾ ਸਿੱਧਾ ਐਕਸੈਸ — ਕਲਾਸ ਵੀਡੀਓਜ਼, ਅਸੈੱਟਸ, ਅਤੇ ਭਵਿੱਖ ਦੇ ਸਾਰੇ ਅੱਪਡੇਟਸ ਲਾਈਫਟਾਈਮ।"
        : "Direct organized access to all 9 course folders, class recordings, assets, and future masterclass updates.",
    },
    {
      icon: <FileCode2 className="h-6 w-6 text-[#d4f934]" />,
      badge: "Source Code",
      valuation: isPa ? "ਮੁੱਲ: ₹3,499" : "Value: ₹3,499",
      title: isPa ? "ਕਲਾਸ ਰਿਸੋਰਸਿਸ ਅਤੇ ਸੋਰਸ ਫਾਈਲਾਂ" : "Class Resources & Starter Files",
      desc: isPa
        ? "ਹਰ ਕਲਾਸ ਦੇ ਸ਼ੁਰੂਆਤੀ ਪ੍ਰੋਜੈਕਟ ਫੋਲਡਰ, ਕੋਡ ਸਨਿੱਪਟਸ ਅਤੇ ਕਾਪੀ-ਪੇਸਟ ਕੰਪੋਨੈਂਟਸ।"
        : "Downloadable boilerplate repositories, exported code packages, and asset packs ready for deployment.",
    },
    {
      icon: <Copy className="h-6 w-6 text-[#d4f934]" />,
      badge: "Prompt Pack",
      valuation: isPa ? "ਮੁੱਲ: ₹1,999" : "Value: ₹1,999",
      title: isPa ? "ਪ੍ਰੌਂਪਟਸ ਅਤੇ ਟੈਂਪਲੇਟਸ ਲਾਇਬ੍ਰੇਰੀ" : "Curated Prompts & Templates Library",
      desc: isPa
        ? "100+ ਟੈਸਟ ਕੀਤੇ AI ਪ੍ਰੌਂਪਟਸ ਜੋ ਸੁੰਦਰ ਵੈੱਬਸਾਈਟ ਡਿਜ਼ਾਈਨ ਅਤੇ ਕਲਾਇੰਟ ਕਾਪੀਰਾਈਟਿੰਗ ਲਈ ਤਿਆਰ ਹਨ।"
        : "100+ proven AI prompts for design, layout systems, component styling, and client pitch frameworks.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-[#d4f934]" />,
      badge: "Production Ready",
      valuation: isPa ? "ਮੁੱਲ: ₹2,499" : "Value: ₹2,499",
      title: isPa ? "ਅਸਲ ਪ੍ਰੈਕਟੀਕਲ ਪ੍ਰੋਜੈਕਟਸ" : "Practical Real-World Projects",
      desc: isPa
        ? "ਕਲਾਇੰਟ-ਲੈਵਲ ਦੇ ਅਸਲ ਪ੍ਰੋਜੈਕਟਸ ਜੋ ਤੁਸੀਂ ਤੁਰੰਤ ਆਪਣੇ ਪੋਰਟਫੋਲੀਓ ਵਿੱਚ ਦਿਖਾ ਕੇ ਕਲਾਇੰਟ ਲੈ ਸਕਦੇ ਹੋ।"
        : "Production-ready website builds you can immediately customize and showcase in your client portfolio.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#d4f934]" />,
      badge: "Perpetual License",
      valuation: isPa ? "ਮੁੱਲ: ਲਾਈਫਟਾਈਮ" : "Value: Priceless",
      title: isPa ? "ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ" : "Lifetime Access & Updates",
      desc: isPa
        ? "ਸਿਰਫ ₹999 ਦਾ ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ — ਕੋਈ ਮਹੀਨਾਵਾਰ ਫੀਸ ਨਹੀਂ ਅਤੇ ਭਵਿੱਖ ਦੇ ਸਾਰੇ ਅੱਪਡੇਟਸ ਮੁਫਤ।"
        : "One-time payment of ₹999 with zero recurring subscriptions and perpetual access to all future masterclass additions.",
    },
  ];

  return (
    <section id="included" className="py-20 sm:py-28 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={isPa ? "ਪੂਰਾ ਲਰਨਿੰਗ ਸਿਸਟਮ" : "THE COMPLETE SYSTEM"}
          title={isPa ? "ਤੁਹਾਨੂੰ ਮਿਲਦਾ ਹੈ ਪੂਰਾ ਲਰਨਿੰਗ ਸਿਸਟਮ" : "YOU GET THE COMPLETE SYSTEM"}
          subtitle={
            isPa
              ? "ਸਭ ਕੁਝ ਇੱਕੋ ਥਾਂ ਸੰਗਠਿਤ — ਇਹ ਕੋਈ 20 ਪੇਜਾਂ ਵਾਲੀ PDF ਨਹੀਂ ਹੈ, ਇਹ ਪੂਰਾ ਪ੍ਰੈਕਟੀਕਲ ਲਰਨਿੰਗ ਸਿਸਟਮ ਹੈ।"
              : "Everything organized in one place. This isn't a PDF with 20 pages — you're getting an actual complete learning system."
          }
        />

        {/* 5 Tangible Callout Badges */}
        <div className="mt-8 mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#11141a] border border-gray-800/90 shadow-md">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/30 text-lg">
              🎥
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block truncate">Complete Classes</span>
              <span className="text-[10px] text-purple-300 block truncate">7 HD Classes + Capstone</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#11141a] border border-gray-800/90 shadow-md">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/30 text-lg">
              📁
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block truncate">Resources</span>
              <span className="text-[10px] text-blue-300 block truncate">Client Kits & Invoices</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#11141a] border border-gray-800/90 shadow-md">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/15 border border-[#d4f934]/30 text-lg">
              ⚡
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-[#d4f934] block truncate">Prompts</span>
              <span className="text-[10px] text-gray-300 block truncate">100+ Master Vault</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#11141a] border border-gray-800/90 shadow-md">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-lg">
              💻
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block truncate">Projects</span>
              <span className="text-[10px] text-emerald-300 block truncate">Clean GitHub Repos</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-2xl bg-[#11141a] border border-gray-800/90 shadow-md">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-lg">
              📚
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block truncate">Learning Material</span>
              <span className="text-[10px] text-amber-300 block truncate">Step-by-Step Guides</span>
            </div>
          </div>
        </div>

        {/* 🌟 Stylish Google Drive Cloud Explorer Mockup */}
        <div className="mb-16 rounded-2xl sm:rounded-3xl border-2 border-[#d4f934]/40 bg-[#0e0e11] p-4 sm:p-6 lg:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
          {/* Top Google Drive Window Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4f934]/15 border border-[#d4f934]/30 text-[#d4f934]">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    PenduGPT — AI Website Masterclass (Drive Vault)
                  </h3>
                  <span className="rounded bg-green-950/80 border border-green-500/40 px-2 py-0.5 text-[10px] font-bold text-green-400">
                    Live Shared Folder
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Google Drive / 9 Folders • Everything Organized in One Place • Lifetime Access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="rounded-full bg-[#1b2207] border border-[#d4f934]/40 px-3.5 py-1 text-[11px] font-bold text-[#d4f934]">
                🔒 Instant Auto-Unlock on ₹999 Payment
              </span>
            </div>
          </div>

          {/* Drive Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {driveFolders.map((folder, idx) => {
              const isSelected = selectedFolder === idx;
              return (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolder(idx)}
                  className={cn(
                    "flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left group select-none",
                    isSelected
                      ? "border-[#d4f934] bg-gradient-to-br from-[#1b2207] to-[#12140a] shadow-[0_0_20px_rgba(212,249,52,0.15)] scale-[1.02]"
                      : "border-gray-800/90 bg-[#141416] hover:border-gray-700 hover:bg-[#18181b]"
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                          isSelected
                            ? "bg-[#d4f934] text-black border-[#d4f934]"
                            : "bg-[#202024] border-gray-700 text-gray-300 group-hover:text-[#d4f934]"
                        )}
                      >
                        <FolderGit2 className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <h4
                          className={cn(
                            "text-xs sm:text-sm font-extrabold truncate",
                            isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
                          )}
                        >
                          {folder.name}
                        </h4>
                        <span className="text-[10px] font-medium text-gray-400 block truncate">
                          {folder.tag}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9px] font-black uppercase shrink-0",
                        isSelected
                          ? "bg-[#d4f934] text-black"
                          : "bg-gray-800 text-gray-300"
                      )}
                    >
                      {folder.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mt-1">
                    {folder.desc}
                  </p>

                  <div className="mt-3 pt-2 border-t border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                    <span>{folder.files}</span>
                    <span className="text-[#d4f934] font-bold flex items-center gap-0.5">
                      Included ✓
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Folder Preview Box */}
          <div className="mt-6 rounded-xl border border-[#d4f934]/30 bg-[#12140a] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4f934]/20 text-[#d4f934]">
                <DownloadCloud className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-black text-white">
                  Selected Folder: {driveFolders[selectedFolder].name}
                </h5>
                <p className="text-[11px] text-gray-300">
                  {driveFolders[selectedFolder].desc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="lime-button shrink-0 py-2.5 px-5 rounded-full text-xs font-black text-black cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>Get Drive Access (₹999)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 🌟 DISTINCT & ELEVATED BONUS DELIVERABLES VAULT (Visually separated from curriculum) */}
        <div className="rounded-3xl border border-[#d4f934]/30 bg-gradient-to-b from-[#13171e] via-[#0c0f15] to-[#07090e] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle ambient accent glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#d4f934]/10 blur-[90px]" />

          {/* Distinct Header Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6 mb-8 text-left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1b2207] border border-[#d4f934]/40 px-3.5 py-1 text-xs font-black text-[#d4f934] mb-2 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isPa ? "ਮੁਫਤ ਬੋਨਸ ਅਤੇ ਰਿਸੋਰਸਿਸ" : "BONUS DELIVERABLES INCLUDED"}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif font-black text-white">
                {isPa ? "ਤੁਹਾਡੀ ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ ਨਾਲ ਸ਼ਾਮਲ 6 ਸੁਪਰਪਾਵਰਜ਼" : "6 Extra Superpowers Included with Your Drive Access"}
              </h3>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-[#182012] border border-[#d4f934]/40 px-4 py-2 text-xs font-black text-[#d4f934] shrink-0">
              <span>{isPa ? "ਕੁੱਲ ਮੁੱਲ: ₹15,000+ (ਅੱਜ ₹999 ch ਮੁਫਤ)" : "Total Value: ₹15,000+ (100% Free with ₹999)"}</span>
            </div>
          </div>

          {/* 6 Elevated Cards with Distinct Visual Accent */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {includedItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="rounded-2xl border border-gray-800/90 bg-[#090c10] p-6 text-left flex flex-col justify-between hover:border-[#d4f934]/50 hover:bg-[#0e1218] transition-all group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4f934]/15 border border-[#d4f934]/30 text-[#d4f934] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,249,52,0.2)]">
                      {item.icon}
                    </div>
                    <span className="rounded-full bg-[#1b2207] border border-[#d4f934]/30 px-2.5 py-0.5 text-[10px] font-black text-[#d4f934]">
                      {item.valuation}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400 block">
                      {item.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#d4f934] transition-colors mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed font-normal">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-gray-800/80 flex items-center justify-between text-xs text-[#d4f934] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isPa ? "ਗੂਗਲ ਡਰਾਈਵ ਵਿੱਚ ਸ਼ਾਮਲ" : "Instant Drive Access"}</span>
                  </span>
                  <span className="text-gray-400 text-[10px]">Free ✓</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 6. REAL STUDENT PROOF & REVIEWS --------------------------------- */
export function Testimonials() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  // Authentic student chat / review cards with matching genders & photos
  const studentChats = [
    {
      name: "Simranjit Kaur",
      role: "Freelancer • Ludhiana",
      avatar: student1,
      tag: "Earned ₹25,000",
      quote:
        "Veer ji literally zero coding background c mera! Followed your AI prompting & code customisation workflow, te Canada wale client nu 3 days ch live website ready karke ditti. Client ne khush hoke direct ₹25,000 pay kite. Best masterclass bro! 🙏❤️",
      verified: true,
      rating: 5,
    },
    {
      name: "Vikas Verma",
      role: "Digital Marketer • Mohali",
      avatar: student2,
      tag: "Agency Owner",
      quote:
        "Sachi dasan taan our marketing agency was paying ₹40,000/month to external developers. Now with PenduGPT workflow, I build & deploy high-converting client landing pages myself in under 1 hour. Bohot sara time te monthly kharcha bach gya!",
      verified: true,
      rating: 5,
    },
    {
      name: "Gurinder Singh",
      role: "B.Tech Student • Ambala",
      avatar: student3,
      tag: "College Student",
      quote:
        "College ch 4 saal bus theory padhi but kade real website deploy ni kiti c. Day 1 te hi my portfolio website was live on my custom domain! Zero paid AI tools workflow is an absolute game-changer bro 🚀",
      verified: true,
      rating: 5,
    },
    {
      name: "Kirandeep Kaur",
      role: "Boutique Owner • Jalandhar",
      avatar: student4,
      tag: "Store Owner",
      quote:
        "Agencies were asking ₹30,000 just to design my boutique store website. I watched this ₹999 masterclass, prompts copy-paste kite, and launched my entire product catalog myself in a weekend! Super easy and practical.",
      verified: true,
      rating: 5,
    },
  ];

  return (
    <section id="proof" className="py-20 sm:py-28 bg-[#0a0a0a] border-t border-gray-800/80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={isPa ? "ਅਸਲ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਤੀਜੇ" : "REAL STUDENT PROOF"}
          title={isPa ? "ਵਿਦਿਆਰਥੀਆਂ ਦੇ WhatsApp ਮੈਸੇਜ ਤੇ ਅਸਲ ਨਤੀਜੇ" : "Real WhatsApp Chats & Student Proof"}
          subtitle={
            isPa
              ? "ਦੇਖੋ ਕਿਵੇਂ ਵਿਦਿਆਰਥੀਆਂ ਨੇ ਕਲਾਸਾਂ ਦੇਖ ਕੇ ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਲਾਈਵ ਕੀਤੇ ਅਤੇ ਕਲਾਇੰਟਸ ਤੋਂ ਕਮਾਈ ਸ਼ੁਰੂ ਕੀਤੀ।"
              : "Direct, authentic WhatsApp chat screenshots, reviews, and client milestones achieved with PenduGPT."
          }
        />

        {/* 1. AUTHENTIC 3X WHATSAPP SCREENSHOT SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Screenshot 1: Paras Ghai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border-2 border-[#d4f934]/40 bg-[#111b21] p-3.5 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between relative group"
          >
            {/* Top WhatsApp Chat Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp Chat Screenshot
                </span>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                100% Authentic Proof
              </span>
            </div>

            {/* Image Container with high quality smartphone frame */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-black flex items-center justify-center shadow-inner">
              <img
                src="/whatsapp-review-1.jpg"
                alt="Real WhatsApp Chat Review - Paras Ghai"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[460px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Bottom Caption & Badge */}
            <div className="pt-3 px-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-extrabold text-white">Paras Ghai</span>
                <span className="text-[10px] text-[#d4f934] font-bold bg-[#1b2207] px-2 py-0.5 rounded-full border border-[#d4f934]/30">
                  5 Classes Completed ✓
                </span>
              </div>
              <p className="text-xs text-gray-300 italic mt-1 font-medium">
                "Bro mein tuhadiya 5 classes dekhiya c vdiya smjandhe ho. Keep it up bro👍"
              </p>
            </div>
          </motion.div>

          {/* Screenshot 2: MALHI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl border-2 border-[#d4f934]/40 bg-[#111b21] p-3.5 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between relative group"
          >
            {/* Top WhatsApp Chat Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp Chat Screenshot
                </span>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                100% Authentic Proof
              </span>
            </div>

            {/* Image Container with high quality smartphone frame */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-black flex items-center justify-center shadow-inner">
              <img
                src="/whatsapp-review-2.jpg"
                alt="Real WhatsApp Chat Review - MALHI"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[460px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Bottom Caption & Badge */}
            <div className="pt-3 px-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-extrabold text-white">MALHI</span>
                <span className="text-[10px] text-[#d4f934] font-bold bg-[#1b2207] px-2 py-0.5 rounded-full border border-[#d4f934]/30">
                  Verified Student ✓
                </span>
              </div>
              <p className="text-xs text-gray-300 italic mt-1 font-medium">
                "Bamb, koka, jehr, sira👍🫡 😂❤️"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Screenshot 3: Akash (Placed directly below the previous 2) */}
        <div className="mt-6 flex justify-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full max-w-md rounded-3xl border-2 border-[#d4f934]/40 bg-[#111b21] p-3.5 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between relative group"
          >
            {/* Top WhatsApp Chat Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp Chat Screenshot
                </span>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                100% Authentic Proof
              </span>
            </div>

            {/* Image Container with high quality smartphone frame */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-black flex items-center justify-center shadow-inner">
              <img
                src="/whatsapp-review-3.jpg"
                alt="Real WhatsApp Chat Review - Akash"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[460px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Bottom Caption & Badge */}
            <div className="pt-3 px-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-extrabold text-white">Akash</span>
                <span className="text-[10px] text-[#d4f934] font-bold bg-[#1b2207] px-2 py-0.5 rounded-full border border-[#d4f934]/30">
                  Detailed Review ✓
                </span>
              </div>
              <p className="text-xs text-gray-300 italic mt-1 font-medium">
                "The concepts were explained clearly... The class is really worth it! ❤️"
              </p>
            </div>
          </motion.div>
        </div>

        {/* WhatsApp VIP Community Strip */}
        <div className="mt-8 max-w-5xl mx-auto rounded-2xl bg-[#11141a] border border-gray-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xl">
              💬
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isPa ? "ਸਿੱਧਾ ਪ੍ਰਾਈਵੇਟ WhatsApp ਕਮਿਊਨਿਟੀ ਐਕਸੈਸ" : "Direct Private WhatsApp VIP Community Access"}
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                {isPa
                  ? "ਵਿਦਿਆਰਥੀ ਸਵਾਲ ਪੁੱਛਦੇ ਹਨ, ਆਪਣੇ ਲਾਈਵ ਕਲਾਇੰਟ ਪ੍ਰੋਜੈਕਟਸ ਸ਼ੇਅਰ ਕਰਦੇ ਹਨ ਅਤੇ ਸਿੱਧੀ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹਨ।"
                  : "Ask questions anytime, share your live client web builds, and get direct troubleshooting support."}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-[#1b2207] border border-[#d4f934]/40 px-3.5 py-1.5 text-xs font-black text-[#d4f934]">
            Included with ₹999 Plan ✓
          </span>
        </div>

        {/* 2. STUDENT REVIEWS SLIDING RIGHT TO LEFT (DIRECTLY BELOW WHATSAPP CHATS) */}
        <div className="mt-20 sm:mt-24">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f934]/10 border border-[#d4f934]/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#d4f934] mb-3">
              <Star className="h-3.5 w-3.5 fill-[#d4f934] text-[#d4f934]" />
              <span>{isPa ? "ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਰੀਵਿਊ" : "STUDENT SUCCESS REVIEWS"}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-white">
              {isPa ? "ਅਸਲ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਰੀਵਿਊ ਅਤੇ ਕਮਾਈ" : "What Our Students Say (Real Reviews)"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              {isPa
                ? "ਦੇਖੋ ਕਿਵੇਂ ਵਿਦਿਆਰਥੀ AI ਨਾਲ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾ ਕੇ ₹15k–₹50k ਪ੍ਰਤੀ ਪ੍ਰੋਜੈਕਟ ਕਮਾ ਰਹੇ ਹਨ।"
                : "Continuous feedback from freelancers, college students, and agency owners who took the masterclass."}
            </p>
          </div>

          {/* Infinite Smooth Right-to-Left Sliding Marquee Track */}
          <div className="relative w-full overflow-hidden mask-fade-edges py-2">
            {/* Ambient edge gradients for smooth infinite fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

            <div className="animate-marquee-left flex gap-6">
              {/* Render duplicated array for seamless 360 loop */}
              {[...studentChats, ...studentChats].map((st, i) => (
                <div
                  key={i}
                  className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-gray-800 bg-gradient-to-b from-[#141414] to-[#0c0c0c] p-5 sm:p-6 text-left shadow-xl hover:border-[#d4f934]/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Avatar & Tag */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          loading="lazy"
                          decoding="async"
                          width="44"
                          height="44"
                          className="h-11 w-11 rounded-full object-cover border-2 border-[#d4f934]/50 shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                            {st.name}
                            {st.verified && (
                              <span className="text-[9px] text-[#d4f934] font-bold bg-[#d4f934]/15 px-1.5 py-0.5 rounded-full border border-[#d4f934]/30">
                                Verified
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-medium">{st.role}</p>
                        </div>
                      </div>

                      <span className="rounded-full bg-green-950/90 border border-green-500/40 px-2.5 py-0.5 text-[11px] font-black text-green-400">
                        {st.tag}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(st.rating)].map((_, si) => (
                        <Star key={si} className="h-3.5 w-3.5 fill-[#d4f934] text-[#d4f934]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed font-normal">
                      "{st.quote}"
                    </p>
                  </div>

                  {/* Chat-like verified badge */}
                  <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1 text-green-400 font-medium">
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Verified Feedback
                    </span>
                    <span className="text-[#d4f934] font-bold">100% Authentic</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 7. INSTRUCTOR CREDIBILITY --------------------------------- */
export function Instructor() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] border-t border-gray-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={isPa ? "ਸੰਸਥਾਪਕ ਬਾਰੇ" : "WHO'S BEHIND PENDUGPT?"}
          title={isPa ? "PenduGPT ਦੇ ਪਿੱਛੇ ਕੌਣ ਹੈ?" : "Who's Behind PenduGPT?"}
          subtitle={
            isPa
              ? "ਕੋਈ ਕਿਤਾਬੀ ਥਿਊਰੀ ਨਹੀਂ — ਸਿੱਖੋ ਉਸ ਤੋਂ ਜੋ ਖੁਦ AI ਨਾਲ ਅਸਲ ਕਲਾਇੰਟਸ ਲਈ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾ ਰਿਹਾ ਹੈ।"
              : "No endless theory. Learn the exact practical workflow from someone who actually builds and delivers real websites."
          }
        />

        <div className="glass-card rounded-3xl border border-gray-800/80 bg-gradient-to-b from-[#141414] via-[#101010] to-[#0a0a0a] p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Instructor Portrait Photo Card */}
            <div className="relative shrink-0 w-full max-w-[280px] sm:max-w-[300px]">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#d4f934]/30 via-transparent to-[#d4f934]/10 blur-lg opacity-75" />

              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#d4f934]/50 bg-[#121212] shadow-2xl">
                <img
                  src="/instructor-about.jpg"
                  alt="Khushpreet Singh - PenduGPT Founder"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="375"
                  className="w-full aspect-[4/5] object-cover object-[center_12%] transition-transform duration-500 hover:scale-105"
                />

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#d4f934] px-2.5 py-0.5 text-[10px] font-black uppercase text-black mb-1">
                    ★ Founder & Instructor
                  </span>
                  <h4 className="text-base font-black text-white">Khushpreet Singh</h4>
                  <p className="text-[11px] font-semibold text-[#d4f934]">Founder, PenduGPT</p>
                </div>
              </div>
            </div>

            {/* Instructor Bio & Story Details */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="rounded-full bg-[#1b2207] border border-[#d4f934]/40 px-3 py-1 text-xs font-black text-[#d4f934]">
                  💼 Founder & AI Builder
                </span>
                <span className="rounded-full bg-[#181818] border border-gray-700 px-3 py-1 text-xs font-bold text-gray-300">
                  📍 Sangrur, Punjab 🇮🇳
                </span>
                <a
                  href="https://instagram.com/pendugpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#181818] border border-gray-700 hover:border-[#d4f934]/50 px-3 py-1 text-xs font-bold text-[#d4f934] hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>📸 @pendugpt</span>
                </a>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white">
                  Khushpreet Singh
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#d4f934] mt-0.5">
                  {isPa ? "PenduGPT ਦਾ ਸੰਸਥਾਪਕ" : "Founder of PenduGPT"}
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed font-normal">
                {isPa ? (
                  <>
                    <p>
                      "ਮੈਂ ਖੁਸ਼ਪ੍ਰੀਤ ਹਾਂ, <strong className="text-white font-bold">PenduGPT</strong> ਦਾ ਸੰਸਥਾਪਕ।"
                    </p>
                    <p>
                      "ਮੈਂ PenduGPT ਇਸ ਲਈ ਸ਼ੁਰੂ ਕੀਤਾ ਤਾਂ ਜੋ ਉਹਨਾਂ ਲੋਕਾਂ ਲਈ ਪ੍ਰੈਕਟੀਕਲ AI ਸਿੱਖਿਆ ਆਸਾਨ ਬਣਾਈ ਜਾ ਸਕੇ ਜੋ ਕਿਸੇ ਰਵਾਇਤੀ ਟੈਕ ਜਾਂ ਕੋਡਿੰਗ ਬੈਕਗਰਾਊਂਡ ਤੋਂ ਨਹੀਂ ਆਉਂਦੇ।"
                    </p>
                    <p>
                      "ਬੇਲੋੜੀ ਥਿਊਰੀ ਸਿਖਾਉਣ ਦੀ ਬਜਾਏ, ਮੇਰਾ ਪੂਰਾ ਧਿਆਨ ਇਹ ਦਿਖਾਉਣ 'ਤੇ ਹੈ ਕਿ ਅਸਲ ਦੁਨੀਆ ਵਿੱਚ AI ਦੀ ਵਰਤੋਂ ਕਰਕੇ <strong className="text-white font-bold">ਵੈੱਬਸਾਈਟਾਂ ਕਿਵੇਂ ਬਣਾਈਆਂ ਅਤੇ ਕਮਾਈ ਕਿਵੇਂ ਕੀਤੀ ਜਾਵੇ</strong>।"
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      "I'm Khushpreet, founder of <strong className="text-white font-bold">PenduGPT</strong>."
                    </p>
                    <p>
                      "I started PenduGPT to make practical AI education accessible to people who don't come from a traditional tech background."
                    </p>
                    <p>
                      "Instead of teaching AI through endless theory, I focus on showing people how to actually <strong className="text-white font-bold">build, create, and use AI in real-world situations</strong> to build client websites and generate genuine digital income."
                    </p>
                  </>
                )}
              </div>

              {/* Achievements & Credibility Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-800/80">
                <div className="rounded-xl border border-gray-800 bg-[#0d0d0d] p-3 text-center lg:text-left">
                  <div className="text-lg sm:text-xl font-black text-white">1,200+</div>
                  <div className="text-[11px] font-medium text-gray-400">Students Trained</div>
                </div>
                <div className="rounded-xl border border-gray-800 bg-[#0d0d0d] p-3 text-center lg:text-left">
                  <div className="text-lg sm:text-xl font-black text-[#d4f934]">50,000+</div>
                  <div className="text-[11px] font-medium text-gray-400">Social Community</div>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-xl border border-gray-800 bg-[#0d0d0d] p-3 text-center lg:text-left">
                  <div className="text-lg sm:text-xl font-black text-white">4.9 / 5 ⭐</div>
                  <div className="text-[11px] font-medium text-gray-400">Student Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 9. ₹999 MASTER OFFER SECTION --------------------------------- */
export function Offer() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  const checklist = [
    isPa ? "🚫 ਬਿਨਾਂ ਕੋਈ ਪੇਡ AI ਟੂਲ ਖਰੀਦੇ ਅਸੀਮਤ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣ ਦਾ ਤਰੀਕਾ" : "Zero Paid AI Tool Expenses (Build 100% Free by Yourself)",
    isPa ? "ਸਾਰੀਆਂ 7 ਪ੍ਰੈਕਟੀਕਲ ਕਲਾਸਾਂ (HD ਰਿਕਾਰਡਿੰਗਜ਼)" : "Complete 7 Practical HD Video Classes",
    isPa ? "100% ਗੂਗਲ ਡਰਾਈਵ ਕੋਰਸ ਫੋਲਡਰ ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ" : "Full Google Drive Course Folder (Lifetime Access)",
    isPa ? "100+ AI ਵੈੱਬਸਾਈਟ ਪ੍ਰੌਂਪਟਸ ਤੇ ਲੇਆਉਟ ਟੈਂਪਲੇਟਸ" : "100+ Tested AI Website Prompts & Templates",
    isPa ? "ਸਾਰੇ ਸੋਰਸ ਕੋਡ, ਰਿਪੋਜ਼ਟਰੀਆਂ ਅਤੇ ਸਟਾਰਟਰ ਫਾਈਲਾਂ" : "All Source Code, Starter Kits & Asset Packs",
    isPa ? "ਕਸਟਮ ਡੋਮੇਨ (.com/.in) ਅਤੇ ਕਲਾਊਡ ਹੋਸਟਿੰਗ ਸੈੱਟਅੱਪ" : "Custom Domain & 1-Click Cloud Hosting Guide",
    isPa ? "ਕਲਾਇੰਟ ਆਊਟਰੀਚ ਸਕ੍ਰਿਪਟਸ ਤੇ ਹੈਂਡਓਵਰ ਕਿੱਟ" : "Client Acquisition Scripts & Handover Templates",
    isPa ? "WhatsApp VIP ਸਪੋਰਟ ਅਤੇ ਕਮਿਊਨਿਟੀ ਐਕਸੈਸ" : "WhatsApp VIP Community & Student Support",
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#080808]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Main High-Converting Pricing Card */}
        <div className="relative rounded-3xl border-2 border-[#d4f934]/70 bg-gradient-to-b from-[#18200d] via-[#101012] to-[#0a0a0a] p-6 sm:p-12 text-center shadow-[0_0_80px_rgba(212,249,52,0.25)] overflow-hidden">
          {/* Top Launch Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d4f934] px-4 py-1 text-xs font-black text-black uppercase tracking-wider mb-6 shadow-md">
            <Flame className="h-4 w-4 fill-black" />
            <span>{isPa ? "ਸਪੈਸ਼ਲ ਲਾਂਚ ਆਫਰ • 80% ਛੋਟ" : "SPECIAL LAUNCH OFFER • 80% OFF"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            {isPa ? "ਸੰਪੂਰਨ AI ਮਾਸਟਰਕਲਾਸ — ₹999" : "Complete AI Masterclass — ₹999"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-300 font-medium">
            {isPa
              ? "ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ • ਬਿਨਾਂ ਕੋਈ ਪੇਡ ਟੂਲ ਖਰੀਦੇ ਖੁਦ ਬਣਾਓ • ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ"
              : "One-time payment • Build 100% by yourself • Zero paid software subscriptions"}
          </p>

          {/* Pricing Numbers Hero */}
          <div className="my-8 rounded-2xl border border-gray-800 bg-[#0d0d0d]/90 p-6 max-w-md mx-auto">
            <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">
              {isPa ? "ਕੁੱਲ ਕੀਮਤ" : "TOTAL BUNDLE VALUE"}
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="line-through decoration-red-600 decoration-4 text-gray-500 font-extrabold text-2xl sm:text-3xl">
                ₹4,999
              </span>
              <span className="text-4xl sm:text-6xl font-black text-[#d4f934] font-display">
                ₹999
              </span>
            </div>
            <span className="inline-block mt-2 rounded-full bg-green-950 border border-green-500/40 px-3 py-0.5 text-[11px] font-bold text-green-400">
              {isPa ? "ਤੁਸੀਂ ₹4,000 ਦੀ ਬਚਤ ਕਰ ਰਹੇ ਹੋ (80% ਛੋਟ)" : "You Save ₹4,000 Today (80% Discount)"}
            </span>
          </div>

          {/* Feature Checklist */}
          <div className="max-w-xl mx-auto text-left space-y-3 mb-8">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4f934]/20 text-[#d4f934] mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={openModal}
            className="lime-button w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-3 rounded-full py-4 px-8 text-base sm:text-lg font-black text-black shadow-[0_0_40px_rgba(212,249,52,0.6)] cursor-pointer"
          >
            <span>{isPa ? "ਹੁਣੇ ਐਕਸੈਸ ਲਵੋ (₹999)" : "Start Learning Now — ₹999"}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="mt-4 text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#d4f934]" />
            <span>
              {isPa
                ? "Razorpay ਦੁਆਰਾ 100% ਸੁਰੱਖਿਅਤ ਪੇਮੈਂਟ • ਤੁਰੰਤ WhatsApp ਤੇ Drive ਲਿੰਕ"
                : "100% Secure Razorpay Checkout • Instant Access via WhatsApp & Google Drive"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 10. FREQUENTLY ASKED QUESTIONS --------------------------------- */
export function Faq() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: isPa ? "ਕੀ ਮੈਨੂੰ ਬਾਅਦ 'ਚ ਕੋਈ ਪੇਡ AI ਟੂਲ ਜਾਂ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਖਰੀਦਣੀ ਪਵੇਗੀ?" : "Do I need to buy any paid AI tools or software after this class?",
      a: isPa
        ? "ਬਿਲਕੁਲ ਨਹੀਂ! ਇਸ ਮਾਸਟਰਕਲਾਸ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਖਾਸੀਅਤ ਇਹ ਹੈ ਕਿ ਤੁਸੀਂ ਬਿਨਾਂ ਕੋਈ ਪੇਡ AI ਟੂਲ ਜਾਂ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ($20-$50/ਮਹੀਨਾ) ਖਰੀਦੇ, ਖੁਦ ਆਪਣੇ ਦਮ 'ਤੇ ਅਸੀਮਤ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾ ਸਕੋਗੇ। ਅਸੀਂ 100% ਮੁਫ਼ਤ ਅਤੇ ਪ੍ਰੋ ਤਰੀਕੇ ਸਿਖਾਉਂਦੇ ਹਾਂ ਤਾਂ ਜੋ ਤੁਹਾਡਾ ₹1 ਵੀ ਵਾਧੂ ਖਰਚ ਨਾ ਹੋਵੇ।"
        : "Not at all! After this masterclass, you will build unlimited websites completely by yourself without buying any paid AI tools or recurring software subscriptions ($20-$50/month). We teach you 100% free and open developer workflows so you never spend extra money.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਨੂੰ ਕੋਡਿੰਗ ਆਉਣੀ ਜ਼ਰੂਰੀ ਹੈ?" : "Do I need prior coding experience?",
      a: isPa
        ? "ਬਿਲਕੁਲ ਨਹੀਂ! ਇਹ ਮਾਸਟਰਕਲਾਸ 100% ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ ਤਿਆਰ ਕੀਤੀ ਗਈ ਹੈ। ਅਸੀਂ ਆਧੁਨਿਕ AI ਪ੍ਰੌਂਪਟਸ ਅਤੇ ਵਿਜ਼ੂਅਲ ਟੂਲਸ ਨਾਲ ਕੰਮ ਕਰਨਾ ਸਿਖਾਉਂਦੇ ਹਾਂ ਜਿਸ ਵਿੱਚ ਕੋਈ ਮੁਸ਼ਕਲ ਕੋਡਿੰਗ ਨਹੀਂ ਲੱਗਦੀ।"
        : "Not at all! This masterclass is designed from scratch for absolute beginners. We teach visual AI building and pro code customization without requiring traditional complex coding syntax.",
    },
    {
      q: isPa ? "ਭੁਗਤਾਨ ਤੋਂ ਬਾਅਦ ਮੈਨੂੰ ਕਲਾਸਾਂ ਕਿਵੇਂ ਮਿਲਣਗੀਆਂ?" : "How and when will I receive course access after paying ₹999?",
      a: isPa
        ? "₹999 ਦੀ ਪੇਮੈਂਟ ਪੂਰੀ ਹੁੰਦੇ ਹੀ ਤੁਹਾਡੇ WhatsApp ਅਤੇ ਸਕ੍ਰੀਨ 'ਤੇ ਗੂਗਲ ਡਰਾਈਵ ਕੋਰਸ ਫੋਲਡਰ ਦਾ ਡਾਇਰੈਕਟ ਲਿੰਕ ਖੁੱਲ੍ਹ ਜਾਵੇਗਾ। ਤੁਸੀਂ ਤੁਰੰਤ ਸਾਰੀਆਂ ਕਲਾਸਾਂ ਦੇਖ ਸਕਦੇ ਹੋ।"
        : "Immediately after completing your ₹999 payment, you will receive instant access to the Google Drive course folder containing all recordings, source files, and prompts, plus an automatic WhatsApp invite.",
    },
    {
      q: isPa ? "ਕੀ ਇਹ ਲਾਈਵ ਕਲਾਸਾਂ ਹਨ ਜਾਂ ਰਿਕਾਰਡਡ?" : "Are the classes live or recorded?",
      a: isPa
        ? "ਇਹ ਸੰਪੂਰਨ 4K HD ਰਿਕਾਰਡਡ ਕਲਾਸਾਂ ਹਨ ਤਾਂ ਜੋ ਤੁਸੀਂ ਆਪਣੀ ਸਹੂਲਤ ਅਨੁਸਾਰ ਕਦੇ ਵੀ ਦੇਖ ਸਕੋ ਅਤੇ ਜਿੰਨੀ ਵਾਰ ਮਰਜ਼ੀ ਰਿਵਾਈਂਡ ਕਰਕੇ ਪ੍ਰੈਕਟਿਸ ਕਰ ਸਕੋ।"
        : "These are comprehensive, high-definition recorded lessons so you can learn at your own pace, rewind anytime, and practice hands-on whenever convenient.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਨੂੰ ਲੈਪਟਾਪ ਦੀ ਲੋੜ ਹੈ?" : "Do I need a laptop or PC?",
      a: isPa
        ? "ਹਾਂਜੀ, ਵੈੱਬਸਾਈਟ ਬਣਾਉਣ ਅਤੇ ਪ੍ਰੈਕਟਿਸ ਕਰਨ ਲਈ ਇੱਕ ਲੈਪਟਾਪ ਜਾਂ ਕੰਪਿਊਟਰ ਸਭ ਤੋਂ ਵਧੀਆ ਰਹੇਗਾ। ਤੁਸੀਂ ਕਲਾਸਾਂ ਮੋਬਾਈਲ 'ਤੇ ਵੀ ਦੇਖ ਸਕਦੇ ਹੋ ਪਰ ਬਿਲਡ ਕਰਨ ਲਈ ਲੈਪਟਾਪ ਜ਼ਰੂਰੀ ਹੈ।"
        : "A laptop or desktop computer is recommended for hands-on website building and customization. You can watch the lessons on any device, including your smartphone.",
    },
    {
      q: isPa ? "ਕੀ ਇਹ ਵਨ-ਟਾਈਮ ਫੀਸ ਹੈ ਜਾਂ ਮਹੀਨਾਵਾਰ?" : "Is it really a one-time payment of ₹999?",
      a: isPa
        ? "ਹਾਂਜੀ, ਸਿਰਫ ₹999 ਦਾ ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ ਹੈ। ਕੋਈ ਮਾਸਿਕ ਫੀਸ ਜਾਂ ਲੁਕਵਾਂ ਖਰਚਾ ਨਹੀਂ ਹੈ। ਤੁਹਾਨੂੰ ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ ਮਿਲੇਗਾ।"
        : "Yes, exactly ₹999 one-time. No hidden subscriptions, no recurring renewal charges. You get lifetime access to all current and future updates.",
    },
    {
      q: isPa ? "ਜੇਕਰ ਮੈਨੂੰ ਕੋਈ ਸਵਾਲ ਜਾਂ ਮੁਸ਼ਕਲ ਆਵੇ ਤਾਂ ਸਪੋਰਟ ਮਿਲੇਗੀ?" : "What if I get stuck while building?",
      a: isPa
        ? "ਬਿਲਕੁਲ! ਤੁਹਾਨੂੰ ਸਾਡਾ ਡਾਇਰੈਕਟ WhatsApp ਸਪੋਰਟ ਮਿਲੇਗਾ ਜਿੱਥੇ ਤੁਸੀਂ ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।"
        : "You get access to our VIP student WhatsApp support group to ask technical questions and get unstuck quickly.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0a0a0a] border-t border-gray-800/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={isPa ? "ਸਵਾਲ-ਜਵਾਬ" : "FAQ"}
          title={isPa ? "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ" : "Frequently Asked Questions"}
          subtitle={
            isPa
              ? "ਤੁਹਾਡੇ ਸਾਰੇ ਸਵਾਲਾਂ ਦੇ ਸਾਫ਼ ਅਤੇ ਸਪੱਸ਼ਟ ਜਵਾਬ।"
              : "Clear, straightforward answers to everything you might wonder about the masterclass."
          }
        />

        <div className="mt-8 flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={faq.q}
                className={cn(
                  "glass-card rounded-2xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-[#d4f934]/60 bg-[#121212] shadow-[0_0_25px_rgba(212,249,52,0.12)]"
                    : "border-gray-800 hover:border-gray-700 bg-[#101010]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-extrabold text-sm sm:text-base text-white hover:text-[#d4f934] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#d4f934] shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4f934]/10 text-[#d4f934] font-black text-sm ml-2">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/80 pt-4 bg-[#0d0d0d]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 10.5. TWO PATHS / FORK IN THE ROAD COMPARISON --------------------------------- */
export function TwoPathsComparison() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  const badPath = {
    badge: isPa ? "ਰਸਤਾ 1: ਕੁਝ ਨਾ ਕਰਨਾ" : "PATH A: KEEP PROCRASTINATING",
    tagline: isPa ? "ਰੀਲਾਂ 'ਤੇ ਸਮਾਂ ਗਵਾਉਣਾ ਤੇ ਉੱਥੇ ਹੀ ਖੜ੍ਹੇ ਰਹਿਣਾ" : "Waste Time on Reels & Stay Stuck in the Same Place",
    subtitle: isPa
      ? "AI ਦੀਆਂ ਵੀਡੀਓਜ਼ ਦੇਖ ਕੇ ਖੁਸ਼ ਹੁੰਦੇ ਰਹੋ, ਪਰ ਖੁਦ ਇੱਕ ਵੀ ਵੈੱਬਸਾਈਟ ਨਾ ਬਣਾ ਪਾਓ।"
      : "Keep watching other people build empires with AI while you scroll away 3+ hours every single day.",
    points: [
      isPa
        ? "ਰੋਜ਼ਾਨਾ 2–4 ਘੰਟੇ ਇੰਸਟਾਗ੍ਰਾਮ ਰੀਲਾਂ ਤੇ ਯੂਟਿਊਬ ਸ਼ਾਰਟਸ 'ਤੇ ਬਰਬਾਦ ਕਰਨਾ"
        : "Waste 2–4 hours every day doom-scrolling reels with zero skills gained",
      isPa
        ? "ਸੋਚਦੇ ਰਹਿਣਾ ਕਿ ਦੂਜੇ ਲੋਕ AI ਨਾਲ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾ ਕੇ ₹30,000 ਕਿਵੇਂ ਕਮਾ ਰਹੇ ਹਨ"
        : "Keep wondering how others charge ₹30k+ for websites while you stay stuck",
      isPa
        ? "ਯੂਟਿਊਬ ਦੀਆਂ ਅੱਧੀਆਂ-ਅਧੂਰੀਆਂ ਟਿਊਟੋਰੀਅਲਜ਼ 'ਚ ਫਸ ਕੇ ਸਮਾਂ ਗਵਾਉਣਾ"
        : "Get lost in fragmented YouTube tutorials that never teach real client workflows",
      isPa
        ? "ਮਹਿੰਗੇ AI ਟੂਲਸ 'ਤੇ $20–$50/ਮਹੀਨਾ ਫਾਲਤੂ ਖਰਚਣਾ ਬਿਨਾਂ ਕੋਈ ਆਮਦਨ ਬਣਾਏ"
        : "Pay $20–$50/mo for unnecessary AI subscriptions that drain your wallet",
      isPa
        ? "ਬਿਨਾਂ ਕਿਸੇ ਪੋਰਟਫੋਲੀਓ ਜਾਂ ਆਮਦਨ ਦੇ ਅਗਲੇ 6 ਮਹੀਨਿਆਂ ਤੱਕ ਉਸੇ ਥਾਂ ਖੜ੍ਹੇ ਰਹਿਣਾ"
        : "Stay in the exact same spot 6 months from now with zero digital assets",
    ],
    result: isPa ? "30 ਦਿਨਾਂ ਬਾਅਦ: ਕੋਈ ਸਕਿੱਲ ਨਹੀਂ, ਬਰਬਾਦ ਹੋਇਆ ਸਮਾਂ ਤੇ ਪਛਤਾਵਾ।" : "30 Days Later: Zero skills gained, hours wasted & regret.",
  };

  const goodPath = {
    badge: isPa ? "ਰਸਤਾ 2: ਅੱਜ ਹੀ ਐਕਸ਼ਨ ਲਓ (ਬੈਸਟ ਫੈਸਲਾ)" : "PATH B: TAKE ACTION NOW (RECOMMENDED)",
    tagline: isPa ? "ਖੁਦ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਓ ਤੇ ਕਲਾਇੰਟਸ ਤੋਂ ਕਮਾਈ ਕਰੋ" : "Master AI Web Building & Launch Client Websites",
    subtitle: isPa
      ? "ਬਿਨਾਂ ਕੋਈ ਪੇਡ AI ਟੂਲ ਖਰੀਦੇ 45 ਮਿੰਟ 'ਚ ਵੈੱਬਸਾਈਟ ਬਣਾਓ ਤੇ ₹15k–₹50k ਚਾਰਜ ਕਰੋ।"
      : "Build live production websites in 45 mins with $0 tool cost and start signing high-paying clients.",
    points: [
      isPa
        ? "ਸਿਰਫ 45 ਮਿੰਟਾਂ ਵਿੱਚ ਆਪਣੀ ਪਹਿਲੀ ਲਾਈਵ ਰਿਸਪਾਂਸਿਵ ਵੈੱਬਸਾਈਟ ਤਿਆਰ ਕਰੋ"
        : "Build and deploy your first responsive landing page in just 45 minutes",
      isPa
        ? "100% ਮੁਫਤ AI ਵਰਕਫਲੋਅ — $0 ਮਹੀਨਾਵਾਰ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਖਰਚ ਹਮੇਸ਼ਾ ਲਈ"
        : "100% free AI workflow — $0 monthly tool subscriptions forever",
      isPa
        ? "100% ਸੋਰਸ ਕੋਡ GitHub 'ਤੇ ਆਪਣੇ ਕੰਪਿਊਟਰ 'ਚ ਸੇਵ ਰੱਖੋ (ਕੋਈ ਪਲੇਟਫਾਰਮ ਲੌਕ ਨਹੀਂ)"
        : "Export 100% full source code to GitHub and own your digital assets completely",
      isPa
        ? "ਆਪਣਾ ਕਸਟਮ .com/.in ਡੋਮੇਨ ਲਗਾਓ ਅਤੇ 1 ਕਲਿੱਕ ਵਿੱਚ ਲਾਈਵ ਕਰੋ"
        : "Connect custom domains (.com/.in) and launch live globally with SSL",
      isPa
        ? "5 ਰੈਡੀ ਕੋਲਡ DM ਸਕ੍ਰਿਪਟਾਂ ਨਾਲ ₹15,000–₹50,000 ਦੇ ਕਲਾਇੰਟ ਕਲੋਜ਼ ਕਰੋ"
        : "Use 5 proven outreach scripts to close ₹15,000–₹50,000 freelance clients",
    ],
    result: isPa ? "30 ਦਿਨਾਂ ਬਾਅਦ: ਲਾਈਵ ਵੈੱਬਸਾਈਟ ਪੋਰਟਫੋਲੀਓ, ਕਲਾਇੰਟਸ ਅਤੇ ਆਮਦਨ।" : "30 Days Later: Live website portfolio, high-paying clients & real income.",
  };

  return (
    <section className="py-20 sm:py-28 bg-[#060709] border-t border-gray-800/80 relative overflow-hidden">
      {/* Background ambient split glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-between">
        <div className="h-96 w-96 rounded-full bg-red-950/20 blur-[140px] -left-20" />
        <div className="h-96 w-96 rounded-full bg-[#d4f934]/10 blur-[140px] -right-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          tag={isPa ? "ਫੈਸਲਾ ਤੁਹਾਡਾ ਹੈ" : "THE 24-HOUR CHOICE"}
          title={
            isPa
              ? "ਰੀਲਾਂ 'ਤੇ ਸਮਾਂ ਬਰਬਾਦ ਕਰਦੇ ਰਹੋ ਜਾਂ ਅੱਜ ਹੀ ਐਕਸ਼ਨ ਲਓ?"
              : "Waste Time on Reels Again OR Take Action Now?"
          }
          subtitle={
            isPa
              ? "ਅਗਲੇ 30 ਦਿਨਾਂ ਵਿੱਚ ਤੁਸੀਂ ਜਾਂ ਤਾਂ ਉੱਥੇ ਹੀ ਖੜ੍ਹੇ ਹੋਵੋਗੇ ਜਿੱਥੇ ਅੱਜ ਹੋ, ਜਾਂ ਫਿਰ ਤੁਹਾਡੇ ਕੋਲ ਆਪਣੇ ਲਾਈਵ ਵੈੱਬਸਾਈਟ ਪ੍ਰੋਜੈਕਟਸ ਤੇ ਕਲਾਇੰਟਸ ਹੋਣਗੇ।"
              : "In 30 days, you will either be in the exact same place watching others win — or you'll have live client websites and an in-demand high-income skill."
          }
        />

        {/* 2 Contrasting Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-stretch">
          {/* 🔴 Path A: Keep Wasting Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-red-900/40 bg-gradient-to-b from-[#140a0a] via-[#0f0707] to-[#0a0505] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(239,68,68,0.08)] relative"
          >
            <div>
              {/* Card Header Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-400 mb-4">
                <XCircle className="h-3.5 w-3.5" />
                <span>{badPath.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-200 leading-snug">
                {badPath.tagline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                {badPath.subtitle}
              </p>

              {/* Negative Points List */}
              <ul className="mt-6 space-y-3.5">
                {badPath.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-950/80 border border-red-500/40 text-red-400 mt-0.5 text-xs font-black">
                      ✕
                    </span>
                    <span className="leading-tight text-gray-300">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Outcome Bar */}
            <div className="mt-8 rounded-2xl bg-red-950/30 border border-red-900/40 p-4 flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-red-400 shrink-0" />
              <span className="text-xs sm:text-[13px] font-bold text-red-300 leading-tight">
                {badPath.result}
              </span>
            </div>
          </motion.div>

          {/* 🟢 Path B: Take Action Today */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border-2 border-[#d4f934] bg-gradient-to-b from-[#141a0d] via-[#0f130a] to-[#080b06] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(212,249,52,0.2)] relative transform-gpu hover:scale-[1.01] transition-all"
          >
            {/* Top Glowing Tag */}
            <div className="absolute -top-3.5 right-6 rounded-full bg-[#d4f934] text-black px-3.5 py-1 text-[11px] font-black uppercase tracking-wider shadow-md">
              ⚡ 100% RECOMMENDED
            </div>

            <div>
              {/* Card Header Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#d4f934]/20 border border-[#d4f934]/40 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#d4f934] mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{goodPath.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {goodPath.tagline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {goodPath.subtitle}
              </p>

              {/* Positive Points List */}
              <ul className="mt-6 space-y-3.5">
                {goodPath.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4f934]/20 border border-[#d4f934]/60 text-[#d4f934] mt-0.5 text-xs font-black">
                      ✓
                    </span>
                    <span className="leading-tight font-medium text-gray-100">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              {/* Bottom Outcome Bar */}
              <div className="rounded-2xl bg-[#1b2207] border border-[#d4f934]/40 p-4 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-[#d4f934] shrink-0" />
                <span className="text-xs sm:text-[13px] font-bold text-[#d4f934] leading-tight">
                  {goodPath.result}
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={openModal}
                className="lime-button w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-black text-black shadow-[0_0_30px_rgba(212,249,52,0.5)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isPa ? "ਰਸਤਾ 2 ਚੁਣੋ — ਸਿਰਫ ₹999 ਵਿੱਚ ਸ਼ੁਰੂ ਕਰੋ" : "Choose Path B — Get Full Access for ₹999"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- 11. FINAL POWER CTA SECTION --------------------------------- */
export function Showcase() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#080808] via-[#12170a] to-[#080808] border-t border-gray-800/80 text-center overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-[#d4f934]/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#d4f934]/10 border border-[#d4f934]/30 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#d4f934] mb-6">
          <Sparkles className="h-4 w-4" />
          <span>{isPa ? "ਹੁਣ ਫੈਸਲਾ ਤੁਹਾਡਾ ਹੈ" : "THE CHOICE IS YOURS"}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
          {isPa ? (
            <>
              ਸਿਰਫ AI ਦੀਆਂ ਵੀਡੀਓਜ਼ ਦੇਖਣਾ ਬੰਦ ਕਰੋ। <br />
              <span className="text-[#d4f934]">ਹੁਣ ਖੁਦ ਬਣਾਉਣਾ ਸ਼ੁਰੂ ਕਰੋ।</span>
            </>
          ) : (
            <>
              Stop just watching people use AI. <br />
              <span className="text-[#d4f934]">Start building with it.</span>
            </>
          )}
        </h2>

        <p className="mt-6 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {isPa
            ? "7 ਕਲਾਸਾਂ, ਪੂਰਾ ਗੂਗਲ ਡਰਾਈਵ ਫੋਲਡਰ, 100+ ਪ੍ਰੌਂਪਟਸ ਅਤੇ ਪੋਰਟਫੋਲੀਓ ਪ੍ਰੋਜੈਕਟਸ ਸਿਰਫ ₹999 ਵਿੱਚ ਪ੍ਰਾਪਤ ਕਰੋ।"
            : "Join hundreds of students and freelancers building client websites in 7 days. Instant lifetime access."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={openModal}
            className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full py-4 px-9 text-base sm:text-lg font-black text-black shadow-[0_0_50px_rgba(212,249,52,0.6)] cursor-pointer"
          >
            <span>{isPa ? "₹999 → ਪੂਰਾ ਐਕਸੈਸ ਲਵੋ" : "₹999 → Get Full Masterclass Access"}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#d4f934]" /> 100% Risk-Free Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-[#d4f934]" /> Instant WhatsApp Access
          </span>
        </div>
      </div>
    </section>
  );
}

/* Stubs for backward compatibility */
export function LimitedSpots() {
  return null;
}
export function WhySkill() {
  return null;
}
export function Roadmap() {
  return null;
}
export function TrustBar() {
  return null;
}
