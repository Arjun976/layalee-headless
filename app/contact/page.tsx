import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import ContactForm from '@/feature/contact/ContactForm';
import ContactCards from '@/feature/contact/ContactCards';
import { getLayaleContact } from '@/lib/wordpress';

export const metadata = {
  title: 'Contact Us | Layale',
  description: 'From premium planters to complete landscape solutions, we are here to help transform your space. Reach out to discuss your project, request a quote, or get expert recommendations.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const contactData = await getLayaleContact();

  const banner = contactData?.banner || {};
  const bannerEnabled = banner.enabled !== false;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Contact Banner Component */}
      {bannerEnabled && (
        <ProductBnr 
          title={banner.title || "Contact Us"}
          subtitle={banner.subtitle || "Contact Us"}
          backgroundImage={banner.image?.url}
          breadcrumbs={[
            { label: 'Home', url: '/' },
            { label: 'Contact Us', url: '/contact' },
          ]}
        />
      )}

      {/* Main Contact Form and Hero Image Section */}
      <ContactForm formDataProps={contactData?.contactForm} />

      {/* Contact Info Grid Section (Location, Phone, Email, Hours) */}
      <ContactCards infoData={contactData?.contactInfo} />
    </main>
  );
}
