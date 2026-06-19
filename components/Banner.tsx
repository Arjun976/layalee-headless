'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    subtitle: 'Layale Group',
    title: 'Planters that Shape Spaces',
    description: 'Modern indoor and outdoor planters crafted to bring natural elegance to every space.',
    image: '/banner_img1.png',
    primaryBtnText: 'Shop Planters',
    primaryBtnLink: '#',
    secondaryBtnText: 'Explore Collections',
    secondaryBtnLink: '#',
  },
  {
    subtitle: 'Layale Group',
    title: 'Planters that Shape Spaces',
    description: 'Modern indoor and outdoor planters crafted to bring natural elegance to every space.',
    image: '/banner_img2.png',
    primaryBtnText: 'Shop Planters',
    primaryBtnLink: '#',
    secondaryBtnText: 'Explore Collections',
    secondaryBtnLink: '#',
  },
  {
    subtitle: 'Layale Group',
    title: 'Planters that Shape Spaces',
    description: 'Modern indoor and outdoor planters crafted to bring natural elegance to every space.',
    image: '/banner_img1.png',
    primaryBtnText: 'Shop Planters',
    primaryBtnLink: '#',
    secondaryBtnText: 'Explore Collections',
    secondaryBtnLink: '#',
  },
];

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5-second interval matching the original slider settings
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="relative overflow-hidden w-full bg-[#F5F3EF]">
      {/* Slider Container */}
      <div className="relative w-full h-[466px] md:h-[578px] xl:h-[786px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `linear-gradient(264.99deg, rgba(245, 243, 239, 0) 39.12%, rgb(245, 243, 239) 81.06%), url('${slide.image}')`,
            }}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Banner Content Container */}
            <div className="flex flex-col justify-center h-[466px] md:h-[578px] xl:h-[786px] w-full px-5 md:px-10 xl:px-0 mx-auto xl:max-w-[1120px] 2xl:max-w-[1320px] 3xl:max-w-[1540px]">
              <div className="max-w-[505px] flex flex-col gap-10 md:gap-[30px] xl:gap-10">
                
                {/* Text Group */}
                <div className="flex flex-col gap-5 xl:gap-[30px] max-w-[261px] md:max-w-[453px] xl:max-w-[505px]">
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-3 text-[#CC9433] text-[14px] md:text-[16px] xl:text-[18px] font-sans font-normal tracking-[1.4px] md:tracking-[1.6px] xl:tracking-[1.8px] uppercase">
                      <div className="w-[21px] h-[1px] bg-[#CC9433]" />
                      {slide.subtitle}
                    </span>
                    <h1 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-none m-0 text-[36px] md:text-[48px] xl:text-[54px] 2xl:text-[64px] 3xl:text-[80px] tracking-[-1.08px] md:tracking-[-1.44px] xl:tracking-[-1.62px] 3xl:tracking-[-2.4px]">
                      {slide.title}
                    </h1>
                  </div>
                  <p className="text-[#545955] text-base xl:text-[22px] font-sans font-normal leading-normal">
                    {slide.description}
                  </p>
                </div>

                {/* Actions Button Row */}
                <div className="flex gap-3 md:gap-[21px]">
                  <Link
                    href={slide.primaryBtnLink}
                    className="inline-flex justify-center items-center gap-2.5 bg-[#507661] text-white hover:bg-[#3d5a49] transition-colors duration-300 font-sans text-[14px] xl:text-[18px] font-medium leading-[1.3] py-2 px-4 md:py-3 md:px-[20px] xl:py-5 xl:px-10 border-0 cursor-pointer no-underline rounded-sm"
                  >
                    {slide.primaryBtnText}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956C10.1935 14.1816 10.5567 14.1816 10.7742 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z" fill="white" />
                    </svg>
                  </Link>
                  <Link
                    href={slide.secondaryBtnLink}
                    className="inline-flex justify-center items-center gap-2.5 border border-[#525252]/40 bg-transparent text-[#525252] hover:bg-[#525252]/5 transition-colors duration-300 font-sans text-[14px] xl:text-[18px] font-medium leading-[1.3] py-2 px-4 md:py-3 md:px-[20px] xl:py-5 xl:px-10 cursor-pointer no-underline rounded-sm"
                  >
                    {slide.secondaryBtnText}
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <a href="#categories" className="hidden xl:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-white hover:text-[#CC9433] uppercase tracking-[6.4px] text-[16px] no-underline z-20 group transition-colors duration-300">
        <div className="w-[1px] h-[60px] bg-white/40 relative overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-[10px] after:bg-white after:animate-[scroll-flow_3s_infinite_ease-in-out]" />
        <span className="font-sans font-medium text-[12px] opacity-80 group-hover:opacity-100 transition-opacity">Scroll</span>
      </a>

      {/* Slide Navigation Pagination Dots */}
      <div className="hidden xl:flex absolute right-[100px] top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center ${
              index === activeSlide
                ? 'w-3.5 h-3.5 rounded-full border border-white bg-transparent'
                : 'w-2 h-2 rounded-full bg-white opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === activeSlide && <div className="w-2 h-2 rounded-full bg-white" />}
          </button>
        ))}
      </div>
    </section>
  );
}
