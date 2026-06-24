import React from 'react';
import Image from 'next/image';

interface NatureInspiredProps {
  homepage?: any;
  baseUrl?: string;
}

interface NatureItem {
  imageUrl: string;
  link: string;
  alt: string;
}

function getAbsoluteUrl(url: string, wpBase?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.startsWith('/') && !url.includes('wp-content')) {
    return url;
  }
  
  const base = wpBase || 'http://localhost/layale_be';
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (url.startsWith('/')) {
    return `${trimmedBase}${url}`;
  }
  return `${trimmedBase}/${url}`;
}

export default function NatureInspiredSection({ homepage, baseUrl }: NatureInspiredProps) {
  if (!homepage) {
    return null;
  }

  let homeCommonOptions: any = null;
  if (homepage.homeCommonOptions) {
    try {
      homeCommonOptions = typeof homepage.homeCommonOptions === 'string'
        ? JSON.parse(homepage.homeCommonOptions)
        : homepage.homeCommonOptions;
    } catch (e) {
      console.error('Error parsing homeCommonOptions in NatureInspired:', e);
    }
  }

  const natureFieldset = homeCommonOptions?.nature_inspired_fieldset || {};
  const natureEnabled = natureFieldset.nature_enable !== '0' && natureFieldset.nature_enable !== false;

  if (!natureEnabled) {
    return null;
  }

  const subtitle = natureFieldset.nature_subtitle || '@layalegroup';
  const title = natureFieldset.nature_title || 'Get Inspired by Nature';

  const rawItems = natureFieldset.nature_items || [];
  const mappedItems: NatureItem[] = rawItems
    .map((itemObj: any) => {
      if (!itemObj) return null;
      
      let imageUrl = '';
      let alt = 'Get Inspired by Nature';
      
      const rawImg = itemObj.nature_image;
      if (typeof rawImg === 'string') {
        imageUrl = rawImg;
      } else if (rawImg && typeof rawImg === 'object') {
        imageUrl = rawImg.url || '';
        alt = rawImg.alt || rawImg.title || 'Get Inspired by Nature';
      }
      
      const link = itemObj.nature_link || 'https://www.instagram.com/';
      if (!imageUrl) return null;
      return { imageUrl, link, alt };
    })
    .filter(Boolean) as NatureItem[];

  const displayItems = mappedItems;
  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-10 md:py-[60px] xl:py-[100px] w-full" id="nature-inspired">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-10 md:mb-5 xl:mb-[34px]">
          {subtitle && (
            <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
              {subtitle}
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            </span>
          )}
          {title && (
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] lg:text-[48px] xl:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
              {title}
            </h2>
          )}
        </div>

        {/* Mobile/Tablet Slider (Hidden on Desktop) */}
        <div className="xl:hidden relative w-screen -ml-5 md:-ml-[30px] overflow-hidden pl-5 md:pl-[30px]">
          {/* Left white overlay for mobile/tablet to hide scrolled cards initially */}
          <div className="absolute top-0 left-0 w-5 md:w-[30px] h-full bg-white z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-5 md:gap-6 w-full pr-5 md:pr-[30px]"
          >
            {displayItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-[4px] group block w-[calc((100vw-40px)/1.5)] h-[240px] md:w-[calc((100vw-54px)/1.7)] md:h-[460px] flex-shrink-0 snap-start"
              >
                {/* Instagram Hover Overlay */}
                <div className="bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center absolute inset-0 z-10">
                  <svg
                    className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </div>

                <Image
                  src={getAbsoluteUrl(item.imageUrl, baseUrl)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 67vw, (max-width: 1200px) 59vw"
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500 block"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Desktop Grid (Hidden on Mobile/Tablet) */}
        <div className="hidden xl:grid xl:grid-cols-4 xl:gap-5 xl:w-full">
          {displayItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-[4px] group aspect-[415/460] block w-full"
            >
              {/* Instagram Hover Overlay */}
              <div className="bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center absolute inset-0 z-10">
                <svg
                  className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </div>

              <Image
                src={getAbsoluteUrl(item.imageUrl, baseUrl)}
                alt={item.alt}
                fill
                sizes="280px"
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500 block"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
