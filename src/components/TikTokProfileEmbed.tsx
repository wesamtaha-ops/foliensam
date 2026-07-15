import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './TikTokProfileEmbed.css';

const SOCIABLEKIT_SCRIPT = 'https://widgets.sociablekit.com/tiktok-feed/widget.js';
const MOBILE_BREAKPOINT = 768;

export const DEFAULT_TIKTOK_EMBED_ID = '25697428';
export const DEFAULT_TIKTOK_EMBED_ID_MOBILE = '25697429';

interface TikTokProfileEmbedProps {
  embedId?: string;
  mobileEmbedId?: string;
}

const useIsMobileView = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
};

const TikTokProfileEmbed: React.FC<TikTokProfileEmbedProps> = ({
  embedId = DEFAULT_TIKTOK_EMBED_ID,
  mobileEmbedId = DEFAULT_TIKTOK_EMBED_ID_MOBILE,
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobileView();
  const activeEmbedId = isMobile ? mobileEmbedId : embedId;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !activeEmbedId) return;

    container.innerHTML = '';

    const feedDiv = document.createElement('div');
    feedDiv.className = 'sk-tiktok-feed';
    feedDiv.setAttribute('data-embed-id', activeEmbedId);
    container.appendChild(feedDiv);

    const script = document.createElement('script');
    script.src = SOCIABLEKIT_SCRIPT;
    script.defer = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [activeEmbedId]);

  if (!embedId && !mobileEmbedId) {
    return (
      <div className="tiktok-embed-empty">
        <p className="tiktok-embed-empty-title">{t('gallery.tiktokNotConfigured')}</p>
        <p className="tiktok-embed-empty-text">{t('gallery.tiktokNotConfiguredHint')}</p>
      </div>
    );
  }

  return <div ref={containerRef} className="tiktok-embed-container" />;
};

export default TikTokProfileEmbed;
