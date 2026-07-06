'use client';

import React from 'react';

interface AboutServicesProps {
  servicesData?: {
    enabled?: boolean;
    subtitle?: string;
    title?: string;
    paragraphs?: { text: string }[];
    cards?: {
      title?: string;
      svg?: string;
    }[];
  };
}

export default function AboutServices({ servicesData }: AboutServicesProps) {
  const enabled = servicesData?.enabled !== false;
  if (!enabled) return null;

  const defaultIcon = (idx: number) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none" className="w-full h-full">
      <mask id={`mask0_665_697_${idx}`} style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90">
        <path d="M0 -1.52588e-05H90V90H0V-1.52588e-05Z" fill="white"/>
      </mask>
      <g mask={`url(#mask0_665_697_${idx})`}>
        <path d="M76.0721 35.0929C76.0721 32.6119 78.4618 29.8964 77.9342 27.5752C77.3892 25.1788 74.0448 23.7698 73.0016 21.6076C71.9412 19.41 72.9128 15.9202 71.4053 14.0325C69.8906 12.1357 66.2688 12.3115 64.3719 10.7969C62.4844 9.28977 61.8547 5.71649 59.6571 4.65635C57.4952 3.61327 54.3132 5.33733 51.9168 4.79259C49.5959 4.26507 47.4799 1.31809 44.9992 1.31809C42.5183 1.31809 40.4019 4.26524 38.0807 4.79294C35.6841 5.33768 32.5021 3.6138 30.3398 4.65706C28.1423 5.71737 27.5125 9.29083 25.625 10.7983C23.7283 12.313 20.1063 12.1376 18.5918 14.0345C17.0846 15.922 18.0565 19.4116 16.9962 21.6091C15.9533 23.7712 12.6089 25.1801 12.0643 27.5765C11.5368 29.8973 13.9266 32.6124 13.9266 35.0929C13.9266 37.5739 11.5368 40.2893 12.0645 42.6107C12.6094 45.0071 15.9538 46.4162 16.9971 48.5781C18.0574 50.7757 17.0859 54.2657 18.5934 56.1534C20.1081 58.0501 23.7299 57.8743 25.6267 59.3888C27.5143 60.8962 28.1439 64.4695 30.3415 65.5294C32.5035 66.5725 35.6855 64.8484 38.0817 65.3932C40.4027 65.9207 42.5188 68.8677 44.9992 68.8677C47.4804 68.8677 49.5968 65.9207 51.918 65.393C54.3132 64.8481 57.4966 66.572 59.6587 65.5287C61.8563 64.4684 62.486 60.8949 64.3737 59.3874C66.2704 57.8727 69.8923 58.0483 71.4069 56.1515C72.914 54.2639 71.9421 50.7742 73.0024 48.5767C74.0453 46.4146 77.3898 45.0057 77.9343 42.6093C78.4618 40.2885 76.0721 37.5735 76.0721 35.0929Z" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40.5772 66.7703L31.1982 88.6816L26.4699 81.768L18.2607 83.1438L27.2419 62.1622" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.8545 76.2085L33.2369 66.038" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M49.4209 66.7703L58.7999 88.6816L63.5282 81.768L71.7374 83.1438L62.7562 62.1622" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M61.1451 76.2085L56.7627 66.038" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M45.0007 50.573V48.0999C45.0007 46.9802 44.556 45.9064 43.7641 45.1146L41.4824 42.8328" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.5272 30.8632C32.2146 30.7117 35.1863 31.8314 37.5017 34.1468C39.8173 36.4622 40.937 39.4341 40.7855 42.1214C38.0982 42.273 35.1262 41.1532 32.8108 38.8377C30.4954 36.5223 29.3757 33.5505 29.5272 30.8632Z" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M57.6515 22.4142C54.6282 22.2437 51.2849 23.5035 48.6802 26.1084C46.0753 28.7131 44.8156 32.0565 44.9859 35.0797C48.0092 35.2501 51.3526 33.9904 53.9575 31.3857C56.5622 28.7808 57.822 25.4374 57.6515 22.4142Z" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M45 53.3879V35.0931" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30.2002 53.8725C39.5901 61.2893 53.2479 60.6777 61.9162 52.0094C70.5845 43.3411 71.1959 29.6832 63.7793 20.2934" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M59.7991 16.3131C50.4092 8.89638 36.7514 9.50792 28.0831 18.1762C19.4147 26.8445 18.8034 40.5024 26.2199 49.8921" stroke="#CC9433" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );

  // Resolve Header content
  const subtitle = servicesData?.subtitle || 'Our services';
  const title = servicesData?.title || 'More Than Planters';
  const paragraphs = servicesData?.paragraphs && servicesData.paragraphs.length > 0
    ? servicesData.paragraphs.map(p => p.text)
    : ['Layale Group offers complete garden decoration and landscaping services designed to transform your outdoor spaces into stunning natural environments. Our experts handle everything from plant sourcing to full garden design.'];

  // Resolve Cards List
  const cardsList = servicesData?.cards && servicesData.cards.length > 0
    ? servicesData.cards.map((c, i) => ({
        title: c.title || '',
        icon: c.svg ? (
          <div 
            className="w-[90px] h-[90px] text-[#CC9433] flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
            dangerouslySetInnerHTML={{ __html: c.svg }}
          />
        ) : defaultIcon(i)
      }))
    : [
        { title: 'Premium Plant Supply', icon: defaultIcon(0) },
        { title: 'Professional Plant Care', icon: defaultIcon(1) },
        { title: 'Landscape Consultation', icon: defaultIcon(2) },
        { title: 'Indoor & Outdoor Styling', icon: defaultIcon(3) },
        { title: 'End-to-End Project Delivery', icon: defaultIcon(4) },
      ];

  return (
    <section 
      className="py-12 md:py-[80px] xl:py-[100px] w-full flex flex-col items-center"
      style={{ backgroundColor: '#F5F3EF' }}
    >
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col items-center gap-12 xl:gap-[60px]">
        
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center gap-5 max-w-[1066px] w-full">
          <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            {subtitle}
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
          </span>
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
            {title}
          </h2>
          <div className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-relaxed max-w-[1066px] text-center mt-2 flex flex-col gap-2">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* 5-Column Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full justify-items-center mt-4">
          {cardsList.map((card, idx) => (
            <div 
              key={idx}
              className="w-full max-w-[306px] h-[322px] bg-white rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col items-center justify-center p-6 text-center"
            >
              {/* Dynamic SVG Icon or fallback logo */}
              <div className="w-[90px] h-[90px] mb-8 flex items-center justify-center">
                {card.icon}
              </div>

              {/* Title Text */}
              <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[24px] font-light leading-[1.1] tracking-normal">
                {card.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
