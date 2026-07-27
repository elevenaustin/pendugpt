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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Main Navbar Header Row */}
      <nav
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#d4f934]/20 py-3 shadow-xl"
            : "bg-gradient-to-b from-[#080808]/90 to-transparent py-4"
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

            {/* High-Impact Direct CTA Button */}
            <button
              type="button"
              onClick={openModal}
              className="lime-button hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold text-black shadow-[0_0_20px_rgba(212,249,52,0.4)] cursor-pointer"
            >
              <span>{lang === "pa" ? "ਸੀਟ ਬੁੱਕ ਕਰੋ — ₹99" : "Book Seat — ₹99"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
