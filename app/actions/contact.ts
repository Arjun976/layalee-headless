'use server';

import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(5, { message: 'Phone number must be at least 5 characters.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  honeypot: z.string().optional(),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    fullName?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Check for spam bots (Honeypot technique)
  const honeypot = formData.get('honeypot') as string;
  if (honeypot && honeypot.trim() !== '') {
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    };
  }

  // 2. Extract and validate fields
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const formId = (formData.get('formId') as string) || process.env.WP_CONTACT_FORM_ID || '123';

  const validatedFields = contactSchema.safeParse({
    fullName,
    email,
    phone,
    subject,
    message,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please resolve the validation errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Debug Log for Testing
  console.log("\n=========================================");
  console.log("📬 CONTACT FORM SUBMISSION RECEIVED");
  console.log("-----------------------------------------");
  console.log(`- Form ID:   ${formId}`);
  console.log(`- Name:      ${fullName}`);
  console.log(`- Email:     ${email}`);
  console.log(`- Phone:     ${phone}`);
  console.log(`- Subject:   ${subject}`);
  console.log(`- Message:   ${message}`);
  console.log("=========================================\n");

  // 3. Prepare payload for Contact Form 7
  const cf7FormData = new FormData();
  cf7FormData.append('your-name', fullName);
  cf7FormData.append('your-email', email);
  cf7FormData.append('your-phone', phone);
  cf7FormData.append('your-subject', subject);
  cf7FormData.append('your-message', message);

  // 4. Resolve endpoints
  const wpBaseUrl = process.env.Secret;
  if (!wpBaseUrl) {
    console.error('Error: Secret environment variable is missing.');
    return {
      success: false,
      message: 'Server configuration error. Please try again later.',
    };
  }

  let endpoint = `${wpBaseUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

  try {
    let response = await fetch(endpoint, {
      method: 'POST',
      body: cf7FormData,
      cache: 'no-store',
    });

    // Fallback: If pretty permalinks are disabled on WordPress, try query-parameter rest_route format
    if (response.status === 404) {
      const altEndpoint = wpBaseUrl.includes('?') 
        ? `${wpBaseUrl}&rest_route=/contact-form-7/v1/contact-forms/${formId}/feedback`
        : `${wpBaseUrl}/index.php?rest_route=/contact-form-7/v1/contact-forms/${formId}/feedback`;
      
      console.log(`[Contact Form Action] Primary endpoint 404'd. Trying permalink fallback: ${altEndpoint}`);
      const altResponse = await fetch(altEndpoint, {
        method: 'POST',
        body: cf7FormData,
        cache: 'no-store',
      });
      
      if (altResponse.ok || altResponse.status !== 404) {
        response = altResponse;
      }
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[Contact Form Action] WordPress failed with status: ${response.status}. Response:`, errText);
      throw new Error(`WordPress responded with status: ${response.status}. Details: ${errText}`);
    }

    const result = await response.json();

    // CF7 returns 'mail_sent' when successful
    if (result.status === 'mail_sent') {
      return {
        success: true,
        message: result.message || 'Thank you! Your message has been sent successfully.',
      };
    }

    // Handle CF7 validation/spam/failure statuses
    return {
      success: false,
      message: result.message || 'There was an issue submitting your form. Please try again.',
    };
  } catch (error) {
    console.error('Error sending contact submission to WordPress:', error);
    return {
      success: false,
      message: 'Unable to deliver message right now. Please check your connection.',
    };
  }
}
