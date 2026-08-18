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
      {/* High-Converting Electric Top Announcement Bar with Live Sales Timer */}
      <div 
        onClick={openModal}
        className="w-full bg-[#d4f934] text-black py-1.5 px-3 text-center text-[11px] sm:text-xs font-black tracking-tight border-b border-black/10 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-[#c6ec22] transition-colors select-none"
      >
        <span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#d4f934]">
          🔥 {lang === "pa" ? "ਡੈਮੋ ਆਫਰ" : "DEMO SALE"}
        </span>
        <span className="font-extrabold truncate">
          {lang === "pa" ? (
            <>
              31 ਮਿੰਟ 55 ਸੈਕਿੰਡ ਡੈਮੋ ਕਲਾਸ — <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹1,000</span> <span className="font-black text-black">₹99</span>
            </>
          ) : (
            <>
              31m 55s AI Demo Class — <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹1,000</span> <span className="font-black text-black">₹99</span>
            </>
          )}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-black/10 border border-black/20 px-2 py-0.5 text-[10px] font-black text-black ml-1">
          ⏱️ {lang === "pa" ? "ਆਫਰ ਖ਼ਤਮ:" : "Ends In:"} {formattedMins}m {formattedSecs}s
        </span>
      </div>

      {/* Main Navbar Header Row */}
      <nav
        className={cn(
          "w-full transition-all duration-300 transform-gpu",
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#d4f934]/20 py-2.5 shadow-xl"
            : "bg-gradient-to-b from-[#080808]/90 to-transparent py-3"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <Wordmark />
          </Link>

          {/* Right Actions: Segmented Language Toggle Switch + Direct CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Segmented Language Toggle Switch */}
            <div className="flex items-center rounded-full border border-gray-800 bg-[#121212] p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setLang("pa")}
                className={cn(
                  "px-3 py-1 text-xs font-black rounded-full transition-all duration-300 cursor-pointer",
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
                  "px-3 py-1 text-xs font-black rounded-full transition-all duration-300 cursor-pointer",
                  lang === "en"
                    ? "bg-[#d4f934] text-black shadow-[0_0_15px_rgba(212,249,52,0.5)] scale-105"
                    : "text-gray-400 hover:text-white"
                )}
              >
                English
              </button>
            </div>

            {/* High-Impact Direct CTA Button with Price Strikethrough ₹1,000 -> ₹99 */}
            <button
              type="button"
              onClick={openModal}
              className="lime-button hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold text-black shadow-[0_0_20px_rgba(212,249,52,0.4)] cursor-pointer"
            >
              <span>
                {lang === "pa" ? (
                  <>
                    ਬੁੱਕ ਕਰੋ — <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹1,000</span> <span className="font-black text-black">₹99</span>
                  </>
                ) : (
                  <>
                    Book Your Seat — <span className="line-through decoration-red-600 decoration-2 text-black/80 font-bold">₹1,000</span> <span className="font-black text-black">₹99</span>
                  </>
                )}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

