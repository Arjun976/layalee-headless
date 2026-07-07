import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import ProductCatalog from '@/feature/Product/ProductCatalog';
import ProductPromise from '@/feature/Product/Promise';
import ProductFaq from '@/feature/Product/Faq';
import NatureInspired from '@/feature/home/nature-inspired';
import { ProductItem, ColorSwatch } from '@/components/ProductCard';
import { getHeaderAndHomePageData, getLayaleProductCategory, getLayaleShopFilters, getLayaleProduct } from '@/lib/wordpress';

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
  const shopFilters = await getLayaleShopFilters();
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

  const apiProductsRaw = (products as { nodes?: Array<{ databaseId: number; title?: string; uri?: string; slug?: string; productCategories?: { nodes: Array<{ slug: string }> } }> })?.nodes || [];
  const detailedProducts = await Promise.all(
    apiProductsRaw.map(async (p) => {
      if (!p.slug) return null;
      const details = await getLayaleProduct(p.slug);
      if (!details) return null;
      return {
        ...details,
        databaseId: p.databaseId,
        categorySlugs: p.productCategories?.nodes?.map((cat) => cat.slug) || [],
      };
    })
  );

  const apiProducts = detailedProducts.filter(Boolean) as Array<{
    databaseId: number;
    title?: string;
    slug?: string;
    categorySlugs?: string[];
    content?: {
      colors?: Array<{ colorName?: string; colorCode?: string; images?: Array<{ url?: string }> }>;
      sizes?: Array<{ sizeName?: string }>;
      shapes?: string[];
    };
  }>;
  const rawCategoryFeaturedProducts = categoryDetails?.featured?.products;

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

  const displayProducts: ProductItem[] = apiProducts.map((p) => {
    // Find if this product is marked as featured in category or homepage to get its badge
    let badge = '';
    
    // Check category featured products
    const categoryFeatured = rawCategoryFeaturedProducts?.find(
      (fp: any) => parseInt(String(fp.productId)) === p.databaseId
    );
    if (categoryFeatured) {
      if (categoryFeatured.isNew === true) {
        badge = 'New';
      } else if (categoryFeatured.isBestseller === true) {
        badge = 'Best Seller';
      }
    } else {
      // Check homepage featured products
      const homeFeatured = rawFeaturedProducts?.find(
        (fp: any) => parseInt(String(fp.product_id)) === p.databaseId
      );
      if (homeFeatured) {
        if (homeFeatured.is_new === '1' || homeFeatured.is_new === true) {
          badge = 'New';
        } else if (homeFeatured.is_bestseller === '1' || homeFeatured.is_bestseller === true) {
          badge = 'Best Seller';
        }
      }
    }

    const colorsList = p.content?.colors || [];

    // Collect all unique images of the product across all colors to use as fallback
    const allUniqueImages = colorsList
      .flatMap((col: any) => (col.images || []).map((img: any) => img.url))
      .filter(Boolean) as string[];

    // Parse colors to ColorSwatch objects using detailed product's colors and first image url
    const colors: ColorSwatch[] = colorsList
      .map((col: any, colorIdx: number) => {
        const rawCode = col.colorCode;
        let rawImage = col.images?.[0]?.url;
        
        // Fallback if this color has no images of its own
        if (!rawImage) {
          rawImage = allUniqueImages[colorIdx] || allUniqueImages[0] || '';
        }

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

    return {
      name: p.title || `Product #${p.databaseId}`,
      image: image,
      badge: badge,
      colors: colors.length > 0 ? colors : [{ code: '#ffffff', image: image }],
      link: p.slug ? `/product_detail/${p.slug}` : '#',
      shapes: p.content?.shapes || [],
      sizes: (p.content?.sizes || []).map((s: any) => s.sizeName).filter(Boolean),
      colorNames: (p.content?.colors || []).map((c: any) => c.colorName).filter(Boolean),
      categorySlugs: p.categorySlugs,
    };
  });

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
        shopFilters={shopFilters}
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
