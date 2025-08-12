import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t } = useTranslation();
  const whatsappNumber = "+4915750000505";
  const message = t('footer.whatsappMessage');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    to_email: 'info@foliensam.de'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      console.log('Starting email submission...');
      console.log('Form data:', formData);
      console.log('Form ref:', formRef.current);
      
      // You'll need to replace these with your actual EmailJS service ID, template ID, and public key
      const result = await emailjs.sendForm(
        'service_b3wkg7l', // Replace with your EmailJS service ID
        'template_cwqjq09', // Replace with your EmailJS template ID
        formRef.current!,
        'hFOV6PjJt3UBqbeVD' // Replace with your EmailJS public key
      );
      
      console.log('EmailJS result:', result);
      
      if (result.status === 200) {
        console.log('✅ Email sent successfully!');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', to_email: 'info@foliensam.de' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        console.error('❌ EmailJS returned non-200 status:', result.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '', to_email: 'info@foliensam.de' });
    setErrors({});
    setSubmitStatus('idle');
  };

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('hFOV6PjJt3UBqbeVD');
  }, []);

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">{t('nav.contact')}</h2>
          <div className="w-24 h-1 bg-accent-red mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">{t('footer.contact.writeUs')}</h3>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">{t('contact.success')}</span>
                </div>
              )}
              
              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800">{t('contact.error')}</span>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden field for recipient email */}
                <input type="hidden" name="to_email" value={formData.to_email} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('footer.contact.form.name')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors duration-200 ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 focus:border-accent-blue focus:ring-accent-blue'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('footer.contact.form.email')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors duration-200 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-200 focus:border-accent-blue focus:ring-accent-blue'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t('footer.contact.form.subject')}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors duration-200 ${
                      errors.subject 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-accent-blue focus:ring-accent-blue'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('footer.contact.form.message')}
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors duration-200 ${
                      errors.message 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-accent-blue focus:ring-accent-blue'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-black rounded-lg text-white font-semibold hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>{t('footer.contact.form.send')}</span>
                      </>
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                    >
                      {t('contact.sendAnother')}
                    </button>
                  )}
                </div>
              </form>
              
              {/* WhatsApp Alternative */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-3">
                  {t('contact.whatsappAlternative')}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 text-center block"
                >
                  {t('contact.whatsapp')}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">{t('footer.contact.openingHours')}</h3>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent-blue/10 rounded-lg">
                  <Clock className="h-6 w-6 text-accent-blue" />
                </div>
                <div>
                  <p className="text-gray-600">{t('footer.contact.hours.weekdays')}</p>
                  <p className="text-gray-600">{t('footer.contact.hours.saturday')}</p>
                  <p className="text-gray-600">{t('footer.contact.hours.sunday')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">{t('footer.contact.info')}</h3>
              <div className="space-y-6">
                <a 
                  href={`tel:${t('footer.contact.phone')}`}
                  className="flex items-center space-x-4 text-gray-600 hover:text-accent-blue transition-colors duration-300"
                >
                  <div className="p-3 bg-accent-blue/10 rounded-lg">
                    <Phone className="h-6 w-6 text-accent-blue" />
                  </div>
                  <span>{t('footer.contact.phone')}</span>
                </a>
                <a 
                  href={`mailto:${t('footer.contact.email')}`}
                  className="flex items-center space-x-4 text-gray-600 hover:text-accent-blue transition-colors duration-300"
                >
                  <div className="p-3 bg-accent-blue/10 rounded-lg">
                    <Mail className="h-6 w-6 text-accent-blue" />
                  </div>
                  <span>{t('footer.contact.email')}</span>
                </a>
                <a 
                  href="https://www.google.com/maps?q=52.55009841918945,13.45048999786377&z=17&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-600 hover:text-accent-blue transition-colors duration-300"
                >
                  <div className="p-3 bg-accent-blue/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-accent-blue" />
                  </div>
                  <span>Max-Steinke-Straße 36
13086 Berlin</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.8825233766733!2d13.448301177165687!3d52.55009841918945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMzJzAwLjQiTiAxM8KwMjcnMDEuOCJF!5e0!3m2!1sen!2sde!4v1709865391405!5m2!1sen!2sde"
                width="100%"
                height="400"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title={t('contact.map')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;