import { motion } from "framer-motion";

export function WebsiteSkeleton() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden select-none">
      {/* 00 — Top Urgency Banner Skeleton */}
      <div className="h-9 w-full bg-[#111111] border-b border-gray-900 flex items-center justify-center px-4">
        <div className="h-3.5 w-72 rounded-full skeleton-shimmer" />
      </div>

      {/* 00 — Navbar Skeleton */}
      <div className="border-b border-gray-900/80 bg-[#0c0d10]/90 px-4 sm:px-8 py-3.5 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl skeleton-shimmer" />
          <div className="h-5 w-28 rounded-lg skeleton-shimmer" />
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="h-7 w-20 rounded-full skeleton-shimmer" />
          <div className="h-9 w-36 rounded-full skeleton-shimmer" />
        </div>
      </div>

      {/* 01 — Hero Section Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 text-center flex flex-col items-center">
        {/* Top Badge Shimmer */}
        <div className="h-7 w-56 rounded-full skeleton-shimmer mb-6" />

        {/* Main Headline Shimmer (2 lines) */}
        <div className="h-10 sm:h-14 w-4/5 max-w-3xl rounded-2xl skeleton-shimmer mb-3" />
        <div className="h-10 sm:h-14 w-3/5 max-w-2xl rounded-2xl skeleton-shimmer mb-6" />

        {/* Subtitle Shimmer */}
        <div className="h-4 sm:h-5 w-2/3 max-w-xl rounded-lg skeleton-shimmer mb-8" />

        {/* Masterclass Video Player Skeleton Box */}
        <div className="w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl border-2 border-[#d4f934]/40 bg-[#111215] shadow-[0_0_50px_rgba(212,249,52,0.15)] flex flex-col items-center justify-center relative overflow-hidden skeleton-shimmer mb-8">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-[#d4f934]/50 flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(212,249,52,0.3)]">
            <div className="h-6 w-6 rounded bg-[#d4f934]/60 animate-pulse" />
          </div>
          <div className="absolute bottom-4 inset-x-6 h-2 rounded-full bg-gray-800/80 overflow-hidden">
            <div className="h-full w-1/3 bg-[#d4f934]/50 rounded-full" />
          </div>
        </div>

        {/* Hero CTA Button Skeleton */}
        <div className="h-14 w-full max-w-md rounded-full skeleton-shimmer mb-4 shadow-[0_0_30px_rgba(212,249,52,0.2)]" />

        {/* Trust Badges Shimmer */}
        <div className="h-4 w-72 rounded-full skeleton-shimmer" />
      </div>

      {/* 02 — Student Proof Section Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-900/60">
        <div className="h-8 w-64 mx-auto rounded-xl skeleton-shimmer mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-48 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-6" />
          <div className="h-48 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-6" />
        </div>
      </div>

      {/* 03 — 7-Class Curriculum Grid Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-900/60">
        <div className="h-8 w-72 mx-auto rounded-xl skeleton-shimmer mb-3" />
        <div className="h-4 w-96 mx-auto rounded-lg skeleton-shimmer mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 rounded-full bg-gray-800" />
                <div className="h-5 w-16 rounded-full bg-gray-800" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded-lg bg-gray-800" />
                <div className="h-3 w-1/2 rounded bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 04 — Stats 2x2 Dashboard Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-900/60">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-5 flex flex-col items-center justify-center gap-2">
              <div className="h-8 w-16 rounded-lg bg-gray-800" />
              <div className="h-3.5 w-24 rounded bg-gray-800" />
            </div>
          ))}
        </div>
      </div>

      {/* 05 — Bonuses & Deliverables Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-900/60">
        <div className="h-8 w-80 mx-auto rounded-xl skeleton-shimmer mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-5" />
          ))}
        </div>
      </div>

      {/* 06 — FAQ Accordion Skeleton */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-900/60 space-y-3">
        <div className="h-8 w-60 mx-auto rounded-xl skeleton-shimmer mb-8" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer" />
        ))}
      </div>
    </div>
  );
}
