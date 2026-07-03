'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardItem {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    title: 'Bespoke Garden Decoration',
    description: 'Transform your outdoor space with thoughtfully designed garden elements, decorative planters, and curated greenery tailored to your style and surroundings.',
    buttonText: 'Order Now',
    buttonUrl: '/contact',
    imageUrl: '/landscape_img1.png',
  },
  {
    title: 'Custom Plant & Tree Sourcing',
    description: 'We source high-quality plants, trees, and greenery to suit your project requirements, ensuring the perfect balance of aesthetics and sustainability.',
    buttonText: 'Contact us',
    buttonUrl: '/contact',
    imageUrl: '/landscape_img1.png',
  },
  {
    title: 'Indoor Plant Styling',
    description: 'Enhance your interiors with carefully selected plants and decorative planters that bring freshness, elegance, and natural beauty to any space.',
    buttonText: 'Contact us',
    buttonUrl: '/contact',
    imageUrl: '/landscape_img1.png',
  },
  {
    title: 'Landscape Design & Installation',
    description: 'Our team provides end-to-end landscape solutions, from concept development and planning to professional installation and project completion.',
    buttonText: 'Contact us',
    buttonUrl: '/contact',
    imageUrl: '/landscape_img1.png',
  },
  {
    title: 'Villa & Commercial Consultation',
    description: 'Receive expert guidance for residential and commercial landscape projects, with customized recommendations designed around your space and goals.',
    buttonText: 'Contact us',
    buttonUrl: '/contact',
    imageUrl: '/landscape_img1.png',
  },
];

interface LandscapeCardsProps {
  landscapeData: any;
}

export default function LandscapeCards({ landscapeData }: LandscapeCardsProps) {
  const outdoor = landscapeData?.outdoor || {};
  const contact = landscapeData?.contact || {};

  const outdoorTitle = outdoor.title || 'Create Beautiful Outdoor Spaces';
  
  // Resolve description text from array, object, or string
  let outdoorDesc = 'From residential gardens to commercial landscapes, we design and create green environments that enhance the beauty, functionality, and value of your property.';
  if (outdoor.description) {
    if (Array.isArray(outdoor.description)) {
      outdoorDesc = outdoor.description.map((d: any) => d?.text || '').join('\n') || outdoorDesc;
    } else if (typeof outdoor.description === 'object') {
      outdoorDesc = outdoor.description.text || outdoorDesc;
    } else if (typeof outdoor.description === 'string') {
      outdoorDesc = outdoor.description;
    }
  }

  // Resolve service cards (ACF fields)
  let cards = DEFAULT_CARDS;
  if (outdoor.cards && Array.isArray(outdoor.cards) && outdoor.cards.length > 0) {
    cards = outdoor.cards.map((c: any) => {
      let cardDesc = '';
      if (c.description) {
        if (Array.isArray(c.description)) {
          cardDesc = c.description.map((d: any) => d?.text || '').join('\n');
        } else if (typeof c.description === 'object') {
          cardDesc = c.description.text || '';
        } else if (typeof c.description === 'string') {
          cardDesc = c.description;
        }
      }
      return {
        title: c.title || '',
        description: cardDesc || '',
        buttonText: c.buttonText || 'Contact us',
        buttonUrl: c.buttonUrl || '/contact',
        imageUrl: c.image?.url || '/landscape_img1.png',
      };
    });
  }

  // Resolve Contact/CTA Card
  const contactTitle = contact.title || 'Ready to Transform Your Space?';
  let contactDesc = 'Book a free consultation with our landscaping experts today.';
  if (contact.description) {
    if (Array.isArray(contact.description)) {
      contactDesc = contact.description.map((d: any) => d?.text || '').join('\n') || contactDesc;
    } else if (typeof contact.description === 'object') {
      contactDesc = contact.description.text || contactDesc;
    } else if (typeof contact.description === 'string') {
      contactDesc = contact.description;
    }
  }
  const contactBtnText = contact.buttonText || 'Book a Consultation';
  const contactBtnUrl = contact.buttonUrl || '/contact';

  return (
    <section className="bg-white py-16 md:py-24 xl:py-[100px] w-full" id="landscape-cards-section">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1720px] min-[1600px]:px-[30px] flex flex-col gap-12 md:gap-14">
        
        {/* Section Header (Figma pixel perfect left-aligned design) */}
        <div className="flex flex-col items-start gap-5 text-left w-full">
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[36px] md:text-[50px] xl:text-[64px] tracking-[-1px] md:tracking-[-2px] max-w-[988px]">
            {outdoorTitle}
          </h2>
          <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.5] max-w-[1311px]">
            {outdoorDesc}
          </p>
        </div>

        {/* Responsive Grid/Flex layout (Figma pixel perfect gap rules) */}
        <div className="flex flex-wrap justify-center gap-y-10 gap-x-5 w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#F5F3EF] rounded-[4px] overflow-hidden flex flex-col w-full max-w-[480px] md:max-w-none md:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)] min-[1600px]:w-[560px] min-[1600px]:h-[676px] transition-transform duration-300 hover:scale-[1.01] hover:shadow-md"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[560/390] overflow-hidden bg-white">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-8 md:p-[30px] flex flex-col justify-between flex-grow gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[24px] md:text-[32px] font-normal leading-[1.2] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.5] min-h-[108px]">
                    {card.description}
                  </p>
                </div>

                <Link
                  href={card.buttonUrl}
                  className="inline-flex justify-center items-center gap-2.5 min-w-[199px] px-6 md:px-10 h-[67px] bg-[#507661] hover:bg-[#3f5c4b] active:bg-[#2f4538] text-white font-['Google_Sans',sans-serif] font-medium text-base md:text-[18px] transition-all duration-300 rounded-[4px] self-start no-underline shadow-sm group"
                >
                  {card.buttonText}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M10.7742 3.0442C10.5562 2.8186 10.1935 2.8186 9.96786 3.0442C9.74989 3.26217 9.74989 3.62495 9.96786 3.84242L14.0565 7.93108H0.564497C0.249984 7.93159 0 8.18157 0 8.49609C0 8.8106 0.249984 9.06871 0.564497 9.06871H14.0565L9.96786 13.1498C9.74989 13.3753 9.74989 13.7386 9.96786 13.9561C10.1935 14.1817 10.5567 14.1817 10.7742 13.9561L15.8308 8.89952C16.0564 8.68154 16.0564 8.31876 15.8308 8.10129L10.7742 3.0442Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}

          {/* ── 6th Card: Call-to-Action (Figma Frame 264) ── */}
          <div className="bg-[#F5F3EF] rounded-[4px] p-8 md:p-[43px] flex flex-col justify-center items-center text-center w-full max-w-[480px] md:max-w-none md:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)] min-[1600px]:w-[560px] min-[1600px]:h-[676px] transition-transform duration-300 hover:scale-[1.01] hover:shadow-md gap-5 md:gap-6">
            <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[30px] md:text-[48px] font-light leading-[1.15] max-w-[474px] tracking-tight">
              {contactTitle}
            </h3>
            <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.5] max-w-[385px] mb-4 md:mb-6">
              {contactDesc}
            </p>
            <Link
              href={contactBtnUrl}
              className="inline-flex justify-center items-center gap-3 min-w-[274px] px-6 md:px-10 h-[67px] bg-[#507661] hover:bg-[#3f5c4b] active:bg-[#2f4538] text-white font-['Google_Sans',sans-serif] font-medium text-base md:text-[18px] transition-all duration-300 rounded-[4px] no-underline shadow-sm group"
            >
              {contactBtnText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M10.7742 3.0442C10.5562 2.8186 10.1935 2.8186 9.96786 3.0442C9.74989 3.26217 9.74989 3.62495 9.96786 3.84242L14.0565 7.93108H0.564497C0.249984 7.93159 0 8.18157 0 8.49609C0 8.8106 0.249984 9.06871 0.564497 9.06871H14.0565L9.96786 13.1498C9.74989 13.3753 9.74989 13.7386 9.96786 13.9561C10.1935 14.1817 10.5567 14.1817 10.7742 13.9561L15.8308 8.89952C16.0564 8.68154 16.0564 8.31876 15.8308 8.10129L10.7742 3.0442Z" fill="currentColor"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

