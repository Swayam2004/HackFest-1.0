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
      const total = 30;
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
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px"
          style={{
            left: `${rand(0, 100)}%`,
            top: `${rand(0, 100)}%`,
            height: `${rand(12, 70)}px`,
            opacity: rand(0.15, 0.6),
            backgroundColor: i % 3 === 0 ? '#00ff41' : i % 3 === 1 ? '#ffffff' : '#00ff41',
            animationName: 'particle-fall',
            animationDuration: `${rand(2, 5)}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${rand(0, 4)}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-fall {
          0%   { transform: translateY(-20px); opacity: 0; }
          20%  { opacity: 0.5; }
          80%  { opacity: 0.25; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
/* ── Cyber Tunnel Construct (Stage 1 center graphic) ────────────────────────── */
function DataConstruct({ progress }: { progress: number }) {
  const p = Math.min(progress, 1);
  const dash = (len: number) => `${len * p} ${len * (1 - p)}`;
  const G = '#00ff41'; // Neon green
  const W = '#ffffff'; // White

  // Perspective tunnel rings (Hexagons going inward)
  const rings = [140, 110, 85, 60, 40, 25];
  const hexPoints = (r: number) => {
    const w = r * 0.866;
    const h = r * 0.5;
    return `200,${200 - r} ${200 + w},${200 - h} ${200 + w},${200 + h} 200,${200 + r} ${200 - w},${200 + h} ${200 - w},${200 - h}`;
  };

  const corners = [
    (r: number) => [200, 200 - r],
    (r: number) => [200 + r * 0.866, 200 - r * 0.5],
    (r: number) => [200 + r * 0.866, 200 + r * 0.5],
    (r: number) => [200, 200 + r],
    (r: number) => [200 - r * 0.866, 200 + r * 0.5],
    (r: number) => [200 - r * 0.866, 200 - r * 0.5],
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 400 400" className="w-72 h-72 sm:w-[22rem] sm:h-[22rem] md:w-[26rem] md:h-[26rem]" fill="none">
        
        {/* ── Outer framing brackets ── */}
        <path d="M 40,20 L 20,20 L 20,40" stroke={G} strokeWidth="2" opacity={p * 0.8} />
        <path d="M 360,20 L 380,20 L 380,40" stroke={G} strokeWidth="2" opacity={p * 0.8} />
        <path d="M 20,360 L 20,380 L 40,380" stroke={G} strokeWidth="2" opacity={p * 0.8} />
        <path d="M 380,360 L 380,380 L 360,380" stroke={G} strokeWidth="2" opacity={p * 0.8} />
        
        {/* Decorative corner perspective lines */}
        <line x1="25" y1="25" x2="60" y2="60" stroke={W} strokeWidth="1" opacity={p * 0.5} />
        <line x1="375" y1="25" x2="340" y2="60" stroke={W} strokeWidth="1" opacity={p * 0.5} />
        <line x1="25" y1="375" x2="60" y2="340" stroke={W} strokeWidth="1" opacity={p * 0.5} />
        <line x1="375" y1="375" x2="340" y2="340" stroke={W} strokeWidth="1" opacity={p * 0.5} />

        {/* ── Rotating Text Ring ── */}
        <g opacity={p}>
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="25s" repeatCount="indefinite" />
          <path id="text-path" d="M 200, 200 m -175, 0 a 175,175 0 1,1 350,0 a 175,175 0 1,1 -350,0" fill="none" />
          <text fill={G} fontSize="9" fontFamily="monospace" letterSpacing="3" opacity="0.6">
            <textPath href="#text-path" startOffset="0%">
              HACK_FEST_INITIALIZATION_PROTOCOL_ACTIVE // OVERRIDE_CODE_0x7F8C // SYSTEM_BREACH_DETECTED // ACCESS_GRANTED // 
            </textPath>
          </text>
        </g>

        {/* ── Outer gear / mechanical ring ── */}
        <circle cx="200" cy="200" r="155" stroke={G} strokeWidth="1" strokeDasharray="10 15 2 15" opacity={p * 0.4}>
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="200" r="148" stroke={W} strokeWidth="0.5" strokeDasharray="3 4" opacity={p * 0.3} />

        {/* ── Tunnel Hexagons ── */}
        {rings.map((r, i) => (
          <polygon 
            key={`ring-${i}`} 
            points={hexPoints(r)} 
            stroke={i % 2 === 0 ? G : W} 
            strokeWidth={1.5 - i * 0.15} 
            opacity={p * (0.9 - i * 0.1)} 
            fill={G} 
            fillOpacity={0.03 * (rings.length - i)}
            strokeDasharray={dash(r * 6)} 
          />
        ))}

        {/* ── Perspective Edge Lines (Connecting corners) ── */}
        {corners.map((cornerFn, i) => {
          const outer = cornerFn(rings[0]);
          const inner = cornerFn(rings[rings.length - 1]);
          return (
            <line 
              key={`corner-edge-${i}`} 
              x1={outer[0]} y1={outer[1]} 
              x2={inner[0]} y2={inner[1]} 
              stroke={G} 
              strokeWidth="1" 
              opacity={p * 0.5}
            />
          );
        })}

        {/* ── Animated Data Flowing Down Tunnel ── */}
        {corners.map((cornerFn, i) => {
          const outer = cornerFn(rings[0]);
          const inner = cornerFn(rings[rings.length - 1]);
          return (
            <line 
              key={`flow-${i}`} 
              x1={outer[0]} y1={outer[1]} 
              x2={inner[0]} y2={inner[1]} 
              stroke={W} 
              strokeWidth="2.5" 
              opacity={p * 0.9}
              strokeDasharray="8 80"
              strokeDashoffset="0"
            >
              <animate attributeName="stroke-dashoffset" values="88; -20" dur={`${1 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
            </line>
          );
        })}

        {/* ── Central Eye / Core ── */}
        <circle cx="200" cy="200" r="16" stroke={G} strokeWidth="1" fill={G} fillOpacity="0.1" opacity={p} />
        <circle cx="200" cy="200" r="8" stroke={W} strokeWidth="0.5" fill="none" opacity={p * 0.8} />
        
        {/* Pulsing inner dot */}
        <circle cx="200" cy="200" r="3" fill={W} opacity={p}>
          <animate attributeName="r" values="2;5;2" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
        </circle>

        {/* ── HUD Overlay Elements ── */}
        {/* Scanning horizontal line */}
        <line x1="40" y1="200" x2="360" y2="200" stroke={G} strokeWidth="0.5" opacity={p * 0.5}>
          <animate attributeName="y1" values="40;360;40" dur="4s" keyTimes="0;0.5;1" repeatCount="indefinite" />
          <animate attributeName="y2" values="40;360;40" dur="4s" keyTimes="0;0.5;1" repeatCount="indefinite" />
        </line>
        
        <text x="35" y="195" fill={G} fontSize="7" fontFamily="monospace" opacity={p * 0.5}>
           <animate attributeName="y" values="35;355;35" dur="4s" keyTimes="0;0.5;1" repeatCount="indefinite" />
           SCANNING...
        </text>

        {/* Small Data Readouts */}
        <g opacity={p * 0.7} fontFamily="monospace" fontSize="6" fill={G}>
           <text x="25" y="60">UPLINK: SECURE</text>
           <text x="25" y="70">NODE_ID: 0x9A4</text>
           <text x="25" y="80">LATENCY: 12ms</text>

           <text x="310" y="330">CORE: STABLE</text>
           <text x="310" y="340">THROTTLING: OFF</text>
           <text x="310" y="350">FLOW_RATE: MAX</text>
        </g>
      </svg>

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#00ff41] blur-[30px] opacity-20 pointer-events-none"
        style={{ animation: 'center-glow 2s ease-in-out infinite alternate' }} />

      <style>{`
        @keyframes center-glow {
          from { opacity: 0.1; transform: translate(-50%,-50%) scale(1); }
          to   { opacity: 0.3; transform: translate(-50%,-50%) scale(1.6); }
        }
      `}</style>
    </div>
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
            animationName: 'wbar',
            animationDuration: `${0.4 + rand(0, 0.8)}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
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
        <div key={i} className="font-mono text-[9px] sm:text-[11px] leading-tight text-[#00ff41]" style={{ opacity: 0.85 }}>
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
        p = Math.min(p + 0.008, 1);
        setBpProgress(p);
        if (p >= 1) clearInterval(bp);
      }, 25);
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
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)', transition: { duration: 0.8, ease: [0.25, 0, 0.25, 1] } }}
    >
      <ParticleField />

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3 border-b border-green-900/30">
        <div className="font-mono text-[10px] sm:text-xs tracking-widest">
          {stage === 1 && <span className="text-[#00ff41]">{header1}<Cursor color="#00ff41" /></span>}
          {stage === 2 && <span className="text-hack-red">{'> SYSTEM_RESTORED :: HACK_FEST ONLINE'}</span>}
        </div>
        <div className="flex items-center gap-2">
          {[1, 2].map((s) => (
            <span key={s}
              className="font-mono text-[10px] font-black w-5 h-5 flex items-center justify-center border"
              style={{
                borderColor: s <= stage ? '#c00100' : '#333',
                color: s === stage ? '#00ff41' : s < stage ? '#c00100' : '#333',
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
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div key="s1" className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, filter: 'blur(12px)', transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}>
              <div className="font-mono text-[10px] text-[#00ff41]/50 tracking-[0.4em] uppercase mb-2">
                ASSEMBLING :: DATA_CONSTRUCT :: {Math.round(bpProgress * 100)}%
              </div>
              <DataConstruct progress={bpProgress} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 2: Logo reveal */}
        <AnimatePresence mode="wait">
          {stage === 2 && (
            <motion.div key="s2" className="flex flex-col items-center gap-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1], staggerChildren: 0.1 }}>

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
                className="font-black text-white tracking-tighter leading-none"
                style={{
                  fontFamily: '"KleemaxPro", "Kleemax Pro", sans-serif',
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
          <div className="h-full bg-hack-red" style={{ width: `${(stage / 2) * 100}%`, transition: 'width 0.6s cubic-bezier(0.25, 0, 0.25, 1)' }} />
        </div>
      </div>

      <style>{`
        @keyframes laser-draw { from{transform:scaleX(0) translateX(-50%)} to{transform:scaleX(1) translateX(0)} }
      `}</style>
    </motion.div>
  );
}
