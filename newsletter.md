# Footer Newsletter Integration (WPGraphQL Mutation)

This document explains how the footer newsletter is configured and integrated using a **GraphQL mutation** directly against the WordPress backend via a **Next.js Server Action**.

---

## 1. File Structure

* **UI Form Component**: [components/footer/Footer.tsx](file:///D:/layalee-next/layale_headless/components/footer/Footer.tsx) (lines 122–162)
* **GraphQL Server Action**: [app/actions/newsletter.ts](file:///D:/layalee-next/layale_headless/app/actions/newsletter.ts)
* **WordPress Form ID Environment Key**: `WP_NEWSLETTER_FORM_ID` (placed in `.env` or `.env.local`)

---

## 2. Dynamic Settings & Copy (WordPress Backend)

The newsletter section titles and description text are loaded dynamically from WordPress `themeSettings` (passed to the layout from `getHeaderAndHomePageData` in `lib/wordpress.tsx`):

1. **Subtitle**: `themeSettings?.newsletter_section?.newsletter_subtitle` &rarr; falls back to `themeSettings?.footer_newsletter_content?.footer_newsletter_subtitle` &rarr; defaults to `"Join Us"`.
2. **Title**: `themeSettings?.newsletter_section?.newsletter_title` &rarr; falls back to `themeSettings?.footer_newsletter_content?.footer_newsletter_title` &rarr; defaults to `"Stay Inspired"`.
3. **Description**: `themeSettings?.newsletter_section?.newsletter_paragraphs` &rarr; falls back to `themeSettings?.footer_newsletter_content?.footer_newsletter_description` &rarr; defaults to `"Join our newsletter for design ideas, new collections, and exclusive offers."`.

---

## 3. How the GraphQL Mutation Works

The newsletter form uses the **WPGraphQL Contact Form 7** WordPress plugin to submit emails. In WordPress, Contact Form 7 forms (including contact forms, newsletter sign-ups, and booking forms) are all dispatched using the single `submitContactForm` GraphQL mutation.

### GraphQL Mutation Schema:
```graphql
mutation SubmitNewsletterForm($input: SubmitContactFormInput!) {
  submitContactForm(input: $input) {
    success
    message
  }
}
```

### Input Arguments:
* `contactFormId`: The ID of your newsletter Contact Form 7 form in WordPress (loaded via the `WP_NEWSLETTER_FORM_ID` environment variable). If not configured, it will fall back to `WP_CONTACT_FORM_ID` (e.g. `b11344a`) and automatically populate required contact fields with placeholders to satisfy checks.
* `fieldValues`: An array mapping inputs. For a dedicated newsletter form, the user's email is bound to the form field with ID `your-email`.
  ```json
  [
    { "id": "your-email", "value": "email@example.com" }
  ]
  ```

---

## 4. Front-End Form Handler

The newsletter form in `Footer.tsx` uses standard React `useState` hooks to manage submission states and calls the server action asynchronously:

```tsx
const [email, setEmail] = useState('');
const [honeypot, setHoneypot] = useState('');
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
const [message, setMessage] = useState('');

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  setStatus('loading');
  setMessage('');
  try {
    const result = await submitNewsletterForm(email, honeypot);
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  } catch (err) {
    setStatus('error');
    setMessage('Something went wrong. Please try again.');
  }
};
```

---

## 5. Security & Spam Protection

* **Zod Validation**: Prior to running the GraphQL request, the server action validates the email structure server-side via `zod`.
* **Honeypot Protection**: A hidden input field is rendered in the form:
  ```html
  <input
    type="text"
    value={honeypot}
    onChange={(e) => setHoneypot(e.target.value)}
    className="hidden"
    aria-hidden="true"
    name="honeypot"
  />
  ```
  If a bot fills out this hidden input field, the server action instantly aborts the GraphQL request and returns a mock success message, preventing database/API spam.
