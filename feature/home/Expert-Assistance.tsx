'use client';

import React from 'react';
import Link from 'next/link';

export default function ExpertAssistanceSection() {
  return (
    <section className="w-full flex flex-col xl:flex-row items-stretch xl:overflow-hidden xl:max-h-[787px] bg-white" id="expert-assistance">
      {/* Left side: Image */}
      <div className="w-full xl:w-[55%] flex-shrink-0 relative min-h-[300px] md:min-h-[450px] xl:min-h-0">
        <img
          src="assets/expert_assistance.png"
          alt="Expert Assistance"
          className="w-full h-full object-cover block absolute inset-0"
        />
      </div>

      {/* Right side: Content */}
      <div className="w-full xl:w-[45%] bg-[#2C322D] flex flex-col justify-center px-5 py-[60px] md:px-10 xl:p-[60px] 3xl:p-[100px]">
        <div className="flex flex-col gap-10 max-w-[674px]">
          {/* Header */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 items-start">
              <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                Expert Assistance
              </span>
              <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
                Need Help Choosing the Right Planter?
              </h2>
            </div>
            <p className="text-[#F5F3EF] font-['Google_Sans',sans-serif] text-base xl:text-lg xl:max-[1400px]:text-base leading-[1.5]">
              Our team can guide you in selecting the right planter size, material, and suitable plants for your space.
              Whether it&apos;s a balcony, lobby, or garden — we&apos;ve got you covered.
            </p>
          </div>

          {/* Features Grid */}
          <div className="flex flex-wrap gap-x-[35px] gap-y-5 md:gap-x-[52px]">
            {/* Feature 1: Plant Selection */}
            <div className="flex flex-col gap-5 flex-1 min-w-[140px] md:min-w-[180px]">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.5156 33.5156H47.5781V40.5469H44.0625" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.9375 40.5469H12.4219V33.5156H30" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 22.9688V33.5156" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 11.7188V19.4531" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <mask id="mask0_280_5130" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
                  <path d="M0 3.8147e-06H60V60H0V3.8147e-06Z" fill="white" />
                </mask>
                <g mask="url(#mask0_280_5130)">
                  <path d="M30 22.9688H22.9688C17.1434 22.9688 12.4219 18.2473 12.4219 12.4219V8.90625H19.4531C25.2785 8.90625 30 13.6277 30 19.4531V22.9688Z" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M33.5156 33.5156H30C30 25.7496 36.2965 19.4531 44.0625 19.4531H47.5781C47.5781 27.2191 41.2816 33.5156 33.5156 33.5156Z" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M33.5156 11.7188H30C30 5.89336 34.7215 1.17188 40.5469 1.17188H44.0625C44.0625 6.99727 39.341 11.7188 33.5156 11.7188Z" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 60C29.3534 60 28.8281 59.4748 28.8281 58.8281C28.8281 58.1815 29.3534 57.6563 30 57.6563C30.6466 57.6563 31.1719 58.1815 31.1719 58.8281C31.1719 59.4748 30.6466 60 30 60Z" fill="#CC9433" />
                  <path d="M24.7266 58.8281H19.4531L15.9375 40.5469H44.0625L40.5469 58.8281H35.2734" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
              <div className="flex flex-col gap-3">
                <h3 className="text-white font-['Funnel_Display',sans-serif] font-normal leading-[1.2] text-[18px] md:text-[20px] xl:text-[20px] 2xl:text-[24px]">
                  Plant Selection
                </h3>
                <p className="text-[#F5F3EF]/80 font-['Google_Sans',sans-serif] text-sm md:text-lg leading-[1.5]">
                  Suitable plants for your planters
                </p>
              </div>
            </div>

            {/* Feature 2: Size Guidance */}
            <div className="flex flex-col gap-5 flex-1 min-w-[140px] md:min-w-[180px]">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0723 33.9845L33.8143 16.2425C36.5602 13.4967 41.0121 13.4967 43.758 16.2425C46.5039 18.9883 46.5039 23.4402 43.758 26.1862L25.8988 44.0454" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <g clipPath="url(#clip0_280_5159)">
                  <path d="M36.374 21.1396L38.8599 23.6255" stroke="#CC9433" strokeWidth="30" strokeMiterlimit="10" />
                </g>
                <path d="M15.9375 44.1797H51.2109C55.0942 44.1797 58.2422 47.3277 58.2422 51.2109C58.2422 55.0942 55.0942 58.2422 51.2109 58.2422H8.78906" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M22.1484 52.9688V57.8906" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M29.1797 52.9688V57.8906" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M36.2109 52.9688V57.8906" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M43.2422 52.9688V57.8906" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M50.2734 52.9688V57.8906" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M1.75781 8.78906V51.2109C1.75781 55.0942 4.90582 58.2422 8.78906 58.2422C12.6723 58.2422 15.8203 55.0942 15.8203 51.2109V8.78906C15.8203 4.90582 12.6723 1.75781 8.78906 1.75781C4.90582 1.75781 1.75781 4.90582 1.75781 8.78906Z" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M7.03125 37.8516H2.10938" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M7.03125 30.8203H2.10938" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M7.03125 23.7891H2.10938" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M7.03125 16.7578H2.10938" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M7.03125 9.72656H2.10938" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <path d="M7.03125 44.8828H2.10938" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" />
                <defs>
                  <clipPath id="clip0_280_5159">
                    <rect width="3.51562" height="3.51562" fill="white" transform="matrix(0.7071 0.7071 0.7071 -0.7071 35.1309 22.3828)" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-['Funnel_Display',sans-serif] font-normal leading-[1.2] text-[18px] md:text-[20px] xl:text-[20px] 2xl:text-[24px]">
                  Size Guidance
                </h4>
                <p className="text-[#F5F3EF]/80 font-['Google_Sans',sans-serif] text-sm md:text-lg leading-[1.5]">
                  Perfect dimensions for your space
                </p>
              </div>
            </div>

            {/* Feature 3: Material Advice */}
            <div className="flex flex-col gap-5 flex-1 min-w-[140px] md:min-w-[180px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <mask id="mask0_280_5181" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
                  <path d="M59.335 59.335V0.665039H0.665039V59.335H59.335Z" fill="white" stroke="white" strokeWidth="1.33" />
                </mask>
                <g mask="url(#mask0_280_5181)">
                  <path d="M8.90625 51.0938L17.3437 44.0625H44.1797C48.0629 44.0625 51.2109 40.9145 51.2109 37.0313V8.78907C51.2109 4.90582 48.0629 1.75782 44.1797 1.75782H8.90625C5.02301 1.75782 1.75781 4.90582 1.75781 8.78907V37.0313C1.75781 40.9145 5.02301 44.0625 8.90625 44.0625V51.0938Z" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M40.6641 22.9688C40.6641 30.7352 34.2509 37.0312 26.4844 37.0312C18.7179 37.0312 12.4219 30.7352 12.4219 22.9688C12.4219 15.2023 18.7179 8.78906 26.4844 8.78906C34.2509 8.78906 40.6641 15.2023 40.6641 22.9688Z" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.4531 22.9688L24.7266 28.2422L32.893 20.0757" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M51.2109 15.9375C55.0942 15.9375 58.2422 19.0855 58.2422 22.9688V44.0625C58.2422 47.9457 55.0942 51.0938 51.2109 51.0938V58.2422L42.7734 51.0938H26.4844C22.6011 51.0938 19.4531 47.9457 19.4531 44.0625" stroke="#CC9433" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-['Funnel_Display',sans-serif] font-normal leading-[1.2] text-[18px] md:text-[20px] xl:text-[20px] 2xl:text-[24px]">
                  Material Advice
                </h4>
                <p className="text-[#F5F3EF]/80 font-['Google_Sans',sans-serif] text-sm md:text-lg leading-[1.5]">
                  Best materials for your setting
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-start md:mt-5">
            <Link
              href="#"
              className="inline-flex w-[260px] h-[61px] md:h-[67px] justify-center items-center gap-2.5 bg-[#507661] hover:bg-[#456755] text-white font-['Google_Sans',sans-serif] font-medium text-sm md:text-base xl:text-lg transition-colors duration-300 no-underline cursor-pointer border-none"
            >
              Get Expert Advice
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956C10.1935 14.1816 10.5567 14.1816 10.7742 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
