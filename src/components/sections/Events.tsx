import { motion } from 'framer-motion';
import { competitions } from '../../data/events';
import EventVisual from '../events/EventVisual';
import PrimaryButton from '../ui/PrimaryButton';
import { brutalistEntrance } from '../../lib/animations';
import MagneticDots from '../ui/MagneticDots';
import ProtocolLink from '../ui/ProtocolLink';

export default function Events() {
  return (
    <section id="events" className="bg-hack-black border-y-4 md:border-y-8 border-hack-red py-16 md:py-24 relative overflow-hidden">
      <MagneticDots />
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-[1]">
        <p className="festival-eyebrow text-hack-yellow mb-3">CHOOSE_YOUR_CHALLENGE</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl uppercase text-hack-yellow tracking-tight text-shadow-glitch">[ Featured Events ]</h2>
        <p className="text-white/70 mt-4 mb-8 max-w-xl leading-relaxed">A glimpse of what’s ahead. Bring your ideas, sharpen your skills, and find your challenge.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-stretch">
          {competitions.filter(event => event.featured).slice(0, 3).map((event, i) => <motion.article
            key={event.id} className="festival-card group h-full flex flex-col"
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={brutalistEntrance}
            whileHover={{ x: -8, y: -8, transition: { duration: 0.2 } }}
          >
            <EventVisual visual={event.visual} code={`0${i + 1}`} />
            <div className="festival-card-content flex-1 flex flex-col justify-between">
              <div>
                {event.fee && (
                  <div className="flex items-center justify-end gap-2 flex-wrap mb-2">
                    <span className="font-mono text-xs font-bold text-hack-yellow border border-hack-yellow/40 bg-hack-yellow/10 px-2 py-0.5 tracking-wider">
                      {event.fee}
                    </span>
                  </div>
                )}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase group-hover:text-hack-yellow line-clamp-2 min-h-[3.5rem] flex items-center mb-2">{event.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-3">{event.description}</p>
              </div>
              <div className="mt-auto pt-3"><ProtocolLink href={`/events#${event.id}`}>Explore Event</ProtocolLink></div>
            </div>
          </motion.article>)}
        </div>
        <PrimaryButton href="/events" size="sm">Explore All Events →</PrimaryButton>
        <div className="mt-10 flex flex-wrap gap-6 font-mono text-sm text-hack-yellow">
          <a href="/fun-events" className="hover:underline">[ Explore Fun Events ↗ ]</a>
          <a href="/workshops" className="hover:underline">[ Browse Workshops ↗ ]</a>
        </div>
      </div>
    </section>
  );
}
