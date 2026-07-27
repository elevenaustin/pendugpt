import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import demoVideo from "@/assets/demo-video.mp4";
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
  Tag,
  MapPin,
  Code2,
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("volumechange", handleVolumeChange);

    // Initial play attempt - start muted for 100% browser autoplay policy compliance
    video.muted = true;
    setIsMuted(true);
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    const handleUnmuteEvent = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };

    window.addEventListener("unmute-video", handleUnmuteEvent);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("volumechange", handleVolumeChange);
      window.removeEventListener("unmute-video", handleUnmuteEvent);
      if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
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
      if (videoRef.current && !videoRef.current.paused) {
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
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-[#d4f934] bg-black shadow-[0_0_60px_rgba(212,249,52,0.45)] select-none"
    >
      {/* Main Video Element - NO native embedded controls */}
      <video
        ref={videoRef}
        src={demoVideo}
        playsInline
        loop
        preload="auto"
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer rounded-2xl bg-black"
      >
        <source src={demoVideo} type="video/mp4" />
        Your browser does not support playing MP4 videos.
      </video>

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
            {/* Custom Sound Button */}
            <button
              type="button"
              onClick={toggleMute}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold border transition-all cursor-pointer",
                isMuted
                  ? "bg-red-950/80 border-red-500/60 text-red-400 hover:bg-red-900"
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
        
        {/* ----------------- MOBILE ONLY LAYOUT (sm:hidden) ----------------- */}
        <div className="block sm:hidden space-y-6">
          {/* 1. Video Player FIRST (Above title) */}
          <Reveal>
            <div id="demo-mobile">
              <HeroVideoPlayer />
            </div>
          </Reveal>

          {/* 2. Live AI Masterclass Badge */}
          <Reveal delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-bold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>{isPa ? "🔴 ਲਾਈਵ AI ਮਾਸਟਰਕਲਾਸ (Live AI Masterclass)" : "🔴 LIVE AI MASTERCLASS"}</span>
            </div>
          </Reveal>

          {/* 3. Learn AI Website Title */}
          <Reveal delay={0.1}>
            <h1 className="text-3xl font-black leading-tight text-white tracking-tight">
              {isPa ? (
                <>
                  <span className="text-[#d4f934] italic">AI ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ</span> ਸਿੱਖੋ ਤੇ ਫ੍ਰੀਲਾਂਸਿੰਗ ਸ਼ੁਰੂ ਕਰੋ
                </>
              ) : (
                <>
                  Learn <span className="text-[#d4f934] italic">AI Website</span> Building & Start Your Freelancing Journey
                </>
              )}
            </h1>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {isPa
                ? "ਬਿਨਾਂ ਕੋਡਿੰਗ ਦੇ ਸੋਹਣੀਆਂ AI ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣਾ ਸਿੱਖੋ ਅਤੇ ਆਨਲਾਈਨ ਕਲਾਇੰਟ ਲੱਭ ਕੇ ਕਮਾਈ ਸ਼ੁਰੂ ਕਰੋ।"
                : "Learn how to build beautiful AI-powered websites without coding and start getting clients."}
            </p>
          </Reveal>

          {/* 4. Feature Pills */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {[
                isPa ? "ਕੋਡਿੰਗ ਦੀ ਲੋੜ ਨਹੀਂ" : "No Coding Required",
                isPa ? "ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ" : "Beginner Friendly",
                isPa ? "ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ" : "Live Practical Session",
                isPa ? "ਅਸਲੀ ਵੈੱਬਸਾਈਟਾਂ" : "Build Real Websites",
              ].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-800 bg-[#121212] px-3 py-1.5 text-xs font-semibold text-gray-200"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d4f934]" />
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          {/* 5. CTA Buttons */}
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={openModal}
                className="lime-button w-full flex items-center justify-center gap-2 rounded-full py-4 text-base font-extrabold text-black shadow-[0_0_25px_rgba(212,249,52,0.3)] transition-all cursor-pointer"
              >
                <Rocket className="h-5 w-5" />
                <span>{isPa ? "ਜੁਆਇਨ ਕਰੋ – ₹99 (Join Live Class)" : "Join Live Masterclass – ₹99"}</span>
              </button>
            </div>
          </Reveal>

          {/* 6. Student Social Proof */}
          <Reveal delay={0.25}>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {[student1, student2, student3, student4].map((imgSrc, idx) => (
                  <img
                    key={idx}
                    src={imgSrc}
                    alt="Registered Student Profile"
                    className="h-10 w-10 rounded-full border-2 border-[#d4f934] object-cover shadow-lg"
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-300">
                <strong className="text-white">1,000+</strong> {isPa ? "ਵਿਦਿਆਰਥੀ ਰਜਿਸਟਰਡ" : "students registered"}
              </span>
            </div>
          </Reveal>
        </div>

        {/* ----------------- DESKTOP & TABLET LAYOUT (hidden sm:grid) ----------------- */}
        <div className="hidden sm:grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-bold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>{isPa ? "🔴 ਲਾਈਵ AI ਮਾਸਟਰਕਲਾਸ (Live AI Masterclass)" : "🔴 LIVE AI MASTERCLASS"}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
                {isPa ? (
                  <>
                    <span className="text-[#d4f934] italic">AI ਵੈੱਬਸਾਈਟ ਬਿਲਡਿੰਗ</span> ਸਿੱਖੋ ਤੇ ਫ੍ਰੀਲਾਂਸਿੰਗ ਸ਼ੁਰੂ ਕਰੋ
                  </>
                ) : (
                  <>
                    Learn <span className="text-[#d4f934] italic">AI Website</span> Building & Start Your Freelancing Journey
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                {isPa
                  ? "ਬਿਨਾਂ ਕੋਡਿੰਗ ਦੇ ਸੋਹਣੀਆਂ AI ਵੈੱਬਸਾਈਟਾਂ ਬਣਾਉਣਾ ਸਿੱਖੋ ਅਤੇ ਆਨਲਾਈਨ ਕਲਾਇੰਟ ਲੱਭ ਕੇ ਕਮਾਈ ਸ਼ੁਰੂ ਕਰੋ। (Learn AI website building without coding & start freelancing)."
                  : "Learn how to build beautiful AI-powered websites without coding and start getting clients."}
              </p>
            </Reveal>

            {/* Feature Pills */}
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-2.5">
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

            {/* CTA Buttons */}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="lime-button inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-extrabold text-black shadow-[0_0_25px_rgba(212,249,52,0.3)] hover:shadow-[0_0_35px_rgba(212,249,52,0.5)] transition-all cursor-pointer"
                >
                  <Rocket className="h-5 w-5" />
                  <span>{isPa ? "ਜੁਆਇਨ ਕਰੋ – ₹99 (Join Live Class)" : "Join Live Masterclass – ₹99"}</span>
                </button>
              </div>
            </Reveal>

            {/* Student Social Proof */}
            <Reveal delay={0.25}>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[student1, student2, student3, student4].map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt="Registered Student Profile"
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

          {/* Right Column Video Box */}
          <div id="demo" className="lg:col-span-6 w-full">
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

/* -------------------------------- Audience Section -------------------------------- */
export function Audience() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  const items = [
    { title: isPa ? "ਵਿਦਿਆਰਥੀ (Students)" : "Students", desc: isPa ? "ਪੜ੍ਹਾਈ ਦੇ ਨਾਲ ਨਵੇਂ ਹੁਨਰ ਸਿੱਖੋ" : "Learn future-ready skills", icon: GraduationCap },
    { title: isPa ? "ਫ੍ਰੀਲਾਂਸਰ (Freelancers)" : "Freelancers", desc: isPa ? "ਆਪਣੀ ਫ੍ਰੀਲਾਂਸਿੰਗ ਸ਼ੁਰੂ ਕਰੋ" : "Start your freelancing career", icon: Briefcase },
    { title: isPa ? "ਕਾਰੋਬਾਰੀ (Business Owners)" : "Business Owners", desc: isPa ? "ਆਪਣਾ ਬਜ਼ਨੈੱਸ ਆਨਲਾਈਨ ਵਧਾਓ" : "Grow your business with websites", icon: Store },
    { title: isPa ? "ਕ੍ਰੀਏਟਰ (Creators)" : "Creators", desc: isPa ? "ਆਪਣੀ ਆਨਲਾਈਨ ਪਛਾਣ ਬਣਾਓ" : "Build your online presence", icon: Video },
    { title: isPa ? "ਏਜੰਸੀ ਮਾਲਕ (Agency Owners)" : "Agency Owners", desc: isPa ? "ਆਪਣੀਆਂ ਸਰਵਿਸਾਂ ਵਧਾਓ" : "Add websites to your services", icon: Users },
    { title: isPa ? "ਨੌਕਰੀ ਲੱਭਣ ਵਾਲੇ (Job Seekers)" : "Job Seekers", desc: isPa ? "ਰੋਜ਼ਗਾਰ ਲਈ ਹੁਨਰ ਸਿੱਖੋ" : "Boost your profile & get better jobs", icon: UserCheck },
    { title: isPa ? "ਸ਼ੁਰੂਆਤੀ ਲੋਕ (Beginners)" : "Beginners", desc: isPa ? "ਕੋਈ ਪਹਿਲਾ ਤਜਰਬਾ ਨਹੀਂ ਚਾਹੀਦਾ" : "No experience? No problem!", icon: Sparkles },
  ];

  return (
    <section id="audience" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080808]">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={isPa ? "ਇਹ ਕਲਾਸ ਕਿਸ ਲਈ ਹੈ? (Who Should Join?)" : "Who Should Join?"} />

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 0.04}>
                <div className="glass-card flex flex-col items-center justify-center rounded-xl p-4 text-center h-full hover:border-[#d4f934]/50 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4f934]/10 border border-[#d4f934]/30 mb-3">
                    <Icon className="h-6 w-6 text-[#d4f934]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-[11px] text-gray-400 leading-snug">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
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
                ? "🔴 100% ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ ਕਲਾਸ (ਕੋਈ ਰਿਕਾਰਡਿਡ ਵੀਡੀਓ ਨਹੀਂ)"
                : "🔴 100% LIVE INTERACTIVE MASTERCLASS (NO RECORDED VIDEOS)"}
            </span>
          </span>
        </div>

        <SectionTitle
          title={isPa ? "ਮਾਸਟਰਕਲਾਸ ਵਿੱਚ ਕੀ ਸਿੱਖੋਗੇ?" : "What You'll Learn In This Masterclass"}
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
  const isPa = lang === "pa";

  const bonuses = [
    { title: isPa ? "AI ਵੈੱਬਸਾਈਟ ਪ੍ਰੌਂਪਟ ਪੈਕ" : "AI Website Prompt Pack", subtitle: isPa ? "50+ ਟੈਸਟਿਡ AI ਪ੍ਰੌਂਪਟਸ" : "50+ Tested AI Prompts", worth: "₹2,999", savings: "Save ₹2,999", badge: "FREE TODAY" },
    { title: isPa ? "ਵੈੱਬਸਾਈਟ ਡਿਜ਼ਾਈਨ ਲਿਸਟ" : "Website Inspiration List", subtitle: isPa ? "ਬੈਸਟ AI ਲੇਆਉਟਸ ਕਲੈਕਸ਼ਨ" : "High-Converting AI Layouts", worth: "₹1,499", savings: "Save ₹1,499", badge: "FREE TODAY" },
    { title: isPa ? "ਕਲਾਇੰਟ ਪ੍ਰੋਪੋਜ਼ਲ ਟੈਂਪਲੇਟ" : "Client Proposal Template", subtitle: isPa ? "ਤਿਆਰ ਫ੍ਰੀਲਾਂਸਿੰਗ ਪ੍ਰੋਪੋਜ਼ਲ" : "Ready-to-Send Proposal Kit", worth: "₹2,499", savings: "Save ₹2,499", badge: "FREE TODAY" },
    { title: isPa ? "ਇਨਵੌਇਸ ਤੇ ਕੰਟਰੈਕਟ ਟੈਂਪਲੇਟ" : "Invoice & Contract Kit", subtitle: isPa ? "ਪ੍ਰੋਫੈਸ਼ਨਲ ਬਿਲਿੰਗ ਟੈਂਪਲੇਟ" : "Billing & Client Agreements", worth: "₹1,999", savings: "Save ₹1,999", badge: "FREE TODAY" },
    { title: isPa ? "ਕਲਾਇੰਟ ਕੁਐਸਚਨਅਰ ਫਾਰਮ" : "Client Questionnaire", subtitle: isPa ? "ਕਲਾਇੰਟ ਇਨਫੋ ਫਾਰਮ" : "Requirement Gathering Form", worth: "₹1,499", savings: "Save ₹1,499", badge: "FREE TODAY" },
    { title: isPa ? "ਵੈੱਬਸਾਈਟ ਲਾਂਚ ਚੈੱਕਲਿਸਟ" : "Website Launch Checklist", subtitle: isPa ? "25-ਪੁਆਇੰਟ ਕਵਾਲਿਟੀ ਗਾਈਡ" : "25-Point Quality QA Guide", worth: "₹1,999", savings: "Save ₹1,999", badge: "FREE TODAY" },
    { title: isPa ? "AI ਟੂਲਜ਼ ਚੀਟ ਸ਼ੀਟ" : "AI Tools Cheat Sheet", subtitle: isPa ? "ਮੁਫ਼ਤ AI ਟੂਲਜ਼ ਡਾਇਰੈਕਟਰੀ" : "Free Tools & Assets Directory", worth: "₹2,499", savings: "Save ₹2,499", badge: "FREE TODAY" },
    { title: isPa ? "ਫ੍ਰੀਲਾਂਸਿੰਗ ਪ੍ਰਾਈਸਿੰਗ ਵਾਲਟ" : "Freelance Pricing Vault", subtitle: isPa ? "ਪ੍ਰੋਜੈਕਟ ਰੇਟ ਗਾਈਡ" : "Project Rates & Client Scripts", worth: "₹1,999", savings: "Save ₹1,999", badge: "FREE TODAY" },
  ];

  return (
    <section id="bonuses" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#080808] border-t border-[#d4f934]/20">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#d4f934]/60 bg-[#d4f934]/15 px-6 py-2.5 shadow-[0_0_30px_rgba(212,249,52,0.3)] animate-pulse mb-6">
            <Gift className="h-5 w-5 text-[#d4f934]" />
            <span className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
              FREE BONUSES WORTH <span className="text-[#d4f934] font-black">₹14,999</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            {isPa ? "ਸਭ ਕੁਝ ਅੱਜ ਬਿਲਕੁਲ ਮੁਫ਼ਤ" : "All Free Today"}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {bonuses.map((b, idx) => (
            <Reveal key={b.title} delay={idx * 0.03}>
              <div className="glass-card flex flex-col items-center justify-between rounded-2xl p-6 border border-gray-800 bg-[#121212] transition-all duration-300 hover:scale-[1.03] hover:border-[#d4f934] hover:bg-[#161616] hover:shadow-[0_0_30px_rgba(212,249,52,0.15)] h-full group text-center">
                <div className="w-full">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4f934]/15 border border-[#d4f934]/40 text-[#d4f934] group-hover:bg-[#d4f934] group-hover:text-black transition-colors">
                      <Gift className="h-4 w-4" />
                    </div>
                    <span className="rounded-full bg-[#d4f934] px-2.5 py-0.5 text-[10px] font-black uppercase text-black shadow-md">
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-[#d4f934] transition-colors">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 font-medium leading-relaxed">
                    {b.subtitle}
                  </p>
                </div>

                <div className="mt-5 w-full border-t border-gray-800/80 pt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 line-through">{b.worth}</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    {b.savings}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
                <img src={w.image} alt={w.title} className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
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
                    : "Hi, I'm Khushpreet Singh. Over the years, I've helped hundreds of creators and agency owners build software and websites using AI tools. In this masterclass, I share my exact step-by-step framework to build high-converting websites using AI."}
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
                  <h3 className="text-lg font-black text-[#d4f934]">{isPa ? "ਵਿਕਲਪ B: ਲਾਈਵ ਮਾਸਟਰਕਲਾਸ" : "Option B: Join Live Masterclass"}</h3>
                </div>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-100">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4f934] font-bold">✓</span>
                    <span>{isPa ? "2 ਘੰਟਿਆਂ ਵਿੱਚ ਬਿਨਾਂ ਕੋਡਿੰਗ AI ਵੈੱਬਸਾਈਟ ਬਣਾਉਣਾ ਸਿੱਖੋ" : "Master AI website creation without coding in just 120 mins"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4f934] font-bold">✓</span>
                    <span>{isPa ? "₹14,999 ਦੇ 8 ਪ੍ਰੀਮੀਅਮ ਬੋਨਸ ਤੇ ਪ੍ਰੌਂਪਟਸ ਮੁਫ਼ਤ ਪ੍ਰਾਪਤ ਕਰੋ" : "Get ₹14,999 worth of tested prompt vaults & client proposal templates free"}</span>
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
                <span>{isPa ? "ਗੰਭੀਰ ਵਿਦਿਆਰਥੀ ਹੁਣੇ ਸੀਟ ਬੁੱਕ ਕਰਨ — ₹99" : "Serious Students Book Seat Now — ₹99"}</span>
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
              ? "120 ਮਿੰਟ ਦੀ ਲਾਈਵ AI ਮਾਸਟਰਕਲਾਸ + ₹14,999 ਦੀ ਕੀਮਤ ਦੇ 8 ਪ੍ਰੀਮੀਅਮ ਬੋਨਸ ਸ਼ਾਮਲ ਹਨ!"
              : "120-Min Live AI Masterclass + 8 Premium Bonuses Included (Worth ₹14,999)!"}
          </p>
        </Reveal>

        {/* Compact World-Class Payment Card */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-3xl border-2 border-[#d4f934]/60 bg-[#111111] p-5 sm:p-8 shadow-[0_0_70px_rgba(212,249,52,0.3)] text-left relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#d4f934]/20 blur-3xl" />

            {/* Compact 2-Column Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                "Full Live AI Website Masterclass (120 Mins)",
                "Zero-Coding Practical Building Demo",
                "All 8 Bonuses Included (Worth ₹14,999)",
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
              <span className="text-2xl sm:text-3xl font-bold text-gray-500 line-through">₹999</span>
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
              <span>{isPa ? "ਬੁੱਕ ਕਰੋ ਆਪਣੀ ਸੀਟ — ₹99" : "Book Your Seat Now — ₹99"}</span>
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
        ? "ਇਹ 100% ਲਾਈਵ ਪ੍ਰੈਕਟੀਕਲ ਮਾਸਟਰਕਲਾਸ ਹੈ! ਕੋਈ ਰਿਕਾਰਡਿਡ ਵੀਡੀਓਜ਼ ਨਹੀਂ ਹਨ। ਤੁਸੀਂ ਲਾਈਵ ਆਪਣੇ ਸਵਾਲ ਪੁੱਛ ਸਕੋਗੇ ਅਤੇ ਅੱਖਾਂ ਦੇ ਸਾਹਮਣੇ ਵੈੱਬਸਾਈਟ ਬਣਦੀ ਵੇਖੋਗੇ।"
        : "This is a 100% LIVE interactive masterclass! There are NO pre-recorded videos. You can ask your questions live during the session.",
    },
    {
      q: isPa ? "ਕੀ ਮੈਨੂੰ ਕੋਡਿੰਗ ਆਉਣੀ ਚਾਹੀਦੀ ਹੈ? (Do I need coding knowledge?)" : "Do I need coding knowledge?",
      a: isPa
        ? "ਨਹੀਂ, ਕੋਡਿੰਗ ਦੀ ਬਿਲਕੁਲ ਲੋੜ ਨਹੀਂ! ਇਹ ਕਲਾਸ ਖਾਸ ਤੌਰ 'ਤੇ ਜ਼ੀਰੋ-ਕੋਡਿੰਗ ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ ਬਣਾਈ ਗਈ ਹੈ। ਅਸੀਂ ਨੋ-ਕੋਡ AI ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਾਂਗੇ।"
        : "No coding knowledge is required! This masterclass is specially designed for complete beginners using modern no-code AI tools.",
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
        ? "ਹਾਂਜੀ! ਕਲਾਸ ਪੂਰੀ ਕਰਨ 'ਤੇ ਤੁਹਾਨੂੰ ਕੰਪਲੀਸ਼ਨ ਸਰਟੀਫਿਕੇਟ ਅਤੇ ਸਾਰੇ 8 ਪ੍ਰੀਮੀਅਮ ਬੋਨਸ (₹14,999 ਦੇ) ਬਿਲਕੁਲ ਮੁਫ਼ਤ ਮਿਲਣਗੇ।"
        : "Yes! You will receive a certificate of completion and instant access to all 8 premium bonus resources (Worth ₹14,999).",
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
