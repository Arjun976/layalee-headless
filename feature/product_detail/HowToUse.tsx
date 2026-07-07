'use client';

import React from 'react';

interface HowToUseData {
  enabled?: boolean;
  imageDesktop?: {
    id?: string;
    url?: string;
  };
  imageTablet?: {
    id?: string;
    url?: string;
  };
  imageMobile?: {
    id?: string;
    url?: string;
  };
  title?: string;
  subtitle?: string; // Maps to the paragraph text from WordPress
}

interface HowToUseProps {
  howToUseData?: HowToUseData;
  desktopBg?: string;
  ipadBg?: string;
  mobileBg?: string;
  hostname?: string;
}

function getClientImageUrl(url?: string, hostname?: string): string {
  if (!url) return '';
  const activeHost = hostname || (typeof window !== 'undefined' ? window.location.hostname : 'localhost');
  if (url.includes('://localhost/')) {
    return url.replace('://localhost/', `://${activeHost}/`);
  }
  if (url.includes('://127.0.0.1/')) {
    return url.replace('://127.0.0.1/', `://${activeHost}/`);
  }
  return url;
}

export default function HowToUse({
  howToUseData,
  desktopBg,
  ipadBg,
  mobileBg,
  hostname,
}: HowToUseProps) {
  // If explicitly disabled in backend, do not render
  if (howToUseData && howToUseData.enabled === false) {
    return null;
  }

  const isDefault = howToUseData === undefined;

  // Resolve background images
  const resolvedDesktopBg = getClientImageUrl(desktopBg || howToUseData?.imageDesktop?.url || '/how_bg.png', hostname);
  const resolvedIpadBg = getClientImageUrl(ipadBg || howToUseData?.imageTablet?.url || '/how_bg_ipad.png', hostname);
  const resolvedMobileBg = getClientImageUrl(mobileBg || howToUseData?.imageMobile?.url || '/how_bg_mobile.png', hostname);

  if (typeof window !== 'undefined') {
    console.log("HowToUse component rendered on client:", {
      imageDesktop: howToUseData?.imageDesktop?.url,
      imageTablet: howToUseData?.imageTablet?.url,
      imageMobile: howToUseData?.imageMobile?.url,
      resolvedDesktopBg,
      resolvedIpadBg,
      resolvedMobileBg
    });
  }

  // Contents
  const title = isDefault ? 'How to use' : (howToUseData.title || 'How to use');
  const description = isDefault
    ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the"
    : (howToUseData.subtitle || '');

  // Determine if we need to crop the default how_bg.png on mobile/tablet
  const isDefaultDesktopBg = resolvedDesktopBg === '/how_bg.png';
  const isDefaultIpadBg = resolvedIpadBg === '/how_bg_ipad.png';
  const isDefaultMobileBg = resolvedMobileBg === '/how_bg_mobile.png';

  return (
    <section className="w-full bg-white px-0 md:px-0 lg:px-[30px] xl:px-10 min-[1600px]:px-[30px] py-10 md:py-14 xl:py-16 flex flex-col items-center">
      {/* 1. DESKTOP VIEWPORT (min-width: 1024px) */}
      <div
        className="hidden lg:block w-full mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:max-w-[1540px]! relative aspect-[1720/657] overflow-hidden rounded-sm bg-neutral-100 bg-cover bg-center bg-no-repeat shadow-sm"
        style={{ backgroundImage: `url('${resolvedDesktopBg}')` }}
      >
        {/* Absolute Overlays for text cards and vectors */}
        <div className="absolute inset-0 z-10 select-none pointer-events-none">
          {/* SVG Connector Lines */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1720 657"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Vector 1 - Left pot to Top-Left Text Box */}
            <path
              d="M 238 426 L 331 333 H 475"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Vector 3 - Left pot bottom to Bottom-Left Text Box */}
            <path
              d="M 249.7 570 V 547 H 212 V 570 H 409"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Vector 5 - Right pot to Top-Right Text Box */}
            <path
              d="M 1441 315 H 1260.5 L 1144 445"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Vector 4 - Right pot bottom to Bottom-Right Text Box */}
            <path
              d="M 1429.6 593 V 559 H 1473 V 593 H 1246"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text and Title (Centered at the top) */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-full max-w-[909px] text-center z-20 px-4">
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.0] tracking-tight text-[48px] tracking-[-1px] mb-6">
            {title}
          </h2>
          <p className="text-[#2C322D]/85 font-sans font-normal leading-relaxed text-[18px] max-w-[909px] mx-auto">
            {description}
          </p>
        </div>

        {/* Dynamic Step Text Cards */}
        {/* Step 1: Pot With Planting Soil And Plant (Left) */}
        <div
          className="absolute z-20 flex items-center justify-center bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-medium text-[20px] shadow-sm text-center leading-[1.5] whitespace-nowrap px-4"
          style={{
            left: '27.62%',
            top: '44.90%',
            width: '358px',
            height: '60px',
          }}
        >
          Pot With Planting Soil And Plant
        </div>

        {/* Step 2: Planting Soil and Plant (Right) */}
        <div
          className="absolute z-20 flex items-center justify-center bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-medium text-[20px] shadow-sm text-center leading-[1.5] whitespace-nowrap px-4"
          style={{
            left: '46.28%',
            top: '62.10%',
            width: '358px',
            height: '60px',
          }}
        >
          Planting Soil and Plant
        </div>

        {/* Step 3: Marking for Drain Hole (Bottom Left) */}
        <div
          className="absolute z-20 flex items-center justify-center bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-medium text-[20px] shadow-sm text-center leading-[1.5] whitespace-nowrap px-4"
          style={{
            left: '22.62%',
            top: '80.52%',
            width: '358px',
            height: '60px',
          }}
        >
          Marking for Drain Hole
        </div>

        {/* Step 4: Marking for Drain Hole (Bottom Right) */}
        <div
          className="absolute z-20 flex items-center justify-center bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-medium text-[20px] shadow-sm text-center leading-[1.5] whitespace-nowrap px-4"
          style={{
            left: '52.62%',
            top: '84.32%',
            width: '358px',
            height: '60px',
          }}
        >
          Marking for Drain Hole
        </div>
      </div>

      {/* 2. TABLET VIEWPORT (768px - 1023px) */}
      <div
        style={{
          backgroundImage: `url('${resolvedIpadBg}')`,
        }}
        className="hidden md:block lg:hidden w-full max-w-[770px] relative aspect-[770/495] bg-[#F5F3EF] bg-cover bg-center bg-no-repeat overflow-hidden rounded-sm shadow-sm"
      >
        {/* Title and Description */}
        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-full text-center z-20 px-10">
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.0] tracking-tight text-[40px] tracking-[-1px] mb-4">
            {title}
          </h2>
          <p className="text-[#2C322D]/85 font-sans font-normal leading-relaxed text-[16px] max-w-[601px] mx-auto">
            {description}
          </p>
        </div>

        {/* SVG Connector Lines for iPad */}
        <div className="absolute inset-0 z-10 select-none pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 770 495"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* iPad Vector 1 */}
            <path
              d="M 86.12 370 L 134.12 322.53 H 208.47"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* iPad Vector 3 */}
            <path
              d="M 91.79 443.82 V 432.22 H 72.41 V 443.82 H 173.67"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* iPad Vector 5 */}
            <path
              d="M 684.25 318.5 H 601.425 L 547.925 379"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* iPad Vector 4 */}
            <path
              d="M 678.6 445.6 V 431.25 H 698.6 V 445.6 H 594.05"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Step Cards for iPad (Flat) */}
        <div
          className="absolute bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20"
          style={{
            left: '21.87%',
            top: '60.90%',
            width: '224px',
            height: '31px',
          }}
        >
          Pot With Planting Soil And Plant
        </div>
        <div
          className="absolute bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20"
          style={{
            left: '15.98%',
            top: '86.47%',
            width: '185px',
            height: '32px',
          }}
        >
          Marking for Drain Hole
        </div>
        <div
          className="absolute bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20"
          style={{
            left: '50.26%',
            top: '72.83%',
            width: '165px',
            height: '29px',
          }}
        >
          Planting Soil and Plant
        </div>
        <div
          className="absolute bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20"
          style={{
            left: '56.92%',
            top: '86.71%',
            width: '164px',
            height: '27px',
          }}
        >
          Marking for Drain Hole
        </div>
      </div>

      {/* 3. MOBILE/IPHONE VIEWPORT (max-width: 767px) */}
      <div
        style={{
          backgroundImage: `url('${resolvedMobileBg}')`,
        }}
        className="block md:hidden w-full max-w-[375px] relative h-[622px] bg-[#F5F3EF] bg-cover bg-center bg-no-repeat overflow-hidden rounded-sm shadow-sm mx-auto"
      >
        {/* Title and Description */}
        <div className="w-full text-center pt-[40px] px-5">
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.0] tracking-tight text-[30px] tracking-[-1px] mb-3">
            {title}
          </h2>
          <p className="text-[#2C322D]/85 font-sans font-normal leading-relaxed text-[15px] max-w-[335px] mx-auto">
            {description}
          </p>
        </div>

        {/* SVG Connector Lines for iPhone */}
        <div className="absolute inset-0 z-10 select-none pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 375 622"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* iPhone Vector 1 */}
            <path
              d="M 59 343 L 104.5 298 H 175"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* iPhone Vector 3 */}
            <path
              d="M 64.37 413 V 402 H 46 V 413 H 142"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* iPhone Vector 5 */}
            <path
              d="M 311 453 H 230.2 L 178 512"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* iPhone Vector 4 */}
            <path
              d="M 305.5 577 V 563 H 325 V 577 H 223"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Step Cards for iPhone (Flat) */}
        <div className="absolute left-[137px] top-[278px] w-[212px] h-[29px] bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20">
          Pot With Planting Soil And Plant
        </div>
        <div className="absolute left-[94px] top-[398px] w-[175px] h-[30px] bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20">
          Marking for Drain Hole
        </div>
        <div className="absolute left-[21px] top-[494px] w-[161px] h-[28px] bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20">
          Planting Soil and Plant
        </div>
        <div className="absolute left-[71px] top-[561px] w-[160px] h-[26px] bg-[#4E7361] text-white font-['Google_Sans',sans-serif] font-normal text-[14px] flex items-center justify-center text-center leading-[1.5] whitespace-nowrap px-2 z-20">
          Marking for Drain Hole
        </div>
      </div>
    </section>
  );
}
