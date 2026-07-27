import { AnimatePresence, motion } from "framer-motion";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageGate() {
  const { setLang, chosen, hydrated } = useI18n();
  const open = hydrated && !chosen;

  const choose = (lang: Lang) => {
    setLang(lang);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("unmute-video"));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-sm rounded-3xl border border-[#d4f934]/40 bg-[#121212] p-6 text-center shadow-[0_0_60px_rgba(212,249,52,0.25)] relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-[#d4f934]/20 blur-2xl pointer-events-none" />

            {/* Logo */}
            <div className="flex flex-col items-center gap-2 mb-4 relative z-10">
              <Logo className="h-12 w-12" />
              <Wordmark />
            </div>

            {/* Simple Title */}
            <h2 className="text-xl font-extrabold text-white tracking-tight relative z-10">
              Select Language / ਭਾਸ਼ਾ ਚੁਣੋ
            </h2>
            <p className="mt-1 text-xs text-gray-400 font-medium relative z-10">
              Choose your language to start learning / ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਭਾਸ਼ਾ ਚੁਣੋ
            </p>

            {/* Clean Choice Buttons */}
            <div className="mt-6 flex flex-col gap-3 relative z-10">
              <button
                type="button"
                onClick={() => choose("pa")}
                className="lime-button flex w-full items-center justify-between rounded-2xl px-5 py-4 text-base font-extrabold text-black transition-transform hover:scale-[1.02] cursor-pointer shadow-[0_0_20px_rgba(212,249,52,0.3)]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇮🇳</span>
                  <span className="font-black text-black">ਪੰਜਾਬੀ (Punjabi)</span>
                </div>
                <span className="text-xs bg-black/10 px-2.5 py-1 rounded-full text-black font-extrabold">ਪ੍ਰਮੁੱਖ</span>
              </button>

              <button
                type="button"
                onClick={() => choose("en")}
                className="flex w-full items-center justify-between rounded-2xl border border-gray-700 bg-gray-900/90 px-5 py-4 text-base font-bold text-white transition-all hover:border-[#d4f934] hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌎</span>
                  <span className="font-extrabold text-white">English</span>
                </div>
                <span className="text-xs bg-gray-800 px-2.5 py-1 rounded-full text-gray-300 font-medium border border-gray-700">Default</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


