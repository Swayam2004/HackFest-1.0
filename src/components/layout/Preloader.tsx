import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ── Constants ──────────────────────────────────────────────────────── */
type Stage = 1 | 2;

const CHARS = '▓▒░█▀▄■□◆◇0123456789ABCDEF!@#$';

const STATUS_STEPS = [
  '01  BOOT_SEQUENCE............OK',
  '02  MEMORY_MAP...............OK',
  '03  INITIALIZING CORE_SYSTEMS',
  '04  LOADING NEURAL_MODULES...',
  '05  ENCRYPTION_VECTORS.......OK',
  '06  HACK_FEST SYS v1.0..READY',
];

/* ── Utilities ──────────────────────────────────────────────────────── */
function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

function useScramble(target: string, trigger: boolean, delay = 0) {
  const [val, setVal] = useState('');
  useEffect(() => {
    if (!trigger) { setVal(''); return; }
    const timeout = setTimeout(() => {
      let frame = 0;
      const total = 20;
      const id = setInterval(() => {
        frame++;
        const progress = frame / total;
        const revealed = Math.floor(progress * target.length);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          if (i < revealed) out += target[i];
          else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setVal(out);
        if (frame >= total) { setVal(target); clearInterval(id); }
      }, 50);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timeout);
  }, [trigger, target, delay]);
  return val;
}

function useTypewriter(text: string, trigger: boolean, speed = 35) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!trigger) { setOut(''); return; }
    let i = 0;
    setOut('');
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [trigger, text, speed]);
  return out;
}

/* ── Particle Field ─────────────────────────────────────────────────── */
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-hack-red"
          style={{
            left: `${rand(0, 100)}%`,
            top: `${rand(0, 100)}%`,
            height: `${rand(10, 60)}px`,
            opacity: rand(0.1, 0.4),
            animation: `particle-fall ${rand(2, 5)}s linear infinite`,
            animationDelay: `${rand(0, 4)}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-fall {
          0%   { transform: translateY(-20px); opacity: 0; }
          20%  { opacity: 0.4; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Data Construct (Stage 1 center graphic) ────────────────────────── */
function DataConstruct({ progress }: { progress: number }) {
  const p = Math.min(progress, 1);
  const dash = (len: number) => `${len * p} ${len * (1 - p)}`;

  return (
    <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-80 sm:h-80" fill="none">
      <circle cx="150" cy="150" r="120" stroke="#c00100" strokeWidth="0.5" strokeDasharray={dash(754)} opacity="0.6" />
      <circle cx="150" cy="150" r="100" stroke="#c00100" strokeWidth="0.5" strokeDasharray={dash(628)} opacity="0.3" />
      <polygon points="150,40 260,110 260,190 150,260 40,190 40,110"
        stroke="#c00100" strokeWidth="1" strokeDasharray={dash(520)} fill="none" opacity={p} />
      <polygon points="150,70 230,115 230,185 150,230 70,185 70,115"
        stroke="#c00100" strokeWidth="0.8" strokeDasharray={dash(416)} fill="none" opacity={p * 0.7} />
      <line x1="150" y1="10" x2="150" y2="60" stroke="#c00100" strokeWidth="1" opacity={p} />
      <line x1="150" y1="240" x2="150" y2="290" stroke="#c00100" strokeWidth="1" opacity={p} />
      <line x1="10" y1="150" x2="60" y2="150" stroke="#c00100" strokeWidth="1" opacity={p} />
      <line x1="240" y1="150" x2="290" y2="150" stroke="#c00100" strokeWidth="1" opacity={p} />
      <path d="M20,20 L20,50 M20,20 L50,20" stroke="#c00100" strokeWidth="1.5" opacity={p} />
      <path d="M280,20 L280,50 M280,20 L250,20" stroke="#c00100" strokeWidth="1.5" opacity={p} />
      <path d="M20,280 L20,250 M20,280 L50,280" stroke="#c00100" strokeWidth="1.5" opacity={p} />
      <path d="M280,280 L280,250 M280,280 L250,280" stroke="#c00100" strokeWidth="1.5" opacity={p} />
      {[30, 60, 120, 180, 220, 280, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + 80 * Math.cos(rad);
        const y = 150 + 80 * Math.sin(rad);
        return (
          <rect key={i} x={x - 4} y={y - 4} width="8" height="8"
            stroke="#c00100" strokeWidth="1"
            fill="none" opacity={p * (0.5 + 0.5 * Math.sin(i))} />
        );
      })}
      <circle cx="150" cy="150" r="8" stroke="#fde403" strokeWidth="1.5" fill="none" opacity={p} />
      <circle cx="150" cy="150" r="3" fill="#fde403" opacity={p} />
    </svg>
  );
}

/* ── Waveform ───────────────────────────────────────────────────────── */
function Waveform() {
  const bars = 48;
  const heights = Array.from({ length: bars }).map(() => rand(10, 100));
  return (
    <div className="flex items-end gap-[2px] h-10">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-hack-red"
          style={{
            height: `${h}%`,
            opacity: 0.5 + (h / 200),
            animation: `wbar ${0.4 + rand(0, 0.8)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.02}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes wbar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

/* ── Blinking Cursor ────────────────────────────────────────────────── */
function Cursor({ color = '#c00100' }: { color?: string }) {
  return (
    <span className="font-mono font-black ml-0.5"
      style={{ color, animation: 'cur-blink 0.65s step-start infinite' }}>
      ▋
      <style>{`@keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}

/* ── Status Footer ──────────────────────────────────────────────────── */
function StatusFooter({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-0.5">
      {lines.map((l, i) => (
        <div key={i} className="font-mono text-[9px] sm:text-[11px] leading-tight text-hack-red" style={{ opacity: 0.85 }}>
          {l}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN PRELOADER — 2 stages only
════════════════════════════════════════════════════════════════════ */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<Stage>(1);
  const [bpProgress, setBpProgress] = useState(0);
  const [statusLines, setStatusLines] = useState<string[]>([]);

  const header1 = useTypewriter('> ACCESS_PROTOCOL_ENGAGED', stage >= 1, 40);
  const hackfest = useScramble('HACK_FEST', stage === 2, 200);
  const sub1 = useScramble('AN INITIATIVE BY TECHSOC, OUTR', stage === 2, 1200);

  const addLine = useCallback((line: string) => {
    setStatusLines(prev => [...prev.slice(-6), line]);
  }, []);

  useEffect(() => {
    if (stage === 1) {
      setBpProgress(0);
      setStatusLines([]);
      let p = 0;
      const bp = setInterval(() => {
        p = Math.min(p + 0.02, 1);
        setBpProgress(p);
        if (p >= 1) clearInterval(bp);
      }, 60);
      const t1 = setTimeout(() => addLine(STATUS_STEPS[0]), 400);
      const t2 = setTimeout(() => addLine(STATUS_STEPS[1]), 800);
      const t3 = setTimeout(() => addLine(STATUS_STEPS[2]), 1300);
      const t4 = setTimeout(() => addLine(STATUS_STEPS[3]), 1800);
      const t5 = setTimeout(() => addLine(STATUS_STEPS[4]), 2300);
      const next = setTimeout(() => setStage(2), 3000);
      return () => { clearInterval(bp); [t1,t2,t3,t4,t5,next].forEach(clearTimeout); };
    }

    if (stage === 2) {
      addLine(STATUS_STEPS[5]);
      const next = setTimeout(onDone, 3000);
      return () => clearTimeout(next);
    }
  }, [stage]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-black"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <ParticleField />

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3 border-b border-red-900/30">
        <div className="font-mono text-[10px] sm:text-xs text-hack-red tracking-widest">
          {stage === 1 && <>{header1}<Cursor /></>}
          {stage === 2 && <span className="text-hack-red">{'> SYSTEM_RESTORED :: HACK_FEST ONLINE'}</span>}
        </div>
        <div className="flex items-center gap-2">
          {[1, 2].map((s) => (
            <span key={s}
              className="font-mono text-[10px] font-black w-5 h-5 flex items-center justify-center border"
              style={{
                borderColor: s <= stage ? '#c00100' : '#333',
                color: s === stage ? '#fde403' : s < stage ? '#c00100' : '#333',
                backgroundColor: s === stage ? '#1a0000' : 'transparent',
              }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center px-4">

        {/* STAGE 1: Initialization */}
        <AnimatePresence>
          {stage === 1 && (
            <motion.div key="s1" className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <div className="font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase mb-2">
                ASSEMBLING :: DATA_CONSTRUCT :: {Math.round(bpProgress * 100)}%
              </div>
              <DataConstruct progress={bpProgress} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 2: Logo reveal */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div key="s2" className="flex flex-col items-center gap-6 text-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>

              {/* Laser lines top */}
              <div className="w-full max-w-md">
                {[0, 1].map(i => (
                  <div key={i} className="h-px mb-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-transparent via-hack-red to-transparent"
                      style={{ animation: `laser-draw 0.8s linear ${i * 0.2}s both` }} />
                  </div>
                ))}
              </div>

              {/* HACK_FEST */}
              <div
                className="font-display font-black text-white tracking-tighter leading-none"
                style={{
                  fontSize: 'clamp(64px, 14vw, 130px)',
                  textShadow: '0 0 30px rgba(192,1,0,0.9), 0 0 60px rgba(192,1,0,0.5), 8px 8px 0 #c00100',
                }}
              >
                {hackfest}
              </div>

              <div className="h-1 w-40 sm:w-64 bg-hack-red" />

              {/* Subtitle */}
              <div className="font-mono text-xs sm:text-sm text-white/60 tracking-[0.3em] flex items-center gap-2">
                <span className="text-hack-red font-black">{'>'}</span>
                <span>{sub1}</span>
                <Cursor color="#fde403" />
              </div>

              {/* Waveform */}
              <div className="w-full max-w-sm mt-2">
                <Waveform />
              </div>

              {/* Laser lines bottom */}
              <div className="w-full max-w-md">
                {[0, 1].map(i => (
                  <div key={i} className="h-px mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-transparent via-hack-red to-transparent"
                      style={{ animation: `laser-draw 0.8s linear ${i * 0.2 + 0.4}s both` }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Status footer ────────────────────────────────────────── */}
      <div className="relative z-30 px-4 sm:px-8 py-3 border-t border-red-900/30">
        <StatusFooter lines={statusLines} />
        <div className="mt-2 h-px bg-white/10">
          <div className="h-full bg-hack-red" style={{ width: `${(stage / 2) * 100}%`, transition: 'width 0.3s linear' }} />
        </div>
      </div>

      <style>{`
        @keyframes laser-draw { from{transform:scaleX(0) translateX(-50%)} to{transform:scaleX(1) translateX(0)} }
      `}</style>
    </motion.div>
  );
}
