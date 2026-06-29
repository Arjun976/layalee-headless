'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';

const product = {
  name: 'FOX B | CILIN TALL',
  subtitle: '*Plants are not included',
  description: `Bring home elegance and strength with the FOX B | CILIN TALL Planter, crafted from premium German Polymer. Designed with a sleek rectangular shape, this planter is the perfect balance of modern style and lasting durability, making it suitable for both indoor and outdoor spaces.

Built to withstand the harshest weather, this planter is highly UV-protected and resistant to fading, ensuring its charm stays intact for years. Unlike ordinary plastic pots, the CILIN TALL planter has a life span of 10+ years, giving your plants a reliable and stylish home.

Available in three versatile sizes – 18, 24, and 30 inches, it adapts effortlessly to balconies, terraces, living rooms, offices, or large garden landscapes. Whether you’re planting vibrant flowers, lush greens, or decorative indoor plants, this planter enhances the natural beauty of your space.`,
  breadcrumbs: ['Home', 'Indoor', 'FOX B | CLIN TALL'],
  colors: [
    { 
      name: 'Beige', 
      value: '#E1C18D', 
      images: ['/fox_B_1.png', '/select_1.png', '/select_2.png'] 
    },
    { 
      name: 'Dark Grey', 
      value: '#2C322D', 
      images: ['/select_3.png', '/select_4.png', '/select_5.png'] 
    },
    { 
      name: 'White', 
      value: '#FFFFFF', 
      images: ['/select_6.png', '/select_7.png', '/select_8.png'] 
    },
    { 
      name: 'Light Grey', 
      value: '#E5E5E5', 
      images: ['/fox-B-2.png', '/fox-B-3.png', '/select_1.png'] 
    },
  ],
  sizes: ['18', '24', '30'],
  specs: [
    { label: 'Material', value: 'Polymers' },
    { label: 'Colour', value: 'Beige' }, // Dynamic based on selected color name
    { label: 'Style', value: 'Plant Pot' },
    { label: 'Special Feature', value: 'Lightweight, Perfect for Indoor and Outdoor, Portable, UV Resistant, Weather Resistant' }
  ]
};

const accordionSections = [
  { id: 'description', title: 'Product Description' },
  { id: 'features', title: 'Product Features', content: `• Crafted from premium German Polymer technology.\n• Sleek rectangular modern silhouette.\n• Highly UV-protected and resistant to fading.\n• Long lifespan of 10+ years.\n• Outstanding weather resistance for harsh outdoor climates.` },
  { id: 'care', title: 'Care Instructions', content: `• Wipe clean with a soft, damp cloth.\n• Avoid using abrasive cleaners or harsh chemicals.\n• Safe for direct planting; ensure drainage holes are clear if used outdoors.` },
  { id: 'shipping', title: 'Shipping Information', content: `• Standard delivery within UAE in 2-3 business days.\n• Free delivery for orders above AED 300.\n• International shipping available upon request.` },
  { id: 'about', title: 'About Layale Products', content: `Layale indoor and outdoor planters are crafted with premium materials to bring elegance, greenery, and timeless style into every space. Our focus is on long-lasting durability, aesthetic beauty, and eco-friendly manufacturing.` }
];

export default function ProductSection() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>('description'); // Expand Description by default

  const activeColor = useMemo(() => {
    return product.colors[selectedColorIndex];
  }, [selectedColorIndex]);

  const activeImages = useMemo(() => {
    return activeColor.images;
  }, [activeColor]);

  const mainImage = useMemo(() => {
    return activeImages[currentImageIndex] || activeImages[0];
  }, [activeImages, currentImageIndex]);

  // Reset image view index when color variant changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColorIndex]);

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
  };

  const handleThumbnailSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? activeImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === activeImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="mx-auto max-w-[1720px] px-5 md:px-[30px] xl:px-12 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[40px] xl:gap-[65px] items-start w-full">
        
        {/* Left Side: Image Gallery Block */}
        <div className="flex flex-col lg:flex-row gap-5 xl:gap-[21px] shrink-0 w-full lg:w-auto">
          
          {/* Vertical Thumbnails (Desktop only) */}
          <div className="hidden lg:flex flex-col gap-5 xl:gap-[21px] w-[160px] shrink-0">
            {activeImages.map((thumb, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailSelect(i)}
                className={`relative w-[160px] h-[180px] overflow-hidden border-2 transition-all cursor-pointer ${
                  currentImageIndex === i ? 'border-[#507661]' : 'border-transparent hover:border-[#507661]/40'
                }`}
              >
                <Image
                  src={thumb}
                  alt={`View ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image Container */}
          <div className="relative w-full lg:w-[736px] aspect-[736/860] overflow-hidden bg-[#F5F3EF]/50 shrink-0">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Gallery Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute bottom-4 left-4 bg-white p-3 text-black hover:bg-zinc-50 transition-colors shadow-sm cursor-pointer z-10"
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute bottom-4 right-4 bg-[#507661] p-3 text-white hover:bg-[#3e5b4a] transition-colors shadow-sm cursor-pointer z-10"
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Horizontal Thumbnails (Mobile & Tablet only) */}
          <div className="flex lg:hidden flex-row gap-2.5 mt-2">
            {activeImages.map((thumb, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailSelect(i)}
                className={`relative w-[76px] h-[76px] overflow-hidden border-2 transition-all cursor-pointer ${
                  currentImageIndex === i ? 'border-[#507661]' : 'border-transparent'
                }`}
              >
                <Image
                  src={thumb}
                  alt={`View ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details Column */}
        <div className="flex-1 w-full flex flex-col lg:max-h-[860px] lg:overflow-y-auto no-scrollbar lg:pr-2">
          
          {/* Breadcrumbs (Non-uppercase, styled to Figma) */}
          <nav className="mb-6 flex flex-wrap text-sm font-normal text-[#828787] font-sans">
            {product.breadcrumbs.map((crumb, i) => (
              <span key={crumb} className="flex items-center">
                {crumb}
                {i < product.breadcrumbs.length - 1 && (
                  <span className="mx-2.5 text-[#828787]/50">/</span>
                )}
              </span>
            ))}
          </nav>

          {/* Product Title */}
          <h1 className="mb-1 text-[#2C322D] font-['Google_Sans',sans-serif] text-[32px] md:text-[48px] font-medium leading-[1.1] tracking-tight">
            {product.name}
          </h1>
          
          {/* Subtitle */}
          <p className="mb-8 text-sm italic text-[#828787] font-sans">
            {product.subtitle}
          </p>

          {/* Color Selector */}
          <div className="mb-8">
            <h3 className="mb-4 text-[16px] font-medium text-[#2C322D] font-sans">
              Colour: <span className="font-normal text-[#2C322D]/70">{activeColor.name}</span>
            </h3>
            <div className="flex gap-4">
              {product.colors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(index)}
                  className={`h-12 w-12 border-2 transition-all cursor-pointer ${
                    selectedColorIndex === index 
                      ? 'border-[#2C322D] ring-2 ring-[#2C322D] ring-offset-2' 
                      : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <h3 className="mb-4 text-[16px] font-medium text-[#2C322D] font-sans">
              Size in inches
            </h3>
            <div className="flex gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-12 w-[52px] items-center justify-center border font-sans text-[16px] font-medium transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#2C322D] border-[#2C322D] text-white'
                      : 'border-[#2C322D]/10 hover:border-[#2C322D]/40 text-[#2C322D]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Specs Table */}
          <div className="flex flex-col gap-3.5 border-t border-[#2C322D]/10 pt-8 pb-8 mb-8">
            {product.specs.map((spec) => {
              const value = spec.label === 'Colour' ? activeColor.name : spec.value;
              return (
                <div key={spec.label} className="flex items-start gap-4">
                  <span className="w-[120px] shrink-0 font-['Google_Sans',sans-serif] text-[16px] font-medium text-[#2C322D]">
                    {spec.label}
                  </span>
                  <span className="font-['Google_Sans',sans-serif] text-[16px] font-normal text-[#2C322D]/80 leading-normal">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-row gap-4 mb-10 w-full sm:w-auto">
            <button className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-[#CC9433] hover:bg-[#b5832a] text-white h-[67px] w-full md:w-[198px] text-[16px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm">
              <span>Contact us</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-[#507661] hover:bg-[#3e5b4a] text-white h-[67px] w-full md:w-[206px] text-[16px] font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-sm">
              <span>Place Order</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          {/* Collapsible Accordion Menu Stack */}
          <div className="border-t border-[#2C322D]/10 w-full">
            {accordionSections.map((sec) => {
              const isOpen = openSection === sec.id;
              const contentText = sec.id === 'description' ? product.description : sec.content;
              return (
                <div key={sec.id} className="border-b border-[#2C322D]/10">
                  <button
                    onClick={() => setOpenSection(isOpen ? null : sec.id)}
                    className="w-full py-5 flex items-center justify-between text-[#2C322D] hover:text-[#507661] transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    <span className="font-['Google_Sans',sans-serif] text-[20px] font-medium leading-none">
                      {sec.title}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[600px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="font-['Google_Sans',sans-serif] text-[15px] font-normal text-[#2C322D]/80 leading-relaxed whitespace-pre-line">
                      {contentText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
