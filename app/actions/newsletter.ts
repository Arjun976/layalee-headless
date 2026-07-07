'use server';

import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  honeypot: z.string().optional(),
});

export type NewsletterState = {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
  };
};

export async function submitNewsletterForm(
  email: string,
  formShortcode?: string,
  honeypot?: string
): Promise<NewsletterState> {
  // 1. Check for spam bots (Honeypot technique)
  if (honeypot && honeypot.trim() !== '') {
    return {
      success: true,
      message: 'Thank you for subscribing!',
    };
  }

  // 2. Validate email field
  const validated = newsletterSchema.safeParse({ email, honeypot });
  if (!validated.success) {
    return {
      success: false,
      message: 'Please provide a valid email address.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // 3. Resolve endpoints & Form ID
  const wpBaseUrl = process.env.Secret;
  if (!wpBaseUrl) {
    console.error('Error: Secret environment variable is missing.');
    return {
      success: false,
      message: 'Server configuration error. Please try again later.',
    };
  }

  const endpoint = wpBaseUrl.endsWith('/graphql') ? wpBaseUrl : `${wpBaseUrl}/graphql`;
  
  // Try to parse form ID from formShortcode first
  let parsedFormId = '';
  if (formShortcode) {
    const match = formShortcode.match(/id=["']?([a-zA-Z0-9_-]+)["']?/);
    if (match) {
      parsedFormId = match[1];
    }
  }

  // Fallback chain: parsedFormId -> WP_NEWSLETTER_FORM_ID -> WP_CONTACT_FORM_ID -> 'newsletter-form'
  const rawFormId = parsedFormId || process.env.WP_NEWSLETTER_FORM_ID || process.env.WP_CONTACT_FORM_ID || 'newsletter-form';
  const contactFormId = /^\d+$/.test(rawFormId) ? parseInt(rawFormId, 10) : rawFormId;

  console.log("\n=========================================");
  console.log("📨 GRAPHQL NEWSLETTER SUBMISSION RECEIVED");
  console.log("-----------------------------------------");
  console.log(`- Form ID:   ${contactFormId}`);
  console.log(`- Email:     ${email}`);
  console.log(`- Type:      ${process.env.WP_NEWSLETTER_FORM_ID ? 'Dedicated Form' : 'Contact Form Fallback'}`);
  console.log("=========================================\n");

  // Determine field values to submit
  let fieldValues = [
    { id: 'your-email', value: email }
  ];

  // If using the contact form fallback, supply defaults for other required contact fields
  if (rawFormId === process.env.WP_CONTACT_FORM_ID) {
    fieldValues = [
      { id: 'your-name', value: 'Newsletter Subscriber' },
      { id: 'your-email', value: email },
      { id: 'your-phone', value: 'N/A' },
      { id: 'your-subject', value: 'Newsletter Subscription' },
      { id: 'your-message', value: 'This user subscribed to the newsletter from the footer.' },
    ];
  }

  // GraphQL Mutation Schema registered by the WPGraphQL Contact Form 7 plugin
  const mutation = `
    mutation SubmitNewsletterForm($input: SubmitContactFormInput!) {
      submitContactForm(input: $input) {
        success
        message
      }
    }
  `;

  const variables = {
    input: {
      contactFormId: contactFormId,
      clientMutationId: 'newsletter-submission',
      fieldValues
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`WordPress responded with status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL newsletter submission errors:', result.errors);
      const firstErr = result.errors[0]?.message || 'GraphQL Error';
      return {
        success: false,
        message: `WordPress GraphQL Error: ${firstErr}`,
      };
    }

    const data = result.data?.submitContactForm;
    if (data?.success) {
      return {
        success: true,
        message: 'Thank you! You have successfully subscribed to our newsletter.',
      };
    }

    return {
      success: false,
      message: data?.message || 'There was an issue subscribing. Please try again.',
    };
  } catch (error: any) {
    console.error('Error sending GraphQL newsletter submission to WordPress:', error);
    return {
      success: false,
      message: error.message || 'Unable to submit request right now. Please check your connection.',
    };
  }
}
