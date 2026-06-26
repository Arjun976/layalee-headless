'use client';

import React from 'react';

interface ContactInfoCard {
  title: string;
  values: string[];
  icon: React.ReactNode;
}

export default function ContactCards() {
  const cards: ContactInfoCard[] = [
    {
      title: 'Visit Us',
      values: ['Dubai, United Arab Emirates'],
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="white" />
          <path
            d="M32 16C23.7157 16 17 22.7157 17 31C17 40.5 32 48 32 48C32 48 47 40.5 47 31C47 22.7157 40.2843 16 32 16ZM32 36C29.2386 36 27 33.7614 27 31C27 28.2386 29.2386 26 32 26C34.7614 26 37 28.2386 37 31C37 33.7614 34.7614 36 32 36Z"
            fill="#507661"
          />
        </svg>
      )
    },
    {
      title: 'Call Us',
      values: ['+971 58 583 8722', '+971 52 221 9810'],
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="white" />
          <path
            d="M20 20C20 18.8954 20.8954 18 22 18H27.5C28.2364 18 28.8744 18.4792 29.0911 19.1837L30.6372 24.2085C30.8267 24.8242 30.5695 25.4851 30.0359 25.8052L26.7865 27.7548C28.4379 31.0576 30.9424 33.5621 34.2452 35.2135L36.1948 31.9641C36.5149 31.4305 37.1758 31.1733 37.7915 31.3628L42.8163 32.9089C43.5208 33.1256 44 33.7636 44 34.5V40C44 41.1046 43.1046 42 42 42C29.8497 42 20 32.1503 20 20Z"
            fill="#507661"
          />
        </svg>
      )
    },
    {
      title: 'Email Us',
      values: ['info@layalegroup.com'],
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="white" />
          <path
            d="M18 22C18 20.8954 18.8954 20 20 20H44C45.1046 20 46 20.8954 46 22V42C46 43.1046 45.1046 44 44 44H20C18.8954 44 18 43.1046 18 42V22ZM22.4 24L32 31.2L41.6 24H22.4ZM20 26.5V40H44V26.5L32.8 34.9C32.32 35.26 31.68 35.26 31.2 34.9L20 26.5Z"
            fill="#507661"
          />
        </svg>
      )
    },
    {
      title: 'Working Hours',
      values: ['Sun - Thu: 9AM - 6PM'],
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="white" />
          <path
            d="M32 18C24.268 18 18 24.268 18 32C18 39.732 24.268 46 32 46C39.732 46 46 39.732 46 32C46 24.268 39.732 18 32 18ZM32 42C26.486 42 22 37.514 22 32C22 26.486 26.486 22 32 22C37.514 22 42 26.486 42 32C42 37.514 37.514 42 32 42ZM33 26H31V33L36.5 36.3L37.5 34.7L33 32V26Z"
            fill="#507661"
          />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white pb-10 md:pb-[60px] xl:pb-[100px] w-full" id="contact-cards-section">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px]">
        {/* Beige container box matching Frame 265 */}
        <div className="bg-[#F5F3EF] rounded-[4px] py-10 md:py-[42px] px-6 md:px-12 xl:px-[118px] w-full">
          <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-between gap-10 xl:gap-0">
            {cards.map((card, idx) => (
              <React.Fragment key={idx}>
                {/* Divider between columns (only visible on desktop) */}
                {idx > 0 && (
                  <div className="hidden xl:block w-[1px] bg-[#507661]/25 self-stretch my-2" />
                )}
                
                {/* Card Container */}
                <div className="flex-1 flex flex-col items-center text-center gap-6 px-4">
                  {/* Icon wrapper */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {card.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col gap-3 items-center">
                    <h3 className="text-[#313232] font-['Funnel_Display',sans-serif] text-[24px] md:text-[32px] font-normal leading-[1.2] tracking-tight">
                      {card.title}
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {card.values.map((val, vIdx) => (
                        <p
                          key={vIdx}
                          className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.5]"
                        >
                          {val}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
