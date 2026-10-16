import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { CONTACT_EMAIL, SERVICE_OPTIONS } from '../data/conversion';

const EMAILJS_SERVICE_ID = 'service_b3wkg7l';
const EMAILJS_TEMPLATE_ID = 'template_cwqjq09';
const EMAILJS_PUBLIC_KEY = 'hFOV6PjJt3UBqbeVD';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface ContactFormProps {
  /** Preselected value for "Leistung" (service pages) */
  service?: string;
  /** Visual variant: light card (homepage/kontakt) or dark CTA card (service pages) */
  variant?: 'light' | 'dark';
}

type FormFields = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  message: string;
  website: string; // honeypot – must stay empty
};

const emptyForm = (service = ''): FormFields => ({
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  service,
  message: '',
  website: '',
});

const ContactForm: React.FC<ContactFormProps> = ({ service = '', variant = 'light' }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormFields>(() => emptyForm(service));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

  const isDark = variant === 'dark';
  const idPrefix = isDark ? 'cta-form' : 'contact-form';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein.';
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Bitte geben Sie Ihre Telefonnummer ein, damit wir Sie erreichen können.';
    } else if (phoneDigits.length < 6) {
      newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein.';
    }
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein (oder lassen Sie das Feld leer).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill every field. Drop silently – no request, no success message,
    // so no GTM conversion is triggered.
    if (formData.website) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const selectedService = formData.service || 'Nicht angegeben';
    // The existing EmailJS template renders {{message}} – include all new fields there,
    // and also send them as separate variables for future template updates.
    const composedMessage = [
      `Telefon: ${formData.phone.trim()}`,
      `E-Mail: ${formData.email.trim() || '–'}`,
      `Fahrzeug: ${formData.vehicle.trim() || '–'}`,
      `Leistung: ${selectedService}`,
      `Seite: ${window.location.pathname}`,
      '',
      formData.message.trim() || '(keine Nachricht)',
    ].join('\n');

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          vehicle: formData.vehicle.trim(),
          service: selectedService,
          page: window.location.pathname,
          subject: `Anfrage ${selectedService} – ${formData.name.trim()}`,
          message: composedMessage,
          to_email: CONTACT_EMAIL,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        // Fired exactly once per confirmed submission (in addition to the
        // ".bg-green-50.border-green-200" visibility trigger in GTM).
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'lead_form_success',
          form_location: window.location.pathname,
          service: selectedService,
        });
        setFormData(emptyForm(service));
      } else {
        console.error('EmailJS returned non-200 status:', result.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm(service));
    setErrors({});
    setSubmitStatus('idle');
  };

  const inputClass = (field: keyof FormFields) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition-colors duration-200 ${
      isDark
        ? 'bg-white/5 text-white placeholder-white/50'
        : 'bg-gray-50 text-gray-900 placeholder-gray-500'
    } ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
        : isDark
          ? 'border-white/15 focus:border-white/60 focus:ring-white/60'
          : 'border-gray-200 focus:border-accent-blue focus:ring-accent-blue'
    }`;

  const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-white/85' : 'text-gray-700'}`;
  const errorClass = `mt-1 text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`;
  const hintClass = `text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`;
  const linkClass = isDark ? 'underline text-white' : 'underline text-gray-900';

  const fieldError = (field: keyof FormFields) =>
    errors[field] ? (
      <p id={`${idPrefix}-${field}-error`} className={errorClass} role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <div>
      {/* Success message – GTM element visibility trigger uses ".bg-green-50.border-green-200" */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3" role="status">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-green-800">{t('contact.success')}</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <span className="text-red-800">{t('contact.error')}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot – visually hidden, skipped by keyboard and autofill */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input
            id={`${idPrefix}-website`}
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${idPrefix}-name`} className={labelClass}>Name *</label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
              className={inputClass('name')}
            />
            {fieldError('name')}
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`} className={labelClass}>Telefon *</label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
              className={inputClass('phone')}
            />
            {fieldError('phone')}
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>E-Mail (optional)</label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className={inputClass('email')}
          />
          {fieldError('email')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${idPrefix}-vehicle`} className={labelClass}>Fahrzeug (Marke/Modell)</label>
            <input
              id={`${idPrefix}-vehicle`}
              type="text"
              name="vehicle"
              placeholder="z. B. BMW 3er"
              value={formData.vehicle}
              onChange={handleInputChange}
              className={inputClass('vehicle')}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-service`} className={labelClass}>Leistung</label>
            <select
              id={`${idPrefix}-service`}
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`${inputClass('service')} ${isDark ? '[&>option]:text-black' : ''}`}
            >
              <option value="">Bitte wählen</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`} className={labelClass}>Nachricht</label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            className={inputClass('message')}
          />
        </div>

        <p className={hintClass}>Fotos können Sie uns danach bequem per WhatsApp schicken.</p>

        <p className={`text-xs leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
          Mit dem Absenden stimmen Sie zu, dass wir Ihre Angaben zur Bearbeitung Ihrer Anfrage verwenden. Mehr in
          unserer{' '}
          <a href="https://www.foliensam.de/datenschutz" className={linkClass}>
            Datenschutzerklärung
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${isDark ? 'border-black' : 'border-white'}`}></div>
                <span>{t('contact.sending')}</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Kostenloses Angebot anfordern</span>
              </>
            )}
          </button>

          {submitStatus === 'success' && (
            <button
              type="button"
              onClick={resetForm}
              className={`px-6 py-3.5 border-2 font-semibold rounded-lg transition-all duration-300 ${
                isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              {t('contact.sendAnother')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
