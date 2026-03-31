import type { Variants } from 'framer-motion';

/* ═══════════════════════════════════════════
   FRAMER MOTION VARIANTS
═══════════════════════════════════════════ */

/** Staggered section entrance — brutalist snap */
export const brutalistEntrance: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.12,
      ease: [0.25, 0, 0.75, 1],
    },
  }),
};

/** Card bolt-on reveal — slides from offset into place */
export const boltOnReveal: Variants = {
  hidden: { opacity: 0, x: -8, y: 8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.1,
      ease: [0, 0, 0.2, 1],
    },
  }),
};

/** Glitch hover for text and buttons */
export const glitchHover: Variants = {
  rest: {
    x: 0,
    textShadow: 'none',
    transition: { duration: 0.05 },
  },
  hover: {
    x: [0, 2, -2, 2, 0],
    textShadow: [
      'none',
      '2px 0 #ba1a1a, -2px 0 #00ffff',
      '-2px 0 #ba1a1a, 2px 0 #00ffff',
      '2px 0 #ba1a1a, -2px 0 #00ffff',
      'none',
    ],
    transition: {
      duration: 0.25,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};

/** Button glitch + scale on hover — hard step snap, no ease */
export const buttonGlitch: Variants = {
  rest: {
    scale: 1,
    x: 0,
    boxShadow: '12px 12px 0px 0px #000000',
    transition: { duration: 0 },
  },
  hover: {
    // Sudden 2px scale-up via step function — 0ms to 50ms window, no ease-in
    scale: 1.02,
    x: [0, 3, -2, 3, 0],
    boxShadow: '10px 10px 0px 0px #000000',
    transition: {
      scale: { duration: 0.05, ease: [1, 0, 1, 0] }, // step-end equivalent
      x: { duration: 0.05, times: [0, 0.25, 0.5, 0.75, 1], ease: 'linear' },
      boxShadow: { duration: 0 },
    },
  },
  tap: {
    scale: 0.97,
    boxShadow: '4px 4px 0px 0px #000000',
    transition: { duration: 0 },
  },
};

/** Tooltip — instant appear/disappear, 0ms transition */
export const tooltipInstant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 4,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

/** Fade-in from left */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  },
};

/** Fade-in from right */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  },
};

/** FAQ accordion expand/collapse — snap, not smooth */
export const faqExpand: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.03 },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.05 },
  },
};

/** Staggered slide-up with spring physics */
export const staggeredSlideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  }),
};

/** Scale pop-in reveal — for badges, icons */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  }),
};

/** Glitch shake — periodic jitter for hero text */
export const glitchShake: Variants = {
  idle: {
    x: 0,
    skewX: 0,
    textShadow: 'none',
  },
  glitch: {
    x: [0, -3, 5, -2, 4, 0],
    skewX: [0, -2, 3, -1, 2, 0],
    textShadow: [
      'none',
      '4px 0 #0ff, -4px 0 #ba1a1a',
      '-3px 0 #0ff, 3px 0 #ba1a1a',
      '2px 0 #0ff, -2px 0 #ba1a1a',
      '-4px 0 #0ff, 4px 0 #ba1a1a',
      'none',
    ],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

/** CRT flicker — full page on load */
export const crtFlicker: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 0.5,
      times: [0, 0.1, 0.2, 0.3, 0.4, 1],
      ease: 'easeOut',
    },
  },
};

/** Magnetic hover — buttons that subtly follow cursor */
export const magneticHover = {
  rest: { x: 0, y: 0 },
  hover: { x: 0, y: 0 },  // Actual values set programmatically
};

/** Slide up + fade entrance for sections */
export const sectionEntrance: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

/* ═══════════════════════════════════════════
   GSAP DEFAULTS
═══════════════════════════════════════════ */

export const gsapDefaults = {
  ease: 'steps(4)',   // Step-based — not smooth
  duration: 0.08,
};

export const gsapCountUp = {
  ease: 'power2.out',
  duration: 1.5,
};

export const gsapTicker = {
  ease: 'none',
  duration: 20,
  repeat: -1,
};

/** Typewriter config — character by character */
export const gsapTypewriter = {
  ease: 'steps(1)',
  stagger: 0.04,
};

/** Scanline sweep config */
export const gsapScanline = {
  ease: 'power1.inOut',
  duration: 0.8,
};
