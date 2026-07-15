import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './TikTokProfileEmbed.css';

const SOCIABLEKIT_SCRIPT = 'https://widgets.sociablekit.com/tiktok-feed/widget.js';
export const DEFAULT_TIKTOK_EMBED_ID = '25697428';

interface TikTokProfileEmbedProps {
  embedId?: string;
}

const TikTokProfileEmbed: React.FC<TikTokProfileEmbedProps> = ({ embedId = DEFAULT_TIKTOK_EMBED_ID }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !embedId) return;

    container.innerHTML = '';

    const feedDiv = document.createElement('div');
    feedDiv.className = 'sk-tiktok-feed';
    feedDiv.setAttribute('data-embed-id', embedId);
    container.appendChild(feedDiv);

    const script = document.createElement('script');
    script.src = SOCIABLEKIT_SCRIPT;
    script.defer = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [embedId]);

  if (!embedId) {
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
