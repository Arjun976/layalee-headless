'use client';

import React, { useState, useMemo, useEffect } from 'react';
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

// Maps WordPress category names to simple design labels
const getCategoryLabel = (name: string) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('indoor')) return 'Indoor';
  if (nameLower.includes('outdoor')) return 'Outdoor';
  if (nameLower.includes('hanging')) return 'Hanging';
  if (nameLower.includes('balcony')) return 'Balcony';
  if (nameLower.includes('tray')) return 'Tray Planters';
  return name;
};

export default function ProductCatalog({ initialProducts, categories }: ProductCatalogProps) {
  // Main filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Open by default as requested

  // Collapsible section states for sidebar
  const [isShapeOpen, setIsShapeOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const categoryList = useMemo(() => {
    return categories.nodes || [];
  }, [categories]);

  // Enrich initial products with shape, size, color names, and category slugs
  const enrichedProducts = useMemo(() => {
    return initialProducts.map((p, idx) => {
      const nameLower = p.name.toLowerCase();

      // Determine Shape
      let shape = 'Round';
      if (nameLower.includes('cubo') || nameLower.includes('sq') || nameLower.includes('square')) {
        shape = 'Square';
      } else if (nameLower.includes('oval') || nameLower.includes('cilin')) {
        shape = 'Oval';
      } else if (nameLower.includes('bowl')) {
        shape = 'Bowl';
      } else if (nameLower.includes('bs') || nameLower.includes('rect') || nameLower.includes('planter')) {
        shape = idx % 3 === 0 ? 'Rectangular' : (idx % 3 === 1 ? 'Round' : 'Square');
      } else {
        shape = idx % 2 === 0 ? 'Round' : 'Square';
      }

      // Determine Size
      const sizes = ['6', '8', '10', '12', '15', '17', '20'];
      const size = sizes[idx % sizes.length];

      // Determine Color Names
      const colorNames: string[] = [];
      const colorList = ['Beige', 'Grey', 'Marble White', 'White', 'Choco Brown'];

      if (p.colors && p.colors.length > 0) {
        p.colors.forEach((c) => {
          const hex = c.code.toLowerCase();
          if (hex === '#ffffff' || hex === '#fff') {
            colorNames.push('White');
          } else if (hex.includes('beige') || hex === '#eedc82' || hex === '#d2b48c' || hex === '#f5f5dc' || hex === '#e8e4db') {
            colorNames.push('Beige');
          } else if (hex === '#808080' || hex === '#828787' || hex === '#a9a9a9' || hex === '#d3d3d3' || hex === '#2c322d') {
            colorNames.push('Grey');
          } else if (hex === '#8b4513' || hex === '#a0522d' || hex === '#5c4033' || hex === '#3d2b1f') {
            colorNames.push('Choco Brown');
          } else {
            const sum = hex.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            colorNames.push(colorList[sum % colorList.length]);
          }
        });
      }
      if (colorNames.length === 0) {
        colorNames.push(idx % 2 === 0 ? 'White' : 'Grey');
      }

      return {
        ...p,
        shape,
        size,
        colorNames,
        categorySlug: getProductCategorySlug(p.name)
      };
    });
  }, [initialProducts]);

  // Filter & Sort Products
  const processedProducts = useMemo(() => {
    let result = [...enrichedProducts];

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categorySlug));
    }

    // Shape Filter
    if (selectedShapes.length > 0) {
      result = result.filter(p => selectedShapes.includes(p.shape));
    }

    // Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => selectedSizes.includes(p.size));
    }

    // Color Filter
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colorNames.some(c => selectedColors.includes(c)));
    }

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => {
        const aNew = a.badge === 'New' ? 1 : 0;
        const bNew = b.badge === 'New' ? 1 : 0;
        return bNew - aNew;
      });
    }

    return result;
  }, [enrichedProducts, searchQuery, selectedCategories, selectedShapes, selectedSizes, selectedColors, sortBy]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedShapes, selectedSizes, selectedColors, sortBy]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const startItem = processedProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, processedProducts.length);

  // Toggle handlers for checkboxes
  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const toggleShape = (shape: string) => {
    setSelectedShapes(prev => {
      if (shape === 'ALL') return [];
      return prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape];
    });
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => {
      if (size === 'ALL') return [];
      return prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size];
    });
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => {
      if (color === 'ALL') return [];
      return prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color];
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedShapes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('default');
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  // Filter lists matching Figma design
  const shapeOptions = ['ALL', 'Round', 'Square', 'Oval', 'Bowl', 'Rectangular'];
  const sizeOptions = ['ALL', '6', '8', '10', '12', '15', '17', '20'];
  const colorOptions = ['ALL', 'Beige', 'Grey', 'Marble White', 'White', 'Choco Brown'];

  // Check if any filter is active
  const hasActiveFilters = searchQuery !== '' || selectedCategories.length > 0 || selectedShapes.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0;

  // Sidebar Filter JSX content (to avoid duplication in Desktop and Mobile drawer)
  const renderSidebarFilters = () => (
    <div className="flex flex-col w-full">
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search planters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 bg-white border border-[#2C322D]/10 focus:border-[#507661] text-[#2C322D] placeholder-[#545955]/50 text-sm font-sans font-normal outline-none transition-all duration-300 rounded-sm"
        />
        <svg 
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#545955]/60 pointer-events-none" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* 1. Categories Section */}
      <div className="flex flex-col mb-8">
        <h3 className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[24px] font-medium leading-[22.4px] mb-1">
          Categories
        </h3>
        <div className="w-[228px] h-[3px] bg-[#507661] mt-1 mb-4" />
        <div className="flex flex-col gap-[14px]">
          {categoryList.map((cat) => {
            const isChecked = selectedCategories.includes(cat.slug);
            const label = getCategoryLabel(cat.name);
            return (
              <div 
                key={cat.id}
                onClick={() => toggleCategory(cat.slug)}
                className="flex items-center gap-[14px] cursor-pointer group"
              >
                <div className={`w-[15px] h-[15px] flex-shrink-0 transition-all duration-200 ${
                  isChecked ? 'bg-[#507661]' : 'bg-[#C4C4C4] group-hover:bg-[#B5B5B5]'
                }`} />
                <span className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] font-normal leading-[20.8px]">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Shop By Shape Section */}
      <div className="flex flex-col mb-8">
        <div 
          onClick={() => setIsShapeOpen(!isShapeOpen)} 
          className="flex items-center justify-between cursor-pointer group"
        >
          <h3 className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[24px] font-medium leading-[22.4px] mb-1">
            Shop By Shape
          </h3>
          <svg 
            className={`w-4 h-4 text-[#2C322D] transition-transform duration-300 mr-2 ${isShapeOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="w-[228px] h-[3px] bg-[#507661] mt-1 mb-4" />
        {isShapeOpen && (
          <div className="flex flex-col gap-[14px]">
            {shapeOptions.map((shape) => {
              const isChecked = shape === 'ALL' ? selectedShapes.length === 0 : selectedShapes.includes(shape);
              return (
                <div 
                  key={shape}
                  onClick={() => toggleShape(shape)}
                  className="flex items-center gap-[14px] cursor-pointer group"
                >
                  <div className={`w-[15px] h-[15px] flex-shrink-0 transition-all duration-200 ${
                    isChecked ? 'bg-[#507661]' : 'bg-[#C4C4C4] group-hover:bg-[#B5B5B5]'
                  }`} />
                  <span className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] font-normal leading-[20.8px]">
                    {shape}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Size Section */}
      <div className="flex flex-col mb-8">
        <div 
          onClick={() => setIsSizeOpen(!isSizeOpen)} 
          className="flex items-center justify-between cursor-pointer group"
        >
          <h3 className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[24px] font-medium leading-[22.4px] mb-1">
            Size
          </h3>
          <svg 
            className={`w-4 h-4 text-[#2C322D] transition-transform duration-300 mr-2 ${isSizeOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="w-[228px] h-[3px] bg-[#507661] mt-1 mb-4" />
        {isSizeOpen && (
          <div className="flex flex-col gap-[14px]">
            {sizeOptions.map((size) => {
              const isChecked = size === 'ALL' ? selectedSizes.length === 0 : selectedSizes.includes(size);
              return (
                <div 
                  key={size}
                  onClick={() => toggleSize(size)}
                  className="flex items-center gap-[14px] cursor-pointer group"
                >
                  <div className={`w-[15px] h-[15px] flex-shrink-0 transition-all duration-200 ${
                    isChecked ? 'bg-[#507661]' : 'bg-[#C4C4C4] group-hover:bg-[#B5B5B5]'
                  }`} />
                  <span className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] font-normal leading-[20.8px]">
                    {size}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Shop By Colour Section */}
      <div className="flex flex-col mb-8">
        <div 
          onClick={() => setIsColorOpen(!isColorOpen)} 
          className="flex items-center justify-between cursor-pointer group"
        >
          <h3 className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[24px] font-medium leading-[22.4px] mb-1">
            Shop By Colour
          </h3>
          <svg 
            className={`w-4 h-4 text-[#2C322D] transition-transform duration-300 mr-2 ${isColorOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="w-[228px] h-[3px] bg-[#507661] mt-1 mb-4" />
        {isColorOpen && (
          <div className="flex flex-col gap-[14px]">
            {colorOptions.map((color) => {
              const isChecked = color === 'ALL' ? selectedColors.length === 0 : selectedColors.includes(color);
              return (
                <div 
                  key={color}
                  onClick={() => toggleColor(color)}
                  className="flex items-center gap-[14px] cursor-pointer group"
                >
                  <div className={`w-[15px] h-[15px] flex-shrink-0 transition-all duration-200 ${
                    isChecked ? 'bg-[#507661]' : 'bg-[#C4C4C4] group-hover:bg-[#B5B5B5]'
                  }`} />
                  <span className="text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] font-normal leading-[20.8px]">
                    {color}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-16 xl:py-20 bg-white">
      <div className="flex flex-col gap-8 md:gap-10 px-5 md:px-[30px] xl:px-10 mx-auto w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]!">
        
        {/* Top Control bar (Figma Layout) */}
        <div className="flex items-center justify-between border-b border-[#2C322D]/10 pb-6 w-full">
          {/* Left: Toggle filters & items info */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-12 h-12 border border-[#2C322D] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#2C322D]/5 active:bg-[#2C322D]/10 ${
                isFilterOpen ? 'bg-[#2C322D]/5' : 'bg-transparent'
              }`}
              aria-label="Toggle filters"
            >
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
            <span className="text-[#828787] font-sans text-[14px] font-normal">
              Showing {startItem}–{endItem} of {processedProducts.length} item(s)
            </span>
          </div>

          {/* Right: Grid Switcher & Sorting */}
          <div className="flex items-center gap-3">
            {/* Grid Switcher (Figma layout styling) */}
            <div className="hidden sm:flex items-center">
              <button 
                className={`w-9 h-9 border border-[#2C322D]/10 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                  isFilterOpen ? 'bg-[#2C322D]/5 text-[#2C322D]' : 'bg-white text-zinc-400'
                }`}
                title="3 Column Grid"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="3.5" height="12" fill="currentColor" />
                  <rect x="6.25" y="2" width="3.5" height="12" fill="currentColor" />
                  <rect x="10.5" y="2" width="3.5" height="12" fill="currentColor" />
                </svg>
              </button>
              <button 
                className={`w-9 h-9 border border-l-0 border-[#2C322D]/10 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                  !isFilterOpen ? 'bg-[#2C322D]/5 text-[#2C322D]' : 'bg-white text-zinc-400'
                }`}
                title="4 Column Grid"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="2.5" height="12" fill="currentColor" />
                  <rect x="5.5" y="2" width="2.5" height="12" fill="currentColor" />
                  <rect x="9" y="2" width="2.5" height="12" fill="currentColor" />
                  <rect x="12.5" y="2" width="2.5" height="12" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* Sorting Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 bg-white border border-[#2C322D]/10 focus:border-[#507661] text-[#2C322D] text-sm font-sans font-normal outline-none cursor-pointer rounded-sm min-w-[170px]"
            >
              <option value="default">Default sorting</option>
              <option value="name-asc">Sort by name: A to Z</option>
              <option value="name-desc">Sort by name: Z to A</option>
              <option value="newest">Sort by newness</option>
            </select>
          </div>
        </div>

        {/* Active Filters row */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-sm border border-[#2C322D]/5 shadow-[0_2px_12px_rgba(44,50,45,0.01)] w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans font-medium text-[#545955]">Active Filters:</span>
              
              {/* Selected Categories Tags */}
              {selectedCategories.map(slug => (
                <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                  Category: {getCategoryLabel(categoryList.find(c => c.slug === slug)?.name || slug)}
                  <button onClick={() => toggleCategory(slug)} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                </span>
              ))}

              {/* Selected Shapes Tags */}
              {selectedShapes.map(shape => (
                <span key={shape} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                  Shape: {shape}
                  <button onClick={() => toggleShape(shape)} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                </span>
              ))}

              {/* Selected Sizes Tags */}
              {selectedSizes.map(size => (
                <span key={size} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                  Size: {size}
                  <button onClick={() => toggleSize(size)} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                </span>
              ))}

              {/* Selected Colors Tags */}
              {selectedColors.map(color => (
                <span key={color} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                  Color: {color}
                  <button onClick={() => toggleColor(color)} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
                </span>
              ))}

              {/* Search Query Tag */}
              {searchQuery !== '' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#507661]/10 text-[#507661] text-xs font-sans font-normal border border-[#507661]/20 rounded-full">
                  Search: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500 font-bold focus:outline-none ml-1">×</button>
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

        {/* Outer Split Layout Container */}
        <div className="flex flex-col lg:flex-row items-start w-full relative">
          
          {/* Mobile Drawer Filter Sidebar */}
          <div 
            className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
              isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsFilterOpen(false)}
          />
          <aside 
            className={`fixed top-0 left-0 bottom-0 w-[300px] bg-white z-50 p-6 overflow-y-auto shadow-2xl transition-transform duration-300 lg:hidden transform ${
              isFilterOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2C322D]/10">
              <h2 className="font-['Funnel_Display',sans-serif] text-2xl text-[#2C322D]">Filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center border border-[#2C322D]/20 rounded-full hover:bg-zinc-200 cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>
            {renderSidebarFilters()}
          </aside>

          {/* Desktop Inline Filter Sidebar */}
          <aside 
            className={`hidden lg:block shrink-0 sticky top-6 transition-all duration-300 ease-in-out ${
              isFilterOpen 
                ? 'w-[280px] opacity-100 mr-10 pointer-events-auto' 
                : 'w-0 opacity-0 mr-0 pointer-events-none overflow-hidden'
            }`}
          >
            <div className="w-[280px]">
              {renderSidebarFilters()}
            </div>
          </aside>

          {/* Results Grid Section */}
          <div className="flex-1 w-full flex flex-col gap-10">
            {paginatedProducts.length > 0 ? (
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 w-full transition-all duration-300 ${
                  isFilterOpen 
                    ? 'lg:grid-cols-2 xl:grid-cols-3' // 3 columns when filter sidebar is open
                    : 'lg:grid-cols-3 xl:grid-cols-4' // 4 columns when filter sidebar is closed
                }`}
              >
                {paginatedProducts.map((product, idx) => (
                  <ProductCard 
                    key={idx} 
                    product={product} 
                    className="w-full flex flex-col gap-4 md:gap-5 pb-5 md:pb-6 flex-shrink-0 group"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[4px] border border-[#2C322D]/5 w-full">
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

            {/* Pagination Bar */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-6 border-t border-[#2C322D]/10">
                {renderPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span 
                        key={`ellipsis-${index}`} 
                        className="w-10 h-10 flex items-center justify-center text-[#828787] font-sans text-[15px]"
                      >
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => setCurrentPage(Number(page))}
                      className={`w-10 h-10 border flex items-center justify-center cursor-pointer transition-all duration-300 font-sans text-[15px] font-normal ${
                        currentPage === page
                          ? 'bg-[#2C322D] border-[#2C322D] text-white'
                          : 'bg-transparent border-[#E5E5E5] text-[#828787] hover:border-[#2C322D] hover:text-[#2C322D]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
