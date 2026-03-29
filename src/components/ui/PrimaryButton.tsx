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
}

const sizeClasses = {
  sm: 'px-7 py-3 text-sm',
  md: 'px-12 py-5 text-lg',
  lg: 'px-10 py-6 text-xl md:px-16 md:py-9 md:text-4xl',
};

export default function PrimaryButton({
  children,
  onClick,
  href,
  size = 'md',
  variant = 'primary',
  className = '',
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';

  const baseClasses = `
    inline-flex items-center justify-center
    font-body font-black tracking-wider uppercase
    select-none whitespace-nowrap relative cursor-pointer
    ${isPrimary ? 'bg-hack-red text-white border-4 border-white' : 'bg-hack-black text-white border-0'}
    cyber-box-sm
    ${sizeClasses[size]}
    ${className}
  `;

  const content = (
    <motion.div
      className={baseClasses}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonGlitch}
    >
      {children}
    </motion.div>
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
