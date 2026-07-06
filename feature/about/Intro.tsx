'use client';

import React from 'react';
import Image from 'next/image';

interface AboutIntroProps {
  aboutData?: {
    enabled?: boolean;
    title?: string;
    paragraphs?: { text: string }[];
    ourStoryTitle?: string;
    ourStoryParagraphs?: { text: string }[];
    ourStoryImage?: { url: string };
    craftedHeading?: string;
    craftedDescription?: string;
    craftedImage?: { url: string };
    craftedPoints?: { text: string }[];
  };
}

export default function AboutIntro({ aboutData }: AboutIntroProps) {
  const enabled = aboutData?.enabled !== false;
  if (!enabled) return null;

  // Resolve Title & Main Description
  const title = aboutData?.title || 'Bringing Nature Into Modern Living';
  const paragraphs = aboutData?.paragraphs && aboutData.paragraphs.length > 0
    ? aboutData.paragraphs.map(p => p.text)
    : [
        'At Layale, we believe thoughtfully designed spaces create meaningful experiences. Through premium planters, curated greenery, and expert design guidance, we help transform homes, workplaces, hospitality venues, and outdoor environments into vibrant, inspiring spaces.',
        'Our collection of indoor and outdoor planters combines contemporary aesthetics with exceptional durability, bringing natural elegance to every setting.'
      ];

  // Resolve Our Story Section
  const ourStoryTitle = aboutData?.ourStoryTitle || 'Our Story';
  const ourStoryParagraphs = aboutData?.ourStoryParagraphs && aboutData.ourStoryParagraphs.length > 0
    ? aboutData.ourStoryParagraphs.map(p => p.text)
    : [
        'Layale was created with a passion for design, greenery, and modern living.',
        'We saw the growing desire for beautifully crafted planters that complement contemporary architecture while supporting healthier, greener lifestyles. Today, we work with trusted manufacturers and premium collections to provide planters that combine aesthetics, functionality, and long-lasting performance.',
        'From private residences to hospitality projects and commercial landscapes, Layale helps create spaces where nature becomes part of everyday life.'
      ];
  const ourStoryImage = aboutData?.ourStoryImage?.url || '/bring_img1.png';

  // Resolve Crafted for Every Space Section
  const craftedHeading = aboutData?.craftedHeading || 'Crafted for Every Space';
  const craftedDescription = aboutData?.craftedDescription || 'Whether you\'re styling an indoor corner, enhancing an outdoor terrace, or designing a large-scale landscape project, our collections are curated to suit a wide range of environments and design preferences.';
  const craftedImage = aboutData?.craftedImage?.url || '/bring_img2.png';
  const checklist = aboutData?.craftedPoints && aboutData.craftedPoints.length > 0
    ? aboutData.craftedPoints.map(p => p.text)
    : [
        'Homes & Living Spaces',
        'Rooftops & Patios',
        'Balconies & Terraces',
        'Retail & Hospitality Projects',
        'Offices & Workspaces',
        'Landscape & Outdoor Developments',
      ];

  return (
    <section className="bg-white py-12 md:py-[80px] xl:py-[100px] w-full flex flex-col items-center">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col items-center">
        
        {/* Centered Main Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-12 xl:mb-20 max-w-[1340px]">
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.1] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
            {title}
          </h2>
          <div className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[27px] font-normal max-w-[1276px] flex flex-col gap-4">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Alternating Rows Container */}
        <div className="flex flex-col gap-16 xl:gap-[100px] w-full">
          
          {/* Row 1: Text Left, Image Right */}
          <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-8 xl:gap-14 w-full">
            {/* Text block: Our Story */}
            <div className="flex flex-col items-start text-left xl:w-[48%] w-full gap-5">
              <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.1] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
                {ourStoryTitle}
              </h3>
              <div className="text-[#545955] font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-[18px] leading-[27px] font-normal flex flex-col gap-4">
                {ourStoryParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            
            {/* Image block 1: ourStoryImage */}
            <div className="w-full xl:w-[52%] aspect-[832/335] relative overflow-hidden rounded-[4px] shadow-[0_4px_20px_rgba(44,50,45,0.02)]">
              <Image
                src={ourStoryImage}
                alt={ourStoryTitle}
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1280px) 100vw, 832px"
                priority
              />
            </div>
          </div>

          {/* Row 2: Image Left, Text Right */}
          <div className="flex flex-col-reverse xl:flex-row items-center xl:justify-between gap-8 xl:gap-14 w-full">
            {/* Image block 2: craftedImage */}
            <div className="w-full xl:w-[52%] aspect-[832/335] relative overflow-hidden rounded-[4px] shadow-[0_4px_20px_rgba(44,50,45,0.02)]">
              <Image
                src={craftedImage}
                alt={craftedHeading}
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1280px) 100vw, 832px"
              />
            </div>

            {/* Text block: Crafted for Every Space */}
            <div className="flex flex-col items-start text-left xl:w-[48%] w-full gap-5">
              <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.1] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
                {craftedHeading}
              </h3>
              <p className="text-[#545955] font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-[18px] leading-[1.65] xl:leading-[27px] font-normal">
                {craftedDescription}
              </p>
              
              {/* 2-Column Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 w-full mt-2">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {/* Checkbox square like Figma Rectangle 8 */}
                    <span className="w-[25px] h-[25px] bg-[#507661] flex-shrink-0" />
                    <span className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[16px] md:text-[20px] font-light leading-[22px] tracking-[-0.6px] pt-[2px] whitespace-nowrap">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
