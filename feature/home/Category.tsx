'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    title: 'Indoor Planters',
    image: '/4u_1.png',
    link: '#',
  },
  {
    title: 'Outdoor planters',
    image: '/4u_2.png',
    link: '#',
  },
  {
    title: 'Hanging planters',
    image: '/4u_3.png',
    link: '#',
  },
  {
    title: 'Balcony planters',
    image: '/4u_4.png',
    link: '#',
  },
  {
    title: 'Tray Planter',
    image: '/4u_5.png',
    link: '#',
  },
];

const extendedCategories = [...categories, ...categories, ...categories];

export default function CategorySection() {
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const currentScrollIndex = useRef(categories.length);

  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restartAutoplayDebounced = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adjustTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  }, []);

  const scrollToIndex = useCallback(function scroll(index: number, smooth = true) {
    const slider = sliderRef.current;
    if (slider) {
      const children = slider.children;
      if (children && children[index]) {
        isProgrammaticScroll.current = true;
        const card = children[index] as HTMLElement;
        const targetScroll = card.offsetLeft - slider.offsetLeft;
        slider.scrollTo({
          left: targetScroll,
          behavior: smooth ? 'smooth' : 'auto',
        });
        
        setActiveDot(index % categories.length);

        if (smooth) {
          // If we scrolled to Set C, schedule a silent jump back to Set B
          if (index >= 2 * categories.length) {
            setTimeout(() => {
              currentScrollIndex.current = index - categories.length;
              scroll(currentScrollIndex.current, false);
              isProgrammaticScroll.current = false;
            }, 600);
          } else if (index < categories.length) {
            // If we scrolled to Set A, schedule a silent jump to Set B
            setTimeout(() => {
              currentScrollIndex.current = index + categories.length;
              scroll(currentScrollIndex.current, false);
              isProgrammaticScroll.current = false;
            }, 600);
          } else {
            setTimeout(() => {
              isProgrammaticScroll.current = false;
            }, 600);
          }
        } else {
          isProgrammaticScroll.current = false;
        }
      }
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      if (isProgrammaticScroll.current) return;
      currentScrollIndex.current = currentScrollIndex.current + 1;
      scrollToIndex(currentScrollIndex.current, true);
    }, 3000);
  }, [scrollToIndex, stopAutoplay]);

  const scrollToCard = (index: number) => {
    const targetIndex = index + categories.length;
    currentScrollIndex.current = targetIndex;
    scrollToIndex(targetIndex, true);
  };

  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;

    const slider = sliderRef.current;
    if (slider) {
      const scrollLeft = slider.scrollLeft;
      const clientWidth = slider.clientWidth;
      const children = slider.children;

      if (children && children.length > 0) {
        let closestIndex = 0;
        let minDiff = Infinity;
        const viewportCenter = scrollLeft + clientWidth / 2;

        Array.from(children).forEach((child, index) => {
          const rect = child as HTMLElement;
          if (rect.offsetParent === null) return; // Ignore hidden elements

          const childCenter = (rect.offsetLeft - slider.offsetLeft) + rect.clientWidth / 2;
          const diff = Math.abs(childCenter - viewportCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        });

        setActiveDot(closestIndex % categories.length);
        currentScrollIndex.current = closestIndex;

        // Debounce boundary adjustment during manual scrolling
        if (adjustTimeoutRef.current) clearTimeout(adjustTimeoutRef.current);
        adjustTimeoutRef.current = setTimeout(() => {
          if (closestIndex < categories.length) {
            const newIndex = closestIndex + categories.length;
            currentScrollIndex.current = newIndex;
            isProgrammaticScroll.current = true;
            const targetScroll = (children[newIndex] as HTMLElement).offsetLeft - slider.offsetLeft;
            slider.scrollTo({ left: targetScroll, behavior: 'auto' });
            setTimeout(() => { isProgrammaticScroll.current = false; }, 50);
          } else if (closestIndex >= 2 * categories.length) {
            const newIndex = closestIndex - categories.length;
            currentScrollIndex.current = newIndex;
            isProgrammaticScroll.current = true;
            const targetScroll = (children[newIndex] as HTMLElement).offsetLeft - slider.offsetLeft;
            slider.scrollTo({ left: targetScroll, behavior: 'auto' });
            setTimeout(() => { isProgrammaticScroll.current = false; }, 50);
          }
        }, 150);
      }
    }
  }, []);

  const handleManualInteraction = useCallback(() => {
    isProgrammaticScroll.current = false;
    stopAutoplay();
  }, [stopAutoplay]);

  const handleManualInteractionEnd = useCallback(() => {
    if (restartAutoplayDebounced.current) clearTimeout(restartAutoplayDebounced.current);
    restartAutoplayDebounced.current = setTimeout(() => {
      startAutoplay();
    }, 1000);
  }, [startAutoplay]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // Set initial scroll to Set B on mount (instantly)
      const children = slider.children;
      if (children && children.length > categories.length) {
        const targetCard = children[categories.length] as HTMLElement;
        slider.scrollLeft = targetCard.offsetLeft - slider.offsetLeft;
      }

      slider.addEventListener('scroll', handleScroll, { passive: true });
      slider.addEventListener('touchstart', handleManualInteraction, { passive: true });
      slider.addEventListener('touchend', handleManualInteractionEnd, { passive: true });
      slider.addEventListener('mousedown', handleManualInteraction, { passive: true });
      slider.addEventListener('mouseup', handleManualInteractionEnd, { passive: true });
      slider.addEventListener('mouseleave', handleManualInteractionEnd, { passive: true });
      slider.addEventListener('wheel', () => {
        handleManualInteraction();
        handleManualInteractionEnd();
      }, { passive: true });
    }

    startAutoplay();

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
        slider.removeEventListener('touchstart', handleManualInteraction);
        slider.removeEventListener('touchend', handleManualInteractionEnd);
        slider.removeEventListener('mousedown', handleManualInteraction);
        slider.removeEventListener('mouseup', handleManualInteractionEnd);
        slider.removeEventListener('mouseleave', handleManualInteractionEnd);
      }
      stopAutoplay();
      if (restartAutoplayDebounced.current) clearTimeout(restartAutoplayDebounced.current);
      if (adjustTimeoutRef.current) clearTimeout(adjustTimeoutRef.current);
    };
  }, [handleScroll, handleManualInteraction, handleManualInteractionEnd, startAutoplay, stopAutoplay]);

  return (
    <section className="py-10 md:py-[60px] xl:py-[100px] flex flex-col items-center gap-[30px] md:gap-[35px] xl:gap-10 w-full bg-white" id="categories">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col xl:block gap-[30px] md:gap-10 xl:gap-0">
        
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 text-center order-1 xl:order-none xl:mb-10">
          <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            Curated For You
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
          </span>
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[40px] 2xl:text-[48px] min-[1600px]:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
            Shop by Category
          </h2>
        </div>

        {/* Swipe Slider pagination dots - Hidden on Desktop (xl:hidden) */}
        <div className="flex xl:hidden justify-center items-center gap-3 -mt-[7px] -mb-[7px] md:-mt-[17px] md:-mb-[7px] py-2.5 order-3">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`p-0 w-3.5 h-3.5 rounded-full bg-transparent border cursor-pointer flex items-center justify-center transition-all duration-300 outline-none hover:opacity-70 ${
                index === activeDot ? 'border-[#2C322D]' : 'border-transparent'
              }`}
              aria-label={`Go to category slide ${index + 1}`}
            >
              <div className="w-2 h-2 rounded-full bg-[#2C322D] transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Category Slider Wrapper */}
        <div className="relative w-screen -ml-5 md:-ml-[30px] xl:static xl:w-full xl:m-0 xl:p-0 xl:order-none overflow-hidden pl-5 md:pl-[30px] xl:pl-0 order-2">
          {/* Left white overlay for mobile/tablet to hide scrolled cards initially */}
          <div className="absolute top-0 left-0 w-5 md:w-[30px] h-full bg-white z-10 xl:hidden pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className="flex xl:flex-row overflow-x-auto xl:overflow-x-visible scrollbar-none snap-x snap-mandatory gap-5 md:gap-6 w-full pr-5 md:pr-[30px] xl:p-0"
          >
            {extendedCategories.map((category, index) => {
              const isCloned = index < categories.length || index >= 2 * categories.length;
              return (
                <Link
                  key={index}
                  href={category.link}
                  className={`flex flex-col gap-4 xl:gap-5 no-underline transition-all duration-300 w-[218px] md:w-[325px] xl:w-auto xl:flex-1 flex-shrink-0 snap-start group ${
                    isCloned ? 'xl:hidden' : ''
                  }`}
                >
                  {/* Image Container with Hover Animation */}
                  <div className="h-[216px] md:h-[320px] bg-[#F4F4F4] flex items-center justify-center relative overflow-hidden rounded-[4px] w-full">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 218px, (max-width: 1280px) 325px, 280px"
                      className="object-cover scale-110 group-hover:scale-100 group-hover:blur-[2px] transition-all duration-500"
                    />
                    {/* Hover Button Arrow Overlay */}
                    <div className="absolute top-[calc(50%+10px)] group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-white rounded-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_4px_44px_rgba(0,0,0,0.15)]">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 8H15M15 8L8 1M15 8L8 15"
                          stroke="#2C322D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Title */}
                  <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.6px] md:tracking-[-0.96px] xl:tracking-[-1.8px]">
                    {category.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
