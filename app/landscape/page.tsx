import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import LandscapeCards from '@/feature/landscape/LandscapeCards';
// import { getHeaderAndHomePageData } from '@/lib/wordpress';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landscape Design Services | Layale',
  description: 'From residential gardens to commercial landscapes, we design and create green environments that enhance the beauty, functionality, and value of your property.',
};

export default async function LandscapePage() {
  // const homeData = await getHeaderAndHomePageData();
  // const { homepage } = homeData || {};
  // const baseUrl = process.env.Secret;

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

      {/* ── Figma Landscape Cards Section ── */}
      <LandscapeCards />
    </main>
  );
}
