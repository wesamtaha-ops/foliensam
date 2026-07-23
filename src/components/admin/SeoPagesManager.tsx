import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO_PAGES } from '../../data/seoPages';
import {
  getSeoPages,
  saveSeoPage,
  resetSeoPagesToDefaults,
  SERVICE_PAGE_IDS,
} from '../../services/seoPageService';
import {
  SeoPageConfig,
  ContentBlock,
  ContentSection,
  FaqItem,
  BreadcrumbItem,
} from '../../types/seoPage';
import ImageUpload from './ImageUpload';
import './SeoPagesManager.css';

const PAGE_OPTIONS = [
  ...SERVICE_PAGE_IDS.map((id) => ({ id, group: 'services' as const })),
  { id: 'ratgeberKosten', group: 'other' as const },
  { id: 'kontakt', group: 'other' as const },
  { id: 'referenzen', group: 'other' as const },
];

const BLOCK_TYPES: ContentBlock['type'][] = [
  'paragraph',
  'list',
  'numbered-list',
  'table',
  'cta',
];

const emptyBlock = (type: ContentBlock['type'] = 'paragraph'): ContentBlock => {
  if (type === 'paragraph') return { type, text: '' };
  if (type === 'list' || type === 'numbered-list') return { type, items: [''] };
  if (type === 'table') return { type, table: { headers: [''], rows: [['']] } };
  return { type: 'cta', linkTo: '/', linkLabel: '' };
};

const SeoPagesManager: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPageId, setSelectedPageId] = useState<string>(SERVICE_PAGE_IDS[0]);
  const [page, setPage] = useState<SeoPageConfig>(SEO_PAGES[SERVICE_PAGE_IDS[0]]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activePanel, setActivePanel] = useState<'meta' | 'hero' | 'breadcrumbs' | 'content' | 'faq' | 'schema'>('meta');

  useEffect(() => {
    loadPages(selectedPageId);
  }, [selectedPageId]);

  const loadPages = async (pageId: string) => {
    setLoading(true);
    try {
      const pages = await getSeoPages();
      setPage(pages[pageId] ?? SEO_PAGES[pageId]);
    } catch (err) {
      console.error('Failed to load SEO pages:', err);
      setPage(SEO_PAGES[pageId]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveSeoPage(page);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save SEO page:', err);
      alert(t('admin.seoPages.saveError'));
    }
  };

  const handleRestoreDefaults = async () => {
    if (!confirm(t('admin.seoPages.restoreConfirm'))) {
      return;
    }
    try {
      const pages = await resetSeoPagesToDefaults();
      setPage(pages[selectedPageId] ?? SEO_PAGES[selectedPageId]);
    } catch (err) {
      console.error('Failed to restore SEO pages:', err);
      alert(t('admin.seoPages.saveError'));
    }
  };

  const updateMeta = (field: keyof SeoPageConfig['meta'], value: string) => {
    setPage((current) => ({
      ...current,
      meta: { ...current.meta, [field]: value },
    }));
  };

  const updateBreadcrumb = (index: number, field: keyof BreadcrumbItem, value: string) => {
    setPage((current) => ({
      ...current,
      breadcrumbs: current.breadcrumbs.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addBreadcrumb = () => {
    setPage((current) => ({
      ...current,
      breadcrumbs: [...current.breadcrumbs, { label: '' }],
    }));
  };

  const removeBreadcrumb = (index: number) => {
    setPage((current) => ({
      ...current,
      breadcrumbs: current.breadcrumbs.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index: number, updates: Partial<ContentSection>) => {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, i) =>
        i === index ? { ...section, ...updates } : section
      ),
    }));
  };

  const updateBlock = (sectionIndex: number, blockIndex: number, block: ContentBlock) => {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              blocks: section.blocks.map((item, j) => (j === blockIndex ? block : item)),
            }
          : section
      ),
    }));
  };

  const addSection = () => {
    setPage((current) => ({
      ...current,
      sections: [
        ...current.sections,
        { title: '', level: 2, blocks: [emptyBlock()] },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setPage((current) => ({
      ...current,
      sections: current.sections.filter((_, i) => i !== index),
    }));
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    setPage((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.sections.length) {
        return current;
      }
      const sections = [...current.sections];
      [sections[index], sections[nextIndex]] = [sections[nextIndex], sections[index]];
      return { ...current, sections };
    });
  };

  const addBlock = (sectionIndex: number, type: ContentBlock['type'] = 'paragraph') => {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, i) =>
        i === sectionIndex
          ? { ...section, blocks: [...section.blocks, emptyBlock(type)] }
          : section
      ),
    }));
  };

  const removeBlock = (sectionIndex: number, blockIndex: number) => {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, i) =>
        i === sectionIndex
          ? { ...section, blocks: section.blocks.filter((_, j) => j !== blockIndex) }
          : section
      ),
    }));
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    setPage((current) => ({
      ...current,
      faq: (current.faq ?? []).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addFaq = () => {
    setPage((current) => ({
      ...current,
      faq: [...(current.faq ?? []), { question: '', answer: '' }],
    }));
  };

  const removeFaq = (index: number) => {
    setPage((current) => ({
      ...current,
      faq: (current.faq ?? []).filter((_, i) => i !== index),
    }));
  };

  const panels = [
    { id: 'meta' as const, label: t('admin.seoPages.panels.meta') },
    { id: 'hero' as const, label: t('admin.seoPages.panels.hero') },
    { id: 'breadcrumbs' as const, label: t('admin.seoPages.panels.breadcrumbs') },
    { id: 'content' as const, label: t('admin.seoPages.panels.content') },
    { id: 'faq' as const, label: t('admin.seoPages.panels.faq') },
    { id: 'schema' as const, label: t('admin.seoPages.panels.schema') },
  ];

  return (
    <div className="seo-pages-manager">
      <div className="seo-pages-manager-header">
        <div>
          <h2 className="seo-pages-manager-title">{t('admin.seoPages.title')}</h2>
          <p className="seo-pages-manager-subtitle">{t('admin.seoPages.subtitle')}</p>
        </div>
        <div className="seo-pages-manager-actions">
          <button type="button" onClick={handleRestoreDefaults} className="seo-pages-manager-secondary-btn">
            <RotateCcw className="seo-pages-manager-btn-icon" />
            {t('admin.seoPages.restoreDefaults')}
          </button>
          <button type="button" onClick={handleSave} className="seo-pages-manager-primary-btn">
            <Save className="seo-pages-manager-btn-icon" />
            {t('admin.seoPages.save')}
          </button>
        </div>
      </div>

      {saved && (
        <div className="seo-pages-manager-success">{t('admin.seoPages.saved')}</div>
      )}

      <div className="seo-pages-manager-toolbar">
        <label className="seo-pages-manager-label">{t('admin.seoPages.selectPage')}</label>
        <select
          value={selectedPageId}
          onChange={(e) => setSelectedPageId(e.target.value)}
          className="seo-pages-manager-select"
        >
          <optgroup label={t('admin.seoPages.servicePages')}>
            {PAGE_OPTIONS.filter((item) => item.group === 'services').map((item) => (
              <option key={item.id} value={item.id}>
                {SEO_PAGES[item.id]?.meta.h1 ?? item.id}
              </option>
            ))}
          </optgroup>
          <optgroup label={t('admin.seoPages.otherPages')}>
            {PAGE_OPTIONS.filter((item) => item.group === 'other').map((item) => (
              <option key={item.id} value={item.id}>
                {SEO_PAGES[item.id]?.meta.h1 ?? item.id}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {loading ? (
        <p className="seo-pages-manager-loading">{t('admin.seoPages.loading')}</p>
      ) : (
        <>
          <div className="seo-pages-manager-tabs">
            {panels.map((panel) => (
              <button
                key={panel.id}
                type="button"
                onClick={() => setActivePanel(panel.id)}
                className={`seo-pages-manager-tab ${activePanel === panel.id ? 'seo-pages-manager-tab-active' : ''}`}
              >
                {panel.label}
              </button>
            ))}
          </div>

          <div className="seo-pages-manager-panel">
            {activePanel === 'meta' && (
              <div className="seo-pages-manager-grid">
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.metaTitle')}</label>
                  <input
                    value={page.meta.title}
                    onChange={(e) => updateMeta('title', e.target.value)}
                    className="seo-pages-manager-input"
                  />
                </div>
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.metaH1')}</label>
                  <input
                    value={page.meta.h1}
                    onChange={(e) => updateMeta('h1', e.target.value)}
                    className="seo-pages-manager-input"
                  />
                </div>
                <div className="seo-pages-manager-field seo-pages-manager-field-full">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.metaDescription')}</label>
                  <textarea
                    value={page.meta.description}
                    onChange={(e) => updateMeta('description', e.target.value)}
                    className="seo-pages-manager-textarea"
                    rows={3}
                  />
                </div>
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.canonicalPath')}</label>
                  <input
                    value={page.meta.canonicalPath}
                    onChange={(e) => updateMeta('canonicalPath', e.target.value)}
                    className="seo-pages-manager-input"
                  />
                </div>
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.ogImage')}</label>
                  <input
                    value={page.meta.ogImage ?? ''}
                    onChange={(e) => updateMeta('ogImage', e.target.value)}
                    className="seo-pages-manager-input"
                  />
                </div>
              </div>
            )}

            {activePanel === 'hero' && (
              <div className="seo-pages-manager-stack">
                <ImageUpload
                  label={t('admin.seoPages.heroImage')}
                  value={page.heroImage ?? ''}
                  onChange={(value) => setPage((current) => ({ ...current, heroImage: value }))}
                  placeholder="https://example.com/image.jpg"
                  description={t('admin.seoPages.heroImageDescription')}
                />
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.intro')}</label>
                  <textarea
                    value={page.intro}
                    onChange={(e) => setPage((current) => ({ ...current, intro: e.target.value }))}
                    className="seo-pages-manager-textarea"
                    rows={6}
                  />
                </div>
              </div>
            )}

            {activePanel === 'breadcrumbs' && (
              <div className="seo-pages-manager-stack">
                {page.breadcrumbs.map((crumb, index) => (
                  <div key={index} className="seo-pages-manager-row-card">
                    <div className="seo-pages-manager-grid">
                      <div className="seo-pages-manager-field">
                        <label className="seo-pages-manager-label">{t('admin.seoPages.breadcrumbLabel')}</label>
                        <input
                          value={crumb.label}
                          onChange={(e) => updateBreadcrumb(index, 'label', e.target.value)}
                          className="seo-pages-manager-input"
                        />
                      </div>
                      <div className="seo-pages-manager-field">
                        <label className="seo-pages-manager-label">{t('admin.seoPages.breadcrumbPath')}</label>
                        <input
                          value={crumb.path ?? ''}
                          onChange={(e) => updateBreadcrumb(index, 'path', e.target.value)}
                          className="seo-pages-manager-input"
                          placeholder="/"
                        />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeBreadcrumb(index)} className="seo-pages-manager-danger-btn">
                      <Trash2 className="seo-pages-manager-btn-icon" />
                      {t('admin.seoPages.remove')}
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addBreadcrumb} className="seo-pages-manager-secondary-btn">
                  <Plus className="seo-pages-manager-btn-icon" />
                  {t('admin.seoPages.addBreadcrumb')}
                </button>
              </div>
            )}

            {activePanel === 'content' && (
              <div className="seo-pages-manager-stack">
                {page.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="seo-pages-manager-section-card">
                    <div className="seo-pages-manager-section-header">
                      <h3 className="seo-pages-manager-section-title">
                        {t('admin.seoPages.section')} {sectionIndex + 1}
                      </h3>
                      <div className="seo-pages-manager-section-actions">
                        <button type="button" onClick={() => moveSection(sectionIndex, -1)} className="seo-pages-manager-icon-btn">
                          <ChevronUp className="seo-pages-manager-btn-icon" />
                        </button>
                        <button type="button" onClick={() => moveSection(sectionIndex, 1)} className="seo-pages-manager-icon-btn">
                          <ChevronDown className="seo-pages-manager-btn-icon" />
                        </button>
                        <button type="button" onClick={() => removeSection(sectionIndex)} className="seo-pages-manager-danger-btn">
                          <Trash2 className="seo-pages-manager-btn-icon" />
                        </button>
                      </div>
                    </div>

                    <div className="seo-pages-manager-grid">
                      <div className="seo-pages-manager-field">
                        <label className="seo-pages-manager-label">{t('admin.seoPages.sectionTitle')}</label>
                        <input
                          value={section.title ?? ''}
                          onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                          className="seo-pages-manager-input"
                        />
                      </div>
                      <div className="seo-pages-manager-field">
                        <label className="seo-pages-manager-label">{t('admin.seoPages.sectionId')}</label>
                        <input
                          value={section.id ?? ''}
                          onChange={(e) => updateSection(sectionIndex, { id: e.target.value })}
                          className="seo-pages-manager-input"
                          placeholder="teilfolierung"
                        />
                      </div>
                      <div className="seo-pages-manager-field">
                        <label className="seo-pages-manager-label">{t('admin.seoPages.sectionLevel')}</label>
                        <select
                          value={section.level ?? 2}
                          onChange={(e) => updateSection(sectionIndex, { level: Number(e.target.value) as 2 | 3 })}
                          className="seo-pages-manager-select"
                        >
                          <option value={2}>H2</option>
                          <option value={3}>H3</option>
                        </select>
                      </div>
                    </div>

                    <div className="seo-pages-manager-blocks">
                      {section.blocks.map((block, blockIndex) => (
                        <div key={blockIndex} className="seo-pages-manager-block-card">
                          <div className="seo-pages-manager-block-header">
                            <select
                              value={block.type}
                              onChange={(e) =>
                                updateBlock(sectionIndex, blockIndex, emptyBlock(e.target.value as ContentBlock['type']))
                              }
                              className="seo-pages-manager-select"
                            >
                              {BLOCK_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {t(`admin.seoPages.blockTypes.${type}`)}
                                </option>
                              ))}
                            </select>
                            <button type="button" onClick={() => removeBlock(sectionIndex, blockIndex)} className="seo-pages-manager-danger-btn">
                              <Trash2 className="seo-pages-manager-btn-icon" />
                            </button>
                          </div>

                          {block.type === 'paragraph' && (
                            <textarea
                              value={block.text ?? ''}
                              onChange={(e) =>
                                updateBlock(sectionIndex, blockIndex, { ...block, text: e.target.value })
                              }
                              className="seo-pages-manager-textarea"
                              rows={4}
                            />
                          )}

                          {(block.type === 'list' || block.type === 'numbered-list') && (
                            <textarea
                              value={(block.items ?? []).join('\n')}
                              onChange={(e) =>
                                updateBlock(sectionIndex, blockIndex, {
                                  ...block,
                                  items: e.target.value.split('\n'),
                                })
                              }
                              className="seo-pages-manager-textarea"
                              rows={5}
                              placeholder={t('admin.seoPages.listPlaceholder')}
                            />
                          )}

                          {block.type === 'table' && (
                            <div className="seo-pages-manager-stack">
                              <div className="seo-pages-manager-field">
                                <label className="seo-pages-manager-label">{t('admin.seoPages.tableHeaders')}</label>
                                <input
                                  value={(block.table?.headers ?? []).join(', ')}
                                  onChange={(e) =>
                                    updateBlock(sectionIndex, blockIndex, {
                                      ...block,
                                      table: {
                                        headers: e.target.value.split(',').map((item) => item.trim()),
                                        rows: block.table?.rows ?? [],
                                        caption: block.table?.caption,
                                      },
                                    })
                                  }
                                  className="seo-pages-manager-input"
                                />
                              </div>
                              <div className="seo-pages-manager-field">
                                <label className="seo-pages-manager-label">{t('admin.seoPages.tableRows')}</label>
                                <textarea
                                  value={(block.table?.rows ?? [])
                                    .map((row) => row.join(' | '))
                                    .join('\n')}
                                  onChange={(e) =>
                                    updateBlock(sectionIndex, blockIndex, {
                                      ...block,
                                      table: {
                                        headers: block.table?.headers ?? [],
                                        rows: e.target.value
                                          .split('\n')
                                          .filter(Boolean)
                                          .map((row) => row.split('|').map((cell) => cell.trim())),
                                        caption: block.table?.caption,
                                      },
                                    })
                                  }
                                  className="seo-pages-manager-textarea"
                                  rows={5}
                                  placeholder={t('admin.seoPages.tablePlaceholder')}
                                />
                              </div>
                              <div className="seo-pages-manager-field">
                                <label className="seo-pages-manager-label">{t('admin.seoPages.tableCaption')}</label>
                                <input
                                  value={block.table?.caption ?? ''}
                                  onChange={(e) =>
                                    updateBlock(sectionIndex, blockIndex, {
                                      ...block,
                                      table: {
                                        headers: block.table?.headers ?? [],
                                        rows: block.table?.rows ?? [],
                                        caption: e.target.value,
                                      },
                                    })
                                  }
                                  className="seo-pages-manager-input"
                                />
                              </div>
                            </div>
                          )}

                          {block.type === 'cta' && (
                            <div className="seo-pages-manager-grid">
                              <div className="seo-pages-manager-field">
                                <label className="seo-pages-manager-label">{t('admin.seoPages.ctaLabel')}</label>
                                <input
                                  value={block.linkLabel ?? ''}
                                  onChange={(e) =>
                                    updateBlock(sectionIndex, blockIndex, { ...block, linkLabel: e.target.value })
                                  }
                                  className="seo-pages-manager-input"
                                />
                              </div>
                              <div className="seo-pages-manager-field">
                                <label className="seo-pages-manager-label">{t('admin.seoPages.ctaLink')}</label>
                                <input
                                  value={block.linkTo ?? ''}
                                  onChange={(e) =>
                                    updateBlock(sectionIndex, blockIndex, { ...block, linkTo: e.target.value })
                                  }
                                  className="seo-pages-manager-input"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button type="button" onClick={() => addBlock(sectionIndex)} className="seo-pages-manager-secondary-btn">
                      <Plus className="seo-pages-manager-btn-icon" />
                      {t('admin.seoPages.addBlock')}
                    </button>
                  </div>
                ))}

                <button type="button" onClick={addSection} className="seo-pages-manager-primary-btn">
                  <Plus className="seo-pages-manager-btn-icon" />
                  {t('admin.seoPages.addSection')}
                </button>
              </div>
            )}

            {activePanel === 'faq' && (
              <div className="seo-pages-manager-stack">
                {(page.faq ?? []).map((item, index) => (
                  <div key={index} className="seo-pages-manager-row-card">
                    <div className="seo-pages-manager-field">
                      <label className="seo-pages-manager-label">{t('admin.seoPages.faqQuestion')}</label>
                      <input
                        value={item.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        className="seo-pages-manager-input"
                      />
                    </div>
                    <div className="seo-pages-manager-field">
                      <label className="seo-pages-manager-label">{t('admin.seoPages.faqAnswer')}</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        className="seo-pages-manager-textarea"
                        rows={4}
                      />
                    </div>
                    <button type="button" onClick={() => removeFaq(index)} className="seo-pages-manager-danger-btn">
                      <Trash2 className="seo-pages-manager-btn-icon" />
                      {t('admin.seoPages.remove')}
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addFaq} className="seo-pages-manager-secondary-btn">
                  <Plus className="seo-pages-manager-btn-icon" />
                  {t('admin.seoPages.addFaq')}
                </button>
              </div>
            )}

            {activePanel === 'schema' && (
              <div className="seo-pages-manager-grid">
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.serviceName')}</label>
                  <input
                    value={page.serviceName ?? ''}
                    onChange={(e) => setPage((current) => ({ ...current, serviceName: e.target.value }))}
                    className="seo-pages-manager-input"
                  />
                </div>
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.offerPrice')}</label>
                  <input
                    value={page.offerPrice ?? ''}
                    onChange={(e) => setPage((current) => ({ ...current, offerPrice: e.target.value }))}
                    className="seo-pages-manager-input"
                    placeholder="1300"
                  />
                </div>
                <div className="seo-pages-manager-field">
                  <label className="seo-pages-manager-label">{t('admin.seoPages.schemaType')}</label>
                  <select
                    value={page.schemaType ?? ''}
                    onChange={(e) =>
                      setPage((current) => ({
                        ...current,
                        schemaType: e.target.value ? (e.target.value as 'Service' | 'Article') : undefined,
                      }))
                    }
                    className="seo-pages-manager-select"
                  >
                    <option value="">{t('admin.seoPages.none')}</option>
                    <option value="Service">Service</option>
                    <option value="Article">Article</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SeoPagesManager;
