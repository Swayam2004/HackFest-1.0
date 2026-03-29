import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';

const sponsors = [
  { name: 'NEURO_CORP', tier: 1 },
  { name: 'SYNTH_DYNE', tier: 1 },
  { name: 'VOID_LABS', tier: 1 },
  { name: 'OMEGA_OS', tier: 1 },
];

export default function Sponsors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="sponsors"
      className="bg-hack-yellow py-16 md:py-24 relative"
    >
      {/* Red tape separator at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-hack-red" />

      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 flex flex-col gap-10 md:gap-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-col items-center gap-3 md:gap-4"
        >
          {/* Hazard stripe accent */}
          <motion.div
            custom={0}
            variants={brutalistEntrance}
            className="w-16 md:w-24 h-3 md:h-4 hazard-stripe-sm"
          />
          <motion.div
            custom={1}
            variants={brutalistEntrance}
            className="font-body font-black text-xs sm:text-sm md:text-base lg:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-hack-black text-center"
          >
            Transmission_Supported_By
          </motion.div>
        </motion.div>

        {/* Sponsor grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="border-4 border-hack-black grid grid-cols-2 lg:grid-cols-4"
        >
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              custom={i}
              variants={brutalistEntrance}
              className={`
                ${i < sponsors.length - 1 ? 'border-b-4 lg:border-b-0 border-hack-black' : ''}
                ${i % 2 === 0 ? 'border-r-4 border-hack-black' : ''}
                ${i < 2 ? 'lg:border-r-4 lg:border-hack-black' : ''}
                ${i === sponsors.length - 1 ? 'lg:border-r-0' : ''}
                flex items-center justify-center
                p-6 sm:p-8 md:p-12
                h-24 sm:h-28 md:h-33
                cursor-pointer
                hover:bg-white transition-colors duration-100
              `}
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[30px] tracking-tighter text-hack-black text-center">
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
