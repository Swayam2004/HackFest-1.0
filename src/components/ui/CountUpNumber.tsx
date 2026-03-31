import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useInView } from 'framer-motion';

interface CountUpNumberProps {
  target: number;
  /** Display suffix like "H" in "48H" — appended after the number */
  suffix?: string;
  /** Zero-pad to this many digits, e.g. 4 → "0048" */
  pad?: number;
  className?: string;
  duration?: number;
  /** Optional external trigger — if provided, animation fires when this is true
   *  (useful when the element is inside a clip-path stacking context which can
   *  cause IntersectionObserver to never fire). */
  trigger?: boolean;
}

export default function CountUpNumber({
  target,
  suffix = '',
  pad = 0,
  className = '',
  duration = 1.8,
  trigger,
}: CountUpNumberProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewInternal = useInView(containerRef, { once: true, margin: '-80px' });
  const inView = trigger ?? inViewInternal;

  useEffect(() => {
    if (!inView || !elRef.current) return;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const rounded = Math.round(obj.val);
        const str = pad > 0 ? String(rounded).padStart(pad, '0') : String(rounded);
        if (elRef.current) {
          elRef.current.textContent = str + suffix;
        }
      },
    });
  }, [inView, target, suffix, pad, duration]);

  // Initial value (before animation fires)
  const initial = pad > 0 ? '0'.repeat(pad) + suffix : '0' + suffix;

  return (
    <div ref={containerRef}>
      <span ref={elRef} className={className}>
        {initial}
      </span>
    </div>
  );
}
