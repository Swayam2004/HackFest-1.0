import React, { useState } from 'react';

interface HudTooltipProps {
  content: string;
  children: React.ReactNode;
  /** Position relative to child: 'top' (default) | 'bottom' | 'left' | 'right' */
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const POSITION_CLASSES: Record<string, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full   left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2  -translate-y-1/2  mr-2',
  right:  'left-full  top-1/2  -translate-y-1/2  ml-2',
};

/**
 * HudTooltip — wraps any child with an instant-appear (0ms)
 * black-box / white-text tooltip. No fade, no ease.
 *
 * Usage:
 *   <HudTooltip content="CLICK TO REGISTER">
 *     <SomeButton />
 *   </HudTooltip>
 */
export default function HudTooltip({
  content,
  children,
  position = 'top',
  className = '',
}: HudTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`
            absolute z-[9999]
            ${POSITION_CLASSES[position]}
            bg-black text-white
            font-mono font-bold text-[10px] tracking-[0.2em] uppercase
            px-3 py-1.5
            whitespace-nowrap pointer-events-none
          `}
          style={{ transition: 'none' }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
