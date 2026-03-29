import React from 'react';

type Size = 'sm' | 'md' | 'lg';

interface CyberBoxProps {
  bgClass?: string;
  borderClass?: string;
  borderWidth?: number;
  size?: Size;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CLIPS: Record<Size, string> = {
  sm: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
  md: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
  lg: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
};

export default function CyberBox({
  bgClass = 'bg-hack-black',
  borderClass = 'bg-hack-red',
  borderWidth = 4, // Thicker border for better visibility
  size = 'md',
  className = '',
  innerClassName = '',
  children,
  style,
}: CyberBoxProps) {
  const clip = CLIPS[size];

  return (
    <div
      className={`${borderClass} ${className} relative`}
      style={{ clipPath: clip, padding: borderWidth, ...style }}
    >
      {/* FIX: The inner layer MUST have the same clipPath. 
          Without it, the square corners of the background hide the clipped border.
      */}
      <div
        className={`${bgClass} ${innerClassName}`}
        style={{ clipPath: clip }}
      >
        {children}
      </div>
    </div>
  );
}