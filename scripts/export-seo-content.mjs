import { writeFileSync } from 'fs';
import { SEO_PAGES } from '../src/data/seoPages.ts';

const extractText = (page) => ({
  meta: {
    title: page.meta.title,
    description: page.meta.description,
    h1: page.meta.h1,
  },
  intro: page.intro,
  breadcrumbs: page.breadcrumbs.map((b) => ({ label: b.label })),
  serviceName: page.serviceName,
  sections: page.sections.map((section) => ({
    id: section.id,
    title: section.title,
    level: section.level,
    blocks: section.blocks.map((block) => {
      if (block.type === 'paragraph') return { type: block.type, text: block.text };
      if (block.type === 'list' || block.type === 'numbered-list')
        return { type: block.type, items: block.items };
      if (block.type === 'table')
        return {
          type: block.type,
          table: {
            headers: block.table?.headers,
            rows: block.table?.rows,
            caption: block.table?.caption,
          },
        };
      if (block.type === 'cta')
        return { type: block.type, linkLabel: block.linkLabel };
      return block;
    }),
  })),
  faq: page.faq?.map((item) => ({ question: item.question, answer: item.answer })),
});

const output = {};
for (const [id, page] of Object.entries(SEO_PAGES)) {
  output[id] = extractText(page);
}

writeFileSync('src/i18n/seoContent/de.json', JSON.stringify(output, null, 2));
console.log('Exported', Object.keys(output).length, 'pages to de.json');
