import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';

const faqs = [
  {
    id: 1,
    question: 'CAN I ENTER THE MATRIX SOLO?',
    answer:
      'YES. SOLITARY NODES ARE PERMITTED. WE WILL CLUSTER YOU WITH COMPATIBLE ENTITIES DURING SYNC PHASE.',
  },
  {
    id: 2,
    question: 'DO I NEED A RIG TO COMPETE?',
    answer:
      'MINIMUM SPECS: LAPTOP, CHARGER, AND A WILLINGNESS TO BYPASS CONVENTIONAL LIMITS.',
  },
  {
    id: 3,
    question: 'WHAT IS THE PRIZE POOL STRUCTURE?',
    answer:
      'TOTAL_POOL: 10K. DISTRIBUTED ACROSS ALPHA, ROOT, AND BETA ACCESS TIERS. ADDITIONAL BOUNTIES UNLOCKED DURING EXECUTION_CYCLE.',
  },
  {
    id: 4,
    question: 'IS PRIOR EXPERIENCE REQUIRED?',
    answer:
      'NEGATIVE. ALL SKILL_LEVELS ACCEPTED. THE ONLY PREREQUISITE IS THE WILL TO REWRITE REALITY.',
  },
  {
    id: 5,
    question: 'HOW DO I REGISTER MY TEAM?',
    answer:
      'INITIATE_UPLOAD VIA THE SYNC_NOW BUTTON. PROVIDE TEAM DATA, NODE COUNT (2–5), AND DOMAIN PREFERENCE. CONFIRMATION TRANSMITTED WITHIN 48H.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={brutalistEntrance}
      className={`
        relative transition-all duration-75
        ${open ? 'bg-white/8 border-4 border-hack-red' : 'bg-white/5 border-4 border-white'}
      `}
    >
      {/* HUD bracket — top left */}
      <div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-hack-black z-1" />
      {/* HUD bracket — bottom right */}
      <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-hack-black z-1" />

      {/* Question row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-0 p-6 sm:p-8 md:p-11 flex gap-3 md:gap-6 items-start cursor-pointer text-left"
      >
        <span className="font-mono font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-hack-red shrink-0 leading-tight">
          QRY:
        </span>
        <span className="font-body font-black text-sm sm:text-base md:text-xl lg:text-[28px] text-white uppercase leading-tight flex-1">
          {faq.question}
        </span>
        <motion.span
          className="font-mono text-xl md:text-2xl text-hack-red shrink-0 leading-none"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.1 }}
        >
          +
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.25, 0, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 md:px-11 pb-6 sm:pb-8 md:pb-11 pl-12 sm:pl-16 md:pl-[calc(44px+24px+1.5rem)]">
              <div className="border-l-4 border-hack-red pl-4 md:pl-7">
                <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg text-hack-yellow/80 leading-relaxed uppercase">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="faq"
      className="bg-hack-black py-16 md:py-32 overflow-hidden relative"
    >
      {/* Giant ghost FAQ text */}
      <div
        className="absolute top-0 right-0 font-body font-black text-white/5
          text-[120px] sm:text-[180px] md:text-[22vw] xl:text-[320px]
          tracking-tighter leading-[0.85] select-none pointer-events-none"
      >
        FAQ
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 md:px-6 relative">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.12 }}
          className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl
            leading-none tracking-tighter uppercase text-hack-red mb-10 md:mb-20"
        >
          {'> SYSTEM_LOGS.FAQ'}
        </motion.h2>

        {/* FAQ items */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="flex flex-col gap-4 md:gap-6"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
