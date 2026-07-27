import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PurchaseEvent {
  name: string;
  location: string;
  state: string;
  timeAgo: string;
}

const PURCHASES: PurchaseEvent[] = [
  { name: "Gurinder S.", location: "Ludhiana", state: "Punjab", timeAgo: "Just now" },
  { name: "Simranjit K.", location: "Mohali", state: "Punjab", timeAgo: "1 min ago" },
  { name: "Vikas V.", location: "Ambala", state: "Haryana", timeAgo: "2 mins ago" },
  { name: "Ankita S.", location: "Chandigarh", state: "Chandigarh", timeAgo: "Just now" },
  { name: "Harsimran S.", location: "Amritsar", state: "Punjab", timeAgo: "3 mins ago" },
  { name: "Kavita R.", location: "Panchkula", state: "Haryana", timeAgo: "Just now" },
  { name: "Navdeep K.", location: "Patiala", state: "Punjab", timeAgo: "4 mins ago" },
  { name: "Rahul G.", location: "Karnal", state: "Haryana", timeAgo: "2 mins ago" },
  { name: "Sukhwinder S.", location: "Jalandhar", state: "Punjab", timeAgo: "Just now" },
  { name: "Pooja S.", location: "Gurugram", state: "Haryana", timeAgo: "5 mins ago" },
  { name: "Jaspreet K.", location: "Bathinda", state: "Punjab", timeAgo: "3 mins ago" },
  { name: "Maninder S.", location: "Chandigarh", state: "Chandigarh", timeAgo: "Just now" },
  { name: "Amit K.", location: "Hisar", state: "Haryana", timeAgo: "6 mins ago" },
  { name: "Priya V.", location: "Chandigarh", state: "Chandigarh", timeAgo: "Just now" },
];

export function PurchaseToast() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const initialTimer = setTimeout(() => {
      setIndex(0);
      setVisible(true);
    }, 3500);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (index === null || dismissed) return;

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5500);

    const nextTimer = setTimeout(() => {
      setIndex((prev) => ((prev ?? 0) + 1) % PURCHASES.length);
      setVisible(true);
    }, 13000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [index, dismissed]);

  if (dismissed || index === null) return null;

  const item = PURCHASES[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-5 left-5 z-50 min-w-[270px] max-w-[320px] rounded-2xl border border-gray-800/80 bg-[#141414]/95 p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-md text-left"
        >
          <div className="flex items-center gap-3 relative">
            {/* Green Circular Shield Icon (Matching Attached Image) */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#233500] border border-[#d4f934]/40 text-[#d4f934]">
              <ShieldCheck className="h-6 w-6 text-[#d4f934]" />
            </div>

            {/* Notification Details (Includes ₹99 Amount & Verified Status) */}
            <div className="flex-1 pr-4">
              <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                {item.name} from {item.location}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium mt-0.5">
                <span className="text-white font-bold">₹99 Paid</span>
                <span>•</span>
                <span className="text-[#d4f934] font-bold">{isPa ? "ਪੇਮੈਂਟ ਵੈਰੀਫਾਈਡ ✓" : "Payment Verified ✓"}</span>
              </div>

              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                {isPa ? "ਤੁਰੰਤ ਐਕਸੈਸ ਕਨਫਰਮ ਹੋ ਗਿਆ" : "Seat Confirmed"} · {item.timeAgo}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="absolute -top-1 -right-1 p-1 text-gray-500 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
