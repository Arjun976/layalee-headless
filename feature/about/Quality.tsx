'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutQuality() {
  const specsList = [
    {
      title: 'German Polymer Technology',
      desc: 'Manufactured using premium materials for superior strength and durability.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: 'UV Protected & Weather Resistant',
      desc: 'Designed to withstand harsh outdoor conditions while maintaining their appearance.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      title: 'Lightweight Construction',
      desc: 'Easy to handle, install, and reposition without compromising durability.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      ),
    },
    {
      title: 'Built To Last',
      desc: 'Engineered for long-term performance with a lifespan of over 10 years.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="w-full flex flex-col xl:flex-row items-stretch text-white" 
      style={{ backgroundColor: '#2C322D' }}
      id="quality-trust-section"
    >
      {/* Left Side: Title and Specs Grid */}
      <div className="w-full xl:w-[45%] flex flex-col justify-center py-16 xl:py-24 px-5 md:px-[30px] xl:pl-20 xl:pr-10">
        <div className="flex flex-col gap-10 max-w-[674px]">
          {/* Heading Block */}
          <div className="flex flex-col gap-4 text-left">
            <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.1] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
              Quality You Can Trust
            </h2>
            <p className="text-[#F5F3EF]/85 font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-relaxed">
              Every planter is selected with a focus on performance, longevity, and design excellence.
            </p>
          </div>

          {/* Specs 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {specsList.map((spec, idx) => (
              <div key={idx} className="flex flex-col items-start gap-4 text-left">
                <div className="w-[60px] h-[60px] bg-[#507661]/10 rounded-full flex items-center justify-center text-[#CC9433]">
                  {spec.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-['Funnel_Display',sans-serif] text-[18px] md:text-[20px] font-normal leading-tight">
                    {spec.title}
                  </h3>
                  <p className="text-[#F5F3EF]/70 font-['Google_Sans',sans-serif] text-sm md:text-[15px] leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Quality Image (Edge-to-Edge) */}
      <div className="w-full xl:w-[55%] min-h-[400px] md:min-h-[500px] xl:min-h-[789px] relative overflow-hidden">
        <Image
          src="/quality_img.png"
          alt="Quality You Can Trust Planter Curation"
          fill
          className="object-cover hover:scale-[1.02] transition-transform duration-[800ms]"
          sizes="(max-width: 1280px) 100vw, 1050px"
        />
      </div>
    </section>
  );
}
