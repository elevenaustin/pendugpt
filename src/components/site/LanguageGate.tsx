import { AnimatePresence, motion } from "framer-motion";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageGate() {
  const { setLang, chosen, hydrated } = useI18n();
  const open = hydrated && !chosen;

  const choose = (lang: Lang) => setLang(lang);

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
            className="w-full max-w-sm rounded-3xl border border-[#d4f934]/30 bg-[#121212] p-6 text-center shadow-[0_0_50px_rgba(212,249,52,0.15)]"
          >
            {/* Logo */}
            <div className="flex flex-col items-center gap-2 mb-5">
              <Logo className="h-12 w-12" />
              <Wordmark />
            </div>

            {/* Simple Title */}
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Select Language / ਭਾਸ਼ਾ ਚੁਣੋ
            </h2>

            {/* Clean Choice Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => choose("pa")}
                className="lime-button flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold text-black transition-transform hover:scale-[1.02]"
              >
                <span className="text-xl">🇮🇳</span>
                <span>ਪੰਜਾਬੀ (Punjabi)</span>
              </button>

              <button
                type="button"
                onClick={() => choose("en")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 py-4 text-base font-bold text-white transition-colors hover:border-[#d4f934] hover:bg-gray-800"
              >
                <span className="text-xl">🌎</span>
                <span>English</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

