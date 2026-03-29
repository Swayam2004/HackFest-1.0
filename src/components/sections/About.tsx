import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance, staggeredSlideUp } from '../../lib/animations';
import HUDBracket from '../ui/HUDBracket';

const stats = [
  {
    value: '48H',
    label: 'UPTIME_REQUIRED',
    icon: 'images/icon-clock.png',
  },
  {
    value: '2048',
    label: 'CONNECTED_NODES',
    icon: 'images/icon-nodes.png',
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="about"
      className="bg-hack-black grid grid-cols-1 md:grid-cols-2 min-h-[600px] lg:min-h-[960px] border-b-8 border-hack-black"
    >
      {/* Left col — red bg */}
      <div className="bg-hack-red md:border-r-8 border-hack-black flex flex-col justify-center p-10 sm:p-16 md:p-20 lg:p-24 overflow-hidden relative">
        {/* Ghost number */}
        <div
          className="absolute -left-10 md:-left-20 top-1/2 -translate-y-[60%]
            font-body font-black text-[100px] sm:text-[140px] md:text-[22vw] xl:text-[320px]
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
              className="font-display font-bold text-[40px] sm:text-[56px] md:text-[7vw] xl:text-[128px]
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
      <div className="flex flex-col justify-center p-10 sm:p-16 md:p-20 lg:p-24 relative">
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
              <p className="font-mono font-bold italic text-sm sm:text-base md:text-lg lg:text-xl text-white uppercase leading-relaxed">
                Welcome to the nexus.
                <br />
                HACK_FEST is not just an
                <br className="hidden sm:block" />
                event; it&apos;s a cognitive
                <br className="hidden sm:block" />
                rewrite. We merge raw brutalist
                <br className="hidden sm:block" />
                engineering with the precision
                <br className="hidden sm:block" />
                of dystopian UI.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={2}
              variants={staggeredSlideUp}
              className="flex flex-col gap-4 md:gap-6 pt-4 md:pt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  custom={i}
                  variants={staggeredSlideUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="bg-white/5 border-4 border-hack-red p-5 md:p-7 flex items-center justify-between h-20 md:h-28"
                >
                  <div>
                    <div className="font-mono font-bold text-xl sm:text-2xl md:text-3xl text-hack-red leading-none">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] md:text-xs text-white/60 tracking-widest uppercase mt-1">
                      {stat.label}
                    </div>
                  </div>
                  <img
                    src={stat.icon}
                    alt=""
                    className="h-7 md:h-9 w-auto opacity-80"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
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
