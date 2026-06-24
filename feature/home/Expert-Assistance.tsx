'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ExpertAssistanceProps {
  homepage?: any;
}

interface FeatureItem {
  title: string;
  description: string;
  iconHtml?: string;
  fallbackIcon?: React.ReactNode;
}

function mapUrl(url: string): string {
  if (!url) return '#';
  if (url.startsWith('/') || url.startsWith('#')) return url;
  
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    
    // Strip WordPress subdirectory if present (e.g. /layale_be, /layale)
    const wpBases = ['/layale_be', '/layale'];
    for (const wpBase of wpBases) {
      if (pathname.startsWith(wpBase)) {
        pathname = pathname.substring(wpBase.length);
      }
    }
    
    // Normalize trailing slash
    if (pathname.endsWith('/') && pathname.length > 1) {
      pathname = pathname.slice(0, -1);
    }
    
    // Specific mappings matching standard config/headers
    if (pathname === '/category') return '/portrait';
    if (pathname === '/landscape') return '#';
    if (pathname === '') return '/';
    
    return pathname;
  } catch (error) {
    return url.startsWith('/') ? url : `/${url}`;
  }
}

export default function ExpertAssistanceSection({ homepage }: ExpertAssistanceProps) {
  if (!homepage) {
    return null;
  }

  // Parse homeCommonOptions
  let homeCommonOptions: any = null;
  if (homepage.homeCommonOptions) {
    try {
      homeCommonOptions = typeof homepage.homeCommonOptions === 'string'
        ? JSON.parse(homepage.homeCommonOptions)
        : homepage.homeCommonOptions;
    } catch (e) {
      console.error("Error parsing homeCommonOptions in ExpertAssistance:", e);
    }
  }

  const expertFieldset = homeCommonOptions?.expert_assistance_fieldset || {};
  const expertEnabled = expertFieldset.expert_enable !== '0' && expertFieldset.expert_enable !== false;

  if (!expertEnabled) {
    return null;
  }

  const expertImage = expertFieldset.expert_image?.url || '/assets/expert_assistance.png';
  const subtitle = expertFieldset.expert_subtitle || 'Expert Assistance';
  const title = expertFieldset.expert_title || 'Need Help Choosing the Right Planter?';
  const description = expertFieldset.expert_description || 'Our team can guide you in selecting the right planter size, material, and suitable plants for your space. Whether it\'s a balcony, lobby, or garden — we\'ve got you covered.';

  const rawFeatures = expertFieldset.expert_features || [];
  const mappedFeatures: FeatureItem[] = rawFeatures.map((f: any) => ({
    title: f.expert_feature_title || '',
    description: f.expert_feature_description || '',
    iconHtml: f.expert_feature_icon || ''
  }));
  const displayFeatures = mappedFeatures;
  if (displayFeatures.length === 0) {
    return null;
  }

  const buttonText = expertFieldset.expert_button_text || 'Get Expert Advice';
  const buttonLink = mapUrl(expertFieldset.expert_button_link?.url || '#');

  return (
    <section className="w-full flex flex-col xl:flex-row items-stretch xl:overflow-hidden xl:max-h-[787px] bg-white" id="expert-assistance">
      {/* Left side: Image */}
      <div className="w-full xl:w-[55%] flex-shrink-0 relative min-h-[300px] md:min-h-[450px] xl:min-h-[500px]">
        <Image
          src={expertImage}
          alt={title}
          fill
          sizes="(max-width: 1280px) 100vw, 55vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Right side: Content */}
      <div className="w-full xl:w-[45%] bg-[#2C322D] flex flex-col justify-center px-5 py-[60px] md:px-10 xl:p-[60px] 3xl:p-[100px]">
        <div className="flex flex-col gap-10 max-w-[674px]">
          {/* Header */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 items-start">
              {subtitle && (
                <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                  <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] lg:text-[48px] xl:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
                  {title}
                </h2>
              )}
            </div>
            {description && (
              <p className="text-[#F5F3EF] font-['Google_Sans',sans-serif] text-base xl:text-lg xl:max-[1400px]:text-base leading-[1.5]">
                {description}
              </p>
            )}
          </div>

          {/* Features Grid */}
          <div className="flex flex-wrap gap-x-[35px] gap-y-5 md:gap-x-[52px]">
            {displayFeatures.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-5 flex-1 min-w-[140px] md:min-w-[180px]">
                {feature.iconHtml ? (
                  <div
                    className="w-[60px] h-[60px] flex items-center justify-start text-[#CC9433] [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: feature.iconHtml }}
                  />
                ) : (
                  feature.fallbackIcon
                )}
                <div className="flex flex-col gap-3">
                  <h3 className="text-white font-['Funnel_Display',sans-serif] font-normal leading-[1.2] text-[18px] md:text-[20px] xl:text-[20px] 2xl:text-[24px]">
                    {feature.title}
                  </h3>
                  <p className="text-[#F5F3EF]/80 font-['Google_Sans',sans-serif] text-sm md:text-lg leading-[1.5]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {buttonText && (
            <div className="flex justify-start md:mt-5">
              <Link
                href={buttonLink}
                className="inline-flex w-[260px] h-[61px] md:h-[67px] justify-center items-center gap-2.5 bg-[#507661] hover:bg-[#456755] text-white font-['Google_Sans',sans-serif] font-medium text-sm md:text-base xl:text-lg transition-colors duration-300 no-underline cursor-pointer border-none"
              >
                {buttonText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956C10.1935 14.1816 10.5567 14.1816 10.7742 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
