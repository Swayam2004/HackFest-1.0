import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import HUDBracket from '../ui/HUDBracket';
import CountUpNumber from '../ui/CountUpNumber';
import CyberBox from '../ui/CyberBox';

// ─── Constants ────────────────────────────────────────────────────────────────

const BODY_TEXT =
  "WELCOME TO THE NEXUS. HACK_FEST IS NOT JUST AN EVENT; IT'S A COGNITIVE REWRITE. WE MERGE RAW BRUTALIST ENGINEERING WITH THE PRECISION OF DYSTOPIAN UI.";

const WORDS = ['ANALOG', 'HEART', 'DIGITAL', 'MIND'] as const;

const stats = [
  { target: 48, suffix: 'H', pad: 0, label: 'UPTIME_REQUIRED', icon: 'clock' },
  { target: 2048, suffix: '', pad: 4, label: 'CONNECTED_NODES', icon: 'nodes' },
] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────

const slamUp = {
  hidden: { y: 48, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 900,
      damping: 60,
      delay: i * 0.06,
    },
  }),
};

const barReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: [0, 0.55, 1],
    transition: {
      duration: 0.12,
      times: [0, 0.45, 1],
      ease: 'linear',
      delay: 0.3,
    },
  },
};

const statCardEntrance = {
  hidden: { y: 32, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 55,
      delay: 0.15 + i * 0.12,
    },
  }),
};

const BLINK_STYLE = `@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }`;

// ─── TypewriterText ───────────────────────────────────────────────────────────

function TypewriterText({ trigger }: { trigger: boolean }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!trigger) return;

    if (shouldReduce) {
      setDisplayed(BODY_TEXT);
      setDone(true);
      return;
    }

    let i = 0;
    setDisplayed('');
    setDone(false);

    let doneTimeout: ReturnType<typeof setTimeout>;

    const id = setInterval(() => {
      i++;
      setDisplayed(BODY_TEXT.slice(0, i));
      if (i >= BODY_TEXT.length) {
        clearInterval(id);
        doneTimeout = setTimeout(() => setDone(true), 500);
      }
    }, 26);

    return () => {
      clearInterval(id);
      clearTimeout(doneTimeout);
    };
  }, [trigger, shouldReduce]);

  return (
    <p className="font-mono font-bold italic text-sm sm:text-base md:text-lg lg:text-xl text-white uppercase leading-relaxed">
      <style>{BLINK_STYLE}</style>
      {displayed}
      {!done && (
        <span
          className="text-hack-red"
          style={{ animation: 'tw-blink 0.6s step-start infinite' }}
          aria-hidden
        >
          ▋
        </span>
      )}
    </p>
  );
}

const stats = [
  {
    target: 48,
    suffix: 'H',
    pad: 0,
    label: 'UPTIME_REQUIRED',
    icon: '/images/icon-clock.png',
  },
  {
    target: 10,
    suffix: '',
    pad: 2,
    label: 'PROBLEM_STATEMENT',
    icon: '/images/icon-nodes.png',
  },
];

function StatIcon({ type, className }: { type: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;

    let running = true;
    const ids: ReturnType<typeof setTimeout>[] = [];

    const flicker = () => {
      if (!running) return;

      // Organic glitch: A short, rapid 'double-flutter' mimicking a twitch or CRT spark
      const seq: [number, number][] = [
        [0.4, 0],  // Drop to 40% instantly
        [1, 40],   // Snap back to 100% after 40ms
        [0.2, 50], // Deep, fast dip to 20%
        [1, 30]    // Full recovery
      ];
      let acc = 0;

      seq.forEach(([op, delay]) => {
        acc += delay;
        ids.push(
          setTimeout(() => {
            requestAnimationFrame(() => {
              if (el) el.style.opacity = String(op);
            });
          }, acc),
        );
      });

      // Glitch again anywhere from 2 to 6 seconds from now
      ids.push(setTimeout(flicker, 2000 + Math.random() * 4000));
    };

    // Stagger the initial blinks
    ids.push(setTimeout(flicker, Math.random() * 2000));

    return () => {
      running = false;
      ids.forEach(clearTimeout);
    };
  }, [shouldReduce]);

  const sharedProps = {
    ref,
    viewBox: '0 0 32 32',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    style: { color: '#c00100', opacity: 1, transition: 'none' } as React.CSSProperties,
  };

  if (type === 'clock') {
    return (
      <svg {...sharedProps}>
        <circle cx="16" cy="16" r="13" />
        <polyline points="16,8 16,16 21,21" />
        <line x1="16" y1="3" x2="16" y2="1" />
        <line x1="16" y1="31" x2="16" y2="29" />
        <line x1="3" y1="16" x2="1" y2="16" />
        <line x1="31" y1="16" x2="29" y2="16" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
      <circle cx="26" cy="6" r="2.5" fill="currentColor" />
      <circle cx="6" cy="26" r="2.5" fill="currentColor" />
      <circle cx="26" cy="26" r="2.5" fill="currentColor" />
      <line x1="16" y1="16" x2="6" y2="6" />
      <line x1="16" y1="16" x2="26" y2="6" />
      <line x1="16" y1="16" x2="6" y2="26" />
      <line x1="16" y1="16" x2="26" y2="26" />
    </svg>
  );
}

// ─── FlickerWrapper ───────────────────────────────────────────────────────────

function FlickerWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;

    let running = true;
    const ids: ReturnType<typeof setTimeout>[] = [];

    const flicker = () => {
      if (!running) return;

      // Organic glitch: A short, rapid 'double-flutter' mimicking a twitch or CRT spark
      const seq: [number, number][] = [
        [0.4, 0],  // Drop to 40% instantly
        [1, 40],   // Snap back to 100% after 40ms
        [0.2, 50], // Deep, fast dip to 20%
        [1, 30]    // Full recovery
      ];
      let acc = 0;

      seq.forEach(([op, delay]) => {
        acc += delay;
        ids.push(
          setTimeout(() => {
            requestAnimationFrame(() => {
              if (el) el.style.opacity = String(op);
            });
          }, acc),
        );
      });

      // Glitch again anywhere from 2 to 6 seconds from now
      ids.push(setTimeout(flicker, 2000 + Math.random() * 4000));
    };

    // Stagger the initial blinks so they don't blink in unison
    ids.push(setTimeout(flicker, Math.random() * 2000));

    return () => {
      running = false;
      ids.forEach(clearTimeout);
    };
  }, [shouldReduce]);

  // transition: none forces instant CSS opacity snaps
  return <div ref={ref} className={className} style={{ transition: 'none' }}>{children}</div>;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ stat, inView, index }: { stat: any; inView: boolean; index: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      custom={index}
      variants={statCardEntrance}
      className="relative cursor-default"
    >
      {/* THE HARD SHADOW: A simple div offset behind the main card */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-hack-black translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2"
        style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
      />

      {/* THE MAIN CARD: CyberBox now provides the full red outline */}
      <motion.div
        className="relative z-10"
        whileHover={
          shouldReduce
            ? {}
            : {
              x: -2,
              y: -2,
              filter: 'brightness(1.25)',
              transition: { duration: 0 },
            }
        }
      >
        <CyberBox
          bgClass="bg-hack-black"
          borderClass="bg-hack-red"
          borderWidth={4} // Thicker border for better visibility
          size="md"
          innerClassName="p-5 md:p-7 flex items-center justify-between h-20 md:h-28"
        >
          <div>
            <FlickerWrapper>
              <CountUpNumber
                target={stat.target}
                suffix={stat.suffix}
                pad={stat.pad}
                duration={1.8}
                trigger={inView}
                className="font-mono font-bold text-2xl md:text-4xl text-white leading-none"
              />
            </FlickerWrapper>
            <div className="font-mono text-[10px] md:text-xs text-white/70 tracking-widest uppercase mt-2">
              {stat.label}
            </div>
          </div>

          <StatIcon type={stat.icon} className="h-8 md:h-10 w-auto" />
        </CyberBox>
      </motion.div>
    </motion.div>
  );
}


// ─── About ────────────────────────────────────────────────────────────────────

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="about"
      className="bg-hack-black grid grid-cols-1 md:grid-cols-2 min-h-[min(100vh-6rem,900px)] border-b-8 border-hack-black"
    >
      {/* ── Left column ── */}
      <div className="bg-hack-red md:border-r-8 border-hack-black flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative">

        <div
          aria-hidden
          className="absolute -left-10 md:-left-20 top-1/2 -translate-y-[60%]
            font-body font-black text-[100px] sm:text-[140px] md:text-[20vw] xl:text-[220px]
            tracking-tighter leading-[0.85] select-none pointer-events-none z-0"
          style={{ color: '#8a0000' }}
        >
          01
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="relative z-10"
        >
          {WORDS.map((word, i) => (
            <motion.div
              key={word}
              custom={i}
              variants={shouldReduce ? brutalistEntrance : slamUp}
              className="font-display font-bold text-[36px] sm:text-[48px] md:text-[6vw] xl:text-[6vw] 2xl:text-[96px]
                leading-none tracking-tight uppercase text-white"
            >
              {word}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={shouldReduce ? { hidden: { scaleX: 0 }, visible: { scaleX: 1 } } : barReveal}
          className="mt-6 md:mt-8 h-4 md:h-6 w-32 md:w-48 bg-hack-black relative z-10 origin-left"
        />
      </div>

      {/* ── Right column ── */}
      <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 relative">
        <HUDBracket size={48} offset={-12} color="#c00100">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <motion.div custom={0} variants={shouldReduce ? brutalistEntrance : slamUp}>
              <span className="font-mono font-bold text-sm md:text-base tracking-[0.4em] text-hack-red uppercase">
                {'> CORE_DIAGNOSTICS'}
              </span>
            </motion.div>

            <motion.div custom={1} variants={shouldReduce ? brutalistEntrance : slamUp}>
              <TypewriterText trigger={inView} />
            </motion.div>

            <div className="flex flex-col gap-6 md:gap-8 pt-4 md:pt-8">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  inView={inView}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </HUDBracket>
      </div>
    </section>
  );
}