import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { slideFromLeft, slideFromRight, staggeredSlideUp } from '../../lib/animations';

const speakers = [
  {
    id: 'ID_001_ROOT_ACCESS',
    name: 'XENON_BYTE',
    role: 'SECURITY ARCHITECT',
    rank: 'LEGENDARY',
    cpu: '99%',
    image: 'images/speaker-1.png',
  },
  {
    id: 'ID_002_CORE_SYNC',
    name: 'NOVA_LEAK',
    role: 'DATA WHISPERER',
    rank: 'ELITE',
    cpu: '84%',
    image: 'images/speaker-2.png',
  },
];

function SpeakerCard({ speaker, index }: { speaker: typeof speakers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-hack-black border-4 border-hack-black flex flex-col relative group"
    >
      {/* Image area */}
      <div className="relative w-full aspect-square overflow-hidden border-8 md:border-16 border-hack-black -mb-4 md:-mb-8">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.background = '#333';
            el.src = '';
          }}
        />
        {/* Desaturate overlay */}
        <div className="absolute inset-0 bg-white mix-blend-saturation group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Info panel */}
      <div className="bg-white border-4 border-hack-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] p-4 md:p-6 relative z-1">
        {/* ID */}
        <div className="font-mono font-bold text-[10px] md:text-xs text-hack-red mb-1 md:mb-2 uppercase">
          {speaker.id}
        </div>

        {/* Name */}
        <div className="font-body font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-hack-black uppercase tracking-tight leading-none mb-1 md:mb-2">
          {speaker.name}
        </div>

        {/* Role */}
        <div className="font-body font-black text-xs md:text-sm text-hack-red uppercase mb-3 md:mb-4">
          {speaker.role}
        </div>

        {/* Divider + meta */}
        <div className="border-t-2 border-hack-black pt-3 md:pt-4.5 flex justify-between items-center">
          <div className="bg-hack-black px-2 py-0.5">
            <span className="font-mono text-[8px] md:text-[10px] text-white uppercase">
              RANK: {speaker.rank}
            </span>
          </div>
          <span className="font-mono text-[8px] md:text-[10px] text-hack-black uppercase">
            CPU_LOAD: {speaker.cpu}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GuestSpeaker() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="speakers"
      className="bg-hack-yellow py-16 md:py-24 px-4 md:px-6"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.12 }}
          className="font-display font-bold text-[36px] sm:text-[48px] md:text-[7vw] lg:text-[100px] xl:text-[128px]
            leading-[0.85] tracking-tighter uppercase text-hack-black mb-10 md:mb-20"
        >
          GUEST ENTITIES
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
          ))}

          {/* Placeholder card */}
          <motion.div
            custom={2}
            variants={staggeredSlideUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="border-4 md:border-[6px] border-dashed border-black/20 flex flex-col items-center justify-center
              p-10 md:p-14 min-h-75 md:min-h-100"
          >
            <img
              src="images/placeholder-speaker.png"
              alt=""
              className="w-16 md:w-22 h-auto mb-4 opacity-40"
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
            <div className="font-body font-black text-sm md:text-base text-black/30 uppercase text-center tracking-wider">
              Next_Signal_Pending...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
