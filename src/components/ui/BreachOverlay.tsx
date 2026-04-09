import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_LINES = [
  '> INITIALIZING_BREACH_PROTOCOL...',
  '> FIREWALL_BYPASS: [██████████] 100%',
  '> ENCRYPTING NODE TRAFFIC...',
  '> SYSTEM_AUTH: [REVOKED]',
  '> HACKFEST_1.0 :: KERNEL LOADED',
  '> ALL OPERATIVES: CLOCK IS RUNNING.',
  '> BEGIN.',
];

const HEX_CHARS = '0123456789ABCDEF';
const randomHex = (len = 6) =>
  Array.from({ length: len }, () => HEX_CHARS[Math.floor(Math.random() * 16)]).join('');

interface BreachOverlayProps {
  onComplete: () => void;
}

export default function BreachOverlay({ onComplete }: BreachOverlayProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [hexFlicker, setHexFlicker] = useState('');
  const [done, setDone] = useState(false);
  const flickerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Flicker random hex in bg
    flickerRef.current = setInterval(() => {
      setHexFlicker(
        Array.from({ length: 5 }, () => randomHex(8)).join('  ')
      );
    }, 80);

    // Type lines one by one
    let lineIndex = 0;
    const typeNextLine = () => {
      if (lineIndex >= TERMINAL_LINES.length) {
        // All lines done — wait then dismiss
        if (flickerRef.current) clearInterval(flickerRef.current);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 800);
        return;
      }
      const currentLine = TERMINAL_LINES[lineIndex];
      if (currentLine !== undefined) {
        setVisibleLines(prev => [...prev, currentLine]);
      }
      lineIndex++;
      setTimeout(typeNextLine, 280 + Math.random() * 160);
    };

    const startDelay = setTimeout(typeNextLine, 400);

    return () => {
      clearTimeout(startDelay);
      if (flickerRef.current) clearInterval(flickerRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'brightness(3)' }}
          transition={{ duration: 0.08 }}
          style={{ background: 'rgba(0,0,0,0.97)' }}
        >
          {/* Scanline overlay on top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(192,1,0,0.06) 0px, rgba(192,1,0,0.06) 1px, transparent 1px, transparent 4px)',
            }}
          />

          {/* Red border frame */}
          <div className="absolute inset-4 border-2 border-hack-red pointer-events-none" />
          <div className="absolute inset-6 border border-hack-red/30 pointer-events-none" />

          {/* Corner brackets */}
          {[
            'top-4 left-4 border-t-2 border-l-2',
            'top-4 right-4 border-t-2 border-r-2',
            'bottom-4 left-4 border-b-2 border-l-2',
            'bottom-4 right-4 border-b-2 border-r-2',
          ].map((cls, i) => (
            <div key={i} className={`absolute w-8 h-8 border-hack-red ${cls}`} />
          ))}

          {/* Header */}
          <div className="absolute top-8 left-0 right-0 flex justify-center">
            <span className="font-mono text-hack-red text-xs tracking-[0.4em] uppercase animate-pulse">
              ⚠ SYSTEM_BREACH_INITIATED ⚠
            </span>
          </div>

          {/* Background hex flicker */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            <span
              className="font-mono text-hack-red/5 text-[10px] tracking-widest leading-5 text-center px-8 break-all"
              style={{ wordBreak: 'break-all' }}
            >
              {hexFlicker.repeat(80)}
            </span>
          </div>

          {/* Terminal window */}
          <div className="relative bg-black/80 border border-hack-red/60 px-6 py-5 md:px-10 md:py-8 max-w-2xl w-full mx-8">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-hack-red/30">
              <div className="w-2 h-2 bg-hack-red" />
              <span className="font-mono text-hack-red text-[10px] tracking-[0.3em] uppercase">
                root@hackfest:~#
              </span>
            </div>

            {/* Typed lines */}
            <div className="flex flex-col gap-2 min-h-[180px]">
              {visibleLines.filter(Boolean).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`font-mono text-xs md:text-sm leading-relaxed ${
                    line.includes('BEGIN') || line.includes('RUNNING')
                      ? 'text-hack-yellow font-bold tracking-widest'
                      : line.includes('REVOKED') || line.includes('BYPASS')
                      ? 'text-hack-red'
                      : 'text-white/80'
                  }`}
                >
                  {line}
                </motion.div>
              ))}

              {/* Blinking cursor at end of last line */}
              {visibleLines.length < TERMINAL_LINES.length && (
                <span
                  className="inline-block w-2 h-4 bg-hack-yellow ml-1 align-middle"
                  style={{ animation: 'btn-crt-blink 0.5s steps(1) infinite' }}
                />
              )}
            </div>
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <span className="font-mono text-hack-red/50 text-[9px] tracking-[0.5em] uppercase">
              HACKFEST_1.0 // © TeCHSoC × OUTR
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
