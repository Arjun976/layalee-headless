import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import LandscapeCards from '@/feature/landscape/LandscapeCards';
import { getLayaleLandscape } from '@/lib/wordpress';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landscape Design Services | Layale',
  description: 'From residential gardens to commercial landscapes, we design and create green environments that enhance the beauty, functionality, and value of your property.',
};

export default async function LandscapePage() {
  const landscapeData = await getLayaleLandscape();

  // Resolve Banner Details
  const banner = landscapeData?.banner || {};
  const bannerEnabled = banner.enabled !== false;
  const bannerTitle = banner.title || 'Landscape';
  const bannerSubtitle = banner.subtitle || 'Land scape';
  const bannerBgImage = banner.image?.url || null; // falls back to /bg-product.png internally in ProductBnr

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* ── Figma Landscape Banner Section (styled like contact page) ── */}
      {bannerEnabled && (
        <ProductBnr 
          title={bannerTitle}
          subtitle={bannerSubtitle}
          backgroundImage={bannerBgImage}
          breadcrumbs={[
            { label: 'Home', url: '/' },
            { label: 'Landscape', url: '/landscape' },
          ]}
        />
      )}

      {/* ── Figma Landscape Cards Section ── */}
      <LandscapeCards landscapeData={landscapeData} />

    </main>
  );
}

