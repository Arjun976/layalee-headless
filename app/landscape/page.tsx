import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import NatureInspired from '@/feature/home/nature-inspired';
import { getHeaderAndHomePageData } from '@/lib/wordpress';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landscape Design Services | Layale',
  description: 'From residential gardens to commercial landscapes, we design and create green environments that enhance the beauty, functionality, and value of your property.',
};

export default async function LandscapePage() {
  const homeData = await getHeaderAndHomePageData();
  const { homepage } = homeData || {};
  const baseUrl = process.env.Secret;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* ── Figma Landscape Banner Section (styled like contact page) ── */}
      <ProductBnr 
        title="Landscape"
        subtitle="Land scape"
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Landscape', url: '/landscape' },
        ]}
      />

      {/* ── Intro Content Section (Figma nodes 628:5587 & 628:5589) ── */}
      <section className="py-16 md:py-24 bg-white flex flex-col items-center">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-[1200px] text-center flex flex-col gap-6">
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[32px] md:text-[48px] lg:text-[60px] tracking-[-1px] md:tracking-[-1.8px]">
            Create Beautiful Outdoor Spaces
          </h2>
          <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.78] max-w-[800px] mx-auto">
            From residential gardens to commercial landscapes, we design and create green environments that enhance the beauty, functionality, and value of your property.
          </p>
        </div>
      </section>

      {/* ── Nature Inspired Section (Footer/End of page standard) ── */}
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}
