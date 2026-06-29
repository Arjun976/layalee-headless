'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CraftedIndoorSection() {
  return (
    <section className="w-full bg-white px-5 md:px-[30px] xl:px-12 py-10 md:py-14 xl:py-16">
      <div className="mx-auto max-w-[1720px] relative h-[444px] md:h-[500px] lg:h-[597px] overflow-hidden bg-neutral-100 rounded-sm">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/product_d_bg.png"
            alt="Crafted for Indoor Living"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1720px"
            className="object-cover object-[72%_center] lg:object-right"
          />
          {/* Subtle overlay on mobile for overlay card readability */}
          <div className="absolute inset-0 bg-black/[0.04] md:bg-transparent z-0" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center md:justify-start px-0 md:px-0">
          
          {/* Content Card Panel
              - Mobile: floating centered card, w-[334px]
              - Tablet: solid left panel, w-[60%] of container height-matched
              - Desktop: transparent panel, left-aligned, w-[765px]
          */}
          <div className="w-full max-w-[334px] bg-white p-6 flex flex-col justify-center rounded-sm shadow-md border border-neutral-100 md:absolute md:left-0 md:top-0 md:bottom-0 md:h-full md:w-[60%] md:max-w-none md:p-10 md:bg-white md:border-r md:border-y-0 md:border-l-0 md:border-neutral-200/50 md:shadow-lg lg:relative lg:left-auto lg:top-auto lg:bottom-auto lg:h-auto lg:w-full lg:max-w-[765px] lg:bg-transparent lg:p-0 lg:border-none lg:shadow-none lg:pl-[80px]">
            
            {/* Header / Title */}
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.1] tracking-tight text-[30px] lg:text-[64px] mb-4 md:mb-6">
              Crafted for Indoor Living
            </h2>

            {/* Description */}
            <p className="text-[#2C322D]/85 font-sans font-normal leading-relaxed text-[16px] lg:text-[24px] mb-6 md:mb-8 max-w-[690px]">
              Designed to Elevate Modern Interiors
              <br className="hidden lg:inline" />
              {" "}Crafted with premium materials to bring elegance, greenery, and timeless style into every space.
            </p>

            {/* Badges / Features Group */}
            <div className="flex flex-row items-center gap-6 md:gap-8 mb-6 md:mb-10">
              
              {/* Badge 1: Durable */}
              <div className="flex items-center gap-2.5 md:gap-3.5">
                {/* Sun protection Icon (Gold) */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] shrink-0">
                  <circle cx="30" cy="30" r="10" stroke="#CC9433" strokeWidth="2.5" />
                  <path d="M30 10V14" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M30 46V50" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 30H14" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M46 30H50" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M15.86 15.86L18.69 18.69" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M41.31 41.31L44.14 44.14" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M15.86 44.14L18.69 41.31" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M41.31 18.69L44.14 15.86" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-normal text-[20px] lg:text-[24px] leading-none">
                  Durable
                </span>
              </div>

              {/* Badge 2: Long Lasting */}
              <div className="flex items-center gap-2.5 md:gap-3.5">
                {/* Time / Clock Icon (Gold) */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] shrink-0">
                  <circle cx="30" cy="30" r="20" stroke="#CC9433" strokeWidth="2.5" />
                  <path d="M30 18V30H42" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-normal text-[20px] lg:text-[24px] leading-none">
                  Long Lasting
                </span>
              </div>
              
            </div>

            {/* Button Link */}
            <div className="flex z-20">
              {/* Responsive Text & Href Buttons */}
              
              {/* Desktop Button: View All Indoor Planters (312px wide, 67px high) */}
              <Link 
                href="/product"
                className="hidden lg:inline-flex items-center justify-center gap-3 bg-[#CC9433] hover:bg-[#b5832a] text-white w-[312px] h-[67px] text-[18px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm group no-underline"
              >
                <span>View All Indoor Planters</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              
              {/* Tablet Button: Book Consultation (223px wide, 56px high) */}
              <Link 
                href="/contact"
                className="hidden md:inline-flex lg:hidden items-center justify-center gap-3 bg-[#CC9433] hover:bg-[#b5832a] text-white w-[223px] h-[56px] text-[16px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm group no-underline"
              >
                <span>Book Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* Mobile Button: View All Indoor Planters (223px wide, 45px high) */}
              <Link 
                href="/product"
                className="inline-flex md:hidden items-center justify-center gap-2.5 bg-[#CC9433] hover:bg-[#b5832a] text-white w-[223px] h-[45px] text-[14px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm group no-underline"
              >
                <span>View All Indoor Planters</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
