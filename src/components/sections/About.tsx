import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance, staggeredSlideUp } from '../../lib/animations';
import HUDBracket from '../ui/HUDBracket';
import CountUpNumber from '../ui/CountUpNumber';

const BODY_TEXT =
  "WELCOME TO THE NEXUS. HACK_FEST IS NOT JUST AN EVENT; IT'S A COGNITIVE REWRITE. WE MERGE RAW BRUTALIST ENGINEERING WITH THE PRECISION OF DYSTOPIAN UI.";

function TypewriterText({ trigger }: { trigger: boolean }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    setDisplayed('');
    setDone(false);
    const id = setInterval(() => {
      i++;
      setDisplayed(BODY_TEXT.slice(0, i));
      if (i >= BODY_TEXT.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 28); // ms per character
    return () => clearInterval(id);
  }, [trigger]);

  return (
    <p className="font-mono font-bold italic text-sm sm:text-base md:text-lg lg:text-xl text-white uppercase leading-relaxed">
      {displayed}
      {!done && (
        <span
          className="text-hack-red"
          style={{ animation: 'tw-blink 0.6s step-start infinite' }}
        >
          ▋
        </span>
      )}
      <style>{`
        @keyframes tw-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
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
    target: 2048,
    suffix: '',
    pad: 4,
    label: 'CONNECTED_NODES',
    icon: '/images/icon-nodes.png',
  },
];

/** Sharp neon-flicker icon — alternates between 50% and 100% opacity */
function FlickerIcon({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let running = true;
    let timeout: ReturnType<typeof setTimeout>;

    const flicker = () => {
      if (!running) return;

      // Build a random sequence of flicker steps
      const steps = [1, 0.5, 1, 0.5, 1, 0.5, 1];
      let delay = 0;

      steps.forEach((opacity, i) => {
        timeout = setTimeout(() => {
          if (el) el.style.opacity = String(opacity);
        }, delay);
        // Short sharp intervals between each step
        delay += i === 0 ? 80 : 60;
      });

      // Pause then repeat at random interval (1.5–4s)
      const pause = 1500 + Math.random() * 2500;
      timeout = setTimeout(flicker, delay + pause);
    };

    // Small initial delay so not all icons flicker at once
    timeout = setTimeout(flicker, Math.random() * 1200);

    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ opacity: 1, transition: 'none' }}
      onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
    />
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="about"
      className="bg-hack-black grid grid-cols-1 md:grid-cols-2 min-h-[min(100vh-6rem,900px)] border-b-8 border-hack-black"
    >
      {/* Left col — red bg */}
      <div className="bg-hack-red md:border-r-8 border-hack-black flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative">
        {/* Ghost number */}
        <div
          className="absolute -left-10 md:-left-20 top-1/2 -translate-y-[60%]
            font-body font-black text-[100px] sm:text-[140px] md:text-[20vw] xl:text-[220px]
            text-black/20 tracking-tighter leading-[0.85] select-none pointer-events-none z-0"
        >
          01
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="relative z-[1]"
        >
          {['ANALOG', 'HEART', 'DIGITAL', 'MIND'].map((word, i) => (
            <motion.div
              key={word}
              custom={i}
              variants={brutalistEntrance}
              className="font-display font-bold text-[36px] sm:text-[48px] md:text-[6vw] xl:text-[6vw] 2xl:text-[96px]
                leading-none tracking-tight uppercase text-white"
            >
              {word}
            </motion.div>
          ))}
        </motion.div>

        {/* Black bar accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.3, ease: [0.25, 0, 0.25, 1] }}
          className="mt-6 md:mt-8 h-4 md:h-6 w-32 md:w-48 bg-hack-black relative z-[1] origin-left"
        />
      </div>

      {/* Right col — black bg */}
      <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 relative">
        {/* HUD bracket corners */}
        <HUDBracket size={48} offset={-12} color="#c00100">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col gap-6 md:gap-8"
          >
            {/* Label */}
            <motion.div custom={0} variants={brutalistEntrance}>
              <span className="font-mono font-bold text-sm md:text-base tracking-[0.4em] text-hack-red uppercase">
                {'> CORE_DIAGNOSTICS'}
              </span>
            </motion.div>

            {/* Body */}
            <motion.div custom={1} variants={brutalistEntrance}>
              <TypewriterText trigger={inView} />
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={2}
              variants={staggeredSlideUp}
              className="flex flex-col gap-4 md:gap-6 pt-4 md:pt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={staggeredSlideUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="bg-white/5 border-4 border-hack-red p-5 md:p-7 flex items-center justify-between h-20 md:h-28"
                >
                  <div>
                    {/* Animated counter */}
                    <CountUpNumber
                      target={stat.target}
                      suffix={stat.suffix}
                      pad={stat.pad}
                      duration={1.8}
                      className="font-mono font-bold text-xl sm:text-2xl md:text-3xl text-hack-red leading-none"
                    />
                    <div className="font-mono text-[10px] md:text-xs text-white/60 tracking-widest uppercase mt-1">
                      {stat.label}
                    </div>
                  </div>

                  {/* Neon-flicker icon */}
                  <FlickerIcon
                    src={stat.icon}
                    alt=""
                    className="h-7 md:h-9 w-auto"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </HUDBracket>
      </div>
    </section>
  );
}
