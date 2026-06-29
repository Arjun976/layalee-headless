'use client';

import React from 'react';
import Link from 'next/link';

export default function CraftedIndoorSection() {
  return (
    <section className="w-full bg-white px-0 lg:px-[30px] xl:px-12 py-10 md:py-14 xl:py-16">
      {/* Background Image Container */}
      <div 
        className="mx-auto max-w-[1720px] relative min-h-[460px] md:min-h-[500px] lg:h-[597px] py-10 md:py-14 lg:py-0 overflow-hidden rounded-none lg:rounded-sm bg-neutral-100 bg-cover bg-[75%_center] md:bg-[80%_center] lg:bg-right bg-no-repeat flex items-center"
        style={{ backgroundImage: "url('/product_d_bg.png')" }}
      >
        {/* Gradient Overlay for Text Readability on Mobile and Tablet */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3EF] via-[#F5F3EF]/90 to-transparent w-full md:w-[75%] lg:w-[55%] z-0" />

        {/* Content Container (Left-aligned on all viewports) */}
        <div className="relative z-10 w-full h-full flex items-center justify-start px-6 sm:px-12 md:px-16 lg:pl-[80px]">
          <div className="w-full max-w-[500px] md:max-w-[550px] lg:max-w-[765px] flex flex-col justify-center">
            
            {/* Header / Title */}
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.0] tracking-tight text-[30px] sm:text-[30px]  lg:text-[64px] tracking-[-1px] lg:tracking-[-1.92px] mb-4 lg:mb-6">
              Crafted for Indoor Living
            </h2>

            {/* Description */}
            <p className="text-[#2C322D]/85 font-sans font-normal leading-relaxed text-[15px] sm:text-[16px] lg:text-[24px] mb-6 lg:mb-8 max-w-[291px] md:max-w-[380px] lg:max-w-[765px]">
              Designed to Elevate Modern Interiors
              <br className="hidden lg:inline" />
              {" "}Crafted with premium materials to bring elegance, greenery, and timeless style into every space.
            </p>

            {/* Badges / Features Group */}
            <div className="flex flex-row items-center gap-6 md:gap-8 mb-6 lg:mb-10">
              
              {/* Badge 1: Durable */}
              <div className="flex items-center gap-2.5 lg:gap-3.5">
                {/* Sun protection / Shield Icon (Gold) */}
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
                <span className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-normal text-[16px] lg:text-[24px] leading-none">
                  Durable
                </span>
              </div>

              {/* Badge 2: Long Lasting */}
              <div className="flex items-center gap-2.5 lg:gap-3.5">
                {/* Time / Clock Icon (Gold) */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] shrink-0">
                  <circle cx="30" cy="30" r="20" stroke="#CC9433" strokeWidth="2.5" />
                  <path d="M30 18V30H42" stroke="#CC9433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-normal text-[16px] lg:text-[24px] leading-none">
                  Long Lasting
                </span>
              </div>
              
            </div>

            {/* Button Link */}
            <div className="flex">
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
              
              {/* Tablet Button: Book Consultation (260px wide, 56px high) */}
              <Link 
                href="/contact"
                className="hidden md:inline-flex lg:hidden items-center justify-center gap-3 bg-[#CC9433] hover:bg-[#b5832a] text-white w-[260px] h-[56px] text-[16px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm group no-underline"
              >
                <span>Book Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* Mobile Button: View All Indoor Planters (290px wide, 54px high) */}
              <Link 
                href="/product"
                className="inline-flex md:hidden items-center justify-center gap-2.5 bg-[#CC9433] hover:bg-[#b5832a] text-white w-[290px] h-[54px] text-[15px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm group no-underline"
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
