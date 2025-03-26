import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷'
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl'
  }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    // Update HTML lang attribute
    document.documentElement.lang = languageCode;
    // Update direction for RTL support
    document.documentElement.dir = languageCode === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
      >
        <Globe className="h-4 w-4 text-white" />
        <span className="text-white text-sm">{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2
                ${language.code === i18n.language ? 'bg-gray-50 text-accent-purple' : 'text-gray-700'}`}
            >
              <span className="text-xl">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;