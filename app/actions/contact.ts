'use server';

import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(5, { message: 'Phone number must be at least 5 characters.' })
    .regex(/^[0-9+\s\-()]+$/, { message: 'Phone number can only contain digits, spaces, dashes, parentheses, or +.' }),
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
  const rawFormId = (formData.get('formId') as string) || process.env.WP_CONTACT_FORM_ID || '';

  // Parse to integer if it consists entirely of digits to stay compatible with different schema types
  const contactFormId = /^\d+$/.test(rawFormId) ? parseInt(rawFormId, 10) : rawFormId;

  console.log("\n=========================================");
  console.log("📬 GRAPHQL CONTACT FORM SUBMISSION RECEIVED");
  console.log("-----------------------------------------");
  console.log(`- Form ID:   ${contactFormId}`);
  console.log(`- Name:      ${fullName}`);
  console.log(`- Email:     ${email}`);
  console.log(`- Phone:     ${phone}`);
  console.log(`- Subject:   ${subject}`);
  console.log(`- Message:   ${message}`);
  console.log("=========================================\n");

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

  // 3. Resolve endpoints
  const wpBaseUrl = process.env.Secret;
  if (!wpBaseUrl) {
    console.error('Error: Secret environment variable is missing.');
    return {
      success: false,
      message: 'Server configuration error. Please try again later.',
    };
  }

  const endpoint = wpBaseUrl.endsWith('/graphql') ? wpBaseUrl : `${wpBaseUrl}/graphql`;

  // GraphQL Mutation Schema registered by the WPGraphQL Contact Form 7 plugin
  const mutation = `
    mutation SubmitContactForm($input: SubmitContactFormInput!) {
      submitContactForm(input: $input) {
        success
        message
      }
    }
  `;

  // Map keys to WPGraphQL input tags
  const variables = {
    input: {
      contactFormId: contactFormId,
      clientMutationId: 'contact-form-submission',
      fieldValues: [
        { id: 'your-name', value: fullName },
        { id: 'your-email', value: email },
        { id: 'your-phone', value: phone },
        { id: 'your-subject', value: subject },
        { id: 'your-message', value: message },
      ]
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
      console.error('GraphQL contact submission errors:', result.errors);
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
        message: data.message || 'Thank you! Your message has been sent successfully.',
      };
    }

    return {
      success: false,
      message: data?.message || 'There was an issue submitting your form via GraphQL. Please try again.',
    };
  } catch (error: any) {
    console.error('Error sending GraphQL contact submission to WordPress:', error);
    return {
      success: false,
      message: error.message || 'Unable to deliver message right now. Please check your connection.',
    };
  }
}
