import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brutalistEntrance, glitchShake } from '../../lib/animations';
import MatrixRain from '../ui/MatrixRain';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [glitchCycle, setGlitchCycle] = useState(false);

  // Periodic glitch effect on hero text
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchCycle(true);
      setTimeout(() => setGlitchCycle(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      if (headline1Ref.current) {
        gsap.to(headline1Ref.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (ghostRef.current) {
        gsap.to(ghostRef.current, {
          y: -40,
          x: 30,
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

  const words = ['COMING', 'SOON'];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="bg-hack-yellow min-h-screen overflow-hidden relative pt-16 md:pt-20"
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Ghost background text */}
      <div
        ref={ghostRef}
        className="absolute -top-16 -left-50 -right-50 opacity-10 pointer-events-none
          font-display font-bold text-[120px] sm:text-[18vw] xl:text-[320px] tracking-tighter leading-[0.85] text-hack-black whitespace-nowrap select-none"
      >
        HACK_SYSTEM
      </div>

      {/* Scaffolding elements */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* Left vertical line + dot */}
        <div className="absolute left-10 top-40 w-px h-64 bg-black/20" />
        <div className="absolute left-6 top-40 w-2 h-2 bg-hack-red" />
        {/* Right vertical line + dot */}
        <div className="absolute right-10 bottom-40 w-px h-64 bg-black/20" />
        <div className="absolute right-6 bottom-40 w-2 h-2 bg-hack-red" />
        {/* Vertical label */}
        <div
          className="absolute left-10.5 top-1/2 -translate-y-1/2 -rotate-90 origin-center
            font-mono text-[10px] tracking-[5px] text-black/40 whitespace-nowrap"
        >
          SYSTEM_AUTH_REQUIRED_V.2.0.4
        </div>
      </div>

      {/* Main content area */}
      <div className="absolute top-1/2 left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 -translate-y-[45%]
        flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">

        {/* Left text */}
        <div ref={headline1Ref} className="shrink-0 w-full md:max-w-[55%]">
          {/* COMING SOON headline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {words.map((word, i) => (
              <motion.div
                key={word}
                custom={i}
                variants={brutalistEntrance}
                animate={glitchCycle ? 'glitch' : 'idle'}
              >
                <motion.div
                  variants={glitchShake}
                  animate={glitchCycle ? 'glitch' : 'idle'}
                  className="font-display font-bold text-[60px] sm:text-[80px] md:text-[10vw] xl:text-[192px]
                    leading-[0.88] tracking-tighter uppercase text-hack-red text-shadow-glitch"
                >
                  {word}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* WE_CREATE_THE_FUTURE skewed badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.1 }}
            className="mt-6 md:mt-10"
          >
            <div className="inline-block -skew-x-12">
              <div className="bg-hack-black p-4 md:p-6 shadow-[8px_8px_0px_#c00100]">
                <span className="font-body font-black text-xs sm:text-sm md:text-base lg:text-xl text-white uppercase whitespace-nowrap block skew-x-12">
                  WE_CREATE_THE_FUTURE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Character image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.12 }}
          className="shrink-0 relative w-65 sm:w-75 md:w-[38vw] lg:max-w-130"
        >
          {/* Dashed outer border */}
          <div className="absolute -inset-4 border-2 border-dashed border-black/30 pointer-events-none z-0 hidden sm:block" />

          {/* Image block */}
          <div className="relative border-4 md:border-8 border-hack-black shadow-[12px_12px_0px_#000] md:shadow-[20px_20px_0px_#000] aspect-square overflow-hidden z-1">
            <img
              src="images/hero-character.png"
              alt="HackFest Hero"
              className="w-full h-full object-cover saturate-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.background = '#333';
                (e.target as HTMLImageElement).src = '';
              }}
            />
            {/* Desaturate overlay */}
            <div className="absolute inset-0 bg-white mix-blend-saturation" />
          </div>

          {/* ROOT_ACCESS GRANTED badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 bg-hack-red border-2 md:border-4 border-hack-black
              p-3 md:p-5 shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] z-2"
          >
            <div className="font-body font-black text-xs sm:text-sm md:text-base lg:text-xl text-white uppercase leading-tight tracking-tight">
              ROOT_ACCESS
              <br />
              GRANTED
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* HUD — top right coordinates */}
      <div className="absolute top-20 md:top-24 right-4 md:right-6 font-mono text-[10px] tracking-[0.2em] text-black/50 uppercase leading-relaxed hidden sm:block">
        <div>LAT: 20.2961° N</div>
        <div>LON: 85.8245° E</div>
        <div>SYS: ONLINE</div>
      </div>

      {/* HUD — bottom left status chip */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-16 flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-hack-black uppercase">
        <div className="w-2 h-2 bg-hack-red animate-pulse" />
        STATUS: AWAITING_DEPLOY
      </div>
    </section>
  );
}
