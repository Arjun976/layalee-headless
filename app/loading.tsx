import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#F5F3EF] font-['Google_Sans',sans-serif] overflow-x-hidden">
      
      {/* 1. HERO BANNER SKELETON */}
      <section className="relative overflow-hidden w-full bg-[#F5F3EF] border-b border-gray-200">
        <div className="relative w-full h-[466px] md:h-[578px] xl:h-[786px] flex items-center">
          {/* Image overlay on the right (matching exact layout slide) */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-200/50 animate-pulse hidden xl:block rounded-l-[100px]" />
          
          <div className="flex flex-col justify-center w-full px-5 md:px-10 xl:px-0 mx-auto xl:max-w-[1120px] 2xl:max-w-[1320px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] z-10">
            <div className="max-w-[505px] flex flex-col gap-10 md:gap-[30px] xl:gap-10 animate-pulse">
              {/* Subtitle */}
              <div className="flex items-center gap-3">
                <div className="w-[21px] h-[1px] bg-gray-300" />
                <div className="h-4 w-28 bg-gray-300 rounded" />
              </div>
              {/* Text Group */}
              <div className="flex flex-col gap-5 xl:gap-[30px] max-w-[261px] md:max-w-[453px] xl:max-w-[505px]">
                <div className="space-y-3">
                  <div className="h-10 md:h-12 xl:h-14 w-full bg-gray-400 rounded" />
                  <div className="h-10 md:h-12 xl:h-14 w-2/3 bg-gray-400 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300 rounded" />
                  <div className="h-4 w-5/6 bg-gray-300 rounded" />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex gap-3 md:gap-[21px]">
                <div className="h-10 md:h-12 xl:h-[60px] w-36 md:w-44 bg-gray-400 rounded-sm" />
                <div className="h-10 md:h-12 xl:h-[60px] w-36 md:w-44 bg-gray-300 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION SKELETON */}
      <section className="py-10 md:py-[60px] xl:py-[100px] flex flex-col items-center bg-white border-b border-gray-100" id="categories-skeleton">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col gap-[30px] md:gap-10 xl:gap-0">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center xl:mb-10 animate-pulse w-full">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-[21px] h-[1px] bg-gray-300" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="w-[21px] h-[1px] bg-gray-300" />
            </div>
            <div className="h-8 md:h-12 w-64 bg-gray-400 rounded" />
          </div>

          {/* Categories Horizontal Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-6 w-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4 animate-pulse">
                {/* Round Category circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 xl:w-[210px] xl:h-[210px] rounded-full bg-gray-200 border border-gray-100" />
                {/* Title */}
                <div className="h-5 w-24 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SKELETON */}
      <section className="bg-[#F5F3EF] pt-10 pb-10 md:pt-[60px] xl:pt-[100px] w-full flex flex-col items-center" id="featured-skeleton">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px]">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-10 animate-pulse w-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-[21px] h-[1px] bg-gray-300" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </div>
              <div className="h-8 md:h-12 w-72 bg-gray-400 rounded" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 pb-5 md:pb-6 animate-pulse">
                {/* Image Box */}
                <div className="h-[339px] md:h-[460px] bg-white border border-gray-200 rounded-sm" />
                {/* Text Details */}
                <div className="flex flex-col gap-4">
                  <div className="h-6 w-4/5 bg-gray-300 rounded" />
                  {/* Swatch dots */}
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300" />
                    <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300" />
                    <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Cards Grid */}
          <div className="flex flex-col xl:flex-row gap-5 w-full mt-[60px]">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex-1 min-h-[444px] md:min-h-[620px] p-8 md:p-12 xl:p-[60px] flex flex-col justify-start rounded-[4px] bg-white border border-gray-200 animate-pulse space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[21px] h-[1px] bg-gray-300" />
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                </div>
                <div className="h-10 w-2/3 bg-gray-400 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300 rounded" />
                  <div className="h-4 w-5/6 bg-gray-300 rounded" />
                </div>
                <div className="h-[61px] md:h-[67px] w-[260px] bg-gray-300 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERT ASSISTANCE SKELETON */}
      <section className="w-full flex flex-col xl:flex-row items-stretch bg-white border-b border-gray-200" id="expert-skeleton">
        {/* Left side: Image placeholder */}
        <div className="w-full xl:w-[55%] min-h-[300px] md:min-h-[450px] xl:min-h-[500px] bg-gray-200 animate-pulse" />
        
        {/* Right side: Content container */}
        <div className="w-full xl:w-[45%] bg-gray-50 p-8 md:p-12 xl:p-16 flex flex-col justify-center space-y-8 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-[21px] h-[1px] bg-gray-300" />
            <div className="h-4 w-28 bg-gray-300 rounded" />
          </div>
          <div className="h-8 md:h-12 w-3/4 bg-gray-400 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
          </div>
          {/* Features Grid */}
          <div className="flex flex-wrap gap-6 pt-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex-1 min-w-[140px] space-y-4">
                <div className="w-[60px] h-[60px] rounded-lg bg-gray-200 border border-gray-300" />
                <div className="h-5 w-24 bg-gray-300 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
          <div className="h-[61px] md:h-[67px] w-[260px] bg-gray-400 rounded-sm" />
        </div>
      </section>

      {/* 5. GET INSPIRED SKELETON */}
      <section className="bg-white py-10 md:py-[60px] xl:py-[100px] w-full border-b border-gray-200" id="inspired-skeleton">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center mb-10 animate-pulse w-full">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-[21px] h-[1px] bg-gray-300" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="w-[21px] h-[1px] bg-gray-300" />
            </div>
            <div className="h-8 md:h-12 w-64 bg-gray-400 rounded" />
          </div>

          {/* Inspired Grid */}
          <div className="grid grid-cols-2 xl:grid-cols-[2fr_1fr_1fr] xl:grid-rows-[350px_350px] gap-3 md:gap-5 xl:gap-5 w-full">
            {/* Card 1: Large V */}
            <div className="col-span-2 xl:col-span-1 xl:row-span-2 h-[317px] md:h-[447px] xl:h-[720px] bg-gray-200 animate-pulse rounded-[4px]" />
            {/* Card 2: Medium */}
            <div className="col-span-1 h-[154px] md:h-[316px] xl:h-[350px] bg-gray-200 animate-pulse rounded-[4px]" />
            {/* Card 3: Medium */}
            <div className="col-span-1 h-[154px] md:h-[316px] xl:h-[350px] bg-gray-200 animate-pulse rounded-[4px]" />
            {/* Card 4: Large H */}
            <div className="col-span-2 xl:col-span-2 h-[154px] md:h-[316px] xl:h-[350px] bg-gray-200 animate-pulse rounded-[4px]" />
          </div>
        </div>
      </section>

      {/* 6. PROMISE SECTION SKELETON */}
      <section className="bg-gray-50 py-[60px] md:py-20 xl:py-[100px] w-full flex flex-col items-center border-b border-gray-200" id="promise-skeleton">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px]">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-10 md:mb-[60px] xl:mb-[100px] animate-pulse w-full">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-[21px] h-[1px] bg-gray-300" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="w-[21px] h-[1px] bg-gray-300" />
            </div>
            <div className="h-8 md:h-12 w-64 bg-gray-400 rounded" />
          </div>

          {/* Promise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 xl:gap-10 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-6 text-center animate-pulse">
                {/* Circle */}
                <div className="w-[100px] h-[100px] border border-gray-200 rounded-full flex justify-center items-center bg-white shadow-sm" />
                {/* Text lines */}
                <div className="flex flex-col gap-3 items-center w-full">
                  <div className="h-5 w-32 bg-gray-400 rounded" />
                  <div className="space-y-2 w-full">
                    <div className="h-3.5 w-full bg-gray-300 rounded" />
                    <div className="h-3.5 w-4/5 bg-gray-300 rounded mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NATURE INSPIRED SKELETON */}
      <section className="bg-white py-10 md:py-[60px] xl:py-[100px] w-full" id="nature-inspired-skeleton">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center mb-10 animate-pulse w-full">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-[21px] h-[1px] bg-gray-300" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="w-[21px] h-[1px] bg-gray-300" />
            </div>
            <div className="h-8 md:h-12 w-64 bg-gray-400 rounded" />
          </div>

          {/* Desktop Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[4px] bg-gray-200 animate-pulse aspect-[415/460] w-full"
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
