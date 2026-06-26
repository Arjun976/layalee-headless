'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Are these planters suitable for direct planting?",
    answer: "Yes, we offer free on-site measurement and expert consultation to help you choose the right solution for your space.",
  },
  {
    question: "How long do your indoor planters last?",
    answer: "Our indoor planters are built from highly durable, premium-grade materials designed to last a lifetime with minimal maintenance. They resist moisture, staining, and cracking, ensuring they remain elegant for years.",
  },
  {
    question: "How do I choose the right indoor planter for my space?",
    answer: "Consider the lighting conditions, overall design aesthetic, and the growth requirements of your plants. Our team offers expert assistance to help you select the ideal sizes, styles, and materials to match your space perfectly.",
  },
  {
    question: "Do you offer modern indoor planters in Dubai and across the UAE?",
    answer: "Yes, we provide premium delivery services across all Emirates, including Dubai, Abu Dhabi, Sharjah, and others, fully insured for safety and convenience.",
  },
  {
    question: "What materials are Layale indoor planters made from?",
    answer: "Layale planters are crafted from a selection of high-end materials including premium ceramics, glass-fiber reinforced concrete, and specialized metallic alloys, ensuring a luxurious finish and lasting structural integrity.",
  },
];

export default function ProductFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default like in Figma design

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-[#F5F3EF] py-10 md:py-[60px] xl:py-[100px] w-full flex flex-col items-center border-t border-[#2C322D]/10" id="product-faq">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col xl:flex-row xl:justify-between xl:gap-12 gap-8">
        
        {/* Left Side: Header & CTA Button */}
        <div className="flex flex-col items-start text-left xl:w-[45%] xl:max-w-[720px] w-full gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 items-start">
              <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                FAQ
                <span className="w-[21px] h-[1px] bg-[#CC9433]" />
              </span>
              <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] lg:text-[48px] xl:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
                Frequently Asked Question
              </h2>
            </div>
            <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base leading-[1.6] max-w-[709px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London,
            </p>
          </div>

          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="inline-flex w-[198px] h-[67px] justify-center items-center gap-2.5 bg-[#CC9433] hover:bg-[#b5822c] active:bg-[#9d7124] text-white font-['Google_Sans',sans-serif] font-medium text-[18px] transition-all duration-300 no-underline cursor-pointer border-none shadow-[0_4px_12px_rgba(204,148,51,0.12)] rounded-sm"
          >
            Contact us
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956C10.1935 14.1816 10.5567 14.1816 10.7742 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

        {/* Right Side: FAQ Accordion List */}
        <div className="flex flex-col gap-4 xl:w-[50%] xl:max-w-[770px] w-full mt-4 xl:mt-0">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 border border-[#507661]/15 hover:border-[#507661]/35 rounded-[4px] overflow-hidden transition-all duration-300 shadow-[0_2px_8px_rgba(44,50,45,0.01)]"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer bg-transparent border-none outline-none group"
                >
                  <span className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[18px] md:text-[20px] font-normal leading-tight group-hover:text-[#507661] transition-colors duration-200">
                    {item.question}
                  </span>
                  
                  {/* Chevron arrow toggle icon */}
                  <span className="flex-shrink-0 ml-4 text-[#2C322D]">
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? '' : 'rotate-180'}`}
                      fill="none"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 10L8 6L4 10"
                        stroke="#2C322D"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer with smooth height transition */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-[#507661]/10' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 bg-[#FDFDFD]/40 text-[#545955] font-['Google_Sans',sans-serif] text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
