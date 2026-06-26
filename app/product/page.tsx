import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import ProductCard, { ProductItem, ColorSwatch } from '@/components/ProductCard';
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
  const { homepage, products } = await getHeaderAndHomePageData();

  if (!homepage || !products) {
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

      {/* Product Catalog Grid Section */}
      <section className="py-12 md:py-16 xl:py-24">
        <div className="flex flex-col gap-10 md:gap-14 px-5 md:px-[30px] xl:px-10 mx-auto w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:max-w-[1540px]">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2C322D]/10 pb-6 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#CC9433] text-xs md:text-sm font-normal tracking-[1.4px] uppercase font-sans">
                Curated Selection
              </span>
              <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                All Planters
              </h2>
            </div>
            
            {/* Products count indicator */}
            <span className="text-[#545955] text-sm font-sans font-normal opacity-80">
              Showing {displayProducts.length} premium designs
            </span>
          </div>

          {/* Product Cards Grid Wrapper */}
          {displayProducts.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-10 md:gap-x-6 xl:gap-x-5 w-full justify-start">
              {displayProducts.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[4px] border border-[#2C322D]/5">
              <svg className="w-12 h-12 text-zinc-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-xl font-normal mb-2">No Products Found</h3>
              <p className="text-zinc-500 font-sans text-sm max-w-[320px]">
                Please check back later as we are updates our inventory with new designs.
              </p>
            </div>
          )}
          
        </div>
      </section>
    </main>
  );
}
