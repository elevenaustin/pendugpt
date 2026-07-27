import { cn } from "@/lib/utils";

/**
 * Official PenduGPT logo badge (Image 2)
 */
export function Logo({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <img
      src="/pendugpt-logo.jpg"
      alt="PenduGPT Logo"
      className={cn("h-10 w-10 rounded-full object-cover shadow-[0_0_12px_rgba(212,249,52,0.3)]", animated && "animate-float", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-xl font-black tracking-tight text-white">
        Pendu<span className="text-[#d4f934]">GPT</span>
      </span>
      <span className="text-[10px] font-semibold tracking-wide text-[#d4f934]">
        AI Sikho, Paisa Kamao.
      </span>
    </div>
  );
}

