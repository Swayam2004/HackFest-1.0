import React, { useState } from 'react';

interface HudTextFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function HudTextField({
  label,
  id,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
}: HudTextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label — pushed completely outside the input box, above it */}
      <label
        htmlFor={id}
        className={`font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-none
          ${focused ? 'text-hack-red' : 'text-hack-black/60'}`}
        style={{ transition: 'none' }}
      >
        {focused || value ? `> ${label}` : `_ ${label}`}
      </label>

      {/* Input — no border-radius, 2px heavy bottom border only */}
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full bg-transparent font-mono font-bold text-hack-black
            text-sm tracking-wider uppercase placeholder:text-hack-black/25
            outline-none border-0 border-b-[2px] pb-2 pt-1 px-0
            ${focused ? 'border-hack-red' : 'border-hack-black/40'}
          `}
          style={{
            borderRadius: 0,
            borderBottomColor: focused ? '#c00100' : 'rgba(32,28,0,0.4)',
            /* Step transition — color snaps instantly */
            transition: 'border-color 0ms step-end',
          }}
        />
        {/* Active underline accent — 100% width hard red line beneath */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-hack-red pointer-events-none"
          style={{
            width: focused ? '100%' : '0%',
            transition: 'width 0ms step-end',
          }}
        />
      </div>
    </div>
  );
}
