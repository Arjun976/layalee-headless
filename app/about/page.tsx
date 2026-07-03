import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import AboutIntro from '@/feature/about/Intro';
import AboutQuality from '@/feature/about/Quality';
import AboutServices from '@/feature/about/Services';
import PromiseSection from '@/feature/home/Promise';
import NatureInspired from '@/feature/home/nature-inspired';
import { getHeaderAndHomePageData } from '@/lib/wordpress';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Layale',
  description: 'At Layale, we believe thoughtfully designed spaces create meaningful experiences. Learn about our promise, our premium materials, and complete landscaping services.',
};

export default async function AboutPage() {
  const { homepage } = await getHeaderAndHomePageData();
  const baseUrl = process.env.Secret;

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
      <AboutQuality />

      {/* 4. Our Services: More Than Planters (Figma Light Section) */}
      <AboutServices />

      {/* 5. Promise Section (Same as Home Page) */}
      <PromiseSection homepage={homepage} baseUrl={baseUrl} />

      {/* 6. Nature Inspired Section (Same as Home Page) */}
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}
