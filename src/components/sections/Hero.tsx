import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brutalistEntrance } from "../../lib/animations";
import HudDataChip from "../ui/HudDataChip";
import HudTooltip from "../ui/HudTooltip";

gsap.registerPlugin(ScrollTrigger);

const sideNavLinks = [
	{ label: "Home", href: "#hero", active: true },
	{ label: "About Us", href: "#about", active: false },
	{ label: "Register", href: "#register", active: false },
	{ label: "Prize Pool", href: "#prize-pool", active: false },
	{ label: "Events", href: "#events", active: false },
	{ label: "FAQs", href: "#faq", active: false },
];

/* ─── Static Error Box for Countdown Area ─────────────────────────── */
function ErrorBox() {
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="font-lexend font-bold text-sm md:text-[22px] text-[#c00100] tracking-[-1px] leading-tight md:leading-[31px]">
        T minus
      </span>
      <motion.div
        className="bg-[#c00100] p-1.5 md:p-[10px] shadow-[4px_4px_0px_0px_#000] md:shadow-[6px_4px_0.4px_0px_#000] w-auto flex justify-end"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="w-auto text-right">
          <span className="font-lexend font-bold text-[#ffe600] text-xs md:text-[20px] tracking-[-1px] leading-none md:leading-[31px] whitespace-nowrap tabular-nums">
            ERROR_404_TIME
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── CSS Glitch styles injected into <style> ────────────────────────── */
const glitchCSS = `
  .glitch-wrapper:hover .glitch-img {
    animation: glitch-skew 1s infinite linear alternate-reverse;
  }
  .glitch-wrapper:hover .glitch-clone {
    display: block;
  }
  .glitch-clone {
    display: none;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .glitch-clone.red {
    mix-blend-mode: multiply;
    animation: glitch-red 0.3s infinite linear alternate;
  }
  .glitch-clone.cyan {
    mix-blend-mode: screen;
    animation: glitch-cyan 0.35s infinite linear alternate;
  }

  @keyframes glitch-red {
    0%   { clip-path: inset(40% 0 20% 0); transform: translate(4px, 0); opacity: 0.7; filter: hue-rotate(-30deg) saturate(2); }
    20%  { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 1px); opacity: 0.5; }
    40%  { clip-path: inset(70% 0 5% 0);  transform: translate(5px, -1px); opacity: 0.8; filter: hue-rotate(10deg); }
    60%  { clip-path: inset(25% 0 35% 0); transform: translate(-2px, 0); opacity: 0.4; }
    80%  { clip-path: inset(55% 0 15% 0); transform: translate(3px, 1px); opacity: 0.6; filter: hue-rotate(-20deg) saturate(3); }
    100% { clip-path: inset(5% 0 80% 0);  transform: translate(-4px, 0); opacity: 0.5; }
  }

  @keyframes glitch-cyan {
    0%   { clip-path: inset(60% 0 10% 0); transform: translate(-5px, 0); opacity: 0.6; filter: hue-rotate(180deg) saturate(2); }
    25%  { clip-path: inset(15% 0 50% 0); transform: translate(3px, -1px); opacity: 0.4; }
    50%  { clip-path: inset(80% 0 2% 0);  transform: translate(-2px, 1px); opacity: 0.7; filter: hue-rotate(150deg); }
    75%  { clip-path: inset(30% 0 40% 0); transform: translate(4px, 0); opacity: 0.3; }
    100% { clip-path: inset(50% 0 20% 0); transform: translate(-3px, -1px); opacity: 0.6; filter: hue-rotate(200deg) saturate(3); }
  }

  @keyframes glitch-skew {
    0%   { filter: none; }
    20%  { filter: none; }
    21%  { filter: hue-rotate(90deg) saturate(1.5); }
    22%  { filter: none; }
    50%  { filter: none; }
    51%  { filter: brightness(1.3) contrast(1.2); }
    52%  { filter: none; }
    80%  { filter: none; }
    81%  { filter: hue-rotate(-60deg) saturate(2); }
    82%  { filter: none; }
    100% { filter: none; }
  }

  .glitch-wrapper:hover .glitch-scanline {
    display: block;
  }
  .glitch-scanline {
    display: none;
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: rgba(253, 228, 3, 0.8);
    pointer-events: none;
    z-index: 5;
    animation: glitch-scan 0.8s infinite linear;
  }
  @keyframes glitch-scan {
    0%   { top: 0%; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
`;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const textBackRef = useRef<HTMLDivElement>(null);
  const [glitchCycle, setGlitchCycle] = useState(false);

  // Periodic glitch on the HACKFEST text
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchCycle(true);
      setTimeout(() => setGlitchCycle(false), 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // GSAP parallax
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      if (characterRef.current) {
        gsap.to(characterRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (textBackRef.current) {
        gsap.to(textBackRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="bg-hack-yellow min-h-screen overflow-hidden relative"
    >
      {/* ===== HF Logo — top left ===== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.15 }}
        className="absolute top-6 md:top-8 left-6 md:left-12 z-20"
      >
        <img
          src="/images/hf-logo.svg"
          alt="HF Logo"
          className="w-20 h-auto md:w-28 md:h-auto"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
      </motion.div>

      {/* ===== Countdown Timer — top right ===== */}
      <div className="absolute top-6 md:top-8 right-6 md:right-12 z-20">
        <ErrorBox />
      </div>

      {/* ===== Side Navigation — left side (desktop & mobile) ===== */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
        }}
        className="absolute left-4 sm:left-6 md:left-[52px] top-[90px] md:top-36 z-20 flex flex-col gap-2 md:gap-[17px] w-[90px] sm:w-[100px] md:w-[127px]"
      >
        {sideNavLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            custom={i}
            variants={brutalistEntrance}
            className={`font-lexend text-xs sm:text-[14px] md:text-[18px] leading-tight transition-colors duration-100 flex items-center
              ${link.active
                ? 'text-[#df0101] font-semibold text-[14px] md:text-[20px]'
                : 'text-[#c9a102] font-light hover:text-[#df0101]'
              }`}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.nav>

      {/* ===== Central content ===== */}
      <div className="relative w-full h-screen flex items-center justify-center">

        {/* Background HACKFEST text (solid red, behind character) */}
        <div
          ref={textBackRef}
          className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+40px)] md:top-[calc(50%+60px)] -translate-y-1/2 z-[1] w-[95vw] md:w-[1147px] max-w-none pointer-events-none select-none"
        >
          <motion.img
            src="/images/hackfest-text.svg"
            alt=""
            className="w-full h-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={glitchCycle
              ? { opacity: 1, y: 0, x: [0, -3, 5, -2, 0], skewX: [0, 2, -3, 1, 0] }
              : { opacity: 1, y: 0, x: 0, skewX: 0 }
            }
            transition={glitchCycle
              ? { duration: 0.3, ease: 'linear' }
              : { delay: 0.2, duration: 0.2 }
            }
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
          />
        </div>

        {/* Character image — centered, with CSS-based cyberpunk glitch on hover */}
        <motion.div
          ref={characterRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.15, ease: [0.25, 0, 0.25, 1] }}
          className="relative z-[2] mt-8 md:mt-0 flex justify-center w-full"
        >
          {/* Inject glitch CSS */}
          <style dangerouslySetInnerHTML={{ __html: glitchCSS }} />

          {/* Wrapper tightly bounding the image to restrict hover area */}
          <div className="relative overflow-hidden inline-block cursor-pointer glitch-wrapper">
            {/* Main character image — perfectly still */}
            <img
              src="/images/hero-hacker.png"
              alt="HackFest Cyberpunk Hacker"
              className="block w-[75vw] sm:w-[55vw] md:w-[45vw] lg:w-[40vw] max-w-[693px] h-auto relative z-[1] glitch-img"
              onError={(e) => {
                (e.target as HTMLImageElement).style.background = '#333';
                (e.target as HTMLImageElement).src = '';
              }}
            />

            {/* Red channel clone — offset horizontal slices */}
            <img
              src="/images/hero-hacker.png"
              alt=""
              className="block w-[75vw] sm:w-[55vw] md:w-[45vw] lg:w-[40vw] max-w-[693px] h-auto glitch-clone red z-[2]"
              aria-hidden="true"
            />

            {/* Cyan channel clone — offset in opposite direction */}
            <img
              src="/images/hero-hacker.png"
              alt=""
              className="block w-[75vw] sm:w-[55vw] md:w-[45vw] lg:w-[40vw] max-w-[693px] h-auto glitch-clone cyan z-[3]"
              aria-hidden="true"
            />

            {/* Horizontal scanline sweep */}
            <div className="glitch-scanline" />
          </div>
        </motion.div>
      </div>

      {/* ===== Subtitle — bottom center ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.15 }}
        className="absolute bottom-10 md:bottom-16 left-0 right-0 z-20 px-4 flex flex-wrap justify-center items-center gap-x-2 text-center"
      >
        <span className="font-montserrat italic font-medium text-[#c00100] text-xs sm:text-base md:text-[28px] shrink-0">
          {'> an initiative by '}
        </span>
        <span className="font-['Super_Ground',sans-serif] font-normal text-[#c00100] text-xs sm:text-base md:text-[28px] not-italic shrink-0">
          TeCHSoC
        </span>
        <span className="font-['Super_Ground',sans-serif] font-normal text-[#c00100] text-xs sm:text-base md:text-[28px] not-italic shrink-0">
          {' , oUTr'}
        </span>
      </motion.div>

      {/* HUD — bottom-left status chip */}
      <div className="absolute bottom-4 md:bottom-8 left-6 md:left-12 flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-hack-black/50 uppercase z-20">
        <div className="w-2 h-2 bg-hack-red animate-pulse" />
        STATUS: AWAITING_DEPLOY
      </div>
    </section>
  );
}
