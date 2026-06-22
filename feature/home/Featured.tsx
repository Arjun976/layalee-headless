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

const defaultProducts: ProductItem[] = [
  {
    name: 'YUCCABE | TULSI Planter',
    image: '/select_1.png',
    badge: 'New',
    colors: [
      { code: '#000000', image: '/select_1.png' },
      { code: '#4e7361', image: '/select_1.png' },
      { code: '#ffffff', image: '/select_1.png' },
      { code: '#494949', image: '/select_1.png' }
    ],
    link: '#',
  },
  {
    name: 'FOX B | CUBO Planter',
    image: '/select_2.png',
    badge: '',
    colors: [
      { code: '#000000', image: '/select_2.png' },
      { code: '#4e7361', image: '/select_2.png' },
      { code: '#ffffff', image: '/select_2.png' },
      { code: '#494949', image: '/select_2.png' }
    ],
    link: '#',
  },
  {
    name: 'YUCCABE | DMD Planter',
    image: '/select_3.png',
    badge: 'Best Seller',
    colors: [
      { code: '#ffffff', image: '/select_3.png' },
      { code: '#f5f3ef', image: '/select_3.png' },
      { code: '#f5f3ef', image: '/select_3.png' },
      { code: '#f5f3ef', image: '/select_3.png' }
    ],
    link: '#',
  },
  {
    name: 'SHERA|Kangaroo Planter',
    image: '/select_4.png',
    badge: '',
    colors: [
      { code: '#000000', image: '/select_4.png' },
      { code: '#cc9433', image: '/select_4.png' },
      { code: '#ffffff', image: '/select_4.png' },
      { code: '#f5f3ef', image: '/select_4.png' }
    ],
    link: '#',
  },
  {
    name: 'SHERA|DMD KTR Hanging',
    image: '/select_5.png',
    badge: 'Limited Stock',
    colors: [
      { code: '#525252', image: '/select_5.png' },
      { code: '#cc9433', image: '/select_5.png' },
      { code: '#ffffff', image: '/select_5.png' },
      { code: '#f5f3ef', image: '/select_5.png' }
    ],
    link: '#',
  },
  {
    name: 'FOX B | CUBO Tall Planter',
    image: '/select_6.png',
    badge: '',
    colors: [
      { code: '#2c322d', image: '/select_6.png' },
      { code: '#cc9433', image: '/select_6.png' },
      { code: '#ffffff', image: '/select_6.png' },
      { code: '#dcdddc', image: '/select_6.png' }
    ],
    link: '#',
  },
  {
    name: 'Fox B | BXT Planter',
    image: '/select_7.png',
    badge: '',
    colors: [
      { code: '#313232', image: '/select_7.png' },
      { code: '#cc9433', image: '/select_7.png' },
      { code: '#ffffff', image: '/select_7.png' },
      { code: '#dcdddc', image: '/select_7.png' }
    ],
    link: '#',
  },
  {
    name: 'YUCCABE | BAR Planter',
    image: '/select_8.png',
    badge: 'Set',
    colors: [
      { code: '#2c322d', image: '/select_8.png' },
      { code: '#cc9433', image: '/select_8.png' },
      { code: '#ffffff', image: '/select_8.png' },
      { code: '#F5F3EF', image: '/select_8.png' }
    ],
    link: '#',
  },
];

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

function ProductCard({ product }: { product: ProductItem }) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Sync state when product changes (e.g. if loaded asynchronously)
  useEffect(() => {
    setSelectedImage(product.image);
    setActiveColorIdx(0);
  }, [product]);

  return (
    <div className="w-[262px] md:w-[415px] xl:w-[calc(25%-15px)] flex flex-col gap-4 md:gap-5 flex-shrink-0 snap-start group">
      {/* Image Container with Hover Zoom & Badge */}
      <div className="h-[339px] md:h-[460px] bg-white relative overflow-hidden flex items-center justify-center w-full">
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
        {/* Add To Cart Hover Button */}
        <Link href={product.link} className="absolute bottom-8 left-8 right-8 py-4 bg-[#507661] hover:bg-[#456755] text-white flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 font-['Google_Sans',sans-serif] text-lg font-medium z-10 cursor-pointer border-none no-underline">
          Add to Cart
          <svg width="20" height="20" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.1906 0C7.09658 0 6.04737 0.434597 5.27379 1.20818C4.5002 1.98177 4.0656 3.03098 4.0656 4.125V4.8125L2.83541 4.88135C2.25661 4.88074 1.69988 5.10339 1.28112 5.50294C0.862358 5.90249 0.613833 6.44816 0.587283 7.02635L0.00235959 18.4472C-0.0115633 18.7513 0.0362368 19.0551 0.142878 19.3403C0.24952 19.6254 0.412795 19.886 0.622861 20.1063C0.832928 20.3267 1.08544 20.5022 1.36516 20.6223C1.64489 20.7425 1.94605 20.8047 2.25048 20.8053L13.7345 20.625C14.0389 20.6244 14.3401 20.5621 14.6198 20.442C14.8995 20.3219 15.152 20.1464 15.3621 19.926C15.5721 19.7057 15.7354 19.4451 15.8421 19.1599C15.9487 18.8748 15.9965 18.571 15.9826 18.2669L15.6194 6.91167C15.5929 6.33349 15.3443 5.78782 14.9256 5.38827C14.5068 4.98871 13.9501 4.76606 13.3713 4.76667L12.3156 4.8125V4.125C12.3156 3.03098 11.881 1.98177 11.1074 1.20818C10.3338 0.434597 9.28462 0 8.1906 0ZM5.4406 4.125V4.8125H10.9406V4.125C10.9406 3.39565 10.6509 2.69618 10.1351 2.18046C9.61942 1.66473 8.91995 1.375 8.1906 1.375C7.46126 1.375 6.76178 1.66473 6.24606 2.18046C5.73033 2.69618 5.4406 3.39565 5.4406 4.125ZM14.2444 6.97355L14.6076 18.3356C14.6119 18.4539 14.5929 18.5718 14.5516 18.6827C14.5103 18.7936 14.4476 18.8952 14.367 18.9819C14.2847 19.0664 14.1863 19.1336 14.0777 19.1797C13.9691 19.2257 13.8524 19.2496 13.7345 19.25L2.25048 19.4303C2.13252 19.4299 2.01582 19.406 1.90722 19.36C1.79861 19.314 1.70028 19.2467 1.61798 19.1622C1.53739 19.0756 1.47466 18.9739 1.43337 18.863C1.39208 18.7521 1.37305 18.6342 1.37736 18.516L1.96228 7.08822C1.97289 6.86388 2.06955 6.65225 2.23215 6.49733C2.39476 6.3424 2.61081 6.25635 2.83541 6.25635L13.3713 6.14167C13.5959 6.14142 13.8119 6.22773 13.9745 6.38265C14.1372 6.53758 14.2338 6.74921 14.2444 6.97355Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>

      {/* Product Text Details */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-[20px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.6px] md:tracking-[-0.96px] xl:tracking-[-1.8px]">
          {product.name}
        </h3>
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
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Parse Featured Options
  let homeCommonOptions: any = null;
  if (homepage?.homeCommonOptions) {
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
  if (homepage && !featuredEnabled) {
    return null;
  }

  // Parse Featured Products
  const rawFeaturedProducts = featuredFieldset.featured_products || [];
  const apiProducts = products?.nodes || [];

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

  const displayProducts = mappedProducts.length > 0 ? mappedProducts : defaultProducts;

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
        setActiveDot(index);
      }
    }
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollLeft = slider.scrollLeft;
      const children = slider.children;
      if (children && children.length > 0) {
        let closestIndex = 0;
        let minDiff = Infinity;
        const containerLeft = slider.getBoundingClientRect().left;

        Array.from(children).forEach((child, index) => {
          const rect = child.getBoundingClientRect();
          const diff = Math.abs(rect.left - containerLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        });
        setActiveDot(closestIndex);
      }
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
            {displayProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
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
            className="flex xl:flex-row overflow-x-auto xl:overflow-x-visible xl:flex-wrap scrollbar-none snap-x snap-mandatory gap-5 md:gap-6 xl:gap-y-10 xl:gap-x-5 w-full pr-5 md:pr-[30px] xl:p-0"
          >
            {displayProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
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
