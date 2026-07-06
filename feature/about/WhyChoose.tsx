'use client';

import React from 'react';

interface WhyChooseItem {
  title?: string;
  desc?: string;
  icon?: string;
}

interface WhyChooseProps {
  whyChooseData?: {
    enabled?: boolean;
    subtitle?: string;
    title?: string;
    items?: WhyChooseItem[];
  };
}

export default function WhyChoose({ whyChooseData }: WhyChooseProps) {
  const enabled = whyChooseData?.enabled !== false;
  if (!enabled || !whyChooseData?.items || whyChooseData.items.length === 0) {
    return null;
  }

  const subtitle = whyChooseData.subtitle || 'Why Choose Us';
  const title = whyChooseData.title || 'Excellence in Every Detail';
  const items = whyChooseData.items;

  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#CC9433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section className="bg-white py-16 md:py-24 w-full flex flex-col items-center">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col items-center gap-12 xl:gap-[60px]">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-[800px] w-full">
          <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            {subtitle}
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
          </span>
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
            {title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-4">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-start gap-4 p-6 bg-[#F5F3EF]/40 hover:bg-[#F5F3EF]/80 transition-colors duration-300 rounded-[4px] text-left border border-neutral-100"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 flex-shrink-0">
                {item.icon ? (
                  <div 
                    className="w-6 h-6 text-[#CC9433] flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                ) : defaultIcon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[22px] font-medium leading-tight">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="text-[#545955] font-['Google_Sans',sans-serif] text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
