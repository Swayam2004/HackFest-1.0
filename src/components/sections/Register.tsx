import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance, buttonGlitch } from '../../lib/animations';
import CyberBox from '../ui/CyberBox';
import HudDataChip from '../ui/HudDataChip';

/* ─── Scramble Text Hook ─────────────────────────────────────────────── */
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYz01#$%&@!?_/\\<>';

function useScramble(target: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState('');
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    const totalFrames = 18; // total scramble frames
    const startAfter = delay; // ms delay before this word starts

    const timeout = setTimeout(() => {
      const step = () => {
        frame++;
        const progress = frame / totalFrames;

        // Reveal characters from left as frames progress
        const revealed = Math.floor(progress * target.length);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          if (i < revealed) {
            out += target[i];
          } else {
            out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }
        setDisplay(out);

        if (frame < totalFrames) {
          raf.current = setTimeout(step, 40);
        } else {
          setDisplay(target);
        }
      };
      step();
    }, startAfter);

    return () => {
      clearTimeout(timeout);
      if (raf.current) clearTimeout(raf.current);
    };
  }, [trigger, target, delay]);

  return display;
}

/* ─── Scramble Word ──────────────────────────────────────────────────── */
function ScrambleWord({
  word,
  trigger,
  delay,
  isLast,
  className,
}: {
  word: string;
  trigger: boolean;
  delay: number;
  isLast?: boolean;
  className: string;
}) {
  const display = useScramble(word, trigger, delay);

  return (
    <div className={className}>
      {display || (trigger ? '' : word)}
      {isLast && (
        <span
          className="text-hack-red"
          style={{ animation: 'blink-cursor 0.7s step-start infinite' }}
        >
          _
        </span>
      )}
    </div>
  );
}

/* ─── SYNC_NOW Button ────────────────────────────────────────────────── */
function SyncNowButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex flex-row items-stretch gap-1 md:gap-2 -skew-x-12 py-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left structural bracket */}
      <div className="w-5 md:w-7 -my-3 border-y-[8px] border-l-[8px] border-hack-red opacity-0 group-hover:opacity-100 transition-none" />

      <motion.a
        href="#"
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonGlitch}
        className="inline-block"
      >
        <CyberBox
          bgClass={hovered ? 'bg-white' : 'bg-hack-red'}
          borderClass={hovered ? 'bg-hack-red' : 'bg-white'}
          borderWidth={4}
          size="sm"
          innerClassName="px-8 py-5 md:px-12 md:py-6 inline-flex items-center justify-center
            font-body font-black tracking-widest uppercase select-none whitespace-nowrap cursor-pointer
            text-xl md:text-3xl"
          style={{ color: hovered ? '#000' : '#fff' }}
        >
          SYNC_NOW
        </CyberBox>
      </motion.a>

      {/* Right structural bracket */}
      <div className="w-5 md:w-7 -my-3 border-y-[8px] border-r-[8px] border-hack-red opacity-0 group-hover:opacity-100 transition-none" />
    </div>
  );
}

/* ─── Register Section ───────────────────────────────────────────────── */
const WORDS = ['YOUR', 'ONLINE', 'EXISTENCE', 'AWAITS'];

export default function Register() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const wordClass =
    'font-body font-black text-[11vw] sm:text-[12vw] md:text-[9vw] lg:text-[10vw] xl:text-[min(10vw,140px)] leading-[0.82] tracking-tighter uppercase text-hack-yellow';

  return (
    <section
      ref={ref}
      id="register"
      className="bg-hack-yellow px-4 sm:px-8 md:px-16 py-8 md:py-16 min-h-[min(100vh-6rem,900px)] flex flex-col justify-center relative overflow-hidden"
    >
      {/* Hazard stripe border top */}
      <div className="absolute top-0 left-0 right-0 h-3 md:h-4 hazard-stripe" />

      {/* Blink keyframe */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        <CyberBox
          bgClass="bg-hack-black"
          borderClass="bg-hack-red"
          borderWidth={4}
          size="md"
          className="w-full max-w-[1400px] mx-auto"
          innerClassName="p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 relative overflow-hidden"
        >
          {/* Decorative QR icon bg */}
          <div
            className="absolute -top-7 -right-7 w-48 md:w-[360px] h-48 md:h-[360px] opacity-[0.08] rotate-12
              pointer-events-none font-mono text-[140px] md:text-[240px] text-hack-red leading-none
              overflow-hidden flex items-center justify-center"
          >
            ▣
          </div>

          {/* Headline — scramble reveal per word */}
          <motion.div custom={0} variants={brutalistEntrance} className="relative z-10">
            {WORDS.map((word, i) => (
              <ScrambleWord
                key={word}
                word={word}
                trigger={inView}
                delay={i * 180}
                isLast={i === WORDS.length - 1}
                className={wordClass}
              />
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            custom={1}
            variants={brutalistEntrance}
            className="mt-8 md:mt-16 flex flex-col items-start gap-6 lg:gap-8 relative z-10"
          >
            <SyncNowButton />

            <div className="flex flex-wrap gap-2 mt-2">
              <HudDataChip
                label="STATUS"
                value={
                  <>
                    <span className="md:hidden">INPUT_REQD</span>
                    <span className="hidden md:inline">WAITING_FOR_USER_INPUT</span>
                  </>
                }
                status="error"
                tooltip={
                  <>
                    <span className="md:hidden">PENDING</span>
                    <span className="hidden md:inline">PENDING REGISTRATION</span>
                  </>
                }
              />
              <HudDataChip
                label={
                  <>
                    <span className="md:hidden">UPLD_SPD</span>
                    <span className="hidden md:inline">UPLOAD_SPEED</span>
                  </>
                }
                value={
                  <>
                    <span className="md:hidden">MAX</span>
                    <span className="hidden md:inline">UNRESTRICTED</span>
                  </>
                }
                status="primary"
                tooltip="BANDWIDTH: MAX"
              />
            </div>
          </motion.div>
        </CyberBox>
      </motion.div>
    </section>
  );
}
