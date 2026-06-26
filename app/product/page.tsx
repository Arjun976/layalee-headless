import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import ProductCatalog from '@/feature/Product/ProductCatalog';
import ProductPromise from '@/feature/Product/Promise';
import ProductFaq from '@/feature/Product/Faq';
import NatureInspired from '@/feature/home/nature-inspired';
import { ProductItem, ColorSwatch } from '@/components/ProductCard';
import { getHeaderAndHomePageData } from '@/lib/wordpress';

function mapUrl(url: string): string {
  if (!url) return '#';
  if (url.startsWith('/') || url.startsWith('#')) return url;
  
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    
    // Strip WordPress subdirectory if present (e.g. /layale_be, /layale)
    const wpBases = ['/layale_be', '/layale'];
    for (const wpBase of wpBases) {
      if (pathname.startsWith(wpBase)) {
        pathname = pathname.substring(wpBase.length);
      }
    }
    
    // Normalize trailing slash
    if (pathname.endsWith('/') && pathname.length > 1) {
      pathname = pathname.slice(0, -1);
    }
    
    // Specific mappings matching standard config/headers
    if (pathname === '/category') return '/portrait';
    if (pathname === '/landscape') return '#';
    if (pathname === '') return '/';
    
    return pathname;
  } catch (error) {
    return url.startsWith('/') ? url : `/${url}`;
  }
}

export default async function ProductPage() {
  const { homepage, productCategories, products } = await getHeaderAndHomePageData();
  const baseUrl = process.env.Secret;

  if (!homepage || !products || !productCategories) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <ProductBnr />
        <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
          <p className="text-red-500 font-medium mb-4">Unable to load products data.</p>
        </div>
      </main>
    );
  }

  // Parse Featured Options to fetch detailed products information
  let homeCommonOptions: any = null;
  if (homepage.homeCommonOptions) {
    try {
      homeCommonOptions = typeof homepage.homeCommonOptions === 'string'
        ? JSON.parse(homepage.homeCommonOptions)
        : homepage.homeCommonOptions;
    } catch (e) {
      console.error("Error parsing homeCommonOptions:", e);
    }
  }

  const featuredFieldset = homeCommonOptions?.home_featured_fieldset || {};
  const rawFeaturedProducts = featuredFieldset.featured_products || [];
  const apiProducts = products.nodes || [];

  const displayProducts: ProductItem[] = rawFeaturedProducts.map((fp: any) => {
    // Find matching product by ID
    const matched = apiProducts.find((p: any) => p.databaseId === parseInt(fp.product_id));
    
    // Parse colors to ColorSwatch objects
    const colorsList = fp.product_colors || [];
    const colors: ColorSwatch[] = colorsList
      .map((col: any) => {
        const rawCode = col.color_code;
        const rawImage = col.color_image?.url;
        if (!rawCode && !rawImage) return null;
        return {
          code: rawCode || '#ffffff',
          image: rawImage || ''
        };
      })
      .filter(Boolean) as ColorSwatch[];
    
    // Primary image is either the first color swatch image with a url, or a default fallback
    const firstColorWithImage = colors.find(c => c.image);
    const image = firstColorWithImage ? firstColorWithImage.image : '/select_1.png';
    
    // Set Badge: "New" or "Best Seller"
    let badge = '';
    if (fp.is_new === '1' || fp.is_new === true) {
      badge = 'New';
    } else if (fp.is_bestseller === '1' || fp.is_bestseller === true) {
      badge = 'Best Seller';
    }

    return {
      name: matched?.title || fp.product_title || `Product #${fp.product_id}`,
      image: image,
      badge: badge,
      colors: colors.length > 0 ? colors : [{ code: '#ffffff', image: image }],
      link: matched ? mapUrl(matched.uri) : '#',
    };
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F3EF]">
      {/* Product Banner Component */}
      <ProductBnr 
        title="Indoor planters"
        subtitle="Indoor planters"
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Indoor planters', url: '/product' },
        ]}
      />

      {/* Product Catalog Grid Section (includes filters and responsive product cards) */}
      <ProductCatalog 
        initialProducts={displayProducts} 
        categories={productCategories} 
      />

      {/* Why Choose Our Indoor Products Section */}
      <ProductPromise />

      {/* Nature Inspired Instagram Grid/Carousel */}
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />

      {/* Frequently Asked Questions Section */}
      <ProductFaq />
    </main>
  );
}
