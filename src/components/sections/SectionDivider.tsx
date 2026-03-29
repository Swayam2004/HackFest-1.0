import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TICKER_TEXT = 'SYSTEM_LOG: DATA_STREAM_OPEN // NO_RETREAT ';

export default function SectionDivider() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const totalWidth = el.scrollWidth / 2;

    const tl = gsap.fromTo(
      el,
      { x: 0 },
      {
        x: -totalWidth,
        ease: 'none',
        duration: 35,
        repeat: -1,
      }
    );

    return () => { tl.kill(); };
  }, []);

  const repeated = Array(8).fill(TICKER_TEXT).join('');

  return (
    <div className="bg-hack-black h-16 md:h-24 overflow-hidden flex items-center relative">
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {[repeated, repeated].map((text, i) => (
          <span
            key={i}
            className="font-body font-black text-base md:text-2xl text-hack-yellow tracking-wide uppercase pr-8 md:pr-16"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
