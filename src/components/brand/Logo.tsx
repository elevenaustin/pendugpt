import { cn } from "@/lib/utils";

/**
 * Official PenduGPT logo badge
 */
export function Logo({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <img
      src="/pendugpt-logo.jpg"
      alt="PenduGPT Logo"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      width="40"
      height="40"
      className={cn("h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover shadow-[0_0_12px_rgba(212,249,52,0.3)]", animated && "animate-float", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-lg sm:text-xl font-black tracking-tight text-white">
        Pendu<span className="text-[#d4f934]">GPT</span>
      </span>
      <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-[#d4f934]">
        AI Sikho, Paisa Kamao.
      </span>
    </div>
  );
}
