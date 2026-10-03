import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useEnrollmentModal } from "@/components/landing/EnrollmentModal";

export function Navbar() {
  const { lang, setLang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ mins: 14, secs: 55 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { mins: prev.mins - 1, secs: 59 };
        }
        return { mins: 14, secs: 55 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const formattedMins = String(timeLeft.mins).padStart(2, "0");
  const formattedSecs = String(timeLeft.secs).padStart(2, "0");

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* High-Converting Electric Top Announcement Bar with Instant Access Timer */}
      <div 
        onClick={openModal}
        className="w-full max-w-full overflow-hidden bg-[#d4f934] text-black py-1 sm:py-1.5 px-2 sm:px-3 text-center text-[10px] sm:text-xs font-black tracking-tight border-b border-black/10 shadow-md flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer hover:bg-[#c6ec22] transition-colors select-none"
      >
        <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white shrink-0 animate-pulse">
          🔴 {lang === "pa" ? "ਸਪੈਸ਼ਲ ਆਫਰ" : "SPECIAL OFFER"}
        </span>
        <span className="font-extrabold truncate text-[11px] sm:text-xs">
          {lang === "pa" ? (
            <>
              <span className="sm:hidden">ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ — <span className="line-through text-black/70">₹20,000</span> <strong>ਫਲੈਟ ₹2,499</strong></span>
              <span className="hidden sm:inline">ਨਿਯਮਿਤ ਮੁੱਲ ₹20,000 • <strong>ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ ਰਿਕਾਰਡਡ ਐਕਸੈਸ:</strong> <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹20,000</span> <span className="font-black text-black">₹2,499 (88% ਛੋਟ)</span></span>
            </>
          ) : (
            <>
              <span className="sm:hidden">Complete Masterclass — <span className="line-through text-black/70">₹20,000</span> <strong>Flat ₹2,499</strong></span>
              <span className="hidden sm:inline">Regular Price ₹20,000 • <strong>Complete Masterclass (All Recorded Sessions):</strong> <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹20,000</span> <span className="font-black text-black">₹2,499 ONLY (88% OFF)</span></span>
            </>
          )}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-black/10 border border-black/20 px-2 py-0.5 text-[10px] font-black text-black ml-1 shrink-0">
          ⏱️ {lang === "pa" ? "ਆਫਰ ਖ਼ਤਮ:" : "Ends In:"} {formattedMins}m {formattedSecs}s
        </span>
      </div>

      {/* Main Navbar Header Row */}
      <nav
        className={cn(
          "w-full transition-all duration-300 transform-gpu",
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#d4f934]/20 py-2 sm:py-2.5 shadow-xl"
            : "bg-gradient-to-b from-[#080808]/95 to-transparent py-2.5 sm:py-3"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Logo className="h-7 w-7 sm:h-9 sm:w-9" />
            <Wordmark />
          </Link>

          {/* Desktop Nav Anchor Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-300">
            <a href="#curriculum" className="hover:text-[#d4f934] transition-colors">
              {lang === "pa" ? "ਸਿਲੇਬਸ" : "Classes"}
            </a>
            <a href="#included" className="hover:text-[#d4f934] transition-colors">
              {lang === "pa" ? "ਕੀ ਸ਼ਾਮਲ ਹੈ" : "What's Included"}
            </a>
            <a href="#proof" className="hover:text-[#d4f934] transition-colors">
              {lang === "pa" ? "ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਤੀਜੇ" : "Student Proof"}
            </a>
            <a href="#pricing" className="hover:text-[#d4f934] transition-colors">
              {lang === "pa" ? "ਦਾਖਲਾ ਫੀਸ" : "Pricing"}
            </a>
            <a href="#faq" className="hover:text-[#d4f934] transition-colors">
              {lang === "pa" ? "ਸਵਾਲ-ਜਵਾਬ" : "FAQs"}
            </a>
          </div>

          {/* Right Actions: Language Toggle Switch (always visible on right) + Desktop CTA Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Segmented Language Toggle Switch */}
            <div className="flex items-center rounded-full border border-gray-800 bg-[#121212] p-0.5 sm:p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setLang("pa")}
                className={cn(
                  "px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-black rounded-full transition-all duration-300 cursor-pointer",
                  lang === "pa"
                    ? "bg-[#d4f934] text-black shadow-[0_0_15px_rgba(212,249,52,0.5)] scale-105"
                    : "text-gray-400 hover:text-white"
                )}
              >
                ਪੰਜਾਬੀ
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-black rounded-full transition-all duration-300 cursor-pointer",
                  lang === "en"
                    ? "bg-[#d4f934] text-black shadow-[0_0_15px_rgba(212,249,52,0.5)] scale-105"
                    : "text-gray-400 hover:text-white"
                )}
              >
                English
              </button>
            </div>

            {/* High-Impact CTA Button (Desktop Only) */}
            <button
              type="button"
              onClick={openModal}
              className="hidden md:flex lime-button items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-extrabold text-black shadow-[0_0_20px_rgba(212,249,52,0.4)] cursor-pointer"
            >
              <span>
                {lang === "pa" ? (
                  <>
                    ਦਾਖਲਾ ਲਵੋ — <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹20,000</span> <span className="font-black text-black">₹2,499</span>
                  </>
                ) : (
                  <>
                    Get Instant Access — <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹20,000</span> <span className="font-black text-black">₹2,499</span>
                  </>
                )}
              </span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

