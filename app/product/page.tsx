import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import ProductCatalog from '@/feature/Product/ProductCatalog';
import ProductPromise from '@/feature/Product/Promise';
import ProductFaq from '@/feature/Product/Faq';
import NatureInspired from '@/feature/home/nature-inspired';
import { ProductItem, ColorSwatch } from '@/components/ProductCard';
import { getHeaderAndHomePageData, getLayaleProductCategory } from '@/lib/wordpress';

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
    if (pathname === '') return '/';
    
    return pathname;
  } catch (error) {
    return url.startsWith('/') ? url : `/${url}`;
  }
}

export default async function ProductPage() {
  const { homepage, productCategories, products } = await getHeaderAndHomePageData();
  const categoryDetails = await getLayaleProductCategory("indoor-planters");
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

  const apiProducts = (products as { nodes?: Array<{ databaseId: number; title?: string; uri?: string; slug?: string }> })?.nodes || [];
  const rawCategoryFeaturedProducts = categoryDetails?.featured?.products;

  let displayProducts: ProductItem[] = [];

  if (rawCategoryFeaturedProducts && rawCategoryFeaturedProducts.length > 0) {
    displayProducts = rawCategoryFeaturedProducts.map((fp) => {
      // Find matching product by ID
      const matched = apiProducts.find((p) => p.databaseId === parseInt(String(fp.productId)));
      
      // Parse colors to ColorSwatch objects
      const colorsList = fp.colors || [];
      const colors: ColorSwatch[] = colorsList
        .map((col) => {
          const rawCode = col.colorCode;
          const rawImage = col.colorImage?.url;
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
      if (fp.isNew === true) {
        badge = 'New';
      } else if (fp.isBestseller === true) {
        badge = 'Best Seller';
      }

      return {
        name: matched?.title || `Product #${fp.productId}`,
        image: image,
        badge: badge,
        colors: colors.length > 0 ? colors : [{ code: '#ffffff', image: image }],
        link: matched ? `/product_detail/${matched.slug}` : '#',
      };
    });
  } else {
    // Parse Featured Options from homepage fallback to fetch detailed products information
    let homeCommonOptions: {
      home_featured_fieldset?: {
        featured_products?: Array<{
          product_id?: string | number;
          product_colors?: Array<{
            color_code?: string;
            color_image?: { url?: string };
          }>;
          is_new?: boolean | string;
          is_bestseller?: boolean | string;
          product_title?: string;
        }>;
      };
    } | null = null;
    if (homepage && (homepage as { homeCommonOptions?: string | object }).homeCommonOptions) {
      const rawOptions = (homepage as { homeCommonOptions: string | object }).homeCommonOptions;
      try {
        homeCommonOptions = typeof rawOptions === 'string'
          ? JSON.parse(rawOptions)
          : rawOptions;
      } catch (e) {
        console.error("Error parsing homeCommonOptions:", e);
      }
    }

    const featuredFieldset = homeCommonOptions?.home_featured_fieldset || {};
    const rawFeaturedProducts = featuredFieldset.featured_products || [];

    displayProducts = rawFeaturedProducts.map((fp) => {
      // Find matching product by ID
      const matched = apiProducts.find((p) => p.databaseId === parseInt(String(fp.product_id)));
      
      // Parse colors to ColorSwatch objects
      const colorsList = fp.product_colors || [];
      const colors: ColorSwatch[] = colorsList
        .map((col) => {
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
        link: matched ? `/product_detail/${matched.slug}` : '#',
      };
    });
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F3EF]">
      {/* Product Banner Component */}
      <ProductBnr 
        title={categoryDetails?.banner?.title || "Indoor planters"}
        subtitle={categoryDetails?.banner?.subtitle || "Indoor planters"}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: categoryDetails?.term?.name || 'Indoor planters', url: '/product' },
        ]}
      />

      {/* Product Catalog Grid Section (includes filters and responsive product cards) */}
      <ProductCatalog 
        initialProducts={displayProducts} 
        categories={productCategories} 
      />

      {/* Why Choose Our Indoor Products Section */}
      <ProductPromise 
        title={categoryDetails?.whyChoose?.title}
        subtitle={categoryDetails?.whyChoose?.subtitle}
        description={categoryDetails?.whyChoose?.description}
        items={categoryDetails?.whyChoose?.items}
      />

      {/* Frequently Asked Questions Section */}
      <ProductFaq 
        title={categoryDetails?.faq?.title}
        subtitle={categoryDetails?.faq?.subtitle}
        paragraphs={categoryDetails?.faq?.paragraphs}
        buttonText={categoryDetails?.faq?.button?.text}
        buttonUrl={categoryDetails?.faq?.button?.url}
        items={categoryDetails?.faq?.items}
      />

      {/* Nature Inspired Instagram Grid/Carousel */}
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}
