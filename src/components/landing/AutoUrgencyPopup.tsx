import { useState, useEffect } from "react";
import { X, Clock, ArrowRight, ShieldCheck, Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface AutoUrgencyPopupProps {
  onClaim: () => void;
}

export function AutoUrgencyPopup({ onClaim }: AutoUrgencyPopupProps) {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const [isOpen, setIsOpen] = useState(false);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(55);

  const strings = {
    badge: isPa ? "🔴 ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ • ₹19,003 ਦੀ ਬਚਤ" : "🔴 COMPLETE MASTERCLASS • SAVE ₹19,003 (95% OFF)",
    headlineA: isPa ? "ਨਿਯਮਿਤ ਮੁੱਲ ₹20,000!" : "Regular Price ₹20,000!",
    headlineB: isPa ? "ਸਪੈਸ਼ਲ ਫਲੈਟ ₹997 ਆਫਰ" : "Special Flat ₹997 Price",
    headlineC: isPa ? "(95% ਛੋਟ)" : "(95% OFF)",
    description: isPa
      ? "ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ (ਸਾਰੀਆਂ ਰਿਕਾਰਡਡ ਕਲਾਸਾਂ) + ਸਾਰੇ ਟੂਲਜ਼ ਤੇ Google Drive ਰਿਸੋਰਸਿਜ਼ ਫਲੈਟ ₹997 ਵਿੱਚ ਤੁਰੰਤ ਪ੍ਰਾਪਤ ਕਰੋ!"
      : "Unlock instant access to the Complete Masterclass (all recorded sessions) + Google Drive resource vault for just flat ₹997!",
    timerLabel: isPa ? "ਸਪੈਸ਼ਲ ਆਫਰ ਖ਼ਤਮ ਹੋਣ ਵਿੱਚ:" : "SPECIAL OFFER EXPIRES IN",
    originalPrice: "₹20,000",
    offerPrice: isPa ? "ਸਿਰਫ਼ ₹997" : "₹997 ONLY",
    claimBtn: isPa ? "ਫਲੈਟ ₹997 ਨਾਲ ਤੁਰੰਤ ਐਕਸੈਸ ਲਵੋ →" : "Get Instant Access for Flat ₹997 →",
    guarantee: isPa ? "100% ਰਿਸਕ-ਫ੍ਰੀ ਸੰਤੁਸ਼ਟੀ ਗਾਰੰਟੀ • ਸਾਰੀਆਂ ਰਿਕਾਰਡਡ ਕਲਾਸਾਂ ਸ਼ਾਮਲ" : "100% Risk-Free Satisfaction Guarantee • All Recorded Sessions Included",
  };

  useEffect(() => {
    // Check if already dismissed in this session
    const hasSeen = sessionStorage.getItem("pendugpt_urgency_shown");
    if (hasSeen) return;

    // Trigger popup strictly AFTER the video pauses (after 2 plays complete)
    const handleVideoPaused = () => {
      const alreadyShown = sessionStorage.getItem("pendugpt_urgency_shown");
      if (!alreadyShown) {
        setIsOpen(true);
        sessionStorage.setItem("pendugpt_urgency_shown", "true");
      }
    };

    window.addEventListener("video-paused-after-2-plays", handleVideoPaused);

    // Fallback timer only if user has been on page for a long duration (120s) without video completion
    const fallbackTimer = setTimeout(() => {
      const alreadyShown = sessionStorage.getItem("pendugpt_urgency_shown");
      if (!alreadyShown) {
        setIsOpen(true);
        sessionStorage.setItem("pendugpt_urgency_shown", "true");
      }
    }, 120000);

    return () => {
      window.removeEventListener("video-paused-after-2-plays", handleVideoPaused);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Ticking countdown timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        if (minutes > 0) {
          setMinutes((prevMin) => prevMin - 1);
          return 59;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, minutes]);

  if (!isOpen) return null;

  const handleClaim = () => {
    setIsOpen(false);
    onClaim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl border-2 border-[#d4f934]/60 bg-gradient-to-b from-[#14180d] via-[#0d0e12] to-[#080808] p-6 sm:p-7 shadow-[0_0_60px_rgba(212,249,52,0.3)] text-white text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Top Flame Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600/20 border border-red-500/50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] mb-3">
          <Flame className="h-4 w-4 fill-red-500 text-red-500 animate-bounce" />
          <span>{strings.badge}</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          {strings.headlineA} <span className="text-[#d4f934]">{strings.headlineB}</span> {strings.headlineC}
        </h2>

        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
          {strings.description}
        </p>

        {/* Ticking Countdown Box */}
        <div className="mt-4 rounded-2xl border border-gray-800 bg-[#080808] p-3 flex items-center justify-between px-6">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase text-gray-400 block">
              {strings.timerLabel}
            </span>
            <div className="flex items-center gap-1.5 text-xl font-black text-[#d4f934] font-mono">
              <Clock className="h-4 w-4 text-[#d4f934]" />
              <span>
                {String(minutes).padStart(2, "0")}m : {String(seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="line-through decoration-red-600 decoration-2 text-gray-500 font-extrabold text-xs">
              {strings.originalPrice}
            </span>
            <span className="text-xl font-black text-[#d4f934] block">
              {strings.offerPrice}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleClaim}
          className="lime-button mt-5 w-full flex items-center justify-center gap-2 rounded-full py-4 px-6 text-sm font-black text-black shadow-[0_0_30px_rgba(212,249,52,0.5)] cursor-pointer hover:scale-105 transition-all"
        >
          <span>{strings.claimBtn}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-[10px] text-gray-400 mt-3 font-semibold flex items-center justify-center gap-1">
          <ShieldCheck className="h-3 w-3 text-[#d4f934]" /> {strings.guarantee}
        </p>
      </div>
    </div>
  );
}

