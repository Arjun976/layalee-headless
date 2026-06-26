'use client';

import React, { useState, useMemo } from 'react';
import ProductCard, { ProductItem } from '@/components/ProductCard';

interface CategoryNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  uri: string;
}

interface ProductCatalogProps {
  initialProducts: ProductItem[];
  categories: {
    nodes: CategoryNode[];
  };
}

// Helper to assign category slug based on product name
function getProductCategorySlug(name: string): string {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('hanging') || lowercaseName.includes('ktr')) {
    return 'hanging-planters';
  }
  if (lowercaseName.includes('kangaroo') || lowercaseName.includes('bar') || lowercaseName.includes('balcony')) {
    return 'balcony-planters';
  }
  if (lowercaseName.includes('tray')) {
    return 'tray-planter';
  }
  if (lowercaseName.includes('outdoor')) {
    return 'outdoor-planters';
  }
  // Default to indoor planters
  return 'indoor-planters';
}

export default function ProductCatalog({ initialProducts, categories }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryList = useMemo(() => {
    return categories.nodes || [];
  }, [categories]);

  // Map products to their categories and filter/sort them
  const processedProducts = useMemo(() => {
    let result = initialProducts.map(p => ({
      ...p,
      categorySlug: getProductCategorySlug(p.name)
    }));

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }

    // Sort
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'newest') {
      // Products with "New" badge first
      result.sort((a, b) => {
        const aNew = a.badge === 'New' ? 1 : 0;
        const bNew = b.badge === 'New' ? 1 : 0;
        return bNew - aNew;
      });
    }

    return result;
  }, [initialProducts, searchQuery, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  return (
    <section className="py-12 md:py-16 xl:py-20 bg-[#F5F3EF]">
      <div className="flex flex-col gap-8 md:gap-10 px-5 md:px-[30px] xl:px-10 mx-auto w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]!">
        
        {/* Filter Controls Row (Figma screenshot layout) */}
        <div className="flex items-center justify-between border-b border-[#2C322D]/10 pb-6 w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-12 h-12 border border-[#2C322D] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#2C322D]/5 active:bg-[#2C322D]/10 ${
                isFilterOpen ? 'bg-[#2C322D]/5' : 'bg-transparent'
              }`}
              aria-label="Toggle filters"
            >
              {/* Sliders Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23"
                  stroke="#2C322D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-[#545955] font-['Google_Sans',sans-serif] text-sm md:text-base font-normal">
              Showing 1–{processedProducts.length} of {initialProducts.length} item(s)
            </span>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden w-full ${
            isFilterOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white p-6 md:p-8 rounded-[4px] border border-[#2C322D]/5 shadow-[0_4px_24px_rgba(44,50,45,0.02)] flex flex-col gap-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Left: Search input */}
              <div className="relative flex-1 max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search planters by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-[#F5F3EF]/50 hover:bg-[#F5F3EF]/80 focus:bg-white border border-[#2C322D]/10 focus:border-[#507661] text-[#2C322D] placeholder-[#545955]/50 text-sm font-sans font-normal outline-none transition-all duration-300 rounded-sm"
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#545955]/60 pointer-events-none" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Right: Sort controls */}
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-xs md:text-sm font-sans font-medium text-[#545955] whitespace-nowrap">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 px-4 bg-white border border-[#2C322D]/10 focus:border-[#507661] text-[#2C322D] text-sm font-sans font-normal outline-none cursor-pointer rounded-sm min-w-[160px]"
                >
                  <option value="default">Featured</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

            </div>

            {/* Bottom Row: Category Filters */}
            <div className="flex flex-col gap-3 border-t border-[#2C322D]/5 pt-6">
              <span className="text-xs font-sans font-semibold tracking-wider text-[#CC9433] uppercase">
                Filter by Category
              </span>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {/* "All" category pill */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 text-xs md:text-sm font-sans font-medium transition-all duration-300 border cursor-pointer rounded-sm ${
                    selectedCategory === 'all'
                      ? 'bg-[#507661] border-[#507661] text-white shadow-sm'
                      : 'bg-transparent border-[#2C322D]/10 hover:border-[#2C322D]/40 text-[#2C322D]'
                  }`}
                >
                  All Planters
                </button>

                {/* Dynamic Category Pills */}
                {categoryList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 text-xs md:text-sm font-sans font-medium transition-all duration-300 border cursor-pointer rounded-sm ${
                      selectedCategory === cat.slug
                        ? 'bg-[#507661] border-[#507661] text-white shadow-sm'
                        : 'bg-transparent border-[#2C322D]/10 hover:border-[#2C322D]/40 text-[#2C322D]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active filter tags & Reset Button */}
            {(searchQuery !== '' || selectedCategory !== 'all' || sortBy !== 'default') && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2C322D]/5 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-sans font-medium text-[#545955]">Active Filters:</span>
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                      Category: {categoryList.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                      <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                    </span>
                  )}
                  {searchQuery !== '' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                      Search: &quot;{searchQuery}&quot;
                      <button onClick={() => setSearchQuery('')} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                    </span>
                  )}
                  {sortBy !== 'default' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                      Sort: {sortBy === 'name-asc' ? 'A-Z' : sortBy === 'name-desc' ? 'Z-A' : 'New Arrivals'}
                      <button onClick={() => setSortBy('default')} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                    </span>
                  )}
                </div>

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-sans font-semibold tracking-wider text-red-500 hover:text-red-700 transition-colors uppercase border-none bg-transparent cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Info & Responsive Cards Grid */}
        <div className="flex flex-col gap-6 w-full">
          {processedProducts.length > 0 ? (
            /* Responsive Grid: 1 column on mobile, 2 columns on tablet/iPad (md), 3 on lg, 4 on xl */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 xl:gap-x-5 w-full">
              {processedProducts.map((product, idx) => (
                <ProductCard 
                  key={idx} 
                  product={product} 
                  className="w-full flex flex-col gap-4 md:gap-5 pb-5 md:pb-6 flex-shrink-0 group"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[4px] border border-[#2C322D]/5">
              <svg className="w-12 h-12 text-zinc-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-[#2C322D] font-['Funnel_Display',sans-serif] text-xl font-normal mb-2">
                No Results Match Your Search
              </h3>
              <p className="text-zinc-500 font-sans text-sm max-w-[320px] mb-6">
                Try modifying your query or filters, or reset them to view our full collection.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#507661] hover:bg-[#3e5b4a] text-white px-6 h-12 text-sm font-sans font-medium transition-colors duration-300 rounded-sm border-none cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
