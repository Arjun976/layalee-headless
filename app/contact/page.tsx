import React from 'react';
import ProductBnr from '@/feature/Product/Product_bnr';
import ContactForm from '@/feature/contact/ContactForm';
import ContactCards from '@/feature/contact/ContactCards';

export const metadata = {
  title: 'Contact Us | Layale',
  description: 'From premium planters to complete landscape solutions, we are here to help transform your space. Reach out to discuss your project, request a quote, or get expert recommendations.',
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Contact Banner Component */}
      <ProductBnr 
        title="Contact Us"
        subtitle="Contact Us"
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Contact Us', url: '/contact' },
        ]}
      />

      {/* Main Contact Form and Hero Image Section */}
      <ContactForm />

      {/* Contact Info Grid Section (Location, Phone, Email, Hours) */}
      <ContactCards />
    </main>
  );
}
