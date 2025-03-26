import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const whatsappNumber = "+4915750000505";
  const message = t('footer.whatsappMessage');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
 
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder={t('footer.contact.form.name')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                  />
                  <input
                    type="email"
                    placeholder={t('footer.contact.form.email')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t('footer.contact.form.subject')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                />
                <textarea
                  placeholder={t('footer.contact.form.message')}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                ></textarea>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-red rounded-lg text-white font-semibold hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 text-center block"
                >
                  {t('footer.contact.form.send')}
                </a>
              </form>
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
                  <span>{t('footer.footer.contact.phone')}</span>
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