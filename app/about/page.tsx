import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import AboutIntro from '@/feature/about/Intro';
import AboutQuality from '@/feature/about/Quality';
import AboutServices from '@/feature/about/Services';
import WhyChoose from '@/feature/about/WhyChoose';
import PromiseSection from '@/feature/home/Promise';
import NatureInspired from '@/feature/home/nature-inspired';
import { getHeaderAndHomePageData, getLayaleAbout } from '@/lib/wordpress';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Layale',
  description: 'At Layale, we believe thoughtfully designed spaces create meaningful experiences. Learn about our promise, our premium materials, and complete landscaping services.',
};

export default async function AboutPage() {
  const [homeData, aboutData] = await Promise.all([
    getHeaderAndHomePageData(),
    getLayaleAbout(),
  ]);

  const { homepage } = homeData || {};
  const baseUrl = process.env.Secret;

  // Banner details
  const banner = aboutData?.banner || {};
  const bannerEnabled = banner.enabled !== false;
  const bannerTitle = banner.title || 'About Us';
  const bannerSubtitle = banner.subtitle || 'About Us';
  const bannerBgImage = banner.image?.url || undefined;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Page Banner Section */}
      {bannerEnabled && (
        <ProductBnr 
          title={bannerTitle}
          subtitle={bannerSubtitle}
          backgroundImage={bannerBgImage}
          breadcrumbs={[
            { label: 'Home', url: '/' },
            { label: 'About Us', url: '/about' },
          ]}
        />
      )}

      {/* 2. Intro Section: Bringing Nature Into Modern Living */}
      <AboutIntro aboutData={aboutData?.about} />

      {/* 3. Specs Section: Quality You Can Trust */}
      <AboutQuality qualityData={aboutData?.quality} />

      {/* 4. Our Services: More Than Planters */}
      <AboutServices servicesData={aboutData?.services} />

      {/* 5. Why Choose Us Section */}
      {aboutData?.whyChoose?.enabled && (
        <WhyChoose whyChooseData={aboutData.whyChoose} />
      )}

      {/* 6. Get Inspired Section */}
      {aboutData?.getInspired && (
        <div 
          className="w-full"
          dangerouslySetInnerHTML={{ __html: aboutData.getInspired }}
        />
      )}

      {/* 7. Promise Section (Same as Home Page) */}
      <PromiseSection homepage={homepage} baseUrl={baseUrl} />

      {/* 8. Nature Inspired Section (Same as Home Page) */}
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}
