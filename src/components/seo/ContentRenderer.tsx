import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { ContentBlock, ContentSection, FaqItem } from '../../types/seoPage';

interface ContentRendererProps {
  sections: ContentSection[];
}

const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="seo-content-paragraph">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul key={index} className="seo-content-list">
          {block.items?.map((item, i) => (
            <li key={i} className="seo-content-list-item">
              <span className="seo-content-list-bullet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol key={index} className="seo-content-process-list">
          {block.items?.map((item, i) => (
            <li key={i} className="seo-content-process-item">
              <div className="seo-content-process-number">{i + 1}</div>
              <p className="seo-content-process-text">{item}</p>
            </li>
          ))}
        </ol>
      );
    case 'table':
      if (!block.table) return null;
      return (
        <div key={index} className="seo-content-table-wrapper">
          <table className="seo-content-table">
            <thead>
              <tr>
                {block.table.headers.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.table.caption && (
            <p className="seo-content-table-caption">{block.table.caption}</p>
          )}
        </div>
      );
    case 'cta':
      if (!block.linkTo || !block.linkLabel) return null;
      return (
        <Link key={index} to={block.linkTo} className="seo-content-cta">
          {block.linkLabel}
          <ArrowRight className="seo-content-cta-icon" />
        </Link>
      );
    default:
      return null;
  }
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ sections }) => {
  return (
    <div className="seo-content-sections">
      {sections.map((section, sectionIndex) => {
        if (!section.title && section.blocks.length === 0) return null;

        const HeadingTag = section.level === 3 ? 'h3' : 'h2';
        const isSubSection = section.level === 3;

        return (
          <section
            key={sectionIndex}
            id={section.id}
            className={`seo-content-section ${isSubSection ? 'seo-content-section-sub' : ''}`}
          >
            {section.title && (
              <>
                <HeadingTag className={isSubSection ? 'seo-content-h3' : 'seo-content-h2'}>
                  {section.title}
                </HeadingTag>
                {!isSubSection && <div className="seo-page-h1-accent seo-section-accent" />}
              </>
            )}
            <div className="seo-content-section-body">
              {section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

interface FaqSectionProps {
  items: FaqItem[];
  title: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items, title }) => {
  return (
    <section className="seo-faq-section">
      <h2 className="seo-content-h2">{title}</h2>
      <div className="seo-page-h1-accent seo-section-accent" />
      <div className="seo-faq-list">
        {items.map((item, index) => (
          <details key={index} className="seo-faq-item">
            <summary className="seo-faq-question">
              <span>{item.question}</span>
              <ChevronRight className="seo-faq-chevron" />
            </summary>
            <p className="seo-faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ContentRenderer;
