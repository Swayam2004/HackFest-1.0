import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { brutalistEntrance } from '../../lib/animations';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const socials = [
    { label: 'X_PROTOCOL', href: '#' },
    { label: 'INSTA_SYNC', href: '#' },
    { label: 'DISCORD_NODE', href: '#' },
  ];

  return (
    <footer
      ref={ref}
      className="bg-hack-black border-t-8 md:border-t-12 border-hack-red pt-10 md:pt-24 pb-8 md:pb-10 px-4 sm:px-6 md:px-10 overflow-hidden relative"
    >
      {/* Main row */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-20">
        {/* Left: brand */}
        <div className="lg:col-span-6 relative self-start lg:self-end">
          {/* Ghost CYBER text */}
          <div
            className="absolute top-0 -left-1 sm:-left-4 font-body font-black text-white/5 leading-[0.85] tracking-tight select-none pointer-events-none
            text-[56px] sm:text-[120px] md:text-[16vw] xl:text-[240px]"
          >
            CYBER
          </div>

          <div className="relative pt-20 sm:pt-28 md:pt-56">
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              <motion.div custom={0} variants={brutalistEntrance}>
                <div className="font-mono text-[12px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.4em] text-hack-red uppercase mb-3 break-all">
                  SYSTEM_DIAGNOSTIC_LOG_V2.0.4_STABLE
                </div>
              </motion.div>
              <motion.div custom={1} variants={brutalistEntrance}>
                <div className="font-body font-black text-white uppercase text-xs sm:text-base md:text-lg lg:text-2xl leading-tight">
                  TECH_SOC // REWRITING_REALITY
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right: socials + info box */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row gap-5 sm:gap-8 lg:gap-12 items-stretch sm:items-end sm:justify-end">
          {/* Vertical social links */}
          <div className="flex flex-row flex-wrap gap-4 sm:gap-8 lg:gap-12 items-center sm:items-end">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="md:[writing-mode:vertical-rl] md:[text-orientation:mixed] md:rotate-180
                  font-body font-black text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-widest text-hack-yellow uppercase whitespace-nowrap
                  hover:text-hack-red transition-colors duration-50"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Info box */}
          <div className="bg-hack-red border-4 border-hack-red p-4 md:p-7 w-full sm:w-auto shrink-0">
            <div className="font-mono text-[10px] md:text-xs text-white leading-relaxed uppercase">
              <div>SECURE_ENCRYPTION_ENABLED</div>
              <div>256_BIT_AES_CONNECTED</div>
              <div>LOCATION: [ REDACTED ]</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-white/10 pt-4 md:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 opacity-50">
        <span className="font-mono text-[9px] sm:text-[10px] text-hack-yellow uppercase leading-relaxed">
          © 2024 TECH_SOC PROTOCOL
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] text-hack-yellow uppercase leading-relaxed sm:text-right">
          STAY_CONNECTED_OR_BE_DISCONNECTED
        </span>
      </div>
    </footer>
  );
}
