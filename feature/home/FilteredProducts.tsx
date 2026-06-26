'use client';

import React, { useState, useEffect } from 'react';
import ProductCard, { ProductItem } from '@/components/ProductCard';

interface FilteredProductItem extends ProductItem {
  category: string;
}

const PRODUCTS: FilteredProductItem[] = [
  {
    name: "Aero Ribbed Ceramic Planter",
    image: "/select_1.png",
    badge: "New",
    colors: [
      { code: "#EAE6DF", image: "/select_1.png" },
      { code: "#D2CBC1", image: "/select_2.png" },
    ],
    link: "#",
    category: "Ceramic",
  },
  {
    name: "Terrazzo Minimalist Bowl",
    image: "/select_2.png",
    badge: "Best Seller",
    colors: [
      { code: "#D2CBC1", image: "/select_2.png" },
      { code: "#8F9A8F", image: "/select_3.png" },
    ],
    link: "#",
    category: "Concrete",
  },
  {
    name: "Classic Terracotta Pot",
    image: "/select_3.png",
    badge: "",
    colors: [
      { code: "#8F9A8F", image: "/select_3.png" },
      { code: "#CD846C", image: "/select_4.png" },
    ],
    link: "#",
    category: "Terracotta",
  },
  {
    name: "Matte Cylinder Planter",
    image: "/select_4.png",
    badge: "New",
    colors: [
      { code: "#CD846C", image: "/select_4.png" },
      { code: "#EAE6DF", image: "/select_1.png" },
    ],
    link: "#",
    category: "Ceramic",
  },
  {
    name: "Industrial Concrete Cube",
    image: "/select_5.png",
    badge: "",
    colors: [
      { code: "#9C9B99", image: "/select_5.png" },
      { code: "#6C6B69", image: "/select_6.png" },
    ],
    link: "#",
    category: "Concrete",
  },
  {
    name: "Sleek Carbon Cylinder",
    image: "/select_6.png",
    badge: "Best Seller",
    colors: [
      { code: "#6C6B69", image: "/select_6.png" },
      { code: "#C59B27", image: "/select_7.png" },
    ],
    link: "#",
    category: "Metallic",
  },
  {
    name: "Gilded Rim Brass Vase",
    image: "/select_7.png",
    badge: "New",
    colors: [
      { code: "#C59B27", image: "/select_7.png" },
      { code: "#4E6A56", image: "/select_8.png" },
    ],
    link: "#",
    category: "Metallic",
  },
  {
    name: "Sage Hanging Herb Pot",
    image: "/select_8.png",
    badge: "",
    colors: [
      { code: "#4E6A56", image: "/select_8.png" },
      { code: "#9C9B99", image: "/select_5.png" },
    ],
    link: "#",
    category: "Ceramic",
  },
];

const CATEGORIES = ["All", "Ceramic", "Concrete", "Terracotta", "Metallic"];

export default function FilteredProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<FilteredProductItem[]>(PRODUCTS);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      if (selectedCategory === "All") {
        setFilteredProducts(PRODUCTS);
      } else {
        setFilteredProducts(PRODUCTS.filter(p => p.category === selectedCategory));
      }
      setIsAnimating(false);
    }, 300); // duration of fade out

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <section className="bg-[#F9F8F6] py-12 md:py-20 xl:py-[100px] w-full flex flex-col items-center border-t border-[#EAE6DF]" id="filtered-collection">
     <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px] min-[1600px]:px-[30px] flex flex-col gap-8 md:gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
            Curated Selection
            <span className="w-[21px] h-[1px] bg-[#CC9433]" />
          </span>
          <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.2] text-[30px] md:text-[48px] lg:text-[48px] xl:text-[60px] tracking-[-0.9px] md:tracking-[-1.2px] xl:tracking-[-1.8px]">
            Explore by Material
          </h2>
          <p className="text-[#6C736E] max-w-[600px] font-['Google_Sans',sans-serif] text-sm md:text-base leading-relaxed">
            Find the perfect planter design crafted from high-quality materials to complement your interior space and garden layout.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 pb-2 border-b border-[#EAE6DF]/60">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 font-['Google_Sans',sans-serif] text-sm md:text-base font-medium tracking-[0.5px] cursor-pointer transition-all duration-300 relative ${
                  isActive
                    ? 'text-[#507661] border-b-2 border-[#507661]'
                    : 'text-[#6C736E] border-b-2 border-transparent hover:text-[#2C322D]'
                }`}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 w-full transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.name}-${index}`}
              product={product}
              className="w-full flex flex-col gap-4 md:gap-5 pb-5 md:pb-6 group"
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#6C736E] text-lg font-['Google_Sans',sans-serif]">No products found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
