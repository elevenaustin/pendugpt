import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import VimeoPlayer from "@vimeo/player";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import student4 from "@/assets/student-4.jpg";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  Gift,
  GraduationCap,
  Laptop,
  Layers,
  Layout,
  Lock,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Briefcase,
  Store,
  Video,
  UserCheck,
  HelpCircle,
  BookOpen,
  DollarSign,
  Code2,
  Globe,
  Wrench,
  RefreshCw,
  Type,
  Wand2,
  FolderCheck,
  Server,
} from "lucide-react";
import { Counter, Reveal } from "@/components/fx";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useEnrollmentModal } from "@/components/landing/EnrollmentModal";

/* --------------------------------- Header Wavy Title --------------------------------- */
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-3 text-sm sm:text-base text-gray-400 font-medium">{subtitle}</p>}
    </div>
  );
}

/* ---------------------------------- Hero Section --------------------------------- */
function HeroVideoPlayer() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const playCountRef = useRef(0);
  const isHandlingEndRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showSoundTooltip, setShowSoundTooltip] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVideoCycleEnd = async (player: VimeoPlayer) => {
    if (isHandlingEndRef.current) return;
    isHandlingEndRef.current = true;
    playCountRef.current += 1;

    if (playCountRef.current < 2) {
      try {
        await player.setCurrentTime(0);
        await player.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        setShowControls(true);
      } finally {
        setTimeout(() => {
          isHandlingEndRef.current = false;
        }, 1500);
      }
    } else {
      try {
        await player.pause();
      } catch {}
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new VimeoPlayer(iframeRef.current);
    playerRef.current = player;

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("timeupdate", (data: { seconds: number; percent: number }) => {
      setCurrentTime(data.seconds);
      if (data.percent >= 0.98 && !isHandlingEndRef.current) {
        handleVideoCycleEnd(player);
      }
    });
    player.on("ended", () => handleVideoCycleEnd(player));

    player.on("loaded", async () => {
      setIsVideoLoaded(true);
      try {
        const dur = await player.getDuration();
        setDuration(dur);
      } catch {}
    });

    player
      .ready()
      .then(async () => {
        setIsVideoLoaded(true);
        try {
          const dur = await player.getDuration();
          if (dur) setDuration(dur);
        } catch {}
        return player.setMuted(true);
      })
      .then(() => {
        setIsMuted(true);
        return player.play();
      })
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Fallback if autoplay is blocked by browser policy
        setIsVideoLoaded(true);
      });

    const tooltipTimer = setTimeout(() => {
      setShowSoundTooltip(true);
    }, 1000);

    const handleUnmuteEvent = () => {
      if (playerRef.current) {
        playerRef.current.setMuted(false);
        setIsMuted(false);
        setShowSoundTooltip(false);
        playerRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener("unmute-video", handleUnmuteEvent);

    return () => {
      clearTimeout(tooltipTimer);
      window.removeEventListener("unmute-video", handleUnmuteEvent);
      if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
      player.destroy().catch(() => {});
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player
        .pause()
        .then(() => setIsPlaying(false))
        .catch(() => setIsPlaying(false));
    } else {
      isHandlingEndRef.current = false;
      player
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const player = playerRef.current;
    if (!player) return;

    const nextMuted = !isMuted;
    setShowSoundTooltip(false);
    player.setMuted(nextMuted).then(() => {
      setIsMuted(nextMuted);
      if (!nextMuted) {
        player.setVolume(1);
      }
    });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.setCurrentTime(time).then(() => {
        setCurrentTime(time);
      });
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = Math.floor(secs % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-[#d4f934] bg-black shadow-[0_0_60px_rgba(212,249,52,0.45)] select-none cursor-pointer"
      onClick={togglePlay}
    >
      {/* Vimeo Iframe fitted to the container aspect-video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1215696372?autoplay=1&autopause=0&byline=0&title=0&muted=1&playsinline=1&controls=0&loop=0"
          className="w-full h-full border-0 rounded-2xl"
          allow="autoplay; fullscreen; picture-in-picture"
          title="PenduGPT Masterclass Demo"
        />
      </div>

      {/* Skeleton Shimmer Loading Placeholder Overlay */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-4 bg-[#0a0a0a] skeleton-shimmer rounded-2xl pointer-events-none">
          <div className="flex justify-between items-center">
            <div className="h-5 w-28 rounded-full bg-gray-800/80" />
            <div className="h-5 w-16 rounded-full bg-gray-800/80" />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="h-16 w-16 rounded-full bg-gray-800/80 animate-pulse" />
            <div className="h-3 w-40 rounded bg-gray-800/80" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 rounded bg-gray-800/80" />
            <div className="h-6 w-20 rounded bg-gray-800/80" />
          </div>
        </div>
      )}

      {/* Center Huge Play/Pause Touch Overlay Button */}
      {(!isPlaying || showControls) && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
          className="absolute inset-0 m-auto h-16 w-16 sm:h-20 sm:w-20 z-20 flex items-center justify-center rounded-full bg-black/60 border-2 border-[#d4f934] text-[#d4f934] shadow-[0_0_30px_rgba(212,249,52,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/80 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 sm:h-10 sm:w-10 fill-[#d4f934] text-[#d4f934]" />
          ) : (
            <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-[#d4f934] text-[#d4f934] translate-x-0.5" />
          )}
        </button>
      )}

      {/* Custom Landing Page Controls Overlay Bar */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 z-30 flex flex-col gap-2 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-sm transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Interactive Progress Scrubber / Timeline Bar */}
        <div className="relative flex items-center w-full group/timeline cursor-pointer">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Video Timeline"
            className="w-full h-1.5 accent-[#d4f934] bg-gray-700/70 rounded-lg cursor-pointer appearance-none transition-all hover:h-2.5 focus:outline-none"
            style={{
              background: `linear-gradient(to right, #d4f934 ${progressPercent}%, rgba(75, 85, 99, 0.6) ${progressPercent}%)`,
            }}
          />
        </div>

        {/* Bottom Control Buttons */}
        <div className="flex items-center justify-between text-xs font-bold text-white pt-1">
          {/* Left: Play/Pause Button + Time Display */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-[#181818] border border-gray-700 text-[#d4f934] hover:border-[#d4f934] hover:bg-black transition-colors cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-[#d4f934]" /> : <Play className="h-4 w-4 fill-[#d4f934] translate-x-0.5" />}
            </button>

            <span className="font-mono text-[11px] sm:text-xs text-gray-300 tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: Sound Toggle + Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Custom Sound Button with Animated Popover Tooltip */}
            <div className="relative">
              {showSoundTooltip && isMuted && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="absolute -top-12 right-0 z-50 flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#d4f934] px-3.5 py-1.5 text-xs font-black text-black shadow-[0_0_25px_rgba(212,249,52,0.9)] animate-bounce cursor-pointer border border-black/30"
                >
                  <span>{isPa ? "🔊 ਆਵਾਜ਼ ਸੁਣਨ ਲਈ ਇੱਥੇ ਦਬਾਓ!" : "🔊 Tap to turn Sound ON!"}</span>
                  <div className="absolute -bottom-1 right-6 h-2.5 w-2.5 rotate-45 bg-[#d4f934]" />
                </div>
              )}

              <button
                type="button"
                onClick={toggleMute}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold border transition-all cursor-pointer",
                  isMuted
                    ? "bg-red-950/80 border-red-500/60 text-red-400 hover:bg-red-900 animate-pulse"
                    : "bg-[#121212]/90 border-[#d4f934] text-white hover:bg-black"
                )}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-red-400" />
                    <span>Unmute 🔊</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-[#d4f934]" />
                    <span className="text-[#d4f934]">Sound On</span>
                  </>
                )}
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-[#181818] border border-gray-700 text-gray-300 hover:text-[#d4f934] hover:border-[#d4f934] transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]">
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#d4f934]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-12">
          
          {/* Left Column (Text & Details) - Order 2 on Mobile, Order 1 on Desktop */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6 sm:space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-bold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>{isPa ? "🔴 ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ (LIVE DEMO CLASS)" : "🔴 UPCOMING LIVE DEMO CLASS"}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
                {isPa ? (
                  <>
                    <span className="font-serif italic text-[#d4f934]">ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ</span> ਜੁਆਇਨ ਕਰੋ ਤੇ AI ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ ਸਿੱਖੋ
                  </>
                ) : (
                  <>
                    Join The <span className="font-serif italic text-[#d4f934]">Live Demo Class</span> & Learn AI Website Building
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-sm sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                {isPa
                  ? "ਸਾਡੀ ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ₹99 ਵਿੱਚ ਜੁਆਇਨ ਕਰੋ ਅਤੇ ਬਿਨਾਂ ਕੋਡਿੰਗ ਦੇ ਸੋਹਣੀਆਂ AI ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣਾ, ਆਨਲਾਈਨ ਪਬਲਿਸ਼ ਕਰਨਾ ਤੇ ਫ੍ਰੀਲਾਂਸਿੰਗ ਰਾਹੀਂ ਕਮਾਈ ਕਰਨਾ ਸਿੱਖੋ।"
                  : "Join our live demo class for ₹99 and learn how to build professional AI-powered websites without coding, publish them online, and start getting freelance clients."}
              </p>
            </Reveal>

            {/* Feature Pills */}
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2.5">
                {[
                  isPa ? "ਕੋਡਿੰਗ ਦੀ ਲੋੜ ਨਹੀਂ (No Coding)" : "No Coding Required",
                  isPa ? "ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ (Beginner Friendly)" : "Beginner Friendly",
                  isPa ? "ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ (Live Practical)" : "Live Practical Session",
                  isPa ? "ਅਸਲੀ ਵੈੱਬਸਾਈਟਾਂ (Real Websites)" : "Build Real Websites",
                  isPa ? "AI ਟੂਲ ਤੇ ਰੋਡਮੈਪ (AI Tools & Strategy)" : "AI Tools & Strategies",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-800 bg-[#121212] px-3 py-1.5 text-xs font-semibold text-gray-200 shadow-sm hover:border-[#d4f934]/40 transition-colors"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934]" />
                    {pill}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* High-Converting Price Tag Callout Badge (₹1,000 -> ₹99) */}
            <Reveal delay={0.18}>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-[#d4f934]/40 bg-[#121706] px-4 py-2.5 shadow-[0_0_20px_rgba(212,249,52,0.15)]">
                <span className="text-sm sm:text-base font-bold text-gray-400 line-through">₹1,000</span>
                <span className="text-2xl sm:text-3xl font-black text-[#d4f934] font-sans tracking-tight">₹99 ONLY</span>
                <span className="rounded-full bg-[#d4f934]/20 border border-[#d4f934]/50 px-2.5 py-0.5 text-[11px] font-black uppercase text-[#d4f934]">
                  90% OFF
                </span>
              </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-extrabold text-black shadow-[0_0_25px_rgba(212,249,52,0.3)] hover:shadow-[0_0_35px_rgba(212,249,52,0.5)] transition-all cursor-pointer"
                >
                  <Rocket className="h-5 w-5" />
                  <span>
                    {isPa ? (
                      <>
                        ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ਜੁਆਇਨ ਕਰੋ — <span className="line-through opacity-70">₹1,000</span> ₹99
                      </>
                    ) : (
                      <>
                        Join Live Demo Class — <span className="line-through opacity-70">₹1,000</span> ₹99
                      </>
                    )}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            {/* Student Social Proof */}
            <Reveal delay={0.25}>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {[student1, student2, student3, student4].map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt="Registered Student Profile"
                      loading="eager"
                      decoding="async"
                      className="h-10 w-10 rounded-full border-2 border-[#d4f934] object-cover shadow-lg hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-300">
                  <strong className="text-white">1,000+</strong> {isPa ? "ਵਿਦਿਆਰਥੀ ਰਜਿਸਟਰਡ (Students Registered)" : "students already registered"}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Single Video Player Instance - Order 1 on Mobile, Order 2 on Desktop */}
          <div id="demo" className="lg:col-span-6 order-1 lg:order-2 w-full">
            <Reveal delay={0.15}>
              <HeroVideoPlayer />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Stats Bar --------------------------------- */
export function Stats() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  return (
    <section className="py-8 bg-[#0c0c0c] border-y border-[#d4f934]/20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Users, val: 1000, suffix: "+", label: isPa ? "ਸਿੱਖਿਆਰਥੀ (Learners)" : "Interested Learners" },
            { icon: Layout, val: 500, suffix: "+", label: isPa ? "AI ਵੈੱਬਸਾਈਟਾਂ ਬਣੀਆਂ (AI Websites Built)" : "AI Websites Built" },
            { icon: Star, val: 4.9, suffix: "/5", label: isPa ? "ਰੇਟਿੰਗ (Student Rating)" : "Student Rating" },
            { icon: Briefcase, val: "Growing", suffix: "", label: isPa ? "ਕਮਿਊਨਿਟੀ (Active Community)" : "Active Community" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center">
              <s.icon className="h-6 w-6 text-[#d4f934] mb-2" />
              <p className="text-2xl sm:text-3xl font-black text-white">
                {typeof s.val === "number" ? <Counter value={s.val} suffix={s.suffix} /> : `${s.val} ${s.suffix}`}
              </p>
              <p className="text-xs font-semibold text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Limited Spots & Scarcity Urgency Section -------------------------------- */
export function LimitedSpots() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  const [spotsLeft, setSpotsLeft] = useState(12);
  const [tickerIndex, setTickerIndex] = useState(0);

  const notifications = [
    isPa ? "🔥 ਗੁਰਪ੍ਰੀਤ ਐਸ. (ਲੁਧਿਆਣਾ) ਨੇ ਹੁਣੇ 1 ਸੀਟ ਬੁੱਕ ਕੀਤੀ" : "🔥 Gurpreet S. (Ludhiana) just reserved a spot!",
    isPa ? "⚡ ਹਰਮਨ ਕੌਰ (ਅੰਮ੍ਰਿਤਸਰ) ਨੇ ਕਲਾਸ ਜੁਆਇਨ ਕੀਤੀ" : "⚡ Harman K. (Amritsar) registered for the demo class!",
    isPa ? "✨ ਸਿਮਰਨ ਸਿੰਘ (ਜਲੰਧਰ) ਨੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਪੂਰੀ ਕੀਤੀ" : "✨ Simran S. (Jalandhar) completed registration!",
    isPa ? "🚀 ਨਵਦੀਪ ਕੇ. (ਮੋਹਾਲੀ) ਨੇ ₹99 ਨਾਲ ਸੀਟ ਰਿਜ਼ਰਵ ਕੀਤੀ" : "🚀 Navdeep K. (Mohali) reserved a seat for ₹99!",
  ];

  // Animated Seat decrease simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => (prev > 5 ? prev - 1 : 12));
      setTickerIndex((prev) => (prev + 1) % notifications.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [notifications.length]);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSeats = 100;
  const seatsFilled = totalSeats - spotsLeft;
  const filledPercent = Math.round((seatsFilled / totalSeats) * 100);

  return (
    <section id="limited-spots" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#090909] border-b border-[#d4f934]/20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-red-600/10 blur-[130px]" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Dynamic Urgency Top Banner Ribbon */}
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/80 via-[#1a0808] to-red-950/80 p-4 shadow-[0_0_30px_rgba(239,68,68,0.25)] mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-500 border border-red-500/40 animate-pulse">
                <Flame className="h-5 w-5 fill-red-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-red-400">
                    {isPa ? "🔴 ਲਿਮਟਿਡ ਬੈਚ ਸੀਟਾਂ (HIGH DEMAND)" : "🔴 HIGH DEMAND BATCH"}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                </div>
                <p className="text-sm font-extrabold text-white mt-0.5">
                  {isPa
                    ? `ਅਗਲੀ ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ਲਈ ਸਿਰਫ਼ ${spotsLeft} ਸੀਟਾਂ ਬਾਕੀ ਹਨ!`
                    : `Only ${spotsLeft} Spots Remaining for the Next Live Demo Class!`}
                </p>
              </div>
            </div>

            {/* Live Activity Notification Box */}
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-black/60 border border-red-500/30 px-3.5 py-2 text-xs font-bold text-gray-200 shadow-inner">
              <span className="text-[#d4f934] animate-bounce">⚡</span>
              <span className="truncate">{notifications[tickerIndex]}</span>
            </div>
          </div>
        </Reveal>

        {/* Main Limited Spots Urgency Card */}
        <Reveal delay={0.05}>
          <div className="rounded-3xl border-2 border-[#d4f934]/60 bg-[#0f1208] p-6 sm:p-10 shadow-[0_0_60px_rgba(212,249,52,0.25)] relative overflow-hidden">
            
            {/* Header Badge & Title */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#d4f934]/15 border border-[#d4f934]/40 px-4 py-1 text-xs font-black uppercase text-[#d4f934] mb-3">
                <Sparkles className="h-3.5 w-3.5 text-[#d4f934]" />
                {isPa ? "ਸੀਟਾਂ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਭਰ ਰਹੀਆਂ ਹਨ" : "FAST FILLING BATCH"}
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {isPa ? (
                  <>
                    ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ਲਈ <span className="text-[#d4f934] italic">ਆਪਣੀ ਸੀਟ</span> ਹੁਣੇ ਬੁੱਕ ਕਰੋ
                  </>
                ) : (
                  <>
                    Reserve Your Spot in the <span className="text-[#d4f934] italic">Live Demo Class</span>
                  </>
                )}
              </h2>
              
              <p className="mt-2 text-xs sm:text-sm text-gray-300">
                {isPa
                  ? "ਹਰ ਬੈਚ ਦੀਆਂ ਸੀਟਾਂ ਲਿਮਟਿਡ ਹੁੰਦੀਆਂ ਹਨ ਤਾਂ ਜੋ ਹਰ ਵਿਦਿਆਰਥੀ ਨੂੰ ਲਾਈਵ ਸਵਾਲ-ਜਵਾਬ ਦਾ ਪੂਰਾ ਮੌਕਾ ਮਿਲੇ।"
                  : "We limit seats per batch to ensure every participant gets individual Q&A attention during the live session."}
              </p>
            </div>

            {/* Progress Bar & Seat Counter Visualizer */}
            <div className="mt-8 bg-black/60 rounded-2xl border border-gray-800 p-5 sm:p-6 shadow-inner">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#d4f934] animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-xs font-black text-gray-200 uppercase tracking-wide">
                    {isPa ? "ਬੈਚ ਕਪੈਸਿਟੀ ਰਿਪੋਰਟ" : "Batch Capacity Tracker"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-black">
                  <span className="text-red-400 font-mono bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded-md">
                    {spotsLeft} {isPa ? "ਸੀਟਾਂ ਬਾਕੀ" : "Spots Left"}
                  </span>
                  <span className="text-[#d4f934] font-mono bg-[#d4f934]/10 border border-[#d4f934]/30 px-2 py-0.5 rounded-md">
                    {filledPercent}% {isPa ? "ਭਰ ਚੁੱਕੀਆਂ" : "Filled"}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar Track */}
              <div className="relative h-5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#88ba00] via-[#d4f934] to-[#f5ff82] rounded-full transition-all duration-700 relative shadow-[0_0_15px_rgba(212,249,52,0.8)]"
                  style={{ width: `${filledPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center text-[11px] font-semibold text-gray-400">
                <span>0 {isPa ? "ਸੀਟਾਂ" : "Seats"}</span>
                <span className="text-red-400 font-bold animate-pulse">
                  ⚠️ {isPa ? "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਲਦੀ ਬੰਦ ਹੋ ਰਹੀ ਹੈ" : "Registration closing soon for this batch"}
                </span>
                <span>100 {isPa ? "ਕੁੱਲ ਸੀਟਾਂ" : "Total Seats"}</span>
              </div>
            </div>

            {/* Countdown Timer Grid */}
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
              <div className="rounded-xl border border-gray-800 bg-black/70 p-3 shadow-sm">
                <span className="text-xl sm:text-3xl font-black text-[#d4f934] font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase mt-0.5">
                  {isPa ? "ਘੰਟੇ (Hours)" : "Hours"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-black/70 p-3 shadow-sm">
                <span className="text-xl sm:text-3xl font-black text-[#d4f934] font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase mt-0.5">
                  {isPa ? "ਮਿੰਟ (Min)" : "Minutes"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-black/70 p-3 shadow-sm">
                <span className="text-xl sm:text-3xl font-black text-[#d4f934] font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase mt-0.5">
                  {isPa ? "ਸਕਿੰਟ (Sec)" : "Seconds"}
                </p>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-black/40 border border-gray-800 p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                  <Laptop className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{isPa ? "120 ਮਿੰਟ ਲਾਈਵ ਡੈਮੋ" : "120-Min Live Demo"}</h4>
                  <p className="text-[11px] text-gray-400">{isPa ? "ਪੂਰਾ ਪ੍ਰੈਕਟੀਕਲ ਸੈਸ਼ਨ" : "Full practical walkthrough"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-black/40 border border-gray-800 p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{isPa ? "₹75,000+ ਦੇ ਬੋਨਸ" : "₹75,000+ Bonuses"}</h4>
                  <p className="text-[11px] text-gray-400">{isPa ? "ਪ੍ਰੌਂਪਟਸ ਤੇ ਟੈਂਪਲੇਟਸ" : "Prompts & client proposal scripts"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-black/40 border border-gray-800 p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{isPa ? "ਸਿਰਫ਼ ₹99 ਵਿੱਚ" : "Only ₹99 Fee"}</h4>
                  <p className="text-[11px] text-gray-400">{isPa ? "100% ਸੁਰੱਖਿਅਤ ਪੇਮੈਂਟ" : "100% money-back policy"}</p>
                </div>
              </div>
            </div>

            {/* High-Converting CTA Button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={openModal}
                className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-base sm:text-xl font-black text-black shadow-[0_0_45px_rgba(212,249,52,0.6)] hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer uppercase tracking-wider"
              >
                <Rocket className="h-6 w-6 text-black fill-black" />
                <span>
                  {isPa ? (
                    <>
                      ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ਹੁਣੇ ਜੁਆਇਨ ਕਰੋ — <span className="line-through opacity-70">₹1,000</span> ₹99
                    </>
                  ) : (
                    <>
                      Join Live Demo Class Now — <span className="line-through opacity-70">₹1,000</span> ₹99
                    </>
                  )}
                </span>
                <ArrowRight className="h-6 w-6 text-black" />
              </button>

              <p className="mt-3 text-xs font-bold text-gray-400 flex items-center justify-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#d4f934]" />
                <span>{isPa ? "ਤੁਰੰਤ ਵਟਸਐਪ ਗਰੁੱਪ ਲਿੰਕ ਅਤੇ ਕਲਾਸ ਐਕਸੈਸ ਮਿਲੇਗਾ" : "Instant access to private VIP WhatsApp group & class link after payment"}</span>
              </p>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Audience Section -------------------------------- */
export function Audience() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  const requirements = [
    {
      step: "01",
      icon: Laptop,
      badge: isPa ? "ਲੈਪਟਾਪ / ਪੀਸੀ ਜ਼ਰੂਰੀ" : "Practical Requirement",
      title: isPa ? "1. ਲੈਪਟਾਪ ਜਾਂ ਪੀਸੀ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ" : "1. Has Access to a Laptop or PC",
      subtitle: isPa ? "ਪ੍ਰੈਕਟੀਕਲ ਲਾਈਵ ਸੈਸ਼ਨ" : "Hands-On Practice Ready",
      desc: isPa
        ? "ਇਹ 100% ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ ਸੈਸ਼ਨ ਹੈ। ਕਲਾਸ ਦੇ ਨਾਲ-ਨਾਲ ਵੈੱਬਸਾਈਟ ਬਣਾਉਣ ਲਈ ਤੁਹਾਡੇ ਕੋਲ ਕੰਪਿਊਟਰ ਜਾਂ ਲੈਪਟਾਪ ਹੋਣਾ ਜ਼ਰੂਰੀ ਹੈ।"
        : "This is a 100% live practical session. You need a computer or laptop to follow along and build websites live.",
      accent: "border-[#d4f934]/40 bg-[#121805]",
      iconBg: "bg-[#d4f934]/15 border-[#d4f934]/40 text-[#d4f934]",
    },
    {
      step: "02",
      icon: Rocket,
      badge: isPa ? "ਗੰਭੀਰ ਸਿੱਖਣ ਵਾਲੇ" : "Action-Takers Only",
      title: isPa ? "2. ਸਿੱਖਣ ਅਤੇ ਕੰਮ ਕਰਨ ਦਾ ਸੱਚਾ ਸ਼ੌਕ" : "2. Truly Interested to Learn & Do",
      subtitle: isPa ? "ਮਿਹਨਤੀ ਤੇ ਨਵੇਂ ਹੁਨਰ ਲਈ" : "Eager to Build Real Skills",
      desc: isPa
        ? "ਉਹਨਾਂ ਲੋਕਾਂ ਲਈ ਜੋ AI ਟੂਲਜ਼ ਸਿੱਖਣਾ, ਅਸਲੀ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣਾ ਅਤੇ ਆਪਣਾ ਫ੍ਰੀਲਾਂਸਿੰਗ ਕੈਰੀਅਰ ਸ਼ੁਰੂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹਨ।"
        : "For action-takers looking to master modern AI tools, build real websites, and launch their freelance career.",
      accent: "border-[#d4f934]/40 bg-[#121805]",
      iconBg: "bg-[#d4f934]/15 border-[#d4f934]/40 text-[#d4f934]",
    },
    {
      step: "03",
      icon: Clock,
      badge: isPa ? "ਅਸਲੀ ਹੁਨਰ · ਕੋਈ ਜੂਆ ਨਹੀਂ 🎯" : "Real Skill · Not a Blackjack Game 🎯",
      title: isPa ? "3. ਸਿੱਖਣ ਲਈ ਸਮਾਂ ਦੇਣ ਲਈ ਤਿਆਰ" : "3. Ready to Invest Time & Effort",
      subtitle: isPa ? "ਧਿਆਨ ਤੇ ਲਗਨ ਦੀ ਲੋੜ" : "Requires Focus & Dedication",
      desc: isPa
        ? "ਅਸਲੀ ਹੁਨਰ ਸਿੱਖਣ ਲਈ ਸਮਾਂ ਅਤੇ ਧਿਆਨ ਚਾਹੀਦਾ ਹੈ। ਇਹ ਇੱਕ ਪ੍ਰੈਕਟੀਕਲ ਕਲਾਸ ਹੈ — ਕੋਈ ਕੈਸੀਨੋ, ਲਾਟਰੀ ਜਾਂ ਬਲੈਕਜੈਕ ਜੂਆ ਨਹੀਂ।"
        : "Building a real skill takes dedicated time and focus. This is a practical skill workshop — NOT a casino, lottery, or get-rich-quick Blackjack gamble.",
      accent: "border-[#d4f934]/60 bg-[#171f05] shadow-[0_0_30px_rgba(212,249,52,0.15)]",
      iconBg: "bg-[#d4f934] text-black shadow-md font-bold",
    },
  ];

  return (
    <section id="audience" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080808] border-t border-b border-gray-900">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title={isPa ? "ਇਹ ਕਲਾਸ ਕਿਸ ਲਈ ਹੈ? (ਕੌਣ ਜੁਆਇਨ ਕਰੇ)" : "Who Should Join?"}
          subtitle={isPa ? "ਇਹ ਡੈਮੋ ਕਲਾਸ ਜੁਆਇਨ ਕਰਨ ਲਈ 3 ਜ਼ਰੂਰੀ ਸ਼ਰਤਾਂ" : "3 Essential Rules Before You Book Your Spot"}
        />

        {/* 3 High-Impact Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {requirements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={idx * 0.08}>
                <div
                  className={cn(
                    "rounded-3xl border p-6 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 transform-gpu hover:-translate-y-1 relative overflow-hidden",
                    item.accent
                  )}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border", item.iconBg)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/40 border border-gray-800 px-3 py-1 text-[11px] font-extrabold text-[#d4f934] uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white leading-snug tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-[#d4f934] mb-3">{item.subtitle}</p>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-bold text-gray-400">
                    <span>{isPa ? "ਸ਼ਰਤ" : "Rule"} {item.step} / 03</span>
                    <span className="text-[#d4f934]">✓ {isPa ? "ਮਨਜ਼ੂਰ" : "Required"}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Warning Alert Box */}
        <Reveal delay={0.3}>
          <div className="mt-8 rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/70 via-[#180909] to-red-950/70 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-400 border border-red-500/50 animate-pulse">
                <ShieldCheck className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-red-400">
                  ⚠️ {isPa ? "ਇਹ ਕੈਸੀਨੋ ਜਾਂ ਜੂਆ ਨਹੀਂ ਹੈ" : "NOT A GET-RICH-QUICK GAMBLE"}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-200 mt-0.5 max-w-2xl">
                  {isPa
                    ? "ਜੇਕਰ ਤੁਸੀਂ ਕੋਈ ਸ਼ੌਰਟਕਟ ਜਾਦੂਈ ਬਟਨ ਲੱਭ ਰਹੇ ਹੋ, ਤਾਂ ਇਹ ਕਲਾਸ ਤੁਹਾਡੇ ਲਈ ਨਹੀਂ ਹੈ। ਅਸੀਂ ਅਸਲੀ ਵੈੱਬਸਾਈਟ ਸਕਿੱਲ ਸਿਖਾਉਂਦੇ ਹਾਂ।"
                    : "If you are looking for a magic push-button trick or casino gambling, this class is NOT for you. We teach real, high-value AI website building."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="lime-button shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-extrabold text-black cursor-pointer shadow-md"
            >
              <span>{isPa ? "ਸੀਟ ਬੁੱਕ ਕਰੋ — ₹99" : "Book Your Seat — ₹99"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- High-Impact Interactive Curriculum -------------------------------- */
export function Curriculum() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";
  const [expandedModule, setExpandedModule] = useState<string | null>("04");

  const modules = [
    {
      num: "01",
      title: isPa ? "01. ਜਾਣ-ਪਛਾਣ ਤੇ ਓਵਰਵਿਊ (Welcome & Introduction)" : "01. Welcome & Introduction",
      duration: "5 mins",
      bullets: [
        isPa ? "AI ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ" : "How AI website building works today",
        isPa ? "ਜ਼ੀਰੋ-ਕੋਡਿੰਗ ਸਿੱਖਣ ਦੀ ਮਾਨਸਿਕਤਾ" : "Zero-coding mindset & workflow setup",
      ],
      details: isPa
        ? "ਇਸ ਪਹਿਲੇ ਸੈਸ਼ਨ ਵਿੱਚ ਅਸੀਂ ਵੇਖਾਂਗੇ ਕਿ AI ਟੂਲਜ਼ ਕਿਵੇਂ ਟਰੈਡੀਸ਼ਨਲ ਵੈੱਬ ਡਿਵੈਲਪਮੈਂਟ ਦੇ ਹਫ਼ਤਿਆਂ ਦੇ ਕੰਮ ਨੂੰ ਮਿੰਟਾਂ ਵਿੱਚ ਬਦਲ ਦਿੰਦੇ ਹਨ।"
        : "Understand how modern AI tools generate code, designs, and content in real-time without manual programming.",
    },
    {
      num: "02",
      title: isPa ? "02. AI ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ ਕਿਉਂ? (Why AI Website Building?)" : "02. Why AI Website Building?",
      duration: "10 mins",
      bullets: [
        isPa ? "ਟਰੈਡੀਸ਼ਨਲ ਡਿਵੈਲਪਮੈਂਟ VS AI ਬਿਲਡਿੰਗ" : "Traditional web dev vs AI speed",
        isPa ? "ਬਜ਼ਾਰ ਵਿੱਚ ਵੈੱਬਸਾਈਟਾਂ ਦੀ ਮੰਗ" : "High market demand for fast business sites",
      ],
      details: isPa
        ? "ਸਿੱਖੋ ਕਿਵੇਂ ਹਰ ਛੋਟੇ ਅਤੇ ਵੱਡੇ ਬਜ਼ਨੈੱਸ ਨੂੰ ਆਨਲਾਈਨ ਵੈੱਬਸਾਈਟ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਅਤੇ AI ਨਾਲ ਤੁਸੀਂ ਕਿਵੇਂ ਤੇਜ਼ੀ ਨਾਲ ਸੇਵਾ ਦੇ ਸਕਦੇ ਹੋ।"
        : "Discover why local businesses prefer fast, beautiful AI-built websites and how you can position yourself.",
    },
    {
      num: "03",
      title: isPa ? "03. ਲੋੜੀਂਦੇ AI ਟੂਲ (AI Tools You'll Need)" : "03. AI Tools You'll Need",
      duration: "10 mins",
      bullets: [
        isPa ? "ChatGPT, Midjourney, v0 ਤੇ Framer" : "ChatGPT, Midjourney, v0 & Framer",
        isPa ? "ਮੁਫ਼ਤ AI ਪ੍ਰੌਂਪਟ ਟੈਂਪਲੇਟਸ" : "Free AI prompt templates & assets",
      ],
      details: isPa
        ? "ਕਿਹੜੇ ਮੁਫ਼ਤ ਤੇ ਬੈਸਟ AI ਟੂਲ ਵਰਤਣੇ ਹਨ। ਅਸੀਂ ਸਾਰੀ ਟੂਲਕਿੱਟ ਲਾਈਵ ਕਲਾਸ ਵਿੱਚ ਮੁਹੱਈਆ ਕਰਵਾਵਾਂਗੇ।"
        : "Learn the core toolkit including layout generators, image creators, and prompt templates to build complete pages.",
    },
    {
      num: "04",
      title: isPa ? "04. ਲਾਈਵ ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ ਡੈਮੋ (Live Website Building Demo)" : "04. Live Website Building Demo",
      duration: "45 mins",
      isLive: true,
      bullets: [
        isPa ? "ਇੱਕ ਪ੍ਰੌਂਪਟ ਤੋਂ ਪੂਰੀ ਵੈੱਬਸਾਈਟ ਤਿਆਰ" : "Full business website generated live from 1 prompt",
        isPa ? "ਟੈਕਸਟ, ਰੰਗ ਤੇ ਇਮੇਜ ਬਦਲਣਾ" : "Customizing layout, colors, copy & assets",
      ],
      details: isPa
        ? "ਸਭ ਤੋਂ ਮੁੱਖ ਲਾਈਵ ਸੈਸ਼ਨ! ਅੱਖਾਂ ਦੇ ਸਾਹਮਣੇ ਇੱਕ ਬਜ਼ਨੈੱਸ ਲਈ ਕੰਪਲੀਟ ਵੈੱਬਸਾਈਟ AI ਨਾਲ ਬਣਾ ਕੇ ਵੇਖੋਗੇ।"
        : "Watch step-by-step as we construct a complete multi-section business website live during the session.",
    },
    {
      num: "05",
      title: isPa ? "05. ਵੈੱਬਸਾਈਟ ਲਾਈਵ ਪਬਲਿਸ਼ ਕਰਨਾ (Publish the Website)" : "05. Publish the Website",
      duration: "10 mins",
      bullets: [
        isPa ? "ਇੱਕ ਕਲਿੱਕ ਵਿੱਚ ਹੋਸਟਿੰਗ ਲਾਈਵ" : "One-click instant cloud publishing",
        isPa ? "ਕਸਟਮ ਡੋਮੇਨ ਕਨੈਕਟ ਕਰਨਾ (.com / .in)" : "Connecting custom domain names cleanly",
      ],
      details: isPa
        ? "ਆਪਣੀ ਬਣੀ ਹੋਈ ਵੈੱਬਸਾਈਟ ਨੂੰ ਇੰਟਰਨੈੱਟ 'ਤੇ ਲਾਈਵ ਕਿਵੇਂ ਕਰਨਾ ਹੈ ਤਾਂ ਜੋ ਦੁਨੀਆ ਵਿੱਚ ਕੋਈ ਵੀ ਵੇਖ ਸਕੇ।"
        : "Learn how to deploy your website live onto the web with secure HTTPS and custom domain mapping.",
    },
    {
      num: "06",
      title: isPa ? "06. ਪਹਿਲਾ ਕਲਾਇੰਟ ਕਿਵੇਂ ਲੱਭਣਾ (Getting Your First Client)" : "06. Getting Your First Client",
      duration: "15 mins",
      bullets: [
        isPa ? "ਲੋਕਲ ਕਾਰੋਬਾਰੀਆਂ ਨਾਲ ਸੰਪਰਕ" : "Local & international client outreach scripts",
        isPa ? "ਪ੍ਰੋਪੋਜ਼ਲ ਤੇ ਪ੍ਰਾਈਸਿੰਗ ਤਿਆਰ ਕਰਨਾ" : "Pricing projects between ₹5,000 to ₹25,000",
      ],
      details: isPa
        ? "ਸਿੱਖੋ ਕਿਵੇਂ ਪੰਜਾਬ ਅਤੇ ਬਾਹਰਲੇ ਦੇਸ਼ਾਂ ਵਿੱਚ ਕਲਾਇੰਟਸ ਨੂੰ ਅਪਰੋਚ ਕਰਨਾ ਹੈ ਅਤੇ ₹5,000 - ₹25,000 ਤੱਕ ਚਾਰਜ ਕਰਨਾ ਹੈ।"
        : "Master client acquisition scripts, proposals, and pricing models to pitch local businesses successfully.",
    },
    {
      num: "07",
      title: isPa ? "07. ਅਗਲਾ ਰੋਡਮੈਪ ਤੇ ਸਕੇਲਿੰਗ (Next Steps & Roadmap)" : "07. Next Steps & Roadmap",
      duration: "10 mins",
      bullets: [
        isPa ? "ਪੋਰਟਫੋਲੀਓ ਬਣਾਉਣਾ" : "Building your portfolio showcase",
        isPa ? "ਕਮਿਊਨਿਟੀ ਤੇ ਲਾਈਫਟਾਈਮ ਸਪੋਰਟ" : "Joining private student community",
      ],
      details: isPa
        ? "ਮਾਸਟਰਕਲਾਸ ਤੋਂ ਬਾਅਦ ਅਗਲੇ 30 ਦਿਨਾਂ ਦਾ ਸਟੈੱਪ-ਬਾਈ-ਸਟੈੱਪ ਪਲਾਨ ਅਤੇ ਲਾਈਫਟਾਈਮ ਗਰੁੱਪ ਸਪੋਰਟ।"
        : "Receive a 30-day action plan, portfolio templates, and entry into our active student support community.",
    },
  ];

  return (
    <section id="curriculum" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        {/* Prominent Live Class Highlight Callout */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/60 px-4 py-2 text-xs sm:text-sm font-black uppercase text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.3)] animate-pulse">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span>
              {isPa
                ? "🔴 100% ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ ਡੈਮੋ ਕਲਾਸ (ਕੋਈ ਰਿਕਾਰਡਿਡ ਵੀਡੀਓ ਨਹੀਂ)"
                : "🔴 100% LIVE INTERACTIVE DEMO CLASS (NO RECORDED VIDEOS)"}
            </span>
          </span>
        </div>

        <SectionTitle
          title={isPa ? "ਡੈਮੋ ਕਲਾਸ ਵਿੱਚ ਕੀ ਸਿੱਖੋਗੇ?" : "What You'll Learn In This Demo Class"}
          subtitle={isPa ? "ਪ੍ਰੌਂਪਟ ਲਿਖਣ ਤੋਂ ਲੈ ਕੇ ਪਹਿਲਾ ਕਲਾਇੰਟ ਲੱਭਣ ਤੱਕ ਪੂਰਾ ਸਟੈੱਪ-ਬਾਈ-ਸਟੈੱਪ ਰੋਡਮੈਪ" : "A step-by-step practical roadmap from your first prompt to getting paid clients."}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          {/* Modules List */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {modules.map((m, i) => {
              const isExpanded = expandedModule === m.num;

              return (
                <Reveal key={m.num} delay={i * 0.04}>
                  <div
                    className={cn(
                      "glass-card rounded-2xl border transition-all duration-300 overflow-hidden",
                      isExpanded ? "border-[#d4f934]/60 bg-[#141414] shadow-[0_0_25px_rgba(212,249,52,0.15)]" : "border-gray-800 hover:border-[#d4f934]/30 bg-[#101010]",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedModule(isExpanded ? null : m.num)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4f934]/40 bg-[#d4f934]/10 text-sm font-black text-[#d4f934]">
                          {m.num}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-extrabold text-white">{m.title}</h3>
                            {m.isLive && (
                              <span className="rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white animate-pulse">
                                🔴 LIVE DEMO
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-[#d4f934]" />
                              <span>{m.duration}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block text-xs font-bold text-[#d4f934]">
                          {isExpanded ? (isPa ? "ਘੱਟ ਵੇਖੋ" : "Hide Details") : (isPa ? "ਵੇਰਵਾ ਵੇਖੋ" : "View Details")}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-gray-300">
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-[#d4f934]" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-gray-800 bg-[#0c0c0c] p-4 sm:p-5">
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium mb-3">
                          {m.details}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2 border-t border-gray-900 pt-3">
                          {m.bullets.map((b) => (
                            <div key={b} className="flex items-center gap-2 text-xs text-gray-300">
                              <CheckCircle2 className="h-4 w-4 text-[#d4f934] shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
              <button
                type="button"
                onClick={openModal}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d4f934] py-4 text-sm sm:text-base font-extrabold text-black shadow-[0_0_30px_rgba(212,249,52,0.4)] hover:bg-[#c2e828] hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer border border-white/20"
              >
                <Rocket className="h-5 w-5 text-black fill-black" />
                <span>{isPa ? "ਹੁਣੇ ਜੁਆਇਨ ਕਰੋ – ₹99" : "Book Your Seat Now – ₹99"}</span>
              </button>
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl border border-[#d4f934]/40 bg-[#121212] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Duration</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#d4f934] bg-[#d4f934]/10 px-2.5 py-1 rounded-full border border-[#d4f934]/30">
                  <Clock className="h-3.5 w-3.5" />
                  <span>90 – 120 Mins</span>
                </span>
              </div>

              <div className="text-center py-3">
                <span className="text-4xl font-black text-white">100%</span>
                <p className="text-xs font-bold text-[#d4f934] uppercase tracking-wide mt-1">
                  {isPa ? "ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ AI ਸਿਖਲਾਈ" : "100% Live Practical Training"}
                </p>
              </div>

              <div className="mt-4 border-t border-gray-800 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4f934] mb-3">
                  {isPa ? "ਤੁਸੀਂ ਕੀ ਸਿੱਖੋਗੇ" : "What You'll Achieve"}
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs text-gray-300">
                  {[
                    isPa ? "AI ਨਾਲ ਵੈੱਬਸਾਈਟ ਬਣਾਉਣ ਦਾ ਤਰੀਕਾ" : "Understand how AI website building works",
                    isPa ? "ਆਪਣੀ ਪਹਿਲੀ AI ਵੈੱਬਸਾਈਟ ਬਣਾਓਗੇ" : "Build your first AI website live",
                    isPa ? "ਇੰਟਰਨੈੱਟ 'ਤੇ ਲਾਈਵ ਪਬਲਿਸ਼ ਕਰਨਾ" : "Publish it live on custom domain",
                    isPa ? "ਫ੍ਰੀਲਾਂਸਰ ਕਲਾਇੰਟ ਅਪਰੋਚ" : "Learn freelance client acquisition workflow",
                    isPa ? "₹5,000 – ₹25,000 ਤੱਕ ਚਾਰਜ ਕਰਨਾ" : "Charge ₹5,000 – ₹25,000 per website",
                    isPa ? "ਲਾਈਫਟਾਈਮ ਰਿਕਾਰਡਿੰਗ ਤੇ ਕਮਿਊਨਿਟੀ" : "Lifetime recording replay & group access",
                  ].map((achieve) => (
                    <li key={achieve} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#d4f934] shrink-0 mt-0.5" />
                      <span className="leading-snug">{achieve}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="lime-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-black shadow-lg cursor-pointer"
              >
                <Rocket className="h-4 w-4" />
                <span>{isPa ? "ਹੁਣੇ ਜੁਆਇਨ ਕਰੋ – ₹99" : "Join Live Class Now – ₹99"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Reference-Layout Bonus Section -------------------------------- */
export function Bonuses() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  const bonuses = [
    {
      title: isPa ? "Official Lovable ਪ੍ਰੀਮੀਅਮ ਸਬਸਕ੍ਰਿਪਸ਼ਨ" : "Official Lovable Premium Subscription",
      subtitle: isPa ? "ਆਫਿਸ਼ੀਅਲ ਪ੍ਰੀਮੀਅਮ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਸ਼ਾਮਲ" : "Official Premium Subscription Included",
      worth: "₹20,000+ Value",
      badge: isPa ? "FREE ਸਾਡੇ ਵੱਲੋਂ" : "FREE From Our Side",
      isFree: true,
      Icon: Sparkles,
    },
    {
      title: isPa ? "ਡੋਮੇਨ + ਹੋਸਟਿੰਗ" : "Domain + Hosting",
      subtitle: isPa ? "ਅਨਲਿਮਟਿਡ ਲਰਨਿੰਗ ਪ੍ਰੋਜੈਕਟਸ ਲਾਈਵ ਕਰੋ" : "Deploy Unlimited Learning Projects",
      worth: "₹5,000+ Value",
      badge: isPa ? "FREE ਸਾਡੇ ਵੱਲੋਂ" : "FREE From Our Side",
      isFree: true,
      Icon: Globe,
    },
    {
      title: isPa ? "ਪ੍ਰੀਮੀਅਮ AI ਪ੍ਰੌਂਪਟ ਲਾਇਬ੍ਰੇਰੀ" : "Premium AI Prompt Library",
      subtitle: isPa ? "ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਵੈੱਬਸਾਈਟ ਪ੍ਰੌਂਪਟਸ" : "Ready-to-Use Website Prompts",
      worth: "₹4,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: Wand2,
    },
    {
      title: isPa ? "ਪ੍ਰੀਮੀਅਮ ਵੈੱਬਸਾਈਟ ਟੈਂਪਲੇਟਸ" : "Premium Website Templates",
      subtitle: isPa ? "ਮਾਡਰਨ ਲੈਂਡਿੰਗ ਪੇਜ ਤੇ ਬਿਜ਼ਨਸ ਵੈੱਬਸਾਈਟਾਂ" : "Modern Landing Pages & Business Websites",
      worth: "₹7,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: Layout,
    },
    {
      title: isPa ? "ਪ੍ਰੀਮੀਅਮ ਫੋਂਟਸ ਤੇ UI ਐਸੇਟਸ" : "Premium Fonts & UI Assets",
      subtitle: isPa ? "ਪ੍ਰੋਫੈਸ਼ਨਲ ਫੋਂਟਸ, ਆਈਕਨਜ਼ ਤੇ UI ਕੰਪੋਨੈਂਟਸ" : "Professional Fonts, Icons & UI Components",
      worth: "₹2,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: Type,
    },
    {
      title: isPa ? "ਵੈੱਬਸਾਈਟ ਬਗ ਫਿਕਸਿੰਗ ਸਿਸਟਮ" : "Website Bug Fixing System",
      subtitle: isPa ? "ਪ੍ਰੋਫੈਸ਼ਨਲ ਵਾਂਗ ਐਰਰ ਤੇ ਬਗਸ ਫਿਕਸ ਕਰੋ" : "Fix Errors Like a Professional",
      worth: "₹4,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: Wrench,
    },
    {
      title: isPa ? "ਵੈੱਬਸਾਈਟ ਸਕਿਓਰਿਟੀ" : "Website Security",
      subtitle: isPa ? "ਹਰੇਕ ਵੈੱਬਸਾਈਟ ਨੂੰ ਸਕਿਓਰ ਤੇ ਸੁਰੱਖਿਅਤ ਕਰੋ" : "Secure & Protect Every Website",
      worth: "₹3,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: ShieldCheck,
    },
    {
      title: isPa ? "ਵੈੱਬਸਾਈਟ ਅੱਪਡੇਟਸ ਤੇ ਮੇਨਟੇਨੈਂਸ" : "Website Updates & Maintenance",
      subtitle: isPa ? "ਵੈੱਬਸਾਈਟਾਂ ਐਡਿਟ, ਇੰਪਰੂਵ ਤੇ ਮੇਨਟੇਨ ਕਰੋ" : "Edit, Improve & Maintain Websites",
      worth: "₹4,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: RefreshCw,
    },
    {
      title: isPa ? "ਵੈੱਬਸਾਈਟ ਹੈਂਡਓਵਰ ਸਿਸਟਮ" : "Website Handover System",
      subtitle: isPa ? "ਕਲਾਇੰਟਸ ਨੂੰ ਪ੍ਰੋਫੈਸ਼ਨਲ ਪ੍ਰੋਜੈਕਟ ਡਿਲੀਵਰੀ" : "Professional Project Delivery",
      worth: "₹2,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: FolderCheck,
    },
    {
      title: isPa ? "ਕਮਿਊਨਿਟੀ ਸਪੋਰਟ" : "Community Support",
      subtitle: isPa ? "ਨਵੇਂ ਅੱਪਡੇਟਸ ਤੇ ਪ੍ਰਾਇਓਰਿਟੀ ਸਪੋਰਟ" : "Future Updates & Priority Support",
      worth: "₹9,999",
      badge: isPa ? "Included" : "Included",
      isFree: false,
      Icon: Users,
    },
  ];

  return (
    <section id="bonuses" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#06070a] border-t border-[#d4f934]/20 relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl text-center relative z-10">
        
        {/* Header Ribbon & Title */}
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-5 py-2 text-xs font-black uppercase tracking-wider text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.3)] mb-4">
            <Gift className="h-4 w-4 text-[#d4f934]" />
            <span>{isPa ? "🎁 ਸਭ ਕੁਝ ਜੋ ਤੁਹਾਨੂੰ ਮਿਲੇਗਾ (EVERYTHING YOU GET)" : "🎁 EVERYTHING YOU GET"}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            {isPa ? (
              <>
                ਸਭ ਕੁਝ <span className="text-purple-400">ਅੱਜ ਸ਼ਾਮਲ</span> ਹੈ
              </>
            ) : (
              <>
                Everything <span className="text-purple-400">Included Today</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-lg text-gray-400 font-semibold max-w-2xl mx-auto">
            {isPa
              ? "ਪ੍ਰੋਫੈਸ਼ਨਲ ਟੂਲਜ਼ • ਲਾਈਵ ਟ੍ਰੇਨਿੰਗ • ਪ੍ਰੀਮੀਅਮ ਰਿਸੋਰਸਜ਼"
              : "Professional Tools • Live Training • Premium Resources"}
          </p>
        </Reveal>

        {/* 10 Bonus Cards Grid matching the attached image design */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
          {bonuses.map((b, idx) => {
            const ItemIcon = b.Icon;
            return (
              <Reveal key={b.title} delay={idx * 0.02}>
                <div
                  className={cn(
                    "flex flex-col justify-between rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.03] h-full group relative overflow-hidden",
                    b.isFree
                      ? "border-emerald-500/50 bg-gradient-to-b from-[#0f1f17] to-[#0a140e] shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400"
                      : "border-gray-800 bg-[#0d0e12] hover:border-[#d4f934]/60 hover:bg-[#12141a] hover:shadow-[0_0_25px_rgba(212,249,52,0.15)]"
                  )}
                >
                  <div>
                    {/* Header Icon + Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-bold shadow-md",
                          b.isFree
                            ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                            : "bg-[#d4f934]/15 border-[#d4f934]/40 text-[#d4f934] group-hover:bg-[#d4f934] group-hover:text-black transition-colors"
                        )}
                      >
                        <ItemIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white leading-snug group-hover:text-[#d4f934] transition-colors">
                          {b.title}
                        </h3>
                        <span className="text-[11px] font-bold text-gray-500 line-through mt-0.5 block">
                          {b.worth}
                        </span>
                      </div>
                    </div>

                    {/* Badge Pill */}
                    <div className="mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase shadow-sm",
                          b.isFree
                            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "bg-emerald-600/90 text-white"
                        )}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 fill-black text-emerald-500" />
                        {b.badge}
                      </span>
                    </div>

                    {/* Subtitle / Description */}
                    <p className="text-xs text-gray-300 font-medium leading-relaxed">
                      {b.subtitle}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Total Value & Price Banner (Matching Image Footer) */}
        <Reveal delay={0.25}>
          <div className="mt-12 rounded-3xl border-2 border-purple-500/40 bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0d091a] p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Total Value Gold Badge */}
            <div className="flex items-center gap-4 rounded-2xl border border-yellow-500/40 bg-gradient-to-b from-yellow-950/40 to-black p-4 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 block">
                  TOTAL VALUE
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-yellow-300 font-sans tracking-tight">
                  ₹75,000+
                </span>
              </div>
            </div>

            {/* Regular Price Cross-out */}
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                REGULAR PRICE
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-500 line-through">
                ₹9,999
              </span>
            </div>

            {/* Live Masterclass Offer Box */}
            <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-purple-400/50 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 p-5 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-purple-200">
                  🎉 {isPa ? "ਅੱਜ ਦੀ ਲਾਈਵ ਡੈਮੋ ਆਫਰ" : "TODAY'S LIVE DEMO OFFER"}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-sans">
                    ₹99
                  </span>
                  <span className="text-lg font-black uppercase text-purple-200">
                    ONLY
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={openModal}
                  className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm sm:text-base font-extrabold text-black shadow-[0_0_25px_rgba(212,249,52,0.5)] hover:scale-105 transition-all cursor-pointer"
                >
                  <Rocket className="h-5 w-5" />
                  <span>{isPa ? "ਹੁਣੇ ਜੁਆਇਨ ਕਰੋ — ₹99" : "Join Demo Class — ₹99"}</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-purple-200">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    ✓ {isPa ? "ਸਿਰਫ਼ ₹99 ਵਿੱਚ ਪੂਰਾ ਪੈਕੇਜ" : "Save ₹9,900 Today"}
                  </span>
                  <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full">
                    🔥 {isPa ? "ਲਿਮਟਿਡ ਸੀਟਾਂ" : "Limited Time"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* -------------------------------- Showcase / Gallery -------------------------------- */
export function Showcase() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  const websites = [
    { title: "Smart Barber Shop", desc: "Local Business Website", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
    { title: "Punjab Agro Products", desc: "E-Commerce Store", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80" },
    { title: "Singh Digital Agency", desc: "Freelancer Portfolio", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
    { title: "Desi Fitness Gym", desc: "Service Booking Site", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl text-center">
        <SectionTitle
          title={isPa ? "ਤੁਸੀਂ ਕਿਸ ਤਰ੍ਹਾਂ ਦੀਆਂ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾ ਸਕਦੇ ਹੋ?" : "Types of Websites You Can Build"}
          subtitle={isPa ? "ਇਹ ਸਾਰੀਆਂ ਵੈੱਬਸਾਈਟਾਂ ਬਿਨਾਂ ਕਿਸੇ ਕੋਡਿੰਗ ਦੇ AI ਟੂਲਜ਼ ਨਾਲ ਬਣ ਸਕਦੀਆਂ ਹਨ" : "All of these websites can be created without writing any code using AI tools"}
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {websites.map((w) => (
            <div
              key={w.title}
              className="glass-card rounded-2xl overflow-hidden border border-gray-800 bg-[#121212] hover:border-[#d4f934]/50 transition-all hover:scale-[1.02]"
            >
              <div className="h-44 w-full overflow-hidden bg-gray-900 relative">
                <img src={w.image} alt={w.title} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 text-left">
                <h4 className="text-sm font-extrabold text-white">{w.title}</h4>
                <p className="text-xs text-gray-400 mt-1 font-medium">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* -------------------------------- Single-Row Auto-Swiping Testimonials Section -------------------------------- */
export function Testimonials() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  const reviews = [
    { name: "Gurpreet Singh", city: "Ludhiana", role: isPa ? "ਵਿਦਿਆਰਥੀ" : "College Student", text: isPa ? "ਇਸ ਕਲਾਸ ਨੇ ਮੇਰੀ ਸੋਚ ਬਦਲ ਦਿੱਤੀ! ਬਿਨਾਂ ਕੋਡਿੰਗ ਦੇ AI ਨਾਲ ਵੈੱਬਸਾਈਟ ਬਣਾਉਣਾ ਸਿੱਖਿਆ।" : "This class changed my thinking! Learnt building websites using AI without any coding." },
    { name: "Maninder Kaur", city: "Amritsar", role: isPa ? "ਫ੍ਰੀਲਾਂਸਰ" : "Freelancer", text: isPa ? "ਬਹੁਤ ਹੀ ਪ੍ਰੈਕਟੀਕਲ ਸੈਸ਼ਨ! ਮੈਂ ਆਪਣੀ ਪਹਿਲੀ ਵੈੱਬਸਾਈਟ ਲਾਈਵ ਕਲਾਸ ਵਿੱਚ ਬਣਾਈ।" : "Super practical session! I built my first website live during the class itself." },
    { name: "Simranjeet Singh", city: "Jalandhar", role: isPa ? "ਕਾਰੋਬਾਰੀ" : "Local Business Owner", text: isPa ? "ਮੇਰੀ ਦੁਕਾਨ ਦੀ ਵੈੱਬਸਾਈਟ ਹੁਣ ਲਾਈਵ ਹੈ। ₹99 ਵਿੱਚ ਸਭ ਤੋਂ ਬੈਸਟ ਨਿਵੇਸ਼ ਸੀ।" : "My shop website is now live! Best ₹99 investment I ever made." },
    { name: "Harpreet Kaur", city: "Mohali", role: isPa ? "ਡਿਜੀਟਲ ਮਾਰਕੀਟਰ" : "Digital Marketer", text: isPa ? "AI ਟੂਲਜ਼ ਤੇ ਪ੍ਰੌਂਪਟਸ ਬਹੁਤ ਕੰਮ ਆਏ। ਹੁਣ ਮੈਂ ਕਲਾਇੰਟਸ ਨੂੰ ਸਰਵਿਸ ਦੇ ਰਿਹਾ ਹਾਂ।" : "The AI tools & prompt list were super helpful. Offering services to clients now." },
    { name: "Jasleen Kaur", city: "Bathinda", role: isPa ? "ਵਿਦਿਆਰਥੀ" : "Student", text: isPa ? "ਸਰ ਨੇ ਬਹੁਤ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਇਆ। ਕੋਈ ਵੀ ਸ਼ੁਰੂਆਤੀ ਬੰਦਾ ਸਿੱਖ ਸਕਦਾ ਹੈ।" : "Instructor explained everything in very simple language. Perfect for beginners." },
    { name: "Amanpreet Singh", city: "Chandigarh", role: isPa ? "ਏਜੰਸੀ ਮਾਲਕ" : "Agency Owner", text: isPa ? "ਕਲਾਇੰਟਸ ਨੂੰ ਪ੍ਰੋਪੋਜ਼ਲ ਭੇਜਣ ਵਾਲਾ ਬੋਨਸ ਟੈਂਪਲੇਟ ਬਹੁਤ ਹੀ ਕਮਾਲ ਦਾ ਹੈ!" : "The client proposal template included in bonuses is absolutely amazing!" },
    { name: "Rajveer Singh", city: "Patiala", role: isPa ? "ਵਿਦਿਆਰਥੀ" : "Student", text: isPa ? "ਇੱਕੋ ਹੀ ਕਲਾਸ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਬਣਾਉਣਾ ਤੇ ਪਬਲਿਸ਼ ਕਰਨਾ ਦੋਵੇਂ ਸਿੱਖ ਲਿਆ।" : "Learnt both website creation and domain publishing in just one single live class." },
    { name: "Navjot Kaur", city: "Hoshiarpur", role: isPa ? "ਕੋਡਿੰਗ ਬਿਨਾਂ ਸ਼ੁਰੂਆਤੀ" : "Non-Coder Beginner", text: isPa ? "ਮੈਨੂੰ ਕੋਡਿੰਗ ਦਾ C ਵੀ ਨਹੀਂ ਆਉਂਦਾ ਸੀ, ਪਰ AI ਨਾਲ ਮੈਂ ਵੈੱਬਸਾਈਟ ਬਣਾ ਲਈ!" : "I didn't know anything about coding, but built a full site with AI tools easily!" },
  ];

  const singleRowMarquee = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="py-20 bg-[#080808] border-t border-[#d4f934]/20 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center mb-10">
        <SectionTitle
          title={isPa ? "ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਅਸਲੀ ਅਨੁਭਵ" : "What Our Students Say"}
          subtitle={isPa ? "ਪੰਜਾਬ ਦੇ 1,000+ ਤੋਂ ਵੱਧ ਵਿਦਿਆਰਥੀ AI ਨਾਲ ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣਾ ਸਿੱਖ ਚੁੱਕੇ ਹਨ!" : "Over 1,000+ students from Ludhiana, Amritsar, Mohali & across Punjab!"}
        />
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
        >
          {singleRowMarquee.map((r, i) => (
            <div
              key={`single-row-${r.name}-${i}`}
              className="w-[300px] sm:w-[340px] shrink-0 glass-card flex flex-col justify-between rounded-2xl p-5 border border-gray-800 hover:border-[#d4f934]/60 bg-[#121212] transition-all hover:scale-[1.02]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase text-[#d4f934] bg-[#d4f934]/10 px-2 py-0.5 rounded-full border border-[#d4f934]/30">
                    {r.city}
                  </span>
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed font-medium">
                  "{r.text}"
                </p>
              </div>

              <div className="mt-4 border-t border-gray-800/80 pt-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4f934]/20 border border-[#d4f934]/40 text-xs font-black text-[#d4f934]">
                  {r.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">{r.name}</h4>
                  <p className="text-[10px] font-medium text-gray-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- Award-Winning Mentor Layout (Khushpreet Singh) -------------------------------- */
export function Instructor() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080808]">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title={isPa ? "ਤੁਹਾਡਾ ਇੰਸਟ੍ਰਕਟਰ (Meet Your Mentor)" : "Meet Your Instructor"}
          subtitle={
            isPa
              ? "ਖੁਸ਼ਪ੍ਰੀਤ ਸਿੰਘ (Khushpreet Singh) — PenduGPT ਦੇ ਸੰਸਥਾਪਕ"
              : "Learn directly from Khushpreet Singh — Founder of PenduGPT"
          }
        />

        <Reveal>
          <div className="rounded-3xl border border-[#d4f934]/30 bg-[#121212] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Photo Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4f934] to-lime-500 opacity-60 blur-lg group-hover:opacity-100 transition duration-500" />
                  <img
                    src="/mentor.png"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/instructor-about.jpg";
                    }}
                    alt="Khushpreet Singh - PenduGPT Founder"
                    className="relative h-64 sm:h-80 w-full max-w-xs object-cover rounded-2xl border-2 border-[#d4f934]/60 shadow-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-extrabold text-white">Khushpreet Singh</h3>
                  <p className="text-xs font-bold text-[#d4f934] uppercase tracking-wider">
                    {isPa ? "ਸੰਸਥਾਪਕ, PenduGPT" : "Founder, PenduGPT"}
                  </p>
                </div>
              </div>

              {/* Right Content Column */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d4f934]/40 bg-[#d4f934]/10 px-3 py-1 text-xs font-bold text-[#d4f934] mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isPa ? "1,000+ ਵਿਦਿਆਰਥੀਆਂ ਦਾ ਮਾਰਗਦਰਸ਼ਕ" : "Mentored 1,000+ Students"}</span>
                </span>

                <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {isPa
                    ? "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ AI ਅਤੇ ਟੈਕਨਾਲੋਜੀ ਸਿਖਾ ਕੇ ਤੁਹਾਨੂੰ ਆਤਮ-ਨਿਰਭਰ ਬਣਾਉਣਾ ਸਾਡਾ ਮਿਸ਼ਨ ਹੈ।"
                    : "Empowering Punjabi youth with practical AI & website development skills."}
                </h4>

                <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                  {isPa
                    ? "ਮੈਂ ਖੁਸ਼ਪ੍ਰੀਤ ਸਿੰਘ ਹਾਂ। ਮੈਂ ਪਿਛਲੇ ਕਈ ਸਾਲਾਂ ਤੋਂ ਟੈਕਨਾਲੋਜੀ ਅਤੇ AI ਡਿਵੈਲਪਮੈਂਟ ਵਿੱਚ ਕੰਮ ਕਰ ਰਿਹਾ ਹਾਂ। PenduGPT ਦੇ ਜ਼ਰੀਏ ਸਾਡਾ ਟੀਚਾ ਹਰ ਪੰਜਾਬੀ ਨੌਜਵਾਨ ਨੂੰ ਬਿਨਾਂ ਕੋਡਿੰਗ AI ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣਾ ਸਿਖਾਉਣਾ ਹੈ ਤਾਂ ਜੋ ਉਹ ਘਰ ਬੈਠੇ ਆਪਣਾ ਫ੍ਰੀਲਾਂਸਿੰਗ ਕੰਮ ਸ਼ੁਰੂ ਕਰ ਸਕਣ।"
                    : "Hi, I'm Khushpreet Singh. Over the years, I've helped hundreds of creators and agency owners build software and websites using AI tools. In this demo class, I share my exact step-by-step framework to build high-converting websites using AI."}
                </p>

                {/* Key Achievements Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-800 bg-[#0c0c0c] p-3">
                    <h5 className="text-xl sm:text-2xl font-black text-[#d4f934]">1,000+</h5>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">
                      {isPa ? "ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਸਟੂਡੈਂਟਸ" : "Students Trained"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-[#0c0c0c] p-3">
                    <h5 className="text-xl sm:text-2xl font-black text-[#d4f934]">100%</h5>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">
                      {isPa ? "ਲਾਈਵ ਡੈਮੋ" : "Live Practical Demo"}
                    </p>
                  </div>
                </div>

                {/* Sub CTA Button */}
                <div className="mt-6 flex justify-start">
                  <button
                    type="button"
                    onClick={openModal}
                    className="lime-button flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs sm:text-sm font-extrabold text-black shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Rocket className="h-4 w-4" />
                    <span>{isPa ? "ਖੁਸ਼ਪ੍ਰੀਤ ਸਿੰਘ ਨਾਲ ਲਾਈਵ ਸਿੱਖੋ – ₹99" : "Learn Live from Khushpreet Singh – ₹99"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- High-Converting Choice / Motivator Banner -------------------------------- */
export function ChoiceMotivator() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#090909] border-t border-[#d4f934]/20 relative overflow-hidden">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/70 px-4 py-1.5 text-xs font-black uppercase text-red-400 shadow-lg animate-pulse mb-4">
            🔥 {isPa ? "ਫ਼ੈਸਲਾ ਤੁਹਾਡਾ ਹੈ" : "MAKE YOUR CHOICE TODAY"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            {isPa ? (
              <>
                ਰੀਲਾਂ ਦੇਖ ਕੇ <span className="text-red-500">ਸਮਾਂ ਬਰਬਾਦ ਕਰੋ</span> ਜਾਂ AI ਨਾਲ <span className="text-[#d4f934]">ਕਮਾਈ ਸ਼ੁਰੂ ਕਰੋ!</span>
              </>
            ) : (
              <>
                Waste Time <span className="text-red-500">Scrolling Reels</span> OR Join Live & <span className="text-[#d4f934]">Start Earning!</span>
              </>
            )}
          </h2>
        </Reveal>

        {/* 2-Option Choice Comparison Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Option A - Negative */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-red-900/50 bg-[#160a0a] p-6 sm:p-8 text-left h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-500 font-black text-lg">✕</span>
                  <h3 className="text-lg font-black text-red-400">{isPa ? "ਵਿਕਲਪ A: ਪੁਰਾਣੀ ਆਦਤ" : "Option A: Do Nothing"}</h3>
                </div>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{isPa ? "ਅਗਲੇ 2-3 ਘੰਟੇ ਇੰਸਟਾਗ੍ਰਾਮ ਰੀਲਾਂ ਵੇਖ ਕੇ ਸਮਾਂ ਖਰਾਬ ਕਰੋ" : "Waste the next 2-3 hours scrolling Instagram reels mindlessly"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{isPa ? "ਕੋਈ ਨਵੀਂ ਸਕਿੱਲ ਨਾ ਸਿੱਖੋ ਤੇ ਉੱਥੇ ਹੀ ਰਹਿ ਜਾਓ" : "Learn 0 new skills and stay stuck in the same routine"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{isPa ? "ਪੈਸੇ ਕਮਾਉਣ ਦੇ ਮੌਕੇ ਗੁਆ ਦਿਓ" : "Miss out on the massive demand for AI website creators"}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-red-900/40 text-xs font-bold text-red-400">
                {isPa ? "ਨਤੀਜਾ: ਜ਼ੀਰੋ ਗ੍ਰੋਥ ਤੇ ਪਛਤਾਵਾ" : "Result: 0 Skill Growth & Regret"}
              </div>
            </div>
          </Reveal>

          {/* Option B - Positive High-Converting Choice */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border-2 border-[#d4f934]/60 bg-[#121c04] p-6 sm:p-8 text-left h-full flex flex-col justify-between shadow-[0_0_50px_rgba(212,249,52,0.2)]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4f934]/20 text-[#d4f934] font-black text-lg">✓</span>
                  <h3 className="text-lg font-black text-[#d4f934]">{isPa ? "ਵਿਕਲਪ B: ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ" : "Option B: Join Live Demo Class"}</h3>
                </div>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-100">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4f934] font-bold">✓</span>
                    <span>{isPa ? "2 ਘੰਟਿਆਂ ਵਿੱਚ ਬਿਨਾਂ ਕੋਡਿੰਗ AI ਵੈੱਬਸਾਈਟ ਬਣਾਉਣਾ ਸਿੱਖੋ" : "Master AI website creation without coding in just 120 mins"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4f934] font-bold">✓</span>
                    <span>{isPa ? "₹75,000+ ਦੇ 8 ਪ੍ਰੀਮੀਅਮ ਬੋਨਸ ਤੇ ਪ੍ਰੌਂਪਟਸ ਮੁਫ਼ਤ ਪ੍ਰਾਪਤ ਕਰੋ" : "Get ₹75,000+ worth of tested prompt vaults & client proposal templates free"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4f934] font-bold">✓</span>
                    <span>{isPa ? "ਫ੍ਰੀਲਾਂਸਰ ਵਜੋਂ ਪੰਜਾਬ ਅਤੇ ਗਲੋਬਲ ਕਲਾਇੰਟਸ ਨੂੰ ਸਰਵਿਸ ਦਿਓ" : "Start pitching real clients and launch your freelance website agency"}</span>
                  </li>
                </ul>
              </div>
              
              <button
                type="button"
                onClick={openModal}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d4f934] py-4 px-6 text-sm sm:text-base font-black text-black shadow-[0_0_30px_rgba(212,249,52,0.5)] hover:bg-[#c4eb25] hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>{isPa ? "ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ਜੁਆਇਨ ਕਰੋ — ₹99" : "Join Live Demo Class Now — ₹99"}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- World-Class High-Converting Compact Offer Section -------------------------------- */
export function Offer() {
  const { lang } = useI18n();
  const { openModal } = useEnrollmentModal();
  const isPa = lang === "pa";

  const handleCheckout = () => {
    openModal();
  };

  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080808] border-t border-[#d4f934]/20">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="inline-block rounded-full bg-[#d4f934]/15 border border-[#d4f934]/40 px-4 py-1.5 text-xs font-black uppercase text-[#d4f934] mb-3 tracking-wider">
            {isPa ? "⚡ 90% ਛੋਟ ਲਿਮਟਿਡ ਸਮੇਂ ਲਈ" : "⚡ 90% OFF LIMITED TIME LAUNCH OFFER"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight">
            {isPa ? (
              <>
                ਆਪਣੀ ਸੀਟ ਹੁਣੇ ਬੁੱਕ ਕਰੋ — ਸਿਰਫ਼ <span className="text-[#d4f934] font-sans">₹99</span> ਵਿੱਚ
              </>
            ) : (
              <>
                Book Your Seat Now — Just <span className="text-[#d4f934] font-sans">₹99</span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-2.5 text-xs sm:text-sm text-gray-400 max-w-lg mx-auto font-medium">
            {isPa
              ? "120 ਮਿੰਟ ਦੀ ਲਾਈਵ AI ਡੈਮੋ ਕਲਾਸ + ₹75,000+ ਦੀ ਕੀਮਤ ਦੇ 8 ਪ੍ਰੀਮੀਅਮ ਬੋਨਸ ਸ਼ਾਮਲ ਹਨ!"
              : "120-Min Live AI Demo Class + 8 Premium Bonuses Included (Worth ₹75,000+)!"}
          </p>
        </Reveal>

        {/* Compact World-Class Payment Card */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-3xl border-2 border-[#d4f934]/60 bg-[#111111] p-5 sm:p-8 shadow-[0_0_70px_rgba(212,249,52,0.3)] text-left relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#d4f934]/20 blur-3xl" />

            {/* Compact 2-Column Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                "Full Live AI Website Demo Class (120 Mins)",
                "Zero-Coding Practical Building Demo",
                "All 8 Premium Bonuses Included (Worth ₹75,000+)",
                "Client Acquisition & Pitching Scripts",
                "50+ AI Prompts & Tool Stack Vault",
                "Lifetime Class Recording Replay Access",
                "Instant Access & Live Class Link",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-gray-100">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4f934]/20 border border-[#d4f934]/50 text-[#d4f934]">
                    <Check className="h-3.5 w-3.5 text-[#d4f934]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Compact Price Strikethrough Row */}
            <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-800/80">
              <span className="text-2xl sm:text-3xl font-bold text-gray-500 line-through">₹1,000</span>
              <span className="text-4xl sm:text-6xl font-black text-[#d4f934] tracking-tight drop-shadow-[0_0_20px_rgba(212,249,52,0.4)]">
                ₹99
              </span>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white uppercase tracking-wider animate-pulse shadow-md">
                90% OFF
              </span>
            </div>

            {/* High-Converting Electric CTA Button */}
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-[#d4f934] py-4 px-6 text-base sm:text-xl font-black text-black shadow-[0_0_40px_rgba(212,249,52,0.6)] hover:bg-[#c2e828] hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer border-2 border-white/20 uppercase tracking-wide"
            >
              <Rocket className="h-5 w-5 text-black fill-black" />
              <span>
                {isPa ? (
                  <>
                    ਲਾਈਵ ਡੈਮੋ ਕਲਾਸ ਹੁਣੇ ਜੁਆਇਨ ਕਰੋ — <span className="line-through opacity-70">₹1,000</span> ₹99
                  </>
                ) : (
                  <>
                    Join Live Demo Class Now — <span className="line-through opacity-70">₹1,000</span> ₹99
                  </>
                )}
              </span>
              <ArrowRight className="h-5 w-5 text-black" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
              <ShieldCheck className="h-4 w-4 text-[#d4f934]" />
              <span>{isPa ? "100% ਸੁਰੱਖਿਅਤ ਚੈੱਕਆਉਟ · ਸੀਟਾਂ ਤੇਜ਼ੀ ਨਾਲ ਭਰ ਰਹੀਆਂ ਹਨ (76% Filled)" : "100% Encrypted Checkout · Seats filling fast (76% Filled)"}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- High-Impact FAQ Section -------------------------------- */
export function Faq() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: isPa ? "ਕੀ ਇਹ ਲਾਈਵ ਕਲਾਸ ਹੈ ਜਾਂ ਰਿਕਾਰਡਿਡ? (Is this live or recorded?)" : "Is this a Live class or recorded videos?",
      a: isPa
        ? "ਇਹ 100% ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ ਡੈਮੋ ਕਲਾਸ ਹੈ! ਕੋਈ ਰਿਕਾਰਡਿਡ ਵੀਡੀਓਜ਼ ਨਹੀਂ ਹਨ। ਤੁਸੀਂ ਲਾਈਵ ਆਪਣੇ ਸਵਾਲ ਪੁੱਛ ਸਕੋਗੇ ਅਤੇ ਅੱਖਾਂ ਦੇ ਸਾਹਮਣੇ ਵੈੱਬਸਾਈਟ ਬਣਦੀ ਵੇਖੋਗੇ।"
        : "This is a 100% LIVE interactive demo class! There are NO pre-recorded videos. You can ask your questions live during the session.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਨੂੰ ਕੋਡਿੰਗ ਆਉਣੀ ਚਾਹੀਦੀ ਹੈ? (Do I need coding knowledge?)" : "Do I need coding knowledge?",
      a: isPa
        ? "ਨਹੀਂ, ਕੋਡਿੰਗ ਦੀ ਬਿਲਕੁਲ ਲੋੜ ਨਹੀਂ! ਇਹ ਕਲਾਸ ਖਾਸ ਤੌਰ 'ਤੇ ਜ਼ੀਰੋ-ਕੋਡਿੰਗ ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ ਬਣਾਈ ਗਈ ਹੈ। ਅਸੀਂ ਨੋ-ਕੋਡ AI ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਾਂਗੇ।"
        : "No coding knowledge is required! This demo class is specially designed for complete beginners using modern no-code AI tools.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਂ ਇਹ ਲੈਪਟੌਪ 'ਤੇ ਕਰ ਸਕਦਾ ਹਾਂ? (Can I do this on a laptop?)" : "Can I do this on a laptop?",
      a: isPa
        ? "ਹਾਂ, ਇੰਟਰਨੈੱਟ ਵਾਲਾ ਕੋਈ ਵੀ ਸਧਾਰਨ ਲੈਪਟੌਪ ਜਾਂ ਡੈਸਕਟੌਪ ਕੰਪਿਊਟਰ ਕਾਫ਼ੀ ਹੈ।"
        : "Yes, any basic laptop or desktop with internet access is sufficient.",
    },
    {
      q: isPa ? "ਜੇ ਮੈਂ ਲਾਈਵ ਕਲਾਸ ਨਾ ਅਟੈਂਡ ਕਰ ਸਕਾਂ? (What if I miss the live class?)" : "What if I miss the live session?",
      a: isPa
        ? "ਕੋਈ ਫਿਕਰ ਨਹੀਂ! ਤੁਹਾਨੂੰ ਪੂਰੀ ਲਾਈਵ ਕਲਾਸ ਦੀ ਲਾਈਫਟਾਈਮ ਰਿਕਾਰਡਿੰਗ ਰੀਪਲੇਅ ਐਕਸੈਸ ਮਿਲੇਗੀ ਤਾਂ ਜੋ ਤੁਸੀਂ ਬਾਅਦ ਵਿੱਚ ਜਦੋਂ ਚਾਹੋ ਵੇਖ ਸਕੋ।"
        : "Don't worry! All registered participants receive lifetime replay recording access to watch anytime.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਨੂੰ ਸਰਟੀਫਿਕੇਟ ਤੇ ਬੋਨਸ ਮਿਲਣਗੇ? (Will I get certificate & bonuses?)" : "Will I get a certificate and all 8 bonuses?",
      a: isPa
        ? "ਹਾਂਜੀ! ਕਲਾਸ ਪੂਰੀ ਕਰਨ 'ਤੇ ਤੁਹਾਨੂੰ ਕੰਪਲੀਸ਼ਨ ਸਰਟੀਫਿਕੇਟ ਅਤੇ ਸਾਰੇ 8 ਪ੍ਰੀਮੀਅਮ ਬੋਨਸ (₹75,000+ ਦੇ) ਬਿਲਕੁਲ ਮੁਫ਼ਤ ਮਿਲਣਗੇ।"
        : "Yes! You will receive a certificate of completion and instant access to all 8 premium bonus resources (Worth ₹75,000+).",
    },
    {
      q: isPa ? "ਕੀ 30 ਦਿਨਾਂ ਦੀ ਮਨੀ-ਬੈਕ ਗਾਰੰਟੀ ਹੈ? (Is there a 30-day refund guarantee?)" : "Is there a 30-day money-back guarantee?",
      a: isPa
        ? "ਹਾਂਜੀ, ਬਿਲਕੁਲ 100%! ਜੇਕਰ ਤੁਹਾਨੂੰ ਕਲਾਸ ਪਸੰਦ ਨਾ ਆਈ, ਤਾਂ ਤੁਸੀਂ ਬਿਨਾਂ ਕਿਸੇ ਸਵਾਲ ਦੇ 100% ਰਿਫੰਡ ਲੈ ਸਕਦੇ ਹੋ।"
        : "Yes! 100% no-questions-asked money-back guarantee if you feel you didn't learn real value.",
    },
    {
      q: isPa ? "ਪੇਮੈਂਟ ਤੋਂ ਬਾਅਦ ਐਕਸੈਸ ਕਿਵੇਂ ਮਿਲੇਗਾ? (How do I get access after payment?)" : "How do I get access after payment?",
      a: isPa
        ? "₹99 ਭਰਨ ਤੋਂ ਤੁਰੰਤ ਬਾਅਦ ਤੁਹਾਨੂੰ ਸਾਡੇ ਪ੍ਰਾਈਵੇਟ VIP ਵਟਸਐਪ ਗਰੁੱਪ ਦਾ ਲਿੰਕ ਅਤੇ ਈਮੇਲ ਕਨਫਰਮੇਸ਼ਨ ਮਿਲ ਜਾਵੇਗੀ।"
        : "Immediately after paying ₹99, you will be redirected to join our private VIP WhatsApp group & receive email confirmation.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਂ ਇਸ ਤੋਂ ਬਾਅਦ ਕਲਾਇੰਟਸ ਲਈ ਕੰਮ ਕਰ ਸਕਦਾ ਹਾਂ? (Can I earn after this?)" : "Can I start offering freelance web design services after this?",
      a: isPa
        ? "ਬਿਲਕੁਲ! ਕਲਾਸ ਵਿੱਚ ਅਸੀਂ ਕਲਾਇੰਟਸ ਨੂੰ ਅਪਰੋਚ ਕਰਨ ਦੇ ਤਰੀਕੇ ਅਤੇ ਪ੍ਰਾਈਸਿੰਗ ਸਕ੍ਰਿਪਟਸ ਵੀ ਸਿਖਾਵਾਂਗੇ।"
        : "Absolutely! We dedicate an entire section to client acquisition scripts and pricing models for local/global clients.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-[#d4f934]/20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title={isPa ? "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ" : "Frequently Asked Questions"}
          subtitle={isPa ? "ਤੁਹਾਡੇ ਸਾਰੇ ਸਵਾਲਾਂ ਦੇ ਸਪੱਸ਼ਟ ਜਵਾਬ" : "Got questions? We've got answers."}
        />

        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={faq.q}
                className={cn(
                  "glass-card rounded-2xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-[#d4f934]/60 bg-[#121212] shadow-[0_0_25px_rgba(212,249,52,0.15)]"
                    : "border-gray-800 hover:border-[#d4f934]/40 bg-[#101010]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left font-extrabold text-sm sm:text-base text-white hover:text-[#d4f934] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#d4f934] shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4f934]/10 text-[#d4f934] font-black text-sm ml-2">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/80 pt-3 bg-[#0d0d0d]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhySkill() { return null; }
export function Roadmap() { return null; }
export function TrustBar() { return null; }
