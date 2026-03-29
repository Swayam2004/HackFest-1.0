import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import PrimaryButton from '../ui/PrimaryButton';

export default function Register() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="register"
      className="bg-hack-yellow px-4 sm:px-8 md:px-16 py-16 md:py-32 relative"
    >
      {/* Hazard stripe border top */}
      <div className="absolute top-0 left-0 right-0 h-3 md:h-4 hazard-stripe" />

      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="bg-hack-black border-4 md:border-12 border-hack-red p-8 sm:p-12 md:p-16 lg:p-24 xl:p-36
          max-w-5xl w-full relative overflow-hidden mx-auto"
      >
        {/* Decorative QR icon bg */}
        <div
          className="absolute -top-7 -right-7 w-48 md:w-90 h-48 md:h-90 opacity-[0.08] rotate-12
            pointer-events-none font-mono text-[140px] md:text-[240px] text-hack-red leading-none
            overflow-hidden flex items-center justify-center"
        >
          ▣
        </div>

        {/* Headline */}
        <motion.div custom={0} variants={brutalistEntrance}>
          {['YOUR', 'ONLINE', 'EXISTENCE', 'AWAITS'].map((word) => (
            <div
              key={word}
              className="font-body font-black text-[40px] sm:text-[56px] md:text-[9vw] lg:text-[120px] xl:text-[160px]
                leading-[0.82] tracking-tighter uppercase text-hack-yellow"
            >
              {word}
            </div>
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div
          custom={1}
          variants={brutalistEntrance}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10"
        >
          <PrimaryButton size="lg" href="#" haptic>
            SYNC_NOW
          </PrimaryButton>

          <div className="font-mono text-xs md:text-sm text-hack-red tracking-widest leading-relaxed">
            <div>[ STATUS: WAITING_FOR_USER_INPUT ]</div>
            <div>[ UPLOAD_SPEED: UNRESTRICTED ]</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
