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

function FAQItem({ 
  faq, 
  index,
  isOpen,
  onToggle
}: { 
  faq: typeof faqs[0]; 
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={brutalistEntrance}
      className={`
        relative duration-0 transition-none
        ${isOpen 
          ? 'bg-hack-red/5 border-4 border-hack-red mx-0 shadow-[8px_8px_0_0_#fde403]' 
          : 'bg-white/[0.02] border-4 border-white/20 hover:border-hack-red hover:bg-black hover:shadow-[8px_8px_0_0_#fde403] mx-0'}
      `}
    >
      {/* HUD bracket — top left */}
      <div className={`absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 z-[1] duration-0 ${isOpen ? 'border-hack-red' : 'border-white/20 group-hover:border-hack-red'}`} />
      {/* HUD bracket — bottom right */}
      <div className={`absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 z-[1] duration-0 ${isOpen ? 'border-hack-red' : 'border-white/20 group-hover:border-hack-red'}`} />

      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full bg-transparent border-0 p-6 sm:p-8 md:p-11 flex gap-3 md:gap-6 items-center cursor-pointer text-left group"
      >
        <span className={`font-mono font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0 leading-tight duration-0 ${isOpen ? 'text-hack-red' : 'text-white/40 group-hover:text-hack-red'}`}>
          QRY:
        </span>
        <span className={`font-body font-black text-sm sm:text-base md:text-xl lg:text-[28px] uppercase leading-tight flex-1 duration-0 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
          {faq.question}
        </span>
        <span className={`font-mono font-bold text-xs sm:text-sm md:text-base shrink-0 leading-none flex items-center gap-2 duration-0 ${isOpen ? 'text-hack-red' : 'text-white/40 group-hover:text-hack-red'}`}>
          {isOpen ? '[ END_QRY ]' : '[ DECRYPT ]'}
          <span className="animate-pulse">█</span>
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: (t) => Math.floor(t * 6) / 6 }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 md:px-11 pb-6 sm:pb-8 md:pb-11 pl-12 sm:pl-16 md:pl-[calc(44px+24px+1.5rem)]">
              {/* Data Ribbon */}
              <div className="border-l-2 border-dashed border-hack-red pl-4 md:pl-7">
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
  const [openId, setOpenId] = useState<number | null>(null);
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
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
