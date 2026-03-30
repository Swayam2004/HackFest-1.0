import React from 'react';
import { motion } from 'framer-motion';
import { buttonGlitch } from '../../lib/animations';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'dark';
  className?: string;
  tooltip?: string;
}

const sizeClasses = {
  sm: 'px-7 py-3 text-sm',
  md: 'px-12 py-5 text-lg',
  lg: 'px-10 py-6 text-xl md:px-16 md:py-9 md:text-4xl',
};

/* Injected once — hard step color swap on hover, no ease */
const GLITCH_STYLE = `
  .btn-primary-glitch {
    background-color: #c00100;
    transition: background-color 0ms step-end, color 0ms step-end;
  }
  .btn-primary-glitch:hover {
    background-color: #cb0100;
  }
`;

export default function PrimaryButton({
  children,
  onClick,
  href,
  size = 'md',
  variant = 'primary',
  className = '',
  tooltip,
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const [showTooltip, setShowTooltip] = React.useState(false);

  const baseClasses = `
    inline-flex items-center justify-center
    font-body font-black tracking-wider uppercase
    select-none whitespace-nowrap relative cursor-pointer
    ${isPrimary ? 'btn-primary-glitch text-white border-4 border-white' : 'bg-hack-black text-white border-0'}
    cyber-box-sm
    ${sizeClasses[size]}
    ${className}
  `;

  const content = (
    <div className="relative inline-block">
      <style dangerouslySetInnerHTML={{ __html: GLITCH_STYLE }} />
      <motion.div
        className={baseClasses}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonGlitch}
        onHoverStart={() => tooltip && setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
      >
        {children}
      </motion.div>

      {/* Instant tooltip — 0ms black box */}
      {tooltip && showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
            bg-black text-white font-mono text-xs tracking-widest uppercase
            px-3 py-1.5 whitespace-nowrap pointer-events-none"
          style={{ transition: 'none' }}
        >
          {tooltip}
          {/* Arrow */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2
              border-4 border-transparent border-t-black"
          />
        </div>
      )}
    </div>
  );

  if (href) {
    return <a href={href} className="inline-block">{content}</a>;
  }

  return (
    <button onClick={onClick} className="bg-transparent border-0 p-0">
      {content}
    </button>
  );
}
