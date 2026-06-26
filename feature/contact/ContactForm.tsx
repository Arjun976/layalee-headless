'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSuccess(true);
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="bg-white py-10 md:py-[60px] xl:py-[100px] w-full" id="contact-form-section">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col xl:flex-row xl:justify-between gap-10 xl:gap-[60px]">
        
        {/* Left Side: Form & Heading */}
        <div className="w-full xl:w-[53%] flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[64px] tracking-[-1px] md:tracking-[-1.5px]">
              Create Your Green Space
            </h2>
            <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.78] max-w-[876px]">
              From premium planters to complete landscape solutions, we're here to help transform your space. Reach out to discuss your project, request a quote, or get expert recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="bg-[#F5F3EF] rounded-[4px] px-6 flex items-center h-20 border border-transparent focus-within:border-[#507661]/30 transition-all duration-300">
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="bg-transparent border-none outline-none text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85"
                />
              </div>

              {/* Email */}
              <div className="bg-[#F5F3EF] rounded-[4px] px-6 flex items-center h-20 border border-transparent focus-within:border-[#507661]/30 transition-all duration-300">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="bg-transparent border-none outline-none text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85"
                />
              </div>

              {/* Phone Number */}
              <div className="bg-[#F5F3EF] rounded-[4px] px-6 flex items-center h-20 border border-transparent focus-within:border-[#507661]/30 transition-all duration-300">
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="bg-transparent border-none outline-none text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85"
                />
              </div>

              {/* Subject */}
              <div className="bg-[#F5F3EF] rounded-[4px] px-6 flex items-center h-20 border border-transparent focus-within:border-[#507661]/30 transition-all duration-300">
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="bg-transparent border-none outline-none text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85"
                />
              </div>
            </div>

            {/* Message */}
            <div className="bg-[#F5F3EF] rounded-[4px] px-6 py-5 flex h-[200px] border border-transparent focus-within:border-[#507661]/30 transition-all duration-300">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message"
                className="bg-transparent border-none outline-none text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full h-full resize-none placeholder-[#313232]/85"
              />
            </div>

            {/* Success Alert */}
            {success && (
              <div className="text-[#507661] bg-[#F5F3EF] border border-[#507661]/20 px-5 py-3 rounded-[4px] font-['Google_Sans',sans-serif] text-sm">
                Thank you! Your message has been sent successfully. We will get back to you shortly.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full md:w-[227px] h-[67px] justify-center items-center gap-2.5 bg-[#507661] hover:bg-[#3f5c4b] active:bg-[#2f4538] text-white font-['Google_Sans',sans-serif] font-medium text-[18px] transition-all duration-300 cursor-pointer border-none rounded-[4px] group shadow-sm disabled:opacity-75"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && (
                <div className="relative w-4 h-4 overflow-hidden flex items-center">
                  <div className="flex transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                    {/* Double Arrow Icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 -ml-1.5">
                      <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Image with Overlay */}
        <div className="w-full xl:w-[44%] relative aspect-[783/620] xl:h-[620px] rounded-[4px] overflow-hidden bg-[#F5F3EF]">
          <Image
            src="/contact_hero.png"
            alt="Nature Inspired Living Space"
            fill
            sizes="(max-width: 1200px) 100vw, 44vw"
            priority
            className="object-cover"
          />
          {/* Green Color Overlay (51% opacity) */}
          <div className="absolute inset-0 bg-[#507661] opacity-[0.51] z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
