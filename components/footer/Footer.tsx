'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeSettings, NavMenus } from '@/lib/wordpress';

interface FooterProps {
  themeSettings?: ThemeSettings | null;
  navMenus?: NavMenus | null;
}

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function mapUrl(url: string): string {
  if (!url) return '#';
  if (url.startsWith('/') || url.startsWith('#')) return url;
  
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    
    // Strip WordPress subdirectory if present (e.g. /layale_be)
    const wpBase = '/layale_be';
    if (pathname.startsWith(wpBase)) {
      pathname = pathname.substring(wpBase.length);
    }
    
    // Normalize trailing slash
    if (pathname.endsWith('/') && pathname.length > 1) {
      pathname = pathname.slice(0, -1);
    }
    
    // Specific mappings
    if (pathname === '/category') return '/portrait';
    if (pathname === '/landscape') return '#';
    if (pathname === '') return '/';
    
    return pathname;
  } catch (error) {
    return url.startsWith('/') ? url : `/${url}`;
  }
}

export default function FooterSection({ themeSettings, navMenus }: FooterProps) {
  // Newsletter copy
  const newsletterSubtitle = themeSettings?.newsletter_section?.newsletter_subtitle || themeSettings?.footer_newsletter_content?.footer_newsletter_subtitle || "Join Us";
  const newsletterTitle = themeSettings?.newsletter_section?.newsletter_title || themeSettings?.footer_newsletter_content?.footer_newsletter_title || "Stay Inspired";
  
  let newsletterDescription = "Join our newsletter for design ideas, new collections, and exclusive offers.";
  if (themeSettings?.newsletter_section?.newsletter_paragraphs && themeSettings.newsletter_section.newsletter_paragraphs.length > 0) {
    newsletterDescription = themeSettings.newsletter_section.newsletter_paragraphs[0].paragraph;
  } else if (themeSettings?.footer_newsletter_content?.footer_newsletter_description) {
    newsletterDescription = themeSettings.footer_newsletter_content.footer_newsletter_description;
  }

  // Logo
  const logoSvg = themeSettings?.footer_logo?.footer_logo_svg || themeSettings?.logo_settings?.logo_svg || null;

  // Menus
  const shopMenu = navMenus?.shop || [];
  const companyMenu = navMenus?.company || [];
  const legalMenu = navMenus?.legal || [];

  // Contact options
  const addressText = themeSettings?.footer_contact_content?.footer_contact_address || "Layale trading LLC Fz Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.";
  const addressLink = themeSettings?.footer_contact_content?.footer_contact_address_link || "#";
  const emailText = themeSettings?.footer_contact_content?.footer_contact_email || "info@layalegroup.com";
  const phoneText = themeSettings?.footer_contact_content?.footer_contact_phone || "+971 58 58 38 722";
  const phoneLinkText = phoneText.replace(/\s+/g, '');

  // Social Links
  const socialLinksRaw = themeSettings?.footer_social_content?.footer_social_links || [];
  const getSocialUrl = (name: string, fallback: string) => {
    const link = socialLinksRaw.find((s: any) => s.social_name?.toLowerCase() === name.toLowerCase());
    return link?.social_url || fallback;
  };
  
  const instagramUrl = getSocialUrl('instagram', "https://www.instagram.com/");
  const facebookUrl = getSocialUrl('facebook', "https://www.facebook.com/");
  const twitterUrl = getSocialUrl('x', "https://twitter.com/");
  const tiktokUrl = getSocialUrl('tiktok', "https://www.tiktok.com/");

  // Copyright
  const copyrightText = themeSettings?.footer_copyright_text || "© 2026 Layale Group. All rights reserved.";

  return (
    <footer
      className="w-full bg-[#2C322D] pt-[60px] md:pt-[80px] xl:pt-[100px] text-white font-['Google_Sans',sans-serif]"
      style={{ background: 'linear-gradient(90deg, #2C322D 0%, #2C322D 100%)' }}
    >
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px]">
        {/* Main Footer Content */}
        <div className="flex flex-col xl:flex-row justify-between gap-10 xl:gap-[140px] mb-[60px] md:mb-8 xl:mb-[100px]">
          
          {/* Left Column: Brand & Logo */}
          <div className="w-full xl:w-[35%] flex flex-col gap-0 md:gap-[100px] xl:gap-[130px]">
            <div className="flex flex-col gap-[30px] md:gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 items-start">
                  <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                    <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                    {newsletterSubtitle}
                  </span>
                  <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-none text-[30px] tracking-[-0.9px] md:text-[48px] md:tracking-[-1.44px] xl:text-[40px] xl:tracking-[-1.8px] lg:text-[48px] xl:text-[60px]">
                    {newsletterTitle}
                  </h2>
                </div>
                <p className="text-[#F5F3EF] font-['Google_Sans',sans-serif] text-base xl:text-lg leading-[1.5] max-w-[364px]">
                  {newsletterDescription}
                </p>
              </div>
              
              <form className="flex gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 min-w-0 max-w-[224px] max-[360px]:max-w-[188px] md:max-w-[332px] p-5 bg-transparent border border-[#F5F3EF]/20 text-white font-['Google_Sans',sans-serif] text-sm md:text-lg placeholder-[#F5F3EF]/30 focus:outline-none focus:border-[#CC9433] transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="w-full max-w-[162px] h-[61px] md:h-[67px] inline-flex items-center justify-center gap-[10px] bg-[#507661] hover:bg-[#456654] text-white font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-lg font-medium leading-[1.5] border-none cursor-pointer transition-colors duration-300"
                >
                  subscribe
                </button>
              </form>
            </div>

          <div className="hidden xl:flex flex-col gap-1 items-start">
  {logoSvg ? (
    <div
      className="w-[159px] h-[52px] lg:h-[76px] [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain flex items-center justify-start"
      dangerouslySetInnerHTML={{ __html: logoSvg }}
    />
  ) : (
    <img
      src="/assets/Logo.png"
      alt="Layalee Logo"
      className="w-[159px] h-[52px] object-contain block"
    />
  )}
</div>
          </div>

          {/* Right Column: Navigation Links */}
          <div className="w-full xl:w-[60%] flex flex-col gap-10 xl:gap-[60px]">
            <div className="flex flex-row flex-wrap xl:flex-nowrap gap-y-[30px] gap-x-[70px] md:gap-20 xl:gap-[80px]">
              
              {/* Link Col 1: Shop */}
              <div className="flex flex-col gap-[30px] md:gap-10 max-[767px]:max-w-[317px] max-[992px]:max-w-[300px]">
                <h3 className="text-[#CC9433] font-['Funnel_Display',sans-serif] font-normal leading-none text-[20px] tracking-[-0.72px] md:text-[24px] md:tracking-[-0.6px]">
                  Shop
                </h3>
                <div className="flex flex-col gap-5">
                  {shopMenu.length > 0 ? (
                    shopMenu.map((item) => (
                      <Link
                        key={item.id}
                        href={mapUrl(item.url)}
                        target={item.target || undefined}
                        className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]"
                      >
                        {decodeHtmlEntities(item.label)}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Indoor Planters
                      </Link>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Outdoor Planters
                      </Link>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Hanging
                      </Link>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Tray Planter
                      </Link>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Balcony
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Link Col 2: Company */}
              <div className="flex flex-col gap-[30px] md:gap-10 max-[767px]:max-w-[317px] max-[992px]:max-w-[300px]">
                <h4 className="text-[#CC9433] font-['Funnel_Display',sans-serif] font-normal leading-none text-[20px] tracking-[-0.72px] md:text-[24px] md:tracking-[-0.6px]">
                  Company
                </h4>
                <div className="flex flex-col gap-5">
                  {companyMenu.length > 0 ? (
                    companyMenu.map((item) => (
                      <Link
                        key={item.id}
                        href={mapUrl(item.url)}
                        target={item.target || undefined}
                        className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]"
                      >
                        {decodeHtmlEntities(item.label)}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        About Layale
                      </Link>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Contact
                      </Link>
                      <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                        Landscape
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Link Col 3: Contact */}
              <div className="flex flex-col gap-[30px] md:gap-10 max-[767px]:max-w-[317px] max-[992px]:max-w-[300px]">
                <h4 className="text-[#CC9433] font-['Funnel_Display',sans-serif] font-normal leading-none text-[20px] tracking-[-0.72px] md:text-[24px] md:tracking-[-0.6px]">
                  Contact
                </h4>
                <div className="flex flex-col gap-5">
                  <Link href={addressLink} className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                    {addressText}
                  </Link>
                  <Link href={`mailto:${emailText}`} className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                    {emailText}
                  </Link>
                  <Link href={`tel:${phoneLinkText}`} className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-base md:text-lg font-normal leading-[1.25] transition-colors duration-300 xl:max-w-[422px]">
                    {phoneText}
                  </Link>
                </div>
              </div>

            </div>

            {/* Social Links Bottom Bar */}
            <div className="flex xl:justify-end xl:items-end xl:border-t xl:border-[#F5F3EF]/10 xl:pt-[84px] xl:gap-[120px]">
              <div className="flex flex-col gap-5 md:gap-[30px] md:pb-5 xl:flex-row xl:gap-10 xl:pb-0">
                <h4 className="text-[#CC9433] font-['Funnel_Display',sans-serif] font-normal leading-none text-[20px] tracking-[-0.72px] md:text-[24px] md:tracking-[-0.6px] xl:self-center">
                  Follow Us
                </h4>
                <div className="flex flex-row gap-5">
                  <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-lg font-normal leading-[1.25] transition-colors duration-300 underline underline-offset-4 decoration-solid">
                    Instagram
                  </Link>
                  <Link href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-lg font-normal leading-[1.25] transition-colors duration-300 underline underline-offset-4 decoration-solid">
                    Facebook
                  </Link>
                  <Link href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-lg font-normal leading-[1.25] transition-colors duration-300 underline underline-offset-4 decoration-solid">
                    X
                  </Link>
                  <Link href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-lg font-normal leading-[1.25] transition-colors duration-300 underline underline-offset-4 decoration-solid">
                    TikTok
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Brand Logo */}
            <div className="flex xl:hidden flex-col gap-1 items-start">
              {logoSvg ? (
                <div
                  className="w-[159px] h-[52px] [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain flex items-center justify-start"
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                />
              ) : (
                <img
                  src="/assets/Logo.png"
                  alt="Layalee Logo"
                  className="w-[159px] h-[52px] object-contain block"
                />
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="py-[33px] border-t border-[#F5F3EF]/10 w-full">
        <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px] flex flex-col-reverse md:flex-row items-center md:justify-between gap-[15px] md:gap-0">
          <p className="text-[#F5F3EF]/30 font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-lg m-0">
            {copyrightText}
          </p>
          <div className="flex gap-[25px] max-[360px]:gap-[15px] md:gap-[14px] xl:gap-10 opacity-50">
            {legalMenu.length > 0 ? (
              legalMenu.map((item) => (
                <Link
                  key={item.id}
                  href={mapUrl(item.url)}
                  target={item.target || undefined}
                  className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-lg font-normal transition-colors duration-300 whitespace-nowrap"
                >
                  {decodeHtmlEntities(item.label)}
                </Link>
              ))
            ) : (
              <>
                <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-lg font-normal transition-colors duration-300 whitespace-nowrap">
                  Privacy Policy
                </Link>
                <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-lg font-normal transition-colors duration-300 whitespace-nowrap">
                  Terms of Service
                </Link>
                <Link href="#" className="no-underline text-[#F5F3EF] hover:text-white font-['Google_Sans',sans-serif] text-sm md:text-base xl:text-lg font-normal transition-colors duration-300 whitespace-nowrap">
                  Cookie Policy
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
