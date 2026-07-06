'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutQuality() {
  const sharedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.52424 9.36187C5.16398 9.36187 4.87207 9.65405 4.87207 10.014V33.4592C4.87207 39.034 8.85972 44.3414 13.7051 48.6684C20.8219 55.024 29.7178 59.284 29.7178 59.284C29.896 59.3693 30.1031 59.3693 30.2813 59.284C30.2813 59.284 39.1772 55.024 46.294 48.6684C51.1394 44.3414 55.127 39.034 55.127 33.4592V10.014C55.127 9.65405 54.8351 9.36187 54.4749 9.36187C50.0249 9.36187 46.4174 5.75457 46.4174 1.3044C46.4174 0.944135 46.1255 0.652222 45.7652 0.652222C36.8677 0.652222 23.1314 0.652222 14.2339 0.652222C13.8736 0.652222 13.5817 0.944135 13.5817 1.3044C13.5817 5.75457 9.97416 9.36187 5.52424 9.36187ZM6.17642 10.6438C10.8269 10.324 14.5435 6.60735 14.8636 1.95657H45.1355C45.4555 6.60735 49.1722 10.324 53.8229 10.644C53.8227 10.6438 53.8227 33.4592 53.8227 33.4592C53.8227 38.6982 49.9785 43.6292 45.4253 47.6954C39.1842 53.2688 31.5483 57.1986 29.9995 57.9692C28.4508 57.1986 20.8149 53.2688 14.5738 47.6954C10.0206 43.6292 6.17642 38.6982 6.17642 33.4592V10.6438ZM17.1979 4.62292C16.889 4.62292 16.6227 4.83944 16.5595 5.14153C15.9546 8.0377 13.6156 11.6768 9.10624 12.1307C8.77311 12.1641 8.51955 12.4446 8.51955 12.7795V32.9805C8.51955 37.8066 11.9231 42.4039 16.0657 46.1497C22.1322 51.6353 29.7149 55.312 29.7149 55.312C29.8947 55.3991 30.1044 55.3991 30.2842 55.312C30.2842 55.312 37.8669 51.6353 43.9334 46.1497C48.076 42.4039 51.4795 37.8066 51.4795 32.9805V12.7795C51.4795 12.4446 51.226 12.1641 50.8929 12.1307C46.3835 11.6768 44.0445 8.0377 43.4396 5.14153C43.3764 4.83944 43.1101 4.62292 42.8012 4.62292H17.1979ZM17.7131 5.92727H42.286C43.109 9.02822 45.6236 12.6285 50.1752 13.3524V32.9805C50.1752 37.4719 46.9141 41.6964 43.0587 45.1824C37.8152 49.9237 31.4124 53.2821 29.9995 53.9964C28.5867 53.2821 22.1839 49.9237 16.9404 45.1824C13.085 41.6964 9.8239 37.4719 9.8239 32.9805V13.3524C14.3755 12.6285 16.8901 9.02822 17.7131 5.92727ZM42.4777 41.5112C39.0131 45.0426 34.6488 47.9544 31.5298 49.8113C31.2204 49.9952 31.1187 50.3959 31.3029 50.7053C31.487 51.0144 31.8877 51.1161 32.1969 50.932C35.3922 49.0297 39.8596 46.0422 43.4088 42.4245C43.6608 42.1675 43.6569 41.7543 43.3999 41.5023C43.1429 41.2503 42.7297 41.2542 42.4777 41.5112ZM46.0135 37.0764C45.5401 37.8548 44.9969 38.6158 44.4022 39.3559C44.1765 39.6366 44.2211 40.0472 44.5018 40.2728C44.7822 40.4982 45.1931 40.4536 45.4185 40.1732C46.0498 39.388 46.6255 38.5803 47.128 37.7544C47.315 37.4468 47.2172 37.0453 46.9096 36.8583C46.6021 36.6713 46.2006 36.7691 46.0135 37.0764ZM21.67 28.0941L19.2499 29.429C19.0417 29.5438 18.9126 29.7624 18.9126 30C18.9126 30.2377 19.0417 30.4563 19.2499 30.5711L21.67 31.906L19.2499 33.2408C19.0417 33.3554 18.9126 33.5742 18.9126 33.8119C18.9126 34.0493 19.0417 34.2681 19.2499 34.3829L29.6847 40.138C29.8806 40.2462 30.1185 40.2462 30.3144 40.138L40.7492 34.3829C40.9574 34.2681 41.0865 34.0493 41.0865 33.8119C41.0865 33.5742 40.9574 33.3554 40.7492 33.2408L38.3291 31.906L40.7492 30.5711C40.9574 30.4563 41.0865 30.2377 41.0865 30C41.0865 29.7624 40.9574 29.5438 40.7492 29.429L38.3291 28.0941L40.7492 26.7593C40.9574 26.6447 41.0865 26.4259 41.0865 26.1882C41.0865 25.9508 40.9574 25.732 40.7492 25.6172L30.3144 19.8621C30.1185 19.7539 29.8806 19.7539 29.6847 19.8621L19.2499 25.6172C19.0417 25.732 18.9126 25.9508 18.9126 26.1882C18.9126 26.4259 19.0417 26.6447 19.2499 26.7593L21.67 28.0941ZM23.0202 32.6507L20.915 33.8119L29.9995 38.8221L39.0841 33.8119L36.9789 32.6507L30.3144 36.3264C30.1185 36.4344 29.8806 36.4344 29.6847 36.3264L23.0202 32.6507ZM23.0202 28.8389L20.915 30L29.9995 35.0103L39.0841 30L36.9789 28.8389L30.3144 32.5146C30.1185 32.6226 29.8806 32.6226 29.6847 32.5146L23.0202 28.8389ZM29.9995 21.178L39.0841 26.1882L29.9995 31.1987L20.915 26.1882L29.9995 21.178ZM12.8268 19.09V15.43C16.9057 14.4629 18.9358 11.4919 19.9305 8.73735H25.6754C26.0351 8.73735 26.3275 8.44518 26.3275 8.08518C26.3275 7.72518 26.0351 7.433 25.6754 7.433H19.4646C19.1821 7.433 18.9316 7.61509 18.8442 7.88379C17.9954 10.4993 16.1409 13.4995 12.0551 14.2602C11.7462 14.3179 11.5224 14.5874 11.5224 14.9014V19.09C11.5224 19.45 11.8146 19.7421 12.1746 19.7421C12.5346 19.7421 12.8268 19.45 12.8268 19.09ZM28.3232 8.73735H30.898C31.258 8.73735 31.5502 8.44518 31.5502 8.08518C31.5502 7.72518 31.258 7.433 30.898 7.433H28.3232C27.9632 7.433 27.671 7.72518 27.671 8.08518C27.671 8.44518 27.9632 8.73735 28.3232 8.73735Z" fill="#CC9433"/>
    </svg>
  );

  const specsList = [
    {
      title: 'German Polymer Technology',
      desc: 'Manufactured using premium materials for superior strength and durability.',
      icon: sharedIcon,
    },
    {
      title: 'UV Protected & Weather Resistant',
      desc: 'Designed to withstand harsh outdoor conditions while maintaining their appearance.',
      icon: sharedIcon,
    },
    {
      title: 'Lightweight Construction',
      desc: 'Easy to handle, install, and reposition without compromising durability.',
      icon: sharedIcon,
    },
    {
      title: 'Built To Last',
      desc: 'Engineered for long-term performance with a lifespan of over 10 years.',
      icon: sharedIcon,
    },
  ];

  return (
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
            <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.1] text-[32px] md:text-[48px] xl:text-[60px] tracking-[-1.8px]">
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
                <div className="flex flex-col gap-2 max-w-[307px]">
                  <h3 className="text-white font-['Funnel_Display',sans-serif] text-[20px] md:text-[24px] font-light leading-[24px] tracking-normal">
                    {spec.title}
                  </h3>
                  <p className="text-[#F5F3EF]/85 font-['Google_Sans',sans-serif] text-[15px] md:text-[18px] leading-[27px] font-normal mt-1">
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
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1050px"
        />
      </div>
    </section>
  );
}
