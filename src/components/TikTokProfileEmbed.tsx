import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './TikTokProfileEmbed.css';

interface TikTokProfileEmbedProps {
  username: string;
}

const loadTikTokEmbedScript = (): Promise<void> => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const TikTokProfileEmbed: React.FC<TikTokProfileEmbedProps> = ({ username }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username) return;

    const renderEmbed = async () => {
      await loadTikTokEmbedScript();

      const tiktokWindow = window as Window & {
        tiktok?: { lib?: { render: () => void } };
      };

      if (tiktokWindow.tiktok?.lib?.render) {
        tiktokWindow.tiktok.lib.render();
      }
    };

    renderEmbed();
  }, [username]);

  if (!username) {
    return (
      <div className="tiktok-embed-empty">
        <p className="tiktok-embed-empty-title">{t('gallery.tiktokNotConfigured')}</p>
        <p className="tiktok-embed-empty-text">{t('gallery.tiktokNotConfiguredHint')}</p>
      </div>
    );
  }

  const profileUrl = `https://www.tiktok.com/@${username}`;

  return (
    <div ref={containerRef} className="tiktok-embed-container">
      <blockquote
        className="tiktok-embed"
        cite={profileUrl}
        data-unique-id={username}
        data-embed-type="creator"
      >
        <section>
          <a target="_blank" rel="noopener noreferrer" href={`${profileUrl}?refer=creator_embed`}>
            @{username}
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokProfileEmbed;
