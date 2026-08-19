import { useState, useEffect } from "react";
import { X, Clock, ArrowRight, ShieldCheck, Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface AutoUrgencyPopupProps {
  onClaim: () => void;
}

export function AutoUrgencyPopup({ onClaim }: AutoUrgencyPopupProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(55);

  const strings = t.urgencyPopup || {
    badge: "LIMITED SPOTS ALERT",
    headlineA: "Only",
    headlineB: "7 Seats Left",
    headlineC: "At ₹99!",
    description: "Special Demo Class enrollment is closing soon. Don't miss out on learning how to build AI websites!",
    timerLabel: "OFFER EXPIRES IN",
    originalPrice: "₹1,000",
    offerPrice: "₹99 ONLY",
    claimBtn: "Claim Your ₹99 Seat Now",
    guarantee: "100% Money-Back Satisfaction Guarantee",
  };

  useEffect(() => {
    // Check if already dismissed in this session
    const hasSeen = sessionStorage.getItem("pendugpt_urgency_shown");
    if (hasSeen) return;

    // Trigger popup after exactly 6 seconds of opening site
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("pendugpt_urgency_shown", "true");
    }, 6000);

    return () => clearTimeout(timer);
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

