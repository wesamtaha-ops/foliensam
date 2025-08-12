# EmailJS Setup Instructions

This document explains how to set up EmailJS for the contact form in your FolienSam website.

## What is EmailJS?

EmailJS allows you to send emails directly from your frontend JavaScript code without needing a backend server. It's perfect for static websites and React applications.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. **Add Email Service:**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Give your service a name (e.g., "Gmail")

2. **Get Service ID:**
   - After setup, copy the Service ID (it looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. **Create Template:**
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Choose "Blank Template"

2. **Design Your Template:**
   - Subject: `New Contact Form Submission from {{name}}`
   - Content example:
   ```
   Name: {{name}}
   Email: {{email}}
   Subject: {{subject}}
   Message: {{message}}
   ```

3. **Save Template:**
   - Click "Save" and copy the Template ID (it looks like: `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your Public Key (it looks like: `user_xxxxxxx`)

## Step 5: Update Your Code

Replace the placeholder values in `src/components/Contact.tsx`:

```typescript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',        // Replace with your actual Service ID
  'YOUR_TEMPLATE_ID',       // Replace with your actual Template ID
  formRef.current!,
  'YOUR_PUBLIC_KEY'         // Replace with your actual Public Key
);
```

## Step 6: Test Your Form

1. Fill out the contact form on your website
2. Submit the form
3. Check your email to see if the message was received
4. Check the browser console for any errors

## Troubleshooting

### Common Issues:

1. **"Service not found" error:**
   - Make sure your Service ID is correct
   - Ensure your email service is properly connected

2. **"Template not found" error:**
   - Verify your Template ID is correct
   - Check that the template is published

3. **"Invalid public key" error:**
   - Confirm your Public Key is correct
   - Make sure your account is verified

4. **Form not sending:**
   - Check browser console for JavaScript errors
   - Verify all form fields have the correct `name` attributes
   - Ensure your template variables match the form field names

### Form Field Names:

Make sure your form fields have these exact names:
- `name` - for the name field
- `email` - for the email field  
- `subject` - for the subject field
- `message` - for the message field

## Security Notes

- Your Public Key is safe to expose in frontend code
- EmailJS handles the security of your email credentials
- Consider implementing rate limiting if needed
- The free tier allows 200 emails per month

## Support

If you encounter issues:
1. Check the [EmailJS documentation](https://www.emailjs.com/docs/)
2. Visit the [EmailJS community forum](https://community.emailjs.com/)
3. Contact EmailJS support through their dashboard

## Cost

- **Free Tier:** 200 emails/month
- **Paid Plans:** Start at $15/month for 1,000 emails
- **Enterprise:** Custom pricing for high-volume needs

---

**Note:** Keep your Service ID, Template ID, and Public Key secure and don't share them publicly. While the Public Key is safe to expose, the other IDs should be kept private.
