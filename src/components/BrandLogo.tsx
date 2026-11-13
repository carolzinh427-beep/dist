import React from 'react';

interface BrandLogoProps {
  variant?: 'default' | 'light' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'default',
  size = 'md',
}) => {
  const iconDimensions = size === 'sm' ? 32 : size === 'lg' ? 44 : 38;

  const markBg =
    variant === 'light'
      ? '#205B49'
      : variant === 'monochrome'
      ? 'currentColor'
      : '#123D32';

  const vFill =
    variant === 'monochrome' ? '#123D32' : '#F7F8F4';

  const accentFill =
    variant === 'monochrome' ? '#F7F8F4' : '#F47B35';

  const textColor =
    variant === 'light'
      ? '#F7F8F4'
      : variant === 'monochrome'
      ? 'currentColor'
      : '#202923';

  const subColor =
    variant === 'light'
      ? '#CBD5CE'
      : variant === 'monochrome'
      ? 'currentColor'
      : '#205B49';

  return (
    <span className="brand-logo" aria-label="Vértice Distribuidora">
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="brand-logo-svg"
      >
        <rect width="64" height="64" rx="10" fill={markBg} />
        <path
          d="M14 18H25.5L33.5 38L41.5 18H49.5L36.5 48H27.5L14 18Z"
          fill={vFill}
        />
        <path
          d="M36.5 18H44.5L52 33.5H44L36.5 18Z"
          fill={accentFill}
        />
        <circle cx="32" cy="45" r="3.8" fill={accentFill} />
      </svg>
      <span className="brand-logo-wordmark">
        <span className="brand-logo-name" style={{ color: textColor }}>
          VÉRTICE
        </span>
        <span className="brand-logo-sub" style={{ color: subColor }}>
          DISTRIBUIDORA
        </span>
      </span>
    </span>
  );
};
