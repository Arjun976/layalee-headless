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
  const newsletterTitle = themeSettings?.footer_settings?.newsletter_title || themeSettings?.newsletter_title || "Stay Inspired";
  const newsletterDescription = themeSettings?.footer_settings?.newsletter_description || themeSettings?.newsletter_description || "Join our newsletter for design ideas, new collections, and exclusive offers.";

  // Logo
  const logoSvg = themeSettings?.logo_settings?.logo_svg || null;

  // Menus
  const shopMenu = navMenus?.shop || [];
  const companyMenu = navMenus?.company || [];
  const legalMenu = navMenus?.legal || [];

  // Contact options
  const addressText = themeSettings?.contact_details?.address || themeSettings?.contact_address || themeSettings?.address || "Layale trading LLC Fz Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.";
  const addressLink = themeSettings?.contact_details?.address_link || themeSettings?.address_link || "#";
  const emailText = themeSettings?.contact_details?.email || themeSettings?.contact_email || themeSettings?.email || "info@layalegroup.com";
  const phoneText = themeSettings?.contact_details?.phone || themeSettings?.contact_phone || themeSettings?.phone || "+971 58 58 38 722";
  const phoneLinkText = phoneText.replace(/\s+/g, '');

  // Social Links
  const instagramUrl = themeSettings?.social_links?.instagram || themeSettings?.social_instagram || themeSettings?.instagram || "https://www.instagram.com/";
  const facebookUrl = themeSettings?.social_links?.facebook || themeSettings?.social_facebook || themeSettings?.facebook || "https://www.facebook.com/";
  const twitterUrl = themeSettings?.social_links?.twitter || themeSettings?.social_links?.x || themeSettings?.social_x || themeSettings?.social_twitter || themeSettings?.twitter || themeSettings?.x || "https://twitter.com/";
  const tiktokUrl = themeSettings?.social_links?.tiktok || themeSettings?.social_tiktok || themeSettings?.tiktok || "https://www.tiktok.com/";

  // Copyright
  const copyrightText = themeSettings?.copyright_text || themeSettings?.footer_copyright || themeSettings?.copyright || "© 2026 Layale Group. All rights reserved.";

  return (
    <footer
      className="w-full bg-[#2C322D] pt-[60px] md:pt-[80px] xl:pt-[100px] text-white font-['Google_Sans',sans-serif]"
      style={{ background: 'linear-gradient(90deg, #2C322D 0%, #2C322D 100%)' }}
    >
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:!max-w-[1540px] min-[1600px]:px-[30px]">
        {/* Main Footer Content */}
        <div className="flex flex-col xl:flex-row justify-between gap-10 xl:gap-[140px] mb-[60px] md:mb-8 xl:mb-[100px]">
          
          {/* Left Column: Brand & Logo */}
          <div className="w-full xl:w-[35%] flex flex-col gap-0 md:gap-[100px] xl:gap-[90px]">
            <div className="flex flex-col gap-[30px] md:gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 items-start">
                  <span className="inline-flex items-center gap-3 text-[#CC9433] font-['Google_Sans',sans-serif] text-sm xl:text-lg font-normal tracking-[1.4px] xl:tracking-[1.8px] uppercase">
                    <span className="w-[21px] h-[1px] bg-[#CC9433]" />
                    Join Us
                  </span>
                  <h2 className="text-white font-['Funnel_Display',sans-serif] font-light leading-none text-[30px] tracking-[-0.9px] md:text-[48px] md:tracking-[-1.44px] xl:text-[40px] xl:tracking-[-1.8px] 2xl:text-[48px] 3xl:text-[60px]">
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

            {/* Desktop Brand Logo */}
            <div className="hidden xl:flex flex-col gap-1 items-start">
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
              <svg
                width="159"
                height="15"
                viewBox="46 54 109 13"
                fill="none"
                className="w-[159px] h-[15px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M46.1851 64.9998V54.2598H47.7451L53.1301 62.8098H53.1901L53.1301 60.7398V54.2598H54.4051V64.9998H53.0851L47.4601 56.0448H47.4001L47.4601 58.1148V64.9998H46.1851Z" fill="white"/>
                <path d="M58.9959 65.2398C58.4259 65.2398 57.9259 65.1298 57.4959 64.9098C57.0659 64.6898 56.7259 64.3898 56.4759 64.0098C56.2359 63.6198 56.1159 63.1798 56.1159 62.6898C56.1159 62.1298 56.2609 61.6598 56.5509 61.2798C56.8409 60.8898 57.2309 60.5998 57.7209 60.4098C58.2109 60.2098 58.7509 60.1098 59.3409 60.1098C59.6809 60.1098 59.9959 60.1398 60.2859 60.1998C60.5759 60.2498 60.8259 60.3148 61.0359 60.3948C61.2559 60.4648 61.4209 60.5348 61.5309 60.6048V60.1398C61.5309 59.5598 61.3259 59.0998 60.9159 58.7598C60.5059 58.4198 60.0059 58.2498 59.4159 58.2498C58.9959 58.2498 58.6009 58.3448 58.2309 58.5348C57.8709 58.7148 57.5859 58.9698 57.3759 59.2998L56.4159 58.5798C56.6159 58.2798 56.8659 58.0198 57.1659 57.7998C57.4659 57.5798 57.8059 57.4098 58.1859 57.2898C58.5759 57.1698 58.9859 57.1098 59.4159 57.1098C60.4559 57.1098 61.2709 57.3848 61.8609 57.9348C62.4509 58.4848 62.7459 59.2248 62.7459 60.1548V64.9998H61.5309V63.9048H61.4709C61.3409 64.1248 61.1559 64.3398 60.9159 64.5498C60.6759 64.7498 60.3909 64.9148 60.0609 65.0448C59.7409 65.1748 59.3859 65.2398 58.9959 65.2398ZM59.1159 64.1148C59.5559 64.1148 59.9559 64.0048 60.3159 63.7848C60.6859 63.5648 60.9809 63.2698 61.2009 62.8998C61.4209 62.5298 61.5309 62.1248 61.5309 61.6848C61.3009 61.5248 61.0109 61.3948 60.6609 61.2948C60.3209 61.1948 59.9459 61.1448 59.5359 61.1448C58.8059 61.1448 58.2709 61.2948 57.9309 61.5948C57.5909 61.8948 57.4209 62.2648 57.4209 62.7048C57.4209 63.1248 57.5809 63.4648 57.9009 63.7248C58.2209 63.9848 58.6259 64.1148 59.1159 64.1148Z" fill="white"/>
                <path d="M63.7149 58.5048V57.3498H65.1399V58.5048H63.7149ZM67.1949 65.1198C66.5549 65.1198 66.0399 64.9298 65.6499 64.5498C65.2599 64.1598 65.0649 63.6398 65.0649 62.9898V55.1898H66.3399V62.6748C66.3399 63.1048 66.4249 63.4248 66.5949 63.6348C66.7749 63.8348 67.0399 63.9348 67.3899 63.9348C67.5499 63.9348 67.6999 63.9148 67.8399 63.8748C67.9799 63.8248 68.1149 63.7598 68.2449 63.6798V64.9248C68.0849 64.9848 67.9199 65.0298 67.7499 65.0598C67.5799 65.0998 67.3949 65.1198 67.1949 65.1198ZM66.2649 58.5048V57.3498H68.2149V58.5048H66.2649Z" fill="white"/>
                <path d="M72.5088 65.2398C71.5688 65.2398 70.8588 64.9648 70.3788 64.4148C69.9088 63.8648 69.6738 63.1148 69.6738 62.1648V57.3498H70.9488V61.9698C70.9488 62.7298 71.1238 63.2748 71.4738 63.6048C71.8238 63.9248 72.2588 64.0848 72.7788 64.0848C73.2288 64.0848 73.6188 63.9698 73.9488 63.7398C74.2788 63.4998 74.5338 63.1948 74.7138 62.8248C74.8938 62.4548 74.9838 62.0698 74.9838 61.6698V57.3498H76.2588V64.9998H75.0438V63.8898H74.9838C74.8538 64.1298 74.6588 64.3548 74.3988 64.5648C74.1488 64.7648 73.8588 64.9248 73.5288 65.0448C73.2088 65.1748 72.8688 65.2398 72.5088 65.2398Z" fill="white"/>
                <path d="M78.1127 64.9998V57.3498H79.3277V58.5798H79.3877C79.4877 58.2898 79.6527 58.0398 79.8827 57.8298C80.1227 57.6098 80.3927 57.4398 80.6927 57.3198C81.0027 57.1898 81.3077 57.1248 81.6077 57.1248C81.8377 57.1248 82.0177 57.1398 82.1477 57.1698C82.2777 57.1898 82.3977 57.2248 82.5077 57.2748V58.6548C82.3477 58.5748 82.1727 58.5148 81.9827 58.4748C81.8027 58.4348 81.6177 58.4148 81.4277 58.4148C81.0577 58.4148 80.7177 58.5198 80.4077 58.7298C80.0977 58.9398 79.8477 59.2198 79.6577 59.5698C79.4777 59.9198 79.3877 60.7248V64.9998H78.1127Z" fill="white"/>
                <path d="M86.7765 65.2398C86.0365 65.2398 85.3765 65.0648 84.7965 64.7148C84.2265 64.3648 83.7765 63.8848 83.4465 63.2748C83.1265 62.6648 82.9665 61.9698 82.9665 61.1898C82.9665 60.4598 83.1165 59.7848 83.4165 59.1648C83.7265 58.5448 84.1565 58.0498 84.7065 57.6798C85.2665 57.2998 85.9215 57.1098 86.6715 57.1098C87.4315 57.1098 88.0815 57.2798 88.6215 57.6198C89.1715 57.9498 89.5915 58.4098 89.8815 58.9998C90.1815 59.5898 90.3315 60.2648 90.3315 61.0248C90.3315 61.0948 90.3265 61.1648 90.3165 61.2348C90.3165 61.3048 90.3115 61.3648 90.3015 61.4148H83.7165V60.3648H88.9815C88.9715 60.1548 88.9215 59.9298 88.8315 59.6898C87.4415 59.4398 88.6165 59.2098 88.4265 58.9998C88.2465 58.7798 88.0115 58.6048 87.7215 58.4748C87.4415 58.3348 87.0915 58.2648 86.6715 58.2648C86.1715 58.2648 85.7365 58.3948 85.3665 58.6548C85.0065 58.9048 84.7265 59.2498 84.5265 59.6898C84.3365 60.1298 84.2415 60.6298 84.2415 61.1898C84.2415 61.8398 84.3665 62.3798 84.6165 62.8098C84.8665 63.2398 85.1865 63.5598 85.5765 63.7698C85.9765 63.9798 86.3915 64.0848 86.8215 64.0848C87.3815 64.0848 87.8415 63.9548 88.2015 63.6948C88.5715 63.4248 88.8665 63.0948 89.0865 62.7048L90.1665 63.2298C89.8665 63.8098 89.4365 64.2898 88.8765 64.6698C88.3165 65.0498 87.6165 65.2398 86.7765 65.2398ZM59.1159 64.1148C59.5559 64.1148 59.9559 64.0048 60.3159 63.7848C60.6859 63.5648 60.9809 63.2698 61.2009 62.8998C61.4209 62.5298 61.5309 62.1248 61.5309 61.6848C61.3009 61.5248 61.0109 61.3948 60.6609 61.2948C60.3209 61.1948 59.9459 61.1448 59.5359 61.1448C58.8059 61.1448 58.2709 61.2948 57.9309 61.5948C57.5909 61.8948 57.4209 62.2648 57.4209 62.7048C57.4209 63.1248 57.5809 63.4648 57.9009 63.7248C58.2209 63.9848 58.6259 64.1148 59.1159 64.1148Z" fill="white"/>
                <path d="M63.7149 58.5048V57.3498H65.1399V58.5048H63.7149ZM67.1949 65.1198C66.5549 65.1198 66.0399 64.9298 65.6499 64.5498C65.2599 64.1598 65.0649 63.6398 65.0649 62.9898V55.1898H66.3399V62.6748C66.3399 63.1048 66.4249 63.4248 66.5949 63.6348C66.7749 63.8348 67.0399 63.9348 67.3899 63.9348C67.5499 63.9348 67.6999 63.9148 67.8399 63.8748C67.9799 63.8248 68.1149 63.7598 68.2449 63.6798V64.9248C68.0849 64.9848 67.9199 65.0298 67.7499 65.0598C67.5799 65.0998 67.3949 65.1198 67.1949 65.1198ZM66.2649 58.5048V57.3498H68.2149V58.5048H66.2649Z" fill="white"/>
                <path d="M72.5088 65.2398C71.5688 65.2398 70.8588 64.9648 70.3788 64.4148C69.9088 63.8648 69.6738 63.1148 69.6738 62.1648V57.3498H70.9488V61.9698C70.9488 62.7298 71.1238 63.2748 71.4738 63.6048C71.8238 63.9248 72.2588 64.0848 72.7788 64.0848C73.2288 64.0848 73.6188 63.9698 73.9488 63.7398C74.2788 63.4998 74.5338 63.1948 74.7138 62.8248C74.8938 62.4548 74.9838 62.0698 74.9838 61.6698V57.3498H76.2588V64.9998H75.0438V63.8898H74.9838C74.8538 64.1298 74.6588 64.3548 74.3988 64.5648C74.1488 64.7648 73.8588 64.9248 73.5288 65.0448C73.2088 65.1748 72.8688 65.2398 72.5088 65.2398Z" fill="white"/>
                <path d="M78.1127 64.9998V57.3498H79.3277V58.5798H79.3877C79.4877 58.2898 79.6527 58.0398 79.8827 57.8298C80.1227 57.6098 80.3927 57.4398 80.6927 57.3198C81.0027 57.1898 81.3077 57.1248 81.6077 57.1248C81.8377 57.1248 82.0177 57.1398 82.1477 57.1698C82.2777 57.1898 82.3977 57.2248 82.5077 57.2748V58.6548C82.3477 58.5748 82.1727 58.5148 81.9827 58.4748C81.8027 58.4348 81.6177 58.4148 81.4277 58.4148C81.0577 58.4148 80.7177 58.5198 80.4077 58.7298C80.0977 58.9398 79.8477 59.2198 79.6577 59.5698C79.4777 59.9198 79.3877 60.7248V64.9998H78.1127Z" fill="white"/>
                <path d="M86.7765 65.2398C86.0365 65.2398 85.3765 65.0648 84.7965 64.7148C84.2265 64.3648 83.7765 63.8848 83.4465 63.2748C83.1265 62.6648 82.9665 61.9698 82.9665 61.1898C82.9665 60.4598 83.1165 59.7848 83.4165 59.1648C83.7265 58.5448 84.1565 58.0498 84.7065 57.6798C85.2665 57.2998 85.9215 57.1098 86.6715 57.1098C87.4315 57.1098 88.0815 57.2798 88.6215 57.6198C89.1715 57.9498 89.5915 58.4098 89.8815 58.9998C90.1815 59.5898 90.3315 60.2648 90.3315 61.0248C90.3315 61.0948 90.3265 61.1648 90.3165 61.2348C90.3165 61.3048 90.3115 61.3648 90.3015 61.4148H83.7165V60.3648H88.9815C88.9715 60.1548 88.9215 59.9298 88.8315 59.6898C87.4415 59.4398 88.6165 59.2098 88.4265 58.9998C88.2465 58.7798 88.0115 58.6048 87.7215 58.4748C87.4415 58.3348 87.0915 58.2648 86.6715 58.2648C86.1715 58.2648 85.7365 58.3948 85.3665 58.6548C85.0065 58.9048 84.7265 59.2498 84.5265 59.6898C84.3365 60.1298 84.2415 60.6298 84.2415 61.1898C84.2415 61.8398 84.3665 62.3798 84.6165 62.8098C84.8665 63.2398 85.1865 63.5598 85.5765 63.7698C85.9765 63.9798 86.3915 64.0848 86.8215 64.0848C87.3815 64.0848 87.8415 63.9548 88.2015 63.6948C88.5715 63.4248 88.8665 63.0948 89.0865 62.7048L90.1665 63.2298C89.8665 63.8098 89.4365 64.2898 88.8765 64.6698C88.3165 65.0498 87.6165 65.2398 86.7765 65.2398ZM59.1159 64.1148C59.5559 64.1148 59.9559 64.0048 60.3159 63.7848C60.6859 63.5648 60.9809 63.2698 61.2009 62.8998C61.4209 62.5298 61.5309 62.1248 61.5309 61.6848C61.3009 61.5248 61.0109 61.3948 60.6609 61.2948C60.3209 61.1948 59.9459 61.1448 59.5359 61.1448C58.8059 61.1448 58.2709 61.2948 57.9309 61.5948C57.5909 61.8948 57.4209 62.2648 57.4209 62.7048C57.4209 63.1248 57.5809 63.4648 57.9009 63.7248C58.2209 63.9848 58.6259 64.1148 59.1159 64.1148Z" fill="white"/>
                <path d="M92.2147 66.6498L91.5997 66.2448L92.4097 64.9998C92.2497 64.9698 92.0897 64.8798 91.9297 64.7298C91.7797 64.5798 91.7047 64.3798 91.7047 64.1298C91.7047 63.8698 91.7947 63.6498 91.9747 63.4698C92.1647 63.2798 92.3947 63.1848 92.6647 63.1848C92.8047 63.1848 92.9297 63.2098 93.0397 63.2598C93.1597 63.3098 93.2597 63.3798 93.3397 63.4698C93.4297 63.5498 93.4997 63.6498 93.5497 63.7698C93.5997 63.8798 93.6247 63.9998 93.6247 64.1298C93.6247 64.2498 93.6047 64.3698 93.5647 64.4898C93.5247 64.5998 93.4747 64.7098 93.4147 64.8198C93.3547 64.9298 93.2847 65.0398 93.2047 65.1498L92.2147 66.6498Z" fill="white"/>
                <path d="M99.0659 64.9998V54.2598H105.276V55.4748H100.341V63.7848H105.276V64.9998H99.0659ZM99.7409 60.2298V59.0298H104.796V60.2298H99.7409Z" fill="white"/>
                <path d="M106.97 64.9998V54.2598H108.245V64.9998H106.97Z" fill="white"/>
                <path d="M113.51 65.2398C112.77 65.2398 112.11 65.0648 111.53 64.7148C110.96 64.3648 110.51 63.8848 110.18 63.2748C109.86 62.6648 109.7 61.9698 109.7 61.1898C109.7 60.4598 109.85 59.7848 110.15 59.1648C110.46 58.5448 110.89 58.0498 111.44 57.6798C112 57.2998 112.655 57.1098 113.405 57.1098C114.165 57.1098 114.815 57.2798 115.355 57.6198C115.905 57.9498 116.325 58.4098 116.615 58.9998C116.915 59.5898 117.065 60.2648 117.065 61.0248C117.065 61.0948 117.06 61.1648 117.05 61.2348C117.05 61.3048 117.045 61.3648 117.035 61.4148H110.45V60.3648H115.715C115.705 60.1548 115.655 59.9298 115.565 59.6898C115.485 59.4398 115.35 59.2098 115.16 58.9998C114.98 58.7798 114.745 58.6048 114.455 58.4748C114.175 58.3348 113.825 58.2648 113.405 58.2648C112.905 58.2648 112.47 58.3948 112.1 58.6548C111.74 58.9048 111.46 59.2498 111.26 59.6898C111.07 60.1298 110.975 60.6298 110.975 61.1898C110.975 61.8398 111.1 62.3798 111.35 62.8098C111.6 63.2398 111.92 63.5598 112.31 63.7698C112.71 63.9798 113.125 64.0848 113.555 64.0848C114.115 64.0848 114.575 63.9548 114.935 63.6948C115.305 63.4248 115.6 63.0948 115.82 62.7048L116.9 63.2298C116.6 63.8098 116.17 64.2898 115.61 64.6698C115.05 65.0498 114.35 65.2398 113.51 65.2398Z" fill="white"/>
                <path d="M120.587 64.9998L117.497 57.3498H118.862L121.232 63.4998H121.262L123.662 57.3498H124.997L121.877 64.9998H120.587Z" fill="white"/>
                <path d="M128.239 65.2398C127.669 65.2398 127.169 65.1298 126.739 64.9098C126.309 64.6898 125.969 64.3898 125.719 64.0098C125.479 63.6198 125.359 63.1798 125.359 62.6898C125.359 62.1298 125.504 61.6598 125.794 61.2798C126.084 60.8898 126.474 60.5998 126.964 60.4098C127.454 60.2098 127.994 60.1098 128.584 60.1098C128.924 60.1098 129.239 60.1398 129.529 60.1998C129.819 60.2498 130.069 60.3148 130.279 60.3948C130.499 60.4648 130.664 60.5348 130.774 60.6048V60.1398C130.774 59.5598 130.569 59.0998 130.159 58.7598C129.749 58.4198 129.249 58.2498 128.659 58.2498C128.239 58.2498 127.844 58.3448 127.474 58.5348C127.114 58.7148 126.829 58.9698 126.619 59.2998L125.659 58.5798C125.859 58.2798 126.109 58.0198 126.409 57.7998C126.709 57.5798 127.049 57.4098 127.429 57.2898C127.819 57.1698 128.229 57.1098 128.659 57.1098C129.699 57.1098 130.514 57.3848 131.104 57.9348C131.694 58.4848 131.989 62.2248 131.989 60.1548V64.9998H130.774V63.9048H130.714C130.584 64.1248 130.399 64.3398 130.159 64.5498C129.919 64.7498 129.634 64.9148 129.304 65.0448C128.984 65.1748 128.629 65.2398 128.239 65.2398ZM128.359 64.1148C128.799 64.1148 129.199 64.0048 129.559 63.7848C129.929 63.5648 130.224 63.2698 130.444 62.8998C130.664 62.5298 130.774 62.1248 130.774 61.6848C130.544 61.5248 130.254 61.3948 129.904 61.2948C129.564 61.1948 129.189 61.1448 128.779 61.1448C128.049 61.1448 127.514 61.2948 127.174 61.5948C126.834 61.8948 126.664 62.2648 126.664 62.7048C126.664 63.1248 126.824 63.4648 127.144 63.7248C127.464 63.9848 127.869 64.1148 128.359 64.1148Z" fill="white"/>
                <path d="M132.958 58.5048V57.3498H134.383V58.5048H132.958ZM136.438 65.1198C135.798 65.1198 135.283 64.9298 134.893 64.5498C134.503 64.1598 134.308 63.6398 134.308 62.9898V55.1898H135.583V62.6748C135.583 63.1048 135.668 63.4248 135.838 63.6348C136.018 63.8348 136.283 63.9348 136.633 63.9348C136.793 63.9348 136.943 63.9148 137.083 63.8748C137.223 63.8248 137.358 63.7598 137.488 63.6798V64.9248C137.328 64.9848 137.163 65.0298 136.993 65.0598C136.823 65.0998 136.638 65.1198 136.438 65.1198ZM135.508 58.5048V57.3498H137.458V58.5048H135.508Z" fill="white"/>
                <path d="M142.001 65.2398C141.261 65.2398 140.601 65.0648 140.021 64.7148C139.451 64.3648 139.001 63.8848 138.671 63.2748C138.351 62.6648 138.191 61.9698 138.191 61.1898C138.191 60.4598 138.341 59.7848 138.641 59.1648C138.951 58.5448 139.381 58.0498 139.931 57.6798C140.491 57.2998 141.146 57.1098 141.896 57.1098C142.656 57.1098 143.306 57.2798 143.846 57.6198C144.396 57.9498 144.816 58.4098 145.106 58.9998C145.406 59.5898 145.556 60.2648 145.556 61.0248C145.556 61.0948 145.551 61.1648 145.541 61.2348C145.541 61.3048 145.536 61.3648 145.526 61.4148H138.941V60.3648H144.206C144.196 60.1548 144.146 59.9298 144.056 59.6898C143.976 59.4398 143.841 59.2098 143.651 58.9998C143.471 58.7798 143.236 58.6048 142.946 58.4748C142.666 58.3348 142.316 58.2648 141.896 58.2648C141.396 58.2648 140.961 58.3948 140.591 58.6548C140.231 58.9048 139.951 59.2498 139.751 59.6898C139.561 60.1298 139.466 61.1898 139.466 61.1898Z" fill="white"/>
                <path d="M150.259 65.2398C149.569 65.2398 148.944 65.0648 148.384 64.7148C147.834 64.3648 147.399 63.8848 147.079 63.2748C146.759 62.6648 146.599 61.9648 146.599 61.1748C146.599 60.3848 146.759 59.6848 147.079 59.0748C147.399 58.4648 147.834 57.9848 148.384 57.6348C148.944 57.2848 149.569 57.1098 150.259 57.1098C150.669 57.1098 151.044 57.1748 151.384 57.3048C151.724 57.4348 152.019 57.6048 152.269 57.8148C152.529 58.0248 152.729 58.2498 152.869 58.4898H152.929L152.869 57.4248V54.2598H154.144V64.9998H152.929V63.8748H152.869C152.729 64.1048 152.529 64.3248 152.269 64.5348C152.019 64.7448 151.724 64.9148 151.384 65.0448C151.044 65.1748 150.669 65.2398 150.259 65.2398ZM150.394 64.0848C150.834 64.0848 151.244 63.9698 151.624 63.7398C152.014 63.4998 152.329 63.1648 152.569 62.7348C152.809 62.2948 152.929 61.7748 152.929 61.1748C152.929 60.5748 152.809 60.0598 152.569 59.6298C152.329 59.1898 152.014 58.8548 151.624 58.6248C151.244 58.3848 150.834 58.2648 150.394 64.0848Z" fill="white"/>
              </svg>
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
