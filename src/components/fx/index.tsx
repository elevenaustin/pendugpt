import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Lightweight background ambient glow. */
export function Aurora({ className }: { variant?: string; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #d4f934 0%, transparent 70%)" }}
      />
    </div>
  );
}

/** Scroll-reveal wrapper with minimal overhead & ultra-fast rendering. */
export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("transform-gpu", className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.22, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden rounded-2xl transition-all duration-300",
        hover && "hover:-translate-y-1 hover:border-[#d4f934]/40 hover:shadow-[0_8px_30px_rgba(212,249,52,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#d4f934]/30 bg-[#d4f934]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d4f934]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#d4f934] animate-pulse" />
      {children}
    </span>
  );
}

export function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: string;
  aurora?: boolean;
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden px-4 py-16 sm:px-6 md:py-24", className)}>
      <Aurora />
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/** Animated number counter that runs once in view. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const duration = 1000;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/** High-performance GPU-accelerated cursor glow (Zero React re-renders on mouse move). */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frameId: number;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
          glowRef.current.style.opacity = "1";
        }
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-[300px] w-[300px] rounded-full opacity-0 blur-[80px] transition-opacity duration-300 md:block"
      style={{
        background: "radial-gradient(circle, rgba(212,249,52,0.18), transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}

export function FloatingOrbs() {
  return null;
}

