import React from 'react';

type StatusColor = 'error' | 'primary' | 'warning' | 'ok';

interface HudDataChipProps {
  label: string;
  value?: string;
  status?: StatusColor;
  className?: string;
  /** Optional tooltip shown on hover (instant black box) */
  tooltip?: string;
}

const STATUS_COLORS: Record<StatusColor, string> = {
  error:   '#ba1a1a',   // --color-error
  primary: '#c00100',   // --color-primary
  warning: '#fde403',   // hack-yellow
  ok:      '#1a7a3f',   // neutral ok green
};

export default function HudDataChip({
  label,
  value,
  status = 'primary',
  className = '',
  tooltip,
}: HudDataChipProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const dotColor = STATUS_COLORS[status];

  return (
    <div
      className={`relative inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => tooltip && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Hardware tag body — tertiary_container (#e1e1e1) background */}
      <div
        className="inline-flex items-center gap-2 px-2.5 py-1.5"
        style={{ backgroundColor: '#e1e1e1' }}
      >
        {/* 4px square status light */}
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            backgroundColor: dotColor,
            flexShrink: 0,
            borderRadius: 0,
            boxShadow: `0 0 4px 1px ${dotColor}88`,
          }}
        />

        {/* Label + Value */}
        <span className="font-mono font-bold text-[10px] tracking-[0.2em] uppercase text-hack-black">
          {label}
          {value !== undefined && (
            <>
              <span className="mx-1 text-hack-black/40">:</span>
              <span className="text-hack-black/80">{value}</span>
            </>
          )}
        </span>
      </div>

      {/* Instant black tooltip — 0ms */}
      {tooltip && showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50
            bg-black text-white font-mono text-[10px] tracking-widest uppercase
            px-2 py-1 whitespace-nowrap pointer-events-none"
          style={{ transition: 'none' }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
