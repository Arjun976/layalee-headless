'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full">
      {/* Top Banner Announcement Strip */}
      <div className="hidden xl:flex bg-[#507661] justify-center items-center min-h-[24px] p-2.5 gap-5">
        <div className="flex items-center gap-[11px]">
          {/* Leaf Icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_280_4970)">
              <mask id="mask0_280_4970" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                <path d="M17.335 17.335V0.665039H0.665039V17.335H17.335Z" fill="white" stroke="white" strokeWidth="1.33" />
              </mask>
              <g mask="url(#mask0_280_4970)">
                <path d="M12.8338 11.5605C10.7165 13.6778 7.28369 13.6778 5.1664 11.5605L4.20801 6.7684L7.08326 7.72683L9.00009 4.85157L10.9169 7.72683L13.7922 6.7684L12.8338 11.5605Z" stroke="#F5F3EF" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.2969 9C17.2969 13.5822 13.5822 17.2969 9 17.2969C4.41777 17.2969 0.703125 13.5822 0.703125 9C0.703125 4.41777 4.41777 0.703127 9 0.703127C13.5822 0.703127 17.2969 4.41777 17.2969 9Z" stroke="#F5F3EF" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_280_4970">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="text-[#E9EDEB] font-sans text-base font-normal leading-[22.4px]">Premium Indoor & Outdoor Planters</p>
        </div>

        <svg width="1" height="18" viewBox="0 0 1 18" fill="none" className="opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.5" y1="0.5" x2="0.499999" y2="17.5" stroke="#F5F3EF" strokeLinecap="round" />
        </svg>

        <div className="flex items-center gap-[11px]">
          {/* Delivery Truck Icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_280_4984" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
              <path d="M17.335 17.335V0.665039H0.665039V17.335H17.335Z" fill="white" stroke="white" strokeWidth="1.33" />
            </mask>
            <g mask="url(#mask0_280_4984)">
              <path d="M12.8672 13.9219H11.0742V4.4297H14.9716C15.4173 4.4297 15.8149 4.70989 15.9648 5.12966L17.4727 9.35157V13.9219H15.6797" stroke="#F5F3EF" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.09766 13.9219H11.0742V3.72657C11.0742 3.1441 10.602 2.67188 10.0195 2.67188H1.58203C0.999562 2.67188 0.527344 3.1441 0.527344 3.72657V13.9219H2.28516" stroke="#F5F3EF" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.6797 13.9219C15.6797 14.6985 15.0501 15.3282 14.2734 15.3282C13.4968 15.3282 12.8672 14.6985 12.8672 13.9219C12.8672 13.1453 13.4968 12.5157 14.2734 12.5157C15.0501 12.5157 15.6797 13.1453 15.6797 13.9219Z" stroke="#F5F3EF" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.09766 13.9219C5.09766 14.6985 4.46808 15.3282 3.69141 15.3282C2.91473 15.3282 2.28516 14.6985 2.28516 13.9219C2.28516 13.1453 2.91473 12.5157 3.69141 12.5157C4.46808 12.5157 5.09766 13.1453 5.09766 13.9219Z" stroke="#F5F3EF" strokeWidth="1.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
          <p className="text-[#E9EDEB] font-sans text-base font-normal leading-[22.4px]">UAE Delivery Available</p>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <div className="sticky top-0 z-[1000] w-full bg-white/80 backdrop-blur-[17px] border-b border-black/[0.05]">
        <div className="flex justify-between items-center py-3 px-5 md:py-4 md:px-10 xl:py-3 xl:max-w-[1200px] 2xl:max-w-[1760px] 3xl:max-w-[1760px] 3xl:px-0 mx-auto w-full">
          {/* Brand Logo */}
          <Link href="/" className="block">
            <img src="/Logo.png" alt="Layalee Logo" className="h-10 w-auto block object-contain" />
          </Link>

          {/* Desktop Navigation & Hamburger */}
          <div className="flex items-center gap-11">
            <nav className="hidden xl:flex items-center gap-[44px]">
              <Link href="/portrait" className="text-[#2C322D] hover:text-[#507661] text-[18px] font-normal leading-[22.4px] transition-colors duration-300 no-underline">
                Category
              </Link>
              <Link href="#" className="text-[#2C322D] hover:text-[#507661] text-[18px] font-normal leading-[22.4px] transition-colors duration-300 no-underline">
                Landscape
              </Link>
              <Link href="/about" className="text-[#2C322D] hover:text-[#507661] text-[18px] font-normal leading-[22.4px] transition-colors duration-300 no-underline">
                About
              </Link>
              <Link href="/contact" className="text-[#2C322D] hover:text-[#507661] text-[18px] font-normal leading-[22.4px] transition-colors duration-300 no-underline">
                Contact
              </Link>
            </nav>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={toggleMenu}
              className={`xl:hidden flex items-center justify-center p-1 focus:outline-none transition-transform active:scale-95 ${isMenuOpen ? 'active' : ''}`}
              aria-label="Toggle menu"
            >
              <svg className="w-[30px] h-[30px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_535_1735)">
                  <path d="M8.14453 16.305H5.55041C4.07885 16.3067 2.66805 16.892 1.62751 17.9325C0.586964 18.9731 0.00165937 20.3839 0 21.8555L0 23.4723C0.0016594 24.9439 0.586966 26.3547 1.62751 27.3952C2.66805 28.4358 4.07886 29.0211 5.55041 29.0227H8.14453C9.61609 29.0211 11.0269 28.4358 12.0675 27.3952C13.108 26.3547 13.6933 24.9439 13.695 23.4723V21.8555C13.6933 20.3839 13.108 18.9731 12.0675 17.9325C11.0269 16.892 9.61609 16.3067 8.14453 16.305ZM11.9372 23.4723C11.9361 24.4778 11.5361 25.4418 10.8251 26.1528C10.1141 26.8639 9.15005 27.2638 8.14453 27.2649H5.55041C4.5449 27.2638 3.58089 26.8638 2.86989 26.1528C2.15888 25.4418 1.75894 24.4778 1.75781 23.4723V21.8555C1.75893 20.8499 2.15886 19.8859 2.86987 19.1749C3.58087 18.4639 4.54489 18.0639 5.55041 18.0628H8.14453C9.15006 18.0639 10.1141 18.4639 10.8251 19.1749C11.5361 19.8859 11.9361 20.8499 11.9372 21.8555V23.4723ZM24.4496 0.977287H21.8555C20.3839 0.978947 18.9731 1.56425 17.9326 2.6048C16.892 3.64534 16.3051 5.05615 16.3051 6.5277V8.14453C16.3067 9.61608 16.892 11.0269 17.9326 12.0674C18.9731 13.108 20.3839 13.6933 21.8555 13.6949H24.4496C25.9211 13.6933 27.3319 13.108 28.3725 12.0674C29.413 11.0269 29.9983 9.61608 30 8.14453V6.5277C29.9983 5.05615 29.413 3.64534 28.3725 2.6048C27.3319 1.56425 25.9211 0.978947 24.4496 0.977287ZM28.2422 8.14453C28.2411 9.15004 27.8411 10.114 27.1301 10.8251C26.4191 11.5361 25.4551 11.936 24.4496 11.9371H21.8555C20.85 11.936 19.886 11.5361 19.1749 10.8251C18.4639 10.114 18.064 9.15004 18.0629 8.14453V6.5277C18.064 5.52218 18.4639 4.55818 19.1749 3.84718C19.886 3.13617 20.85 2.73623 21.8555 2.7351H24.4496C25.4551 2.73623 26.4191 3.13617 27.1301 3.84718C27.8411 4.55818 28.2411 5.52218 28.2422 6.5277V8.14453ZM8.14453 0.977287H5.55041C4.07886 0.978947 2.66805 1.56425 1.62751 2.6048C0.586966 3.64534 0.0016594 5.05615 0 6.5277L0 8.14453C0.00167487 9.61608 0.586986 11.0269 1.62753 12.0674C2.66807 13.108 4.07886 13.6933 5.55041 13.6949H8.14453C9.61609 13.6933 11.0269 13.108 12.0675 12.0674C13.108 11.0269 13.6933 9.61609 13.695 8.14453V6.5277C13.6933 5.05614 13.108 3.64534 12.0675 2.60479C11.0269 1.56425 9.61609 0.978947 8.14453 0.977287ZM11.9372 8.14453C11.9361 9.15005 11.5361 10.1141 10.8251 10.8251C10.1141 11.5361 9.15005 11.936 8.14453 11.9371H5.55041C4.5449 11.936 3.58089 11.5361 2.86989 10.8251C2.15888 10.114 1.75894 9.15004 1.75781 8.14453V6.5277C1.75894 5.52218 2.15888 4.55818 2.86989 3.84718C3.58089 3.13617 4.5449 2.7351H5.55041C4.5449 2.7351H8.14453C9.15005 2.73622 10.1141 3.13615 10.8251 3.84716C11.5361 4.55816 11.9361 5.52217 11.9372 6.5277V8.14453ZM24.4496 16.305H21.8555C20.3839 16.3067 18.9731 16.892 17.9326 17.9325C16.892 18.9731 16.3067 20.3839 16.3051 21.8555V23.4723C16.3067 24.9439 16.892 26.3547 17.9326 27.3952C18.9731 28.4358 20.3839 29.0211 21.8555 29.0227H24.4496C25.9211 29.0211 27.3319 28.4358 28.3725 27.3952C29.413 26.3547 29.9983 24.9439 30 23.4723V21.8555C29.9983 20.3839 29.413 18.9731 28.3725 17.9325C27.3319 16.892 25.9211 16.3067 24.4496 16.305ZM28.2422 23.4723C28.2411 24.4778 27.8411 25.4418 27.1301 26.1528C26.4191 26.8638 25.4551 27.2638 24.4496 27.2649H21.8555C20.85 27.2649 19.886 26.8638 19.1749 26.1528C18.4639 25.4418 18.064 24.4778 18.0629 23.4723V21.8555C18.064 20.8499 18.4639 19.8859 19.1749 19.1749C19.8859 18.4639 20.8499 18.0639 21.8555 18.0628H24.4496C25.4551 18.0639 26.4191 18.4639 27.1301 19.1749C27.8411 19.8859 28.2411 20.8499 28.2422 21.8555V23.4723Z" fill="#2C322D"/>
                </g>
                <defs>
                  <clipPath id="clip0_535_1735">
                    <rect width="30" height="30" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white/98 backdrop-blur-[25px] z-[2000] flex flex-col justify-start items-stretch xl:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-full invisible'}`}>
        <div className="flex justify-between items-center py-3 px-5 md:py-4 md:px-10">
          <div className="mobile-logo">
            <Link href="/" onClick={closeMenu}>
              <img src="/Logo.png" alt="Layalee Logo" className="h-10 w-auto block object-contain" />
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className="bg-transparent border-0 cursor-pointer p-1 flex items-center justify-center transition-transform duration-300 hover:rotate-90"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#323733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <nav className="flex flex-col items-stretch w-full gap-0">
            <Link href="/portrait" className="font-sans text-[14px] md:text-[16px] font-normal text-[#2C322D] uppercase no-underline py-[22px] px-[30px] md:px-[40px] border-b border-[#2C322D]/[0.08] first:border-t last:border-b-0 flex justify-start items-center transition-all duration-300 hover:text-[#507661] hover:bg-black/[0.02] hover:pl-[45px]" onClick={closeMenu}>
              Category
            </Link>
            <Link href="#" className="font-sans text-[14px] md:text-[16px] font-normal text-[#2C322D] uppercase no-underline py-[22px] px-[30px] md:px-[40px] border-b border-[#2C322D]/[0.08] first:border-t last:border-b-0 flex justify-start items-center transition-all duration-300 hover:text-[#507661] hover:bg-black/[0.02] hover:pl-[45px]" onClick={closeMenu}>
              Landscape
            </Link>
            <Link href="/about" className="font-sans text-[14px] md:text-[16px] font-normal text-[#2C322D] uppercase no-underline py-[22px] px-[30px] md:px-[40px] border-b border-[#2C322D]/[0.08] first:border-t last:border-b-0 flex justify-start items-center transition-all duration-300 hover:text-[#507661] hover:bg-black/[0.02] hover:pl-[45px]" onClick={closeMenu}>
              About
            </Link>
            <Link href="/contact" className="font-sans text-[14px] md:text-[16px] font-normal text-[#2C322D] uppercase no-underline py-[22px] px-[30px] md:px-[40px] border-b border-[#2C322D]/[0.08] first:border-t last:border-b-0 flex justify-start items-center transition-all duration-300 hover:text-[#507661] hover:bg-black/[0.02] hover:pl-[45px]" onClick={closeMenu}>
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
