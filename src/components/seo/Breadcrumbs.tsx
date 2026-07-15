import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '../../types/seoPage';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="seo-breadcrumbs">
      <ol className="seo-breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="seo-breadcrumbs-item">
              {index > 0 && (
                <ChevronRight className="seo-breadcrumbs-separator" aria-hidden="true" />
              )}
              {item.path && !isLast ? (
                <Link to={item.path} className="seo-breadcrumbs-link">
                  {item.label}
                </Link>
              ) : (
                <span className="seo-breadcrumbs-current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
