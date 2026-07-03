import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductBnr from '@/feature/Product/Product_bnr';
import AboutIntro from '@/feature/about/Intro';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Layale',
  description: 'At Layale, we believe thoughtfully designed spaces create meaningful experiences. Learn about our promise, our premium materials, and complete landscaping services.',
};

export default function AboutPage() {

  const whyChooseList = [
    {
      num: '01',
      title: 'Premium Materials',
      desc: 'Sourced from the finest manufacturers worldwide for lasting quality.',
    },
    {
      num: '02',
      title: 'Weather Resistant',
      desc: 'Engineered to withstand harsh outdoor conditions without fading.',
    },
    {
      num: '03',
      title: 'Elegant Design',
      desc: 'Every piece is crafted with meticulous attention to aesthetics.',
    },
    {
      num: '04',
      title: 'UAE Delivery',
      desc: 'Fast and careful delivery across the Emirates, fully insured.',
    },
  ];

  const specsList = [
    {
      title: 'German Polymer Technology',
      desc: 'Manufactured using premium materials for superior strength and durability.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: 'UV Protected & Weather Resistant',
      desc: 'Designed to withstand harsh outdoor conditions while maintaining their appearance.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      title: 'Lightweight Construction',
      desc: 'Easy to handle, install, and reposition without compromising durability.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      ),
    },
    {
      title: 'Built To Last',
      desc: 'Engineered for long-term performance with a lifespan of over 10 years.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC9433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
        </svg>
      ),
    },
  ];

  const servicesList = [
    {
      title: 'Premium Plant Supply',
      desc: 'High-quality indoor and outdoor greenery curated for your specific layout.',
    },
    {
      title: 'Professional Plant Care',
      desc: 'Ongoing maintenance guidance and support to keep your botanicals thriving.',
    },
    {
      title: 'Landscape Consultation',
      desc: 'Expert on-site measurements and design advice tailored to your property.',
    },
    {
      title: 'Indoor & Outdoor Styling',
      desc: 'Artistic combinations of premium planters and plants to enhance aesthetics.',
    },
    {
      title: 'End-to-End Project Delivery',
      desc: 'Complete logistics, arrangement, and styling handled by our expert team.',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Page Banner Section (styled like contact page) */}
      <ProductBnr 
        title="About Us"
        subtitle="About Us"
        backgroundImage={undefined} // Falls back to default /bg-product.png internally
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about' },
        ]}
      />

      {/* 2. Intro Section: Bringing Nature Into Modern Living */}
      <AboutIntro />

      {/* 3. Specs Section: Quality You Can Trust (Figma Dark Charcoal Section) */}
      <section 
        className="w-full flex flex-col xl:flex-row items-stretch text-white" 
        style={{ backgroundColor: '#2C322D' }}
        id="quality-trust-section"
      >
        {/* Left Side: Title and Specs Grid */}
        <div className="w-full xl:w-[45%] flex flex-col justify-center py-16 xl:py-24 px-5 md:px-[30px] xl:pl-20 xl:pr-10">
          <div className="flex flex-col gap-10 max-w-[674px]">
            {/* Heading Block */}
            <div className="flex flex-col gap-4 text-left">
              <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[50px] tracking-[-1.5px]">
                Quality You Can Trust
              </h2>
              <p className="text-[#F5F3EF]/85 font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-relaxed">
                Every planter is selected with a focus on performance, longevity, and design excellence.
              </p>
            </div>

            {/* Specs 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {specsList.map((spec, idx) => (
                <div key={idx} className="flex flex-col items-start gap-4 text-left">
                  <div className="w-[60px] h-[60px] bg-[#507661]/10 rounded-full flex items-center justify-center text-[#CC9433]">
                    {spec.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white font-['Funnel_Display',sans-serif] text-[18px] md:text-[20px] font-normal leading-tight">
                      {spec.title}
                    </h3>
                    <p className="text-[#F5F3EF]/70 font-['Google_Sans',sans-serif] text-sm md:text-[15px] leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quality Image (Edge-to-Edge) */}
        <div className="w-full xl:w-[55%] min-h-[400px] md:min-h-[500px] xl:min-h-[789px] relative overflow-hidden">
          <Image
            src="/quality_img.png"
            alt="Quality You Can Trust Planter Curation"
            fill
            className="object-cover hover:scale-[1.02] transition-transform duration-[800ms]"
            sizes="(max-width: 1280px) 100vw, 1050px"
          />
        </div>
      </section>

      {/* 4. Why Choose Layale: Our Promise */}
      <section className="bg-white py-12 md:py-[80px] xl:py-[100px] w-full flex flex-col items-center">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col gap-10 xl:gap-[60px]">
          
          <div className="flex flex-col items-start text-left gap-3">
            <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
              Our Promise
            </span>
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1px] md:tracking-[-1.5px] xl:tracking-[-1.8px]">
              Why Choose Layale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {whyChooseList.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col gap-4 p-5 hover:bg-[#F5F3EF]/30 transition-all duration-300 rounded-[4px]"
              >
                <span className="text-[#CC9433] font-['Funnel_Display',sans-serif] text-[48px] md:text-[56px] font-light leading-none">
                  {item.num}
                </span>
                <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[24px] font-normal leading-none tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Our Services: More Than Planters (Figma Light Section) */}
      <section 
        className="py-12 md:py-[80px] xl:py-[100px] w-full flex flex-col items-center border-t border-[#2C322D]/[0.06]"
        style={{ backgroundColor: '#F5F3EF' }}
      >
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col gap-10 xl:gap-[80px]">
          
          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6">
            <div className="flex flex-col items-start text-left gap-3">
              <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                Our Services
              </span>
              <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1px] md:tracking-[-1.5px] xl:tracking-[-1.8px]">
                More Than Planters
              </h2>
            </div>
            <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-relaxed max-w-[620px] text-left">
              Layale Group offers complete garden decoration and landscaping services designed to transform your outdoor spaces into stunning natural environments. Our experts handle everything from plant sourcing to full garden design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 border-t border-[#2C322D]/10 pt-10 xl:pt-16">
            {servicesList.map((service, idx) => (
              <div 
                key={idx}
                className="flex flex-col gap-4 border-l border-[#CC9433]/40 pl-6 hover:border-[#CC9433] transition-all duration-300"
              >
                <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[22px] font-normal leading-tight hover:text-[#CC9433] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-[#545955] font-['Google_Sans',sans-serif] text-sm md:text-base leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href="/contact"
              className="inline-flex min-w-[274px] h-[67px] px-6 md:px-10 justify-center items-center gap-2.5 bg-[#CC9433] hover:bg-[#b5822c] active:bg-[#9d7124] text-white font-['Google_Sans',sans-serif] font-medium text-[18px] transition-all duration-300 no-underline cursor-pointer border-none shadow-sm rounded-sm"
            >
              Book Landscaping Consultation
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
