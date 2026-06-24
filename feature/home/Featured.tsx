'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedProps {
  homepage?: any;
  products?: any;
}

interface ColorSwatch {
  code: string;
  image: string;
}

interface ProductItem {
  name: string;
  image: string;
  badge: string;
  colors: ColorSwatch[];
  link: string;
}

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

function ProductCard({ product, isClone }: { product: ProductItem; isClone?: boolean }) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Sync state when product changes (e.g. if loaded asynchronously)
  useEffect(() => {
    setSelectedImage(product.image);
    setActiveColorIdx(0);
  }, [product]);

  return (
    <div className={`w-[262px] md:w-[415px] xl:w-[calc(25%-15px)] flex flex-col gap-4 md:gap-5 pb-5 md:pb-6 flex-shrink-0 snap-start group ${isClone ? 'xl:hidden' : ''}`}>
      {/* Image Container with Hover Zoom & Badge - Clickable Link to Product Details */}
      <Link href={product.link} className="h-[339px] md:h-[460px] bg-white relative overflow-hidden flex items-center justify-center w-full block">
        {product.badge && (
          <span className="absolute top-8 left-[23px] z-10 inline-flex px-3 py-1 justify-center items-center bg-[#507661] text-white font-['Google_Sans',sans-serif] text-sm font-normal leading-[1.5] capitalize">
            {product.badge}
          </span>
        )}
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 262px, (max-width: 1280px) 415px, 280px"
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
        />
      </Link>

      {/* Product Text Details */}
      <div className="flex flex-col gap-4">
        <Link href={product.link} className="no-underline">
          <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.6px] md:tracking-[-0.96px] xl:tracking-[-1.8px] hover:text-[#507661] transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        {/* Color Swatches */}
        <div className="flex gap-3">
          {product.colors.map((color, colorIdx) => (
            <button
              key={colorIdx}
              onClick={() => {
                if (color.image) {
                  setSelectedImage(color.image);
                }
                setActiveColorIdx(colorIdx);
              }}
              className={`w-7 h-7 border transition-all duration-200 cursor-pointer ${
                activeColorIdx === colorIdx ? 'border-black scale-110 shadow-sm' : 'border-black/5'
              }`}
              style={{ backgroundColor: color.code }}
              title={`Color ${colorIdx + 1}`}
              aria-label={`Select color ${colorIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedSection({ homepage, products }: FeaturedProps) {
  if (!homepage || !products) {
    return null;
  }

  // Parse Featured Options
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
  const featuredEnabled = featuredFieldset.home_featured_enable !== '0' && featuredFieldset.home_featured_enable !== false;
  const featuredSubtitle = featuredFieldset.home_featured_subtitle || 'Handpicked Selection';
  const featuredTitle = featuredFieldset.home_featured_title || 'Featured Planters';

  // Return null if featured section is disabled in CMS
  if (!featuredEnabled) {
    return null;
  }

  // Parse Featured Products
  const rawFeaturedProducts = featuredFieldset.featured_products || [];
  const apiProducts = products.nodes || [];

  const mappedProducts: ProductItem[] = rawFeaturedProducts.map((fp: any) => {
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

  const displayProducts = mappedProducts;
  if (displayProducts.length === 0) {
    return null;
  }

  // Clones setup for infinite loop on mobile/tablet (ignored on desktop via xl:hidden)
  const cloneCount = displayProducts.length > 1 ? Math.min(3, displayProducts.length) : 0;
  const extendedProducts = displayProducts.length > 1
    ? [
        ...displayProducts.slice(-cloneCount),
        ...displayProducts,
        ...displayProducts.slice(0, cloneCount)
      ]
    : displayProducts;

  const [activeIndex, setActiveIndex] = useState(cloneCount);
  const [isInitialized, setIsInitialized] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeDot = displayProducts.length > 1
    ? (activeIndex - cloneCount + displayProducts.length) % displayProducts.length
    : 0;

  // Parse Promo Cards
  const rawPromoCards = homeCommonOptions?.home_featured_promo_cards || [];
  
  // Card 1
  const promoCard1 = rawPromoCards.find((c: any) => c.featured_promo_card_style === 'card-landscape');
  const promo1Enabled = promoCard1 ? (promoCard1.featured_promo_card_enable !== '0' && promoCard1.featured_promo_card_enable !== false) : true;
  const promo1Subtitle = promoCard1?.featured_promo_card_subtitle || 'Landscaping Services';
  const promo1Title = promoCard1?.featured_promo_card_title || 'Landscape Design Services';
  const promo1Desc = promoCard1?.featured_promo_card_description || 'Get expert advice on planter selection and plant combinations for your interiors and outdoors.';
  const promo1BtnText = promoCard1?.featured_promo_card_button_text || 'Book Consultation';
  const promo1BtnLink = mapUrl(promoCard1?.featured_promo_card_button_link?.url || '#');

  // Card 2
  const promoCard2 = rawPromoCards.find((c: any) => c.featured_promo_card_style === 'card-bestselling');
  const promo2Enabled = promoCard2 ? (promoCard2.featured_promo_card_enable !== '0' && promoCard2.featured_promo_card_enable !== false) : true;
  const promo2Subtitle = promoCard2?.featured_promo_card_subtitle || 'Most Loved';
  const promo2Title = promoCard2?.featured_promo_card_title || 'Bestselling Planters';
  const promo2Desc = promoCard2?.featured_promo_card_description || 'Bring life to your interiors and outdoor spaces with our thoughtfully crafted planter collection.';
  const promo2BtnText = promoCard2?.featured_promo_card_button_text || 'Shop Bestsellers';
  const promo2BtnLink = mapUrl(promoCard2?.featured_promo_card_button_link?.url || '#');

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current;
    if (slider) {
      const children = slider.children;
      if (children && children[index]) {
        const card = children[index] as HTMLElement;
        const targetScroll = card.offsetLeft - slider.offsetLeft;
        slider.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        });
        setActiveIndex(index);
      }
    }
  };

  const instantScrollToCard = (index: number) => {
    const slider = sliderRef.current;
    if (slider) {
      const children = slider.children;
      if (children && children[index]) {
        const card = children[index] as HTMLElement;
        const targetScroll = card.offsetLeft - slider.offsetLeft;
        slider.scrollTo({
          left: targetScroll,
          behavior: 'auto',
        });
        setActiveIndex(index);
      }
    }
  };

  // Mount effect to scroll to first real card instantly
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && displayProducts.length > 1) {
      const children = slider.children;
      if (children && children[cloneCount]) {
        const card = children[cloneCount] as HTMLElement;
        const targetScroll = card.offsetLeft - slider.offsetLeft;
        slider.scrollTo({
          left: targetScroll,
          behavior: 'auto',
        });
      }
      setActiveIndex(cloneCount);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [displayProducts.length, cloneCount]);

  // Infinite scroll seamless loop boundary check
  useEffect(() => {
    if (displayProducts.length <= 1) return;

    if (activeIndex >= cloneCount + displayProducts.length) {
      // Reached end clones, jump back to real product in middle
      const targetIndex = activeIndex - displayProducts.length;
      instantScrollToCard(targetIndex);
    } else if (activeIndex < cloneCount) {
      // Reached start clones, jump forward to real product in middle
      const targetIndex = activeIndex + displayProducts.length;
      instantScrollToCard(targetIndex);
    }
  }, [activeIndex, displayProducts.length, cloneCount]);

  // Auto-scroll loop
  useEffect(() => {
    if (displayProducts.length <= 1) return;

    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (slider && slider.scrollWidth > slider.clientWidth) {
        const nextIndex = activeIndex + 1;
        scrollToCard(nextIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [displayProducts.length, activeIndex]);

  // Listener for scroll tracking
  useEffect(() => {
    const slider = sliderRef.current;
    const handleScroll = () => {
      if (slider) {
        const children = slider.children;
        if (children && children.length > 0) {
          let closestIndex = 0;
          let minDiff = Infinity;
          const containerLeft = slider.getBoundingClientRect().left;

          Array.from(children).forEach((child, index) => {
            const rect = child.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return; // Skip hidden clones

            const diff = Math.abs(rect.left - containerLeft);
            if (diff < minDiff) {
              minDiff = diff;
              closestIndex = index;
            }
          });
          setActiveIndex(closestIndex);
        }
      }
    };

    if (slider) {
      slider.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, [displayProducts.length]);

  return (
    <section className="bg-[#F5F3EF] py-10 md:py-[60px] xl:py-[100px] w-full flex flex-col items-center" id="featured">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col xl:block">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10 order-1 xl:order-none">
          <div className="flex flex-col gap-3">
            {featuredSubtitle && (
              <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                {featuredSubtitle}
              </span>
            )}
            {featuredTitle && (
              <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[40px] 2xl:text-[48px] min-[1600px]:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
                {featuredTitle}
              </h2>
            )}
          </div>
        </div>

        {/* Swipe Slider pagination dots - Hidden on Desktop (xl:hidden) */}
        {displayProducts.length > 1 && (
          <div className="flex xl:hidden justify-center items-center gap-3 mt-[29px] -mb-[27px] py-2.5 order-3">
            {displayProducts.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => scrollToCard(index + cloneCount)}
                className={`p-0 w-3.5 h-3.5 bg-transparent border rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 outline-none hover:opacity-70 ${
                  index === activeDot ? 'border-[#2C322D]' : 'border-transparent'
                }`}
                aria-label={`Go to product slide ${index + 1}`}
              >
                <div className="w-2 h-2 bg-[#2C322D] transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>
        )}

        {/* Product Slider Wrapper */}
        <div className="relative w-screen -ml-5 md:-ml-[30px] xl:static xl:w-full xl:m-0 xl:p-0 xl:order-none overflow-hidden pl-5 md:pl-[30px] xl:pl-0 order-2">
          {/* Left background-colored overlay for mobile/tablet to hide scrolled cards initially */}
          <div className="absolute top-0 left-0 w-5 md:w-[30px] h-full bg-[#F5F3EF] z-10 xl:hidden pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className={`flex xl:flex-row overflow-x-auto xl:overflow-x-visible xl:flex-wrap scrollbar-none snap-x snap-mandatory gap-5 md:gap-6 xl:gap-y-10 xl:gap-x-5 w-full pr-5 md:pr-[30px] xl:p-0 transition-opacity duration-500 ${
              isInitialized ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {extendedProducts.map((product: ProductItem, index: number) => {
              const isClone = displayProducts.length > 1 && (index < cloneCount || index >= cloneCount + displayProducts.length);
              return <ProductCard key={index} product={product} isClone={isClone} />;
            })}
          </div>
        </div>

        {/* Featured Promo Cards Grid */}
        {(promo1Enabled || promo2Enabled) && (
          <div className="flex flex-col w-screen -ml-5 -mr-5 md:-ml-[30px] md:-mr-[30px] mt-[60px] order-4 xl:flex-row xl:gap-5 xl:w-full xl:mx-0">
            
            {/* Card 1: Landscape Design Services */}
            {promo1Enabled && (
              <div
                className="flex-1 min-h-[444px] md:min-h-[620px] py-[60px] px-5 md:py-[100px] md:px-10 xl:p-[60px] flex flex-col justify-start rounded-[4px] bg-[linear-gradient(66deg,rgba(0,0,0,0)_51.99%,rgba(0,0,0,0.6)_94.07%),url('/bg_card1.png')] bg-[88%_center] xl:bg-[50%] bg-cover bg-no-repeat"
              >
                <div className="flex flex-col gap-10 max-w-[440px]">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                      {promo1Subtitle && (
                        <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                          <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                          {promo1Subtitle}
                        </span>
                      )}
                      {promo1Title && (
                        <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[40px] 2xl:text-[48px] min-[1600px]:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
                          {promo1Title}
                        </h2>
                      )}
                    </div>
                    {promo1Desc && (
                      <p className="text-[#F5F3EF] text-base leading-[1.5] xl:text-lg">
                        {promo1Desc}
                      </p>
                    )}
                  </div>
                  {promo1BtnText && (
                    <a
                      href={promo1BtnLink}
                      className="inline-flex w-[260px] h-[67px] justify-center items-center gap-2.5 bg-[#CC9433] hover:bg-[#b7852d] text-white text-sm md:text-base xl:text-lg font-medium font-['Google_Sans',sans-serif] transition-colors duration-300 no-underline cursor-pointer border-none"
                    >
                      {promo1BtnText}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956C10.1935 14.1816 10.5567 14.1816 10.7742 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Card 2: Bestselling Planters */}
            {promo2Enabled && (
              <div
                className="flex-1 min-h-[444px] md:min-h-[620px] py-[60px] px-5 md:py-[100px] md:px-10 xl:p-[60px] flex flex-col justify-start rounded-[4px] bg-[linear-gradient(246deg,rgba(255,255,255,0.3)_6.96%,rgba(255,255,255,0)_95.93%),url('/bg_card2.png')] bg-[5%_center] bg-[length:180%] xl:bg-[-110.59px_-91.06px] xl:bg-[length:129%_129%] bg-no-repeat"
              >
                <div className="flex flex-col gap-10 max-w-[440px]">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                      {promo2Subtitle && (
                        <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                          <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                          {promo2Subtitle}
                        </span>
                      )}
                      {promo2Title && (
                        <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] xl:text-[40px] 2xl:text-[48px] min-[1600px]:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
                          {promo2Title}
                        </h2>
                      )}
                    </div>
                    {promo2Desc && (
                      <p className="text-[#2C322D] text-base leading-[1.5] xl:text-lg">
                        {promo2Desc}
                      </p>
                    )}
                  </div>
                  {promo2BtnText && (
                    <a
                      href={promo2BtnLink}
                      className="inline-flex w-[260px] h-[67px] justify-center items-center gap-2.5 bg-[#2C322D] hover:bg-[#1a1e1b] text-white text-sm md:text-base xl:text-lg font-medium font-['Google_Sans',sans-serif] transition-colors duration-300 no-underline cursor-pointer border-none"
                    >
                      {promo2BtnText}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.7742 3.04407C10.5562 2.81848 10.1935 2.81848 9.96786 3.04407C9.74989 3.26205 9.74989 3.62483 9.96786 3.8423L14.0565 7.93096H0.564497C0.249984 7.93147 0 8.18145 0 8.49596C0 8.81048 0.249984 9.06859 0.564497 9.06859H14.0565L9.96786 13.1496C9.74989 13.3752 9.74989 13.7385 9.96786 13.956C10.1935 14.1816 10.5567 14.1816 10.7742 13.956L15.8308 8.89939C16.0564 8.68142 16.0564 8.31864 15.8308 8.10117L10.7742 3.04407Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
