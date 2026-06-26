'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface ColorSwatch {
  code: string;
  image: string;
}

export interface ProductItem {
  name: string;
  image: string;
  badge: string;
  colors: ColorSwatch[];
  link: string;
}

interface ProductCardProps {
  product: ProductItem;
  isClone?: boolean;
  className?: string;
}

export default function ProductCard({ product, isClone, className }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Sync state when product changes (e.g. if loaded asynchronously)
  useEffect(() => {
    setSelectedImage(product.image);
    setActiveColorIdx(0);
  }, [product]);

  return (
    <div className={className || `w-[262px] md:w-[415px] xl:w-[calc(25%-15px)] flex flex-col gap-4 md:gap-5 pb-5 md:pb-6 flex-shrink-0 snap-start group ${isClone ? 'xl:hidden' : ''}`}>
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
