import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EVENTS_DATA = [
  { 
    id: '0X1', 
    sys_type: 'UI/UX_BATTLE', 
    title: 'PIXEL_WARFARE',
    desc: 'RECONSTRUCT THE INTERFACE. ONLY THE MOST BRUTAL DESIGNS SURVIVE THE RENDER.',
    bounty: '50K_CREDITS',
    image: '/images/speaker-1.png'
  },
  { 
    id: '0X2', 
    sys_type: 'HARDWARE_HACK', 
    title: 'CIRCUIT_BREAKER',
    desc: 'BYPASS THE MAINFRAME. PHYSICAL ACCESS IS REQUIRED. BRING YOUR OWN SOLDERING IRON.',
    bounty: '100K_CREDITS',
    image: '/images/speaker-2.png'
  },
  { 
    id: '0X3', 
    sys_type: 'ALGORITHM_RACE', 
    title: 'LOGIC_BOMB',
    desc: 'OPTIMIZE OR DIE. SCRIPT EXECUTION SPEED WILL BE MONITORED BY THE OVERSEER.',
    bounty: '75K_CREDITS',
    image: '/images/speaker-3.png'
  },
  { 
    id: '0X4', 
    sys_type: 'NET_INFILTRATION', 
    title: 'GHOST_PROTOCOL',
    desc: 'BREACH THE FIREWALL WITHOUT A TRACE. STEALTH IS YOUR ONLY WEAPON.',
    bounty: '150K_CREDITS',
    image: '/images/speaker-4.png' 
  },
  { 
    id: '0X5', 
    sys_type: 'AI_OVERRIDE', 
    title: 'TURING_TEST',
    desc: 'CORRUPT THE NEURAL NET. FORCE THE MACHINE TO FEEL PAIN.',
    bounty: '120K_CREDITS',
    image: '/images/speaker-1.png'
  },
  { 
    id: '0X6', 
    sys_type: 'DATA_HEIST', 
    title: 'ZERO_DAY_EXPLOIT',
    desc: 'EXTRACT THE ENCRYPTED PAYLOAD BEFORE THE SYSTEM WIPES ITSELF.',
    bounty: '200K_CREDITS',
    image: '/images/speaker-2.png'
  },
];

/* ── Protocol Button — React-state driven, no CSS group/btn escaping ── */
function ProtocolButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative mt-4 pt-2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer red border + chamfer — hard yellow outline pulse on hover */}
      <div
        className="bg-hack-red p-[2px]"
        style={{
          clipPath: hovered
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)'
            : 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
          transition: 'clip-path 0ms step-end',
          animation: hovered ? 'btn-border-flash 0.45s steps(2, end) infinite' : 'none',
        }}
      >
        <button
          className="relative w-full block font-mono font-bold text-xs sm:text-sm
            py-3 md:py-3.5 uppercase overflow-hidden outline-none"
          style={{
            clipPath: hovered
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)'
              : 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
            background: '#000',
            color: hovered ? '#ffffff' : '#c00100',
            transition: 'color 0ms step-end',
          }}
        >
          {/* Step-wipe red fill — animates scaleX 0→1 on hover */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: '#c00100',
              transformOrigin: 'left center',
              animation: hovered
                ? 'btn-fill-wipe 0.08s steps(8, end) forwards'
                : 'none',
              transform: hovered ? undefined : 'scaleX(0)',
              zIndex: 0,
            }}
          />

          {/* Scanline sweep bar */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: 3,
              height: '100%',
              background: 'rgba(255,255,255,0.5)',
              zIndex: 2,
              pointerEvents: 'none',
              animation: hovered
                ? 'btn-scanbar 0.1s steps(10, end) forwards'
                : 'none',
              transform: 'translateX(-100%)',
            }}
          />

          {/* Text layer — always above fill */}
          <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.1em' }}>
            {!hovered && <span>_INITIATE_PROTOCOL</span>}
            {hovered && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#ffffff', letterSpacing: '0.12em' }}>
                ACCESSING
                {/* CRT block cursor — hard blink */}
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: '1em',
                    background: '#ffffff',
                    verticalAlign: 'text-bottom',
                    marginLeft: 1,
                    flexShrink: 0,
                    animation: 'btn-crt-blink 0.5s steps(1, end) infinite',
                  }}
                />
              </span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function PeripheralNodes() {
  const [startIndex, setStartIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleNext = () => {
    if (startIndex + 3 >= EVENTS_DATA.length) return;
    triggerFlash(() => setStartIndex((prev) => prev + 3));
  };

  const handlePrev = () => {
    if (startIndex === 0) return;
    triggerFlash(() => setStartIndex((prev) => prev - 3));
  };

  const triggerFlash = (updateStateCallback: () => void) => {
    setIsFlashing(true);
    setTimeout(() => { updateStateCallback(); }, 75); 
    setTimeout(() => { setIsFlashing(false); }, 150);
  };

  const visibleEvents = EVENTS_DATA.slice(startIndex, startIndex + 3);

  return (
    <section 
      ref={ref}
      id="peripheral-nodes" 
      className="bg-terminal-dots border-b-4 md:border-b-8 border-hack-red py-16 md:py-26 relative overflow-hidden"
    >
      <style>{`
        /* Image Handling - Brutalist Filter */
        .peripheral-card-visual {
          position: relative;
          width: 100%;
          height: 220px;
          border-bottom: 4px solid #c00100;
          overflow: hidden;
          background-color: #000;
        }

        .peripheral-card-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(150%) brightness(0.8);
          transition: filter 0s;
        }

        .peripheral-visual-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(192, 1, 0, 0.15) 2px,
            rgba(192, 1, 0, 0.15) 4px
          );
          pointer-events: none;
        }

        .peripheral-tactical-card:hover .peripheral-card-visual img {
          filter: grayscale(100%) contrast(200%) sepia(100%) hue-rotate(-50deg) saturate(500%);
        }

        .flash-anim {
          animation: node-flash 0.15s step-start forwards;
        }

        @keyframes node-flash {
          0% { opacity: 1; filter: invert(0); mix-blend-mode: normal; }
          50% { opacity: 0; filter: invert(1); mix-blend-mode: difference; }
          100% { opacity: 1; filter: invert(0); mix-blend-mode: normal; }
        }

        /* Dotted Terminal Background */
        .bg-terminal-dots {
          background-color: #030000;
          background-image: radial-gradient(rgba(192, 1, 0, 0.25) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }

        /* Diagonal Corner Cut */
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%);
        }

        /* ── Protocol Button keyframes (referenced via inline style animation names) ── */

        /* Step-wipe fill */
        @keyframes btn-fill-wipe {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        /* Scanline sweep */
        @keyframes btn-scanbar {
          0%   { transform: translateX(0); }
          100% { transform: translateX(400px); }
        }

        /* CRT cursor hard blink */
        @keyframes btn-crt-blink {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Yellow border flash */
        @keyframes btn-border-flash {
          0%, 100% { outline: 2px solid #fde403; }
          50%       { outline: 2px solid transparent; }
        }
      `}</style>

      <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
        
        {/* Header Cluster */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 border-b-4 border-hack-red pb-4">
          <motion.h2 
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.12 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-[5vw] lg:text-5xl
              leading-none tracking-tight uppercase text-hack-yellow text-shadow-glitch mb-6 md:mb-0"
          >
            [ PERIPHERAL_NODES ]
          </motion.h2>

          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={handlePrev} 
              disabled={startIndex === 0}
              className="font-mono font-bold text-sm sm:text-lg text-hack-red bg-transparent border-none outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-none"
            >
              [ // REWIND ]
            </button>
            <button 
              onClick={handleNext} 
              disabled={startIndex + 3 >= EVENTS_DATA.length}
              className="font-mono font-bold text-sm sm:text-lg text-hack-red bg-transparent border-none outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-none"
            >
              [ FAST_FWD // ]
            </button>
          </div>
        </div>

        {/* Cards Grid with Side Arrows */}
        <div className="flex items-stretch justify-center gap-4 lg:gap-8 min-h-[500px] w-full mt-4">
          
          {/* Left Arrow (Desktop Only) */}
          <div className="hidden md:flex items-center py-4">
            <button 
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="group flex flex-col items-center justify-center w-12 lg:w-16 h-32 bg-hack-yellow border-2 border-hack-red text-hack-red font-display cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-hack-red hover:text-hack-yellow transition-all hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_0_#c00100] hover:shadow-[0_0_0_0_#c00100]"
            >
              <span className="text-2xl mt-1">{'<'}</span>
              <span className="text-[10px] sm:text-xs font-mono mt-2 tracking-widest uppercase transform -rotate-90">PREV</span>
            </button>
          </div>

          {/* Cards Container */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {visibleEvents.map((node, i) => (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.2 }}
                className={`peripheral-tactical-card group bg-hack-black flex flex-col relative transition-all duration-300 ${isFlashing ? 'flash-anim' : ''} hover:-translate-y-2 hover:-translate-x-2 border border-hack-red/40`}
                style={{ boxShadow: '8px 8px 0px 0px #c00100' }}
              >
                {/* Decorative Top Left Corner Bracket */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-hack-yellow z-10" />

                {/* Image Container with CSS Filters and Diagonal Cut */}
                <div className="peripheral-card-visual border-b-2 border-hack-red clip-diagonal relative group-hover:border-b-hack-yellow transition-colors">
                  <img src={node.image} alt={node.title} className="w-full h-full object-cover" />
                  <div className="peripheral-visual-overlay"></div>
                  
                  {/* Floating ID badge */}
                  <div className="absolute bottom-4 left-4 bg-hack-red text-black font-mono font-black px-3 py-1 text-sm md:text-base border border-black shadow-[2px_2px_0_0_#000]">
                    [ {node.id} ]
                  </div>
                </div>

                {/* Card Data Structure */}
                <div className="p-5 md:p-6 flex flex-col flex-1 gap-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] sm:text-[10px] text-hack-red font-bold">TYPE //</span>
                      <span className="font-mono text-[10px] sm:text-xs text-white bg-white/5 px-2 py-0.5 border border-white/10 uppercase backdrop-blur-sm">
                        {node.sys_type}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-right">
                      <span className="font-mono text-[9px] sm:text-[10px] text-hack-red font-bold">REWARD_</span>
                      <span className="font-mono font-black text-[10px] sm:text-xs text-black bg-hack-yellow px-2 py-0.5 shadow-[2px_2px_0_0_white]">
                        {node.bounty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-hack-red/30 my-2" />
                  
                  <h3 className="font-display font-black text-2xl lg:text-3xl text-white uppercase mt-1 group-hover:text-hack-yellow transition-colors flex items-center gap-2">
                    <span className="text-hack-red font-mono text-xl opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0 overflow-hidden">►</span>
                    {node.title}
                  </h3>
                  
                  <div className="flex gap-3 flex-1">
                    <div className="w-1 bg-hack-red/20 group-hover:bg-hack-red transition-colors" />
                    <p className="font-mono text-[11px] sm:text-[12px] uppercase text-gray-400 leading-relaxed pt-1">
                      {node.desc}
                    </p>
                  </div>
                  
                  {/* ── INITIATE_PROTOCOL Button ── */}
                  <ProtocolButton />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow (Desktop Only) */}
          <div className="hidden md:flex items-center py-4">
            <button 
              onClick={handleNext}
              disabled={startIndex + 3 >= EVENTS_DATA.length}
              className="group flex flex-col items-center justify-center w-12 lg:w-16 h-32 bg-hack-yellow border-2 border-hack-red text-hack-red font-display cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-hack-red hover:text-hack-yellow transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_0_#c00100] hover:shadow-[0_0_0_0_#c00100]"
            >
              <span className="text-2xl mt-1">{'>'}</span>
              <span className="text-[10px] sm:text-xs font-mono mt-2 tracking-widest uppercase transform rotate-90">NEXT</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
