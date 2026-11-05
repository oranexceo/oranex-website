import React from 'react';
import originalLogo from '../assets/branding/oranex-logo-original.png';

export interface OranexLogoProps {
  className?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean; // Maintained for backwards compatibility; original logo includes wordmark
  textColor?: string;
  variant?: 'color' | 'white';
}

export const OranexLogo: React.FC<OranexLogoProps> = ({
  className = '',
  size = 'md',
  // showText and textColor kept in interface for compatibility with existing callers
}) => {
  let heightPx = 44;
  if (typeof size === 'number') {
    heightPx = size;
  } else {
    switch (size) {
      case 'sm':
        heightPx = 32;
        break;
      case 'md':
        heightPx = 44;
        break;
      case 'lg':
        heightPx = 56;
        break;
      case 'xl':
        heightPx = 72;
        break;
      default:
        heightPx = 44;
    }
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={originalLogo}
        alt="ORANEX — Global Sourcing & Procurement"
        style={{
          height: `${heightPx}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain'
        }}
        className="oranex-logo shrink-0"
      />
    </div>
  );
};
