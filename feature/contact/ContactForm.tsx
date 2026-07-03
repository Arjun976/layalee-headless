'use client';

import React, { useState, useActionState, useEffect } from 'react';
import { submitContactForm, FormState } from '@/app/actions/contact';

const initialState: FormState = {
  success: false,
  message: '',
};

interface ContactFormProps {
  formDataProps?: {
    enabled?: boolean;
    title?: string;
    paragraphs?: Array<{ text: string }>;
    formId?: string;
    mapEmbedCode?: string;
  };
}

export default function ContactForm({ formDataProps }: ContactFormProps) {
  if (formDataProps === null || (formDataProps && formDataProps.enabled === false)) {
    return null;
  }

  const isDefault = formDataProps === undefined;

  const title = isDefault ? 'Create Your Green Space' : (formDataProps.title || '');
  const description = isDefault 
    ? "From premium planters to complete landscape solutions, we're here to help transform your space. Reach out to discuss your project, request a quote, or get expert recommendations."
    : (formDataProps.paragraphs || []).map((p) => p.text).join('\n');
  
  const mapHtml = isDefault ? '' : (formDataProps.mapEmbedCode || '');
  const dynamicFormId = isDefault ? '' : (formDataProps.formId || '');

  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.message) {
      setFeedbackMessage(state.message);
      setIsSuccess(state.success);
      setShowFeedback(true);

      if (state.success) {
        const timer = setTimeout(() => {
          setShowFeedback(false);
        }, 5000); // Clear success message after 5 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }
  }, [state.success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Restrict phone field to valid phone characters: digits, spaces, dashes, parentheses, and +
    if (name === 'phone') {
      const sanitized = value.replace(/[^0-9+\s\-()]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white py-10 md:py-[60px] xl:py-[100px] w-full" id="contact-form-section">
      <div className="w-full px-5 md:px-[30px] xl:px-10 mx-auto max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] min-[1600px]:box-content min-[1600px]:max-w-[1540px]! min-[1600px]:px-[30px] flex flex-col xl:flex-row xl:justify-between gap-10 xl:gap-[60px]">
        
        {/* Left Side: Form & Heading */}
        <div className="w-full xl:w-[53%] flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <h2 className="text-[#2C322D] font-['Funnel_Display',sans-serif] font-light leading-[1.15] text-[32px] md:text-[48px] xl:text-[64px] tracking-[-1px] md:tracking-[-1.5px]">
              {title}
            </h2>
            <p className="text-[#545955] font-['Google_Sans',sans-serif] text-base md:text-[18px] leading-[1.78] max-w-[876px] whitespace-pre-line">
              {description}
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-6 w-full">
            {/* Honeypot Spam Deterrent */}
            <div className="hidden">
              <label htmlFor="honeypot">Leave this blank</label>
              <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Dynamic Form ID */}
            <input type="hidden" name="formId" value={dynamicFormId} />

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="w-full">
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
                  disabled={isPending}
                  placeholder="Full Name"
                  autoComplete="name"
                  className="bg-[#F5F3EF] rounded-[4px] px-6 h-20 border border-transparent focus:border-[#507661]/30 focus:outline-none transition-all duration-300 text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85 disabled:opacity-50"
                />
                {state.errors?.fullName && (
                  <p className="mt-1 text-xs text-red-500 font-medium font-sans">{state.errors.fullName[0]}</p>
                )}
              </div>

              {/* Email */}
              <div className="w-full">
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
                  disabled={isPending}
                  placeholder="Email"
                  autoComplete="email"
                  className="bg-[#F5F3EF] rounded-[4px] px-6 h-20 border border-transparent focus:border-[#507661]/30 focus:outline-none transition-all duration-300 text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85 disabled:opacity-50"
                />
                {state.errors?.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium font-sans">{state.errors.email[0]}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="w-full">
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
                  disabled={isPending}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  className="bg-[#F5F3EF] rounded-[4px] px-6 h-20 border border-transparent focus:border-[#507661]/30 focus:outline-none transition-all duration-300 text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85 disabled:opacity-50"
                />
                {state.errors?.phone && (
                  <p className="mt-1 text-xs text-red-500 font-medium font-sans">{state.errors.phone[0]}</p>
                )}
              </div>

              {/* Subject */}
              <div className="w-full">
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
                  disabled={isPending}
                  placeholder="Subject"
                  autoComplete="off"
                  className="bg-[#F5F3EF] rounded-[4px] px-6 h-20 border border-transparent focus:border-[#507661]/30 focus:outline-none transition-all duration-300 text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full placeholder-[#313232]/85 disabled:opacity-50"
                />
                {state.errors?.subject && (
                  <p className="mt-1 text-xs text-red-500 font-medium font-sans">{state.errors.subject[0]}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="w-full">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isPending}
                placeholder="Message"
                className="bg-[#F5F3EF] rounded-[4px] px-6 py-5 h-[200px] border border-transparent focus:border-[#507661]/30 focus:outline-none transition-all duration-300 text-[#2C322D] font-['Google_Sans',sans-serif] text-[16px] w-full h-full resize-none placeholder-[#313232]/85 disabled:opacity-50"
              />
              {state.errors?.message && (
                <p className="mt-1 text-xs text-red-500 font-medium font-sans">{state.errors.message[0]}</p>
              )}
            </div>

            {/* Form Action Feedback Message */}
            {showFeedback && feedbackMessage && (
              <div 
                className={`p-4 rounded-[4px] font-['Google_Sans',sans-serif] text-sm border font-medium transition-opacity duration-500 ${
                  isSuccess
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`} 
                role="alert"
              >
                {feedbackMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full md:w-[227px] h-[67px] justify-center items-center lg:mt-9 gap-2.5 bg-[#507661] hover:bg-[#3f5c4b] active:bg-[#2f4538] text-white font-['Google_Sans',sans-serif] font-medium text-[18px] transition-all duration-300 cursor-pointer border-none rounded-[4px] group shadow-sm disabled:opacity-75"
            >
              {isPending ? 'Sending...' : 'Send Message'}
              {!isPending && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M10.7742 3.0442C10.5562 2.8186 10.1935 2.8186 9.96786 3.0442C9.74989 3.26217 9.74989 3.62495 9.96786 3.84242L14.0565 7.93108H0.564497C0.249984 7.93159 0 8.18157 0 8.49609C0 8.8106 0.249984 9.06871 0.564497 9.06871H14.0565L9.96786 13.1498C9.74989 13.3753 9.74989 13.7386 9.96786 13.9561C10.1935 14.1817 10.5567 14.1817 10.7742 13.9561L15.8308 8.89952C16.0564 8.68154 16.0564 8.31876 15.8308 8.10129L10.7742 3.0442Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Interactive Location Map */}
        <div className="w-full xl:w-[44%] relative aspect-[783/620] xl:h-[620px] rounded-[4px] overflow-hidden bg-[#F5F3EF]">
          {mapHtml ? (
            <div 
              className="absolute inset-0 w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
              dangerouslySetInnerHTML={{ __html: mapHtml }}
            />
          ) : (
            <iframe
              src="https://maps.google.com/maps?q=Meydan%20Grandstand,%20Nad%20Al%20Sheba,%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Layale Location Map"
            />
          )}
        </div>

      </div>
    </section>
  );
}
