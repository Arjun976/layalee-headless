'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface ProductBnrProps {
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
}

export default function ProductBnr({
  title = 'Indoor planters',
  subtitle = 'Indoor planters',
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Indoor planters', url: '/product' },
  ],
  backgroundImage,
}: ProductBnrProps) {
  return (
    <section className="relative w-full h-[260px] md:h-[300px] xl:h-[336px] overflow-hidden bg-white border-b border-[#2C322D]/10">
      {/* Background Image Container - Desktop (xl and up) */}
      <div className="absolute inset-0 z-0 h-full w-full hidden xl:block">
        <Image
          src={backgroundImage || "/bg-product.png"}
          alt="Product Banner Background Desktop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Background Image Container - iPad and Mobile (below xl) */}
      <div className="absolute inset-0 z-0 h-full w-full xl:hidden flex">
        {/* Left Half */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <Image
            src={backgroundImage || "/bg-product.png"}
            alt="Product Banner Background Left"
            fill
            priority
            sizes="50vw"
            className="object-cover object-left"
          />
        </div>
        {/* Right Half */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <Image
            src={backgroundImage || "/bg-product.png"}
            alt="Product Banner Background Right"
            fill
            priority
            sizes="50vw"
            className="object-cover object-right"
          />
        </div>
      </div>

      {/* Content Container - Vertically and Horizontally Centered */}
      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-center items-center px-5 sm:px-10 xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:max-w-[1540px]">
        <div className="flex flex-col items-center gap-[20px]">
          
          {/* Subtitle flanked by gold lines */}
          {subtitle && (
            <span className="inline-flex items-center gap-3 text-[#CC9433] text-sm md:text-[18px] font-sans font-normal tracking-[1.4px] md:tracking-[1.8px] ">
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
              {subtitle}
              <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            </span>
          )}

          {/* Large Title */}
          <h1 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-none text-4xl sm:text-5xl md:text-6xl xl:text-[72px] tracking-[-1px] md:tracking-[-1.5px]  select-none">
            {title}
          </h1>

          {/* Breadcrumbs positioned BELOW the title */}
          <nav className="flex items-center gap-2 text-sm md:text-[18px] font-sans font-normal text-[#313232] select-none">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-[#313232] mx-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-[#313232] font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.url}
                    className="hover:text-[#507661] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#313232] hover:after:w-full after:transition-all after:duration-300"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
          
        </div>
      </div>
    </section>
  );
}
