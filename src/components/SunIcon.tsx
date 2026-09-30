import type { FC } from 'react';

interface SunIconProps {
  className?: string;
}

/**
 * 8-pointed radiant sunburst icon matching the "HOUSE OF SANATANA" brand identity
 */
export const SunIcon: FC<SunIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      {/* Central circular core */}
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      {/* 4 Cardinal Rays (North, South, East, West) */}
      <polygon points="12,1 14,8 12,6 10,8" fill="currentColor" />
      <polygon points="12,23 14,16 12,18 10,16" fill="currentColor" />
      <polygon points="23,12 16,14 18,12 16,10" fill="currentColor" />
      <polygon points="1,12 8,14 6,12 8,10" fill="currentColor" />
      {/* 4 Diagonal Rays (NE, NW, SE, SW) */}
      <polygon points="19.8,4.2 15.5,9.5 17,8 14.5,6.5" fill="currentColor" />
      <polygon points="4.2,19.8 8.5,14.5 7,16 9.5,17.5" fill="currentColor" />
      <polygon points="19.8,19.8 14.5,15.5 16,17 17.5,14.5" fill="currentColor" />
      <polygon points="4.2,4.2 9.5,8.5 8,7 6.5,9.5" fill="currentColor" />
    </svg>
  );
};
