'use client';

import React from 'react';

interface PromiseProps {
  homepage?: any;
  baseUrl?: string;
}

interface PromiseItem {
  title: string;
  description: string;
  iconUrl?: string;
  fallbackIcon?: string;
}

const staticSvgFallbacks: string[] = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewbox="0 0 60 60" fill="none"><mask id="mask0_280_5269" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 3.8147e-06H60V60H0V3.8147e-06Z" fill="white" /></mask><g mask="url(#mask0_280_5269)"><path d="M11.2969 24.3105L14.7855 20.2875C15.2625 19.7378 15.9551 19.4227 16.6828 19.4227H27.3328" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M32.6672 19.4228H43.3173C44.045 19.4228 44.7376 19.7379 45.2146 20.2876L55.1778 31.7744C56.0428 32.7705 55.9876 34.2658 55.0536 35.1974L31.7719 58.3891C30.7922 59.3651 29.2078 59.3651 28.2281 58.3891L4.94635 35.1974C4.01237 34.2658 3.95729 32.7705 4.82213 31.7733L8.53358 27.4959" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M40.1923 39.7275L42.453 35.1972C42.9176 34.266 42.9445 32.7705 42.5146 31.7738L37.5623 20.2879C37.3252 19.7383 36.9814 19.4223 36.6196 19.4223" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M23.3802 19.4223C23.0185 19.4223 22.6746 19.7382 22.4375 20.288L17.4851 31.7738C17.0553 32.7704 17.0821 34.266 17.5468 35.1971L29.1189 58.3891C29.6058 59.3651 30.3941 59.3651 30.881 58.3891L38.3483 43.4234" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M55.7759 33.7012H4.22461" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M39.0214 15.8105C33.9011 17.0461 32.1088 18.8383 30.8732 23.9585C30.6528 24.8719 29.3474 24.8719 29.127 23.9585C27.8914 18.8383 26.0992 17.0461 20.979 15.8105C20.0656 15.5901 20.0656 14.2847 20.979 14.0644C26.0992 12.8287 27.8914 11.0365 29.127 5.91611C29.3474 5.00275 30.6528 5.00275 30.8732 5.91611C32.1088 11.0365 33.9011 12.8287 39.0214 14.0644C39.9346 14.2847 39.9346 15.5901 39.0214 15.8105Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M51.7321 7.87831C48.3442 8.69593 47.1585 9.88163 46.3409 13.2694C46.1951 13.8737 45.3315 13.8737 45.1857 13.2694C44.3681 9.88163 43.1822 8.69593 39.7945 7.87831C39.1903 7.73253 39.1903 6.86886 39.7945 6.72308C43.1822 5.90546 44.3681 4.71964 45.1857 1.33187C45.3315 0.727531 46.1951 0.727531 46.3409 1.33187C47.1585 4.71964 48.3442 5.90546 51.7321 6.72308C52.3363 6.86886 52.3363 7.73253 51.7321 7.87831Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M20.2057 7.87831C16.818 8.69593 15.6321 9.88163 14.8146 13.2694C14.6687 13.8737 13.8051 13.8737 13.6593 13.2694C12.8418 9.88163 11.656 8.69593 8.26819 7.87831C7.66386 7.73253 7.66386 6.86886 8.26819 6.72308C11.656 5.90546 12.8418 4.71964 13.6593 1.33187C13.8051 0.727531 14.6687 0.727531 14.8146 1.33187C15.6321 4.71964 16.818 5.90546 20.2057 6.72308C20.8101 6.86886 20.8101 7.73253 20.2057 7.87831Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></g></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M8.90625 40.4367C11.4644 30.8896 20.116 24.251 29.999 24.251C39.8838 24.251 48.5354 30.8896 51.0936 40.4367" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.90625 40.4367C10.3049 39.0381 12.2018 38.2524 14.1797 38.2524C16.1576 38.2524 18.0545 39.0382 19.4531 40.4367" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M19.4531 40.4367C20.8518 39.0381 22.7487 38.2524 24.7266 38.2524C26.7045 38.2524 28.6014 39.0382 30 40.4367" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M30 40.4367C31.3986 39.0381 33.2955 38.2524 35.2734 38.2524C37.2513 38.2524 39.1482 39.0382 40.5469 40.4367" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M40.5469 40.4367C41.9455 39.0381 43.8424 38.2524 45.8203 38.2524C47.7982 38.2524 49.6951 39.0382 51.0938 40.4367" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M19.5039 40.0695C20.8466 30.7045 25.1287 24.251 29.9998 24.251C34.8711 24.251 39.1531 30.7045 40.4958 40.0695" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M30 24.251V40.4368" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0912 18.7578C14.7589 18.4122 13.959 17.0521 14.3046 15.7198C14.6511 14.3839 16.6628 13.1201 17.7455 12.3794C18.3317 13.5529 19.4757 15.6352 19.1293 16.971C18.7837 18.3035 17.4235 19.1034 16.0912 18.7578Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M25.057 7.55027C23.7247 7.20469 22.9248 5.84461 23.2704 4.5123C23.6168 3.17637 25.6287 1.91262 26.7114 1.17188C27.2975 2.34539 28.4415 4.4277 28.0951 5.76352C27.7495 7.09582 26.3893 7.89574 25.057 7.55027Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M29.3827 18.7578C28.0504 18.4122 27.2505 17.0521 27.5961 15.7198C27.9425 14.3839 29.9543 13.1201 31.037 12.3794C31.6232 13.5529 32.7672 15.6352 32.4208 16.971C32.0751 18.3035 30.715 19.1034 29.3827 18.7578Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M38.3485 7.55027C37.0162 7.20469 36.2163 5.84461 36.5619 4.5123C36.9083 3.17637 38.9202 1.91262 40.0029 1.17188C40.589 2.34539 41.733 4.4277 41.3866 5.76352C41.0409 7.09582 39.6808 7.89574 38.3485 7.55027Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M42.6737 18.7578C41.3414 18.4122 40.5415 17.0521 40.8871 15.7198C41.2335 14.3839 43.2454 13.1201 44.3281 12.3794C44.9142 13.5529 46.0582 15.6352 45.7118 16.971C45.3662 18.3035 44.006 19.1034 42.6737 18.7578Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /><path d="M24.7266 56.1915C24.7266 57.6418 25.9131 58.8282 27.3633 58.8282C28.8135 58.8282 30 57.6417 30 56.1915V24.8369" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
  `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_280_5317" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 3.8147e-06H60V60H0V3.8147e-06Z" fill="white" /></mask><g mask="url(#mask0_280_5317)"><path d="M27.1865 51.2109H32.8116C34.748 51.2109 36.3273 52.7903 36.3273 54.7266V58.2422H23.6709V54.7266C23.6709 52.7903 25.2502 51.2109 27.1865 51.2109Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M32.1865 36.8641L38.0849 44.2279L33.0701 50.625" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M26.8781 50.625L21.9131 44.2279L27.4313 37.2925" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M29.999 37.3828V42.0703" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M53.8908 15.8403C51.4048 10.4945 43.6277 6.37193 34.0137 5.46174" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M33.9951 33.5635C43.6181 32.6567 51.4037 28.5319 53.8909 23.1823" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M6.03613 23.0273C8.45512 28.4776 16.3602 32.6872 26.1391 33.5762" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M26.3027 5.4327C16.5452 6.28078 8.62539 10.4327 6.10938 15.835" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M29.999 8.78906C31.9353 8.78906 33.5146 7.20973 33.5146 5.27344C33.5146 3.33715 31.9353 1.75781 29.999 1.75781C28.0627 1.75781 26.4834 3.33715 26.4834 5.27344C26.4834 7.20973 28.0627 8.78906 29.999 8.78906Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M5.27344 23.0273C7.20973 23.0273 8.78906 21.448 8.78906 19.5117C8.78906 17.5754 7.20973 15.9961 5.27344 15.9961C3.33715 15.9961 1.75781 17.5754 1.75781 19.5117C1.75781 21.448 3.33715 23.0273 5.27344 23.0273Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M54.7266 23.0273C56.6629 23.0273 58.2422 21.448 58.2422 19.5117C58.2422 17.5754 56.6629 15.9961 54.7266 15.9961C52.7903 15.9961 51.2109 17.5754 51.2109 19.5117C51.2109 21.448 52.7903 23.0273 54.7266 23.0273Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M33.2637 35.1635C38.2668 35.5471 42.967 36.8057 46.7123 38.7837" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M13.332 38.7598C17.0718 36.7946 21.7539 35.546 26.7331 35.164" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M29.999 37.3828C31.9353 37.3828 33.5146 35.8035 33.5146 33.8672C33.5146 31.9309 31.9353 30.3516 29.999 30.3516C28.0627 30.3516 26.4834 31.9309 26.4834 33.8672C26.4834 35.8035 28.0627 37.3828 29.999 37.3828Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M10.458 44.6484C12.3943 44.6484 13.9736 43.0691 13.9736 41.1328C13.9736 39.1965 12.3943 37.6172 10.458 37.6172C8.52172 37.6172 6.94238 39.1965 6.94238 41.1328C6.94238 43.0691 8.52172 44.6484 10.458 44.6484Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /><path d="M49.54 44.6484C51.4763 44.6484 53.0557 43.0691 53.0557 41.1328C53.0557 39.1965 51.4763 37.6172 49.54 37.6172C47.6037 37.6172 46.0244 39.1965 46.0244 41.1328C46.0244 43.0691 47.6037 44.6484 49.54 44.6484Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="22.926" stroke-linecap="round" stroke-linejoin="round" /></g></svg>`,
  `<svg width="60" height="60" viewbox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.6673 43.4219H23.7002" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><mask id="mask0_280_5361" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 3.8147e-06H60V60H0V3.8147e-06Z" fill="white" /></mask><g mask="url(#mask0_280_5361)"><path d="M54.2156 43.4224H58.242V31.1969L48.1583 20.7779H39.9072V20.7928V43.3114" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M58.2418 31.1968H39.9062" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M14.1117 39.1703C16.2607 37.0212 19.7447 37.0212 21.8937 39.1703C24.0426 41.3193 24.0426 44.8036 21.8937 46.9526C19.7447 49.1017 16.2607 49.1017 14.1117 46.9526C11.9628 44.8036 11.9628 41.3193 14.1117 39.1703Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M44.7835 39.1703C46.9325 37.0212 50.4165 37.0212 52.5655 39.1703C54.7145 41.3193 54.7145 44.8036 52.5655 46.9526C50.4165 49.1017 46.9325 49.1017 44.7835 46.9526C42.6347 44.8036 42.6347 41.3193 44.7835 39.1703Z" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.30762 11.436V43.4028H12.2727" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M39.9565 20.7925V11.4359H7.30762" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M19.504H7.30762" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M19.5046 18.4688H4.21973" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M18.2148 25.5015H1.75781" stroke="#CC9433" stroke-width="1.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></g></svg>`
];

const defaultItems: PromiseItem[] = [
  {
    title: 'Premium Materials',
    description: 'Sourced from the finest manufacturers worldwide for lasting quality.',
    fallbackIcon: staticSvgFallbacks[0]
  },
  {
    title: 'Weather Resistant',
    description: 'Engineered to withstand harsh outdoor conditions without fading.',
    fallbackIcon: staticSvgFallbacks[1]
  },
  {
    title: 'Elegant Design',
    description: 'Every piece is crafted with meticulous attention to aesthetics.',
    fallbackIcon: staticSvgFallbacks[2]
  },
  {
    title: 'UAE Delivery',
    description: 'Fast and careful delivery across the Emirates, fully insured.',
    fallbackIcon: staticSvgFallbacks[3]
  }
];

function getAbsoluteUrl(url: string, wpBase?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
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

export default function PromiseSection({ homepage, baseUrl }: PromiseProps) {
  let homeCommonOptions: any = null;
  if (homepage?.homeCommonOptions) {
    try {
      homeCommonOptions = typeof homepage.homeCommonOptions === 'string'
        ? JSON.parse(homepage.homeCommonOptions)
        : homepage.homeCommonOptions;
    } catch (e) {
      console.error('Error parsing homeCommonOptions in Promise:', e);
    }
  }

  const promiseFieldset = homeCommonOptions?.promise_section_fieldset || {};
  const promiseEnabled = promiseFieldset.promise_enable !== '0' && promiseFieldset.promise_enable !== false;

  if (homepage && !promiseEnabled) {
    return null;
  }

  const subtitle = promiseFieldset.promise_subtitle || 'Our Promise';
  const title = promiseFieldset.promise_title || 'Why Choose Layale';

  const rawItems = promiseFieldset.promise_items || [];
  const mappedItems: PromiseItem[] = rawItems.map((item: any, index: number) => {
    const itemTitle = item.promise_title_item || '';
    const itemDesc = item.promise_desc || '';
    
    let iconUrl = '';
    let customSvg = '';
    
    if (item.promise_icon) {
      if (typeof item.promise_icon === 'string') {
        const trimmed = item.promise_icon.trim();
        if (trimmed.startsWith('<svg') || trimmed.includes('<svg')) {
          customSvg = trimmed;
        } else {
          iconUrl = trimmed;
        }
      } else if (typeof item.promise_icon === 'object') {
        iconUrl = item.promise_icon.url || '';
      }
    }
    
    return {
      title: itemTitle,
      description: itemDesc,
      iconUrl: iconUrl,
      fallbackIcon: customSvg || staticSvgFallbacks[index] || staticSvgFallbacks[staticSvgFallbacks.length - 1]
    };
  });

  const displayItems = mappedItems.length > 0 ? mappedItems : defaultItems;

  return (
    <section className="bg-[#2C322D] py-[60px] md:py-20 xl:py-[100px] w-full flex flex-col items-center" id="promise">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px]">
        
        {/* Promise Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 md:mb-[60px] xl:mb-[100px]">
          {subtitle && (
            <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
              {subtitle}
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            </span>
          )}
          {title && (
            <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[60px] min-[1600px]:text-[72px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
              {title}
            </h2>
          )}
        </div>

        {/* Promise Grid */}
        <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:gap-y-12 md:gap-x-12 xl:flex-nowrap xl:gap-10 min-[1600px]:gap-20 w-full justify-between">
          {displayItems.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-8 text-center min-w-[240px] md:max-w-[calc(50%-24px)] xl:max-w-none">
              <div className="w-[100px] h-[100px] border border-[#F5F3EF]/10 rounded-full flex justify-center items-center text-[#CC9433] [&>svg]:w-[60px] [&>svg]:h-[60px]">
                {item.iconUrl ? (
                  <img
                    src={getAbsoluteUrl(item.iconUrl, baseUrl)}
                    alt={item.title}
                    className="w-[60px] h-[60px] object-contain"
                  />
                ) : (
                  <div
                    className="w-[60px] h-[60px] flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: item.fallbackIcon || '' }}
                  />
                )}
              </div>
              
              <div className="flex flex-col gap-3 items-center max-w-[320px]">
                {item.title && (
                  <h3 className="text-white font-['Funnel_Display',sans-serif] font-normal leading-[1.2] text-[20px] md:text-[24px]">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-[#F5F3EF]/85 font-['Google_Sans',sans-serif] text-sm md:text-base leading-[1.5]">
                    {item.description}
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