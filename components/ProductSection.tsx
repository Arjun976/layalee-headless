'use client';

import { useState } from 'react';
import Image from 'next/image';

const product = {
  name: 'FOX B | CILIN TALL',
  subtitle: '*Plants are not included',
  description: `Bring home elegance and strength with the FOX B | CILIN TALL Planter, crafted from premium German Polymer. Designed with a sleek rectangular shape, this planter is the perfect balance of modern style and lasting durability, making it suitable for both indoor and outdoor spaces. Built to withstand the harshest weather, this planter is highly UV-protected and resistant to fading, ensuring its charm stays intact for years. Unlike ordinary plastic pots, the CILIN TALL planter has a life span of 10+ years, giving your plants a reliable and stylish home. Available in three versatile sizes - 18, 24, and 30 inches, it adapts effortlessly to balconies, terraces, living rooms, offices, or large garden landscapes. Whether you're planting vibrant flowers, lush greens, or decorative indoor plants, this planter enhances the natural beauty of your space.`,
  breadcrumbs: ['Home', 'Indoor', 'FOX B | CLIN TALL'],
  colors: [
    { name: 'Beige', value: '#E8C35D' },
    { name: 'Dark Grey', value: '#333333' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Light Grey', value: '#D3D3D3' },
  ],
  sizes: ['18', '24', '30'],
  thumbnails: [
    '/fox_B_1.png',
    '/fox_B_1.png', // Placeholder for second thumb
    '/fox_B_1.png', // Placeholder for third thumb
  ],
};

export default function ProductSection() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImage = product.thumbnails[currentImageIndex];

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-6 lg:px-6 min-[1920px]:max-w-[1768px] min-[1920px]:px-0">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 min-[1920px]:flex min-[1920px]:gap-[25px]">
        
        {/* Left: Thumbnails (Desktop) */}
        <div className="hidden flex-col gap-4 lg:col-span-1 lg:flex min-[1920px]:w-[180px] min-[1920px]:flex-shrink-0">
          {product.thumbnails.map((thumb, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`relative aspect-[3/4] w-full overflow-hidden border-2 transition-all min-[1920px]:aspect-square min-[1920px]:h-[180px] ${
                currentImageIndex === i ? 'border-[#517C64]' : 'border-transparent'
              }`}
            >
              <Image
                src={thumb}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Middle: Main Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 lg:col-span-5 min-[1920px]:w-[786px] min-[1920px]:flex-shrink-0 max-h-[860px]">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation Arrows */}
          <div className="absolute bottom-4 left-4 flex">
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.thumbnails.length) % product.thumbnails.length)}
              className="bg-white p-3 text-black hover:bg-zinc-50 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-4 right-4 flex">
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.thumbnails.length)}
              className="bg-[#517C64] p-3 text-white hover:bg-[#436752] transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col lg:col-span-6 min-[1920px]:w-[704px] min-[1920px]:flex-shrink-0">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex text-xs tracking-widest text-zinc-400 uppercase">
            {product.breadcrumbs.map((crumb, i) => (
              <span key={crumb}>
                {crumb}
                {i < product.breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>

          <h1 className="mb-2 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
            {product.name}
          </h1>
          <p className="mb-8 text-sm italic text-zinc-400">
            {product.subtitle}
          </p>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">
              Colour: <span className="font-normal text-zinc-500">{selectedColor.name}</span>
            </h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`h-10 w-10 border transition-all ${
                    selectedColor.name === color.name ? 'border-zinc-900 ring-1 ring-zinc-900' : 'border-zinc-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-10">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">
              Size in inches
            </h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-12 w-16 items-center justify-center border text-sm transition-all ${
                    selectedSize === size
                      ? 'bg-[#517C64] border-[#517C64] text-white'
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 underline underline-offset-8">
              Product Description
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex flex-1 items-center justify-center gap-2 bg-[#D4A017] px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-[#b88a14]">
              Contact us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 bg-[#517C64] px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-[#436752]">
              What&apos;s app
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
