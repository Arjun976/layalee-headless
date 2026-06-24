import React from 'react';
import Image from 'next/image';

interface GetInspiredProps {
  homepage?: any;
  baseUrl?: string;
}

interface InspiredImage {
  url: string;
  layoutClass: string;
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

function getClassForLayout(layoutClass: string): string {
  switch (layoutClass) {
    case 'item-large-v':
      return 'col-span-2 xl:col-span-1 xl:row-span-2 h-[317px] md:h-[447px] xl:h-[720px] relative overflow-hidden rounded-[4px] group';
    case 'item-large-h':
      return 'col-span-2 xl:col-span-2 h-[154px] md:h-[316px] xl:h-[350px] relative overflow-hidden rounded-[4px] group';
    case 'item-medium':
    default:
      return 'col-span-1 xl:col-span-1 h-[154px] md:h-[316px] xl:h-[350px] relative overflow-hidden rounded-[4px] group';
  }
}

export default function GetInspiredSection({ homepage, baseUrl }: GetInspiredProps) {
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
      console.error('Error parsing homeCommonOptions in GetInspired:', e);
    }
  }

  const getInspiredFieldset = homeCommonOptions?.getinspired_fieldset || {};
  const getInspiredEnabled = getInspiredFieldset.getinspired_enable !== '0' && getInspiredFieldset.getinspired_enable !== false;

  if (!getInspiredEnabled) {
    return null;
  }

  const subtitle = getInspiredFieldset.getinspired_subtitle || 'Get Inspired';
  const title = getInspiredFieldset.getinspired_title || 'Styled with Layale';
  const description = getInspiredFieldset.getinspired_description || '';

  const rawImages = getInspiredFieldset.getinspired_images || [];
  const mappedImages: InspiredImage[] = rawImages
    .map((imgObj: any) => {
      if (!imgObj) return null;
      
      let url = '';
      let alt = 'Styled with Layale';
      
      const rawImg = imgObj.getinspired_image;
      if (typeof rawImg === 'string') {
        url = rawImg;
      } else if (rawImg && typeof rawImg === 'object') {
        url = rawImg.url || '';
        alt = rawImg.alt || rawImg.title || 'Styled with Layale';
      }
      
      const layoutClass = imgObj.getinspired_image_class || 'item-medium';
      if (!url) return null;
      return { url, layoutClass, alt };
    })
    .filter(Boolean) as InspiredImage[];

  const displayImages = mappedImages;
  if (displayImages.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-10 md:py-[60px] xl:py-[100px] w-full" id="get-inspired">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col items-center">
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
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[40px] 2xl:text-[48px] min-[1600px]:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base xl:text-lg leading-[1.5] max-w-[600px]">
              {description}
            </p>
          )}
        </div>

        {/* Inspired Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-[2fr_1fr_1fr] xl:grid-rows-[350px_350px] gap-3 md:gap-5 xl:gap-5 w-full">
          {displayImages.map((imgItem, idx) => (
            <div key={idx} className={getClassForLayout(imgItem.layoutClass)}>
              <Image
                src={getAbsoluteUrl(imgItem.url, baseUrl)}
                alt={imgItem.alt || title || 'Styled with Layale'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500 block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}