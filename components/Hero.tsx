'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/fox_B_1.png',
  // Assuming other images exist or will be added, e.g., '/fox_B_2.png', '/fox_B_3.png'
  '/fox_B_1.png', 
  '/fox_B_1.png',
];

const colors = [
  { name: 'Yellow', value: '#E8C35D' },
  { name: 'Green', value: '#517C64' },
  { name: 'Grey', value: '#A9A9A9' },
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F9F8F3] font-sans">
      {/* Hero Image */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <Image
          src={images[currentIdx]}
          alt="Modern Planter"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-10 md:px-24 lg:px-40">
        <div className="max-w-3xl text-white">
          <h2 className="mb-2 text-sm font-semibold tracking-[0.2em] uppercase opacity-80">
            Layale Group
          </h2>
          <h1 className="mb-8 text-6xl font-bold leading-[1.1] md:text-8xl">
            Planters that <br />
            <span className="italic font-light">Shape Spaces</span>
          </h1>
          <p className="mb-12 max-w-lg text-lg leading-relaxed opacity-90">
            Modern indoor and outdoor planters designed to enhance your lifestyle and bring nature closer to you.
          </p>
          <div className="flex gap-6">
            <button className="flex items-center gap-3 bg-white px-10 py-5 text-sm font-bold tracking-widest text-black uppercase hover:bg-zinc-100 transition-all">
              Shop Planters
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="px-10 py-5 text-sm font-bold tracking-widest text-white uppercase border border-white hover:bg-white/10 transition-all">
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Color Badges (Vertical Switcher) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
        {colors.map((color, index) => (
          <button
            key={color.name}
            onClick={() => setCurrentIdx(index)}
            className={`group relative flex items-center justify-center`}
          >
            {/* Outer Ring for Active State */}
            <div className={`absolute h-6 w-6 rounded-full border border-white transition-all duration-300 ${
              currentIdx === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`} />
            {/* Color Dot */}
            <div 
              className={`h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125`}
              style={{ backgroundColor: color.value }}
            />
            {/* Label (Optional) */}
            <span className="absolute right-10 text-[10px] font-bold tracking-widest uppercase text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
              {color.name}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Controls (As per screenshot) */}
      <div className="absolute bottom-0 left-0 z-30 flex">
        <button
          onClick={handlePrev}
          className="bg-white p-8 text-black hover:bg-zinc-100 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="bg-[#517C64] p-8 text-white hover:bg-[#436752] transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Progress / Scroll Indicator */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white opacity-60">
          Scroll
        </span>
        <div className="h-10 w-[1px] bg-white/30 relative">
          <div className="absolute top-0 left-0 w-full bg-white transition-all duration-500" style={{ height: '30%' }} />
        </div>
      </div>
    </section>
  );
}
