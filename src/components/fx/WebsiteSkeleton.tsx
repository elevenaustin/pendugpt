import { motion } from "framer-motion";

export function WebsiteSkeleton() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden select-none">
      {/* Top Banner Skeleton */}
      <div className="h-9 w-full bg-[#111111] border-b border-gray-900 flex items-center justify-center px-4">
        <div className="h-3.5 w-64 rounded-full skeleton-shimmer" />
      </div>

      {/* Navbar Skeleton */}
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

      {/* Hero Content Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 text-center flex flex-col items-center">
        {/* Top Badge Shimmer */}
        <div className="h-7 w-56 rounded-full skeleton-shimmer mb-6" />

        {/* Main Headline Shimmer (2 lines) */}
        <div className="h-10 sm:h-14 w-4/5 max-w-3xl rounded-2xl skeleton-shimmer mb-3" />
        <div className="h-10 sm:h-14 w-3/5 max-w-2xl rounded-2xl skeleton-shimmer mb-6" />

        {/* Subtitle Shimmer */}
        <div className="h-4 sm:h-5 w-2/3 max-w-xl rounded-lg skeleton-shimmer mb-8" />

        {/* Video Player Skeleton Box */}
        <div className="w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl border-2 border-[#d4f934]/40 bg-[#111215] shadow-[0_0_50px_rgba(212,249,52,0.15)] flex flex-col items-center justify-center relative overflow-hidden skeleton-shimmer mb-8">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-[#d4f934]/50 flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(212,249,52,0.3)]">
            <div className="h-6 w-6 rounded bg-[#d4f934]/60 animate-pulse" />
          </div>
          <div className="absolute bottom-4 inset-x-6 h-2 rounded-full bg-gray-800/80 overflow-hidden">
            <div className="h-full w-1/3 bg-[#d4f934]/50 rounded-full" />
          </div>
        </div>

        {/* CTA Button Skeleton */}
        <div className="h-14 w-full max-w-md rounded-full skeleton-shimmer mb-4 shadow-[0_0_30px_rgba(212,249,52,0.2)]" />
        
        {/* Trust Badges Shimmer */}
        <div className="h-4 w-72 rounded-full skeleton-shimmer" />

        {/* Cards Row Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mt-12">
          <div className="h-48 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-6" />
          <div className="h-48 rounded-2xl border border-gray-900 bg-[#121316] skeleton-shimmer p-6" />
        </div>
      </div>
    </div>
  );
}
