'use client';

import React, { useEffect } from 'react';

export default function Loading() {
  useEffect(() => {
    // Disable scroll on page body when loader mounts
    document.body.classList.add('overflow-hidden');
    
    // Clean up: restore scroll function when loader unmounts (after API data loads)
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#F5F3EF] z-[9999] flex flex-col overflow-hidden select-none touch-none font-['Google_Sans',sans-serif]">
      
      {/* 1. TOP GREEN ANNOUNCEMENT STRIP (Desktop only) */}
      <div className="hidden xl:block bg-[#507661] w-full h-[44px] animate-pulse" />

      {/* 2. MOCK WHITE NAVBAR */}
      <header className="w-full bg-white h-[60px] md:h-[80px] xl:h-[100px] border-b border-gray-100 flex items-center justify-between px-5 md:px-[30px] xl:px-10 animate-pulse">
        {/* Brand Logo Placeholder (Left) */}
        <div className="h-10 xl:h-[74px] w-28 xl:w-40 bg-gray-200 rounded-sm" />

        {/* Navigation & Action Placeholders (Right) */}
        <div className="flex items-center gap-11">
          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-[44px]">
            <div className="h-4.5 w-16 bg-gray-200 rounded" />
            <div className="h-4.5 w-16 bg-gray-200 rounded" />
            <div className="h-4.5 w-16 bg-gray-200 rounded" />
            <div className="h-4.5 w-16 bg-gray-200 rounded" />
          </nav>
          {/* Action icon shapes */}
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <div className="w-6 h-6 rounded-full bg-gray-200" />
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER SKELETON (Exact Size & Background) */}
      <section className="relative overflow-hidden w-full bg-[#F5F3EF] h-[466px] md:h-[578px] xl:h-[786px] flex items-center">
        
        {/* Exact same background color and blending gradient overlay (No static image files loaded) */}
        <div
          style={{
            backgroundImage: "linear-gradient(264.99deg, rgba(245, 243, 239, 0) 39.12%, rgb(245, 243, 239) 81.06%)",
          }}
          className="absolute inset-0 w-full h-full bg-[#F5F3EF] z-0"
        />

        {/* Pulsing image placeholder block on the right (matches layout slide shape) */}
        <div className="absolute right-0 top-0 w-full xl:w-1/2 h-full bg-gray-200/50 animate-pulse rounded-l-[100px] hidden xl:block z-0" />

        {/* Content Details aligned to left */}
        <div className="flex flex-col justify-center h-full w-full px-5 md:px-10 xl:px-0 mx-auto xl:max-w-[1120px] 2xl:max-w-[1320px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] z-10 animate-pulse">
          <div className="max-w-[505px] flex flex-col gap-10 md:gap-[30px] xl:gap-10">
            
            {/* Subtitle */}
            <div className="flex items-center gap-3">
              <div className="w-[21px] h-[1px] bg-gray-300" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
            </div>

            {/* Title & Description Lines */}
            <div className="flex flex-col gap-5 xl:gap-[30px] w-[261px] md:w-[453px] xl:w-[505px]">
              <div className="space-y-3">
                <div className="h-10 md:h-12 xl:h-14 w-full bg-gray-400 rounded" />
                <div className="h-10 md:h-12 xl:h-14 w-2/3 bg-gray-400 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-5/6 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex gap-3 md:gap-[21px]">
              <div className="h-10 md:h-12 xl:h-[60px] w-36 md:w-44 bg-gray-400 rounded-sm" />
              <div className="h-10 md:h-12 xl:h-[60px] w-36 md:w-44 bg-gray-300 rounded-sm" />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
