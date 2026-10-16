import React from 'react';
import { GOOGLE_PROFILE_URL } from '../../data/conversion';

// Deliberately no review count – it would go stale.
const TrustLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <p className={`text-sm text-white/85 ${className}`}>
    <a
      href={GOOGLE_PROFILE_URL}
      target="_blank"
      rel="noopener"
      className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
    >
      <span className="text-[#fbbc04]" aria-hidden="true">★</span> 5,0 bei Google
    </a>
    <span aria-hidden="true"> · </span>5 Jahre Garantie<span aria-hidden="true"> · </span>12+ Jahre Erfahrung
  </p>
);

export default TrustLine;
