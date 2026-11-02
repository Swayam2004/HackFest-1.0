import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import type { FestivalEvent } from '../../data/events';
import { registrationHref } from '../../data/events';
import EventVisual from './EventVisual';
import EventDetailsModal from './EventDetailsModal';

export function RegistrationButton({ event }: { event: FestivalEvent }) {
  const href = registrationHref(event.registrationUrl);
  if (href) {
    return (
      <a className="festival-button" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Register Now for ${event.name} (opens in a new tab)`}>
        Register Now <span aria-hidden="true">↗</span>
      </a>
    );
  }

  if (event.eventType === 'workshop') {
    return (
      <span className="w-full text-center py-2.5 px-3 bg-[#111111] border-2 border-green-400 text-green-400 font-mono font-bold text-xs uppercase tracking-wider block shadow-[2px_2px_0_0_#000]">
        Open to All · Walk-in
      </span>
    );
  }

  return (
    <span className="registration-pending">Registration Coming Soon</span>
  );
}

export default function EventCard({ event, index }: { event: FestivalEvent; index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkHash = () => {
      const currentHash = window.location.hash;
      if (
        currentHash === `#${event.id}` ||
        (event.id === 'hackoutr-software' && currentHash === '#software-hackathon') ||
        (event.id === 'hackoutr-hardware' && currentHash === '#hardware-hackathon')
      ) {
        setIsModalOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [event.id]);

  const handleClose = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <motion.article
        id={event.id}
        className="festival-card h-full flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        custom={index % 3}
        variants={brutalistEntrance}
        whileHover={{ x: -8, y: -8, transition: { duration: 0.2 } }}
      >
        <EventVisual visual={event.visual} code={String(index + 1).padStart(2, '0')} />
        <div className="festival-card-content flex-1 flex flex-col justify-between">
          <div>
            {event.fee && (
              <div className="flex items-center justify-end gap-2 flex-wrap mb-2">
                <span className="font-mono text-xs font-bold text-hack-yellow border border-hack-yellow/40 bg-hack-yellow/10 px-2 py-0.5 tracking-wider">
                  {event.fee}
                </span>
              </div>
            )}
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug uppercase line-clamp-2 min-h-[3.5rem] flex items-center mb-2">
              {event.name}
            </h2>
            <p className="text-sm text-white/75 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-3">
              {event.description}
            </p>
            <p className="font-mono text-xs text-hack-yellow leading-relaxed min-h-[1.5rem] flex items-center">
              {event.schedule.days.length ? event.schedule.days.map(day => `Day ${day}`).join(' + ') : 'Day to be announced'}
              {' · '}{event.schedule.time && event.schedule.time !== 'TBA' ? `${event.schedule.time} IST` : 'Time TBA'}
            </p>
          </div>

          <div className="mt-auto pt-3 flex flex-col gap-2.5">
            {/* Trigger to view details in modal dialog without layout distortion */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left py-2.5 px-3 border border-white/20 hover:border-hack-yellow bg-white/5 hover:bg-hack-yellow/10 flex justify-between items-center text-xs font-mono font-bold text-hack-yellow hover:text-white transition-colors cursor-pointer group/btn"
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
            >
              <span>View details & specs</span>
              <span className="font-mono text-base transition-transform group-hover/btn:translate-x-1" aria-hidden="true">+</span>
            </button>

            <RegistrationButton event={event} />
          </div>

          {/* Accessible details markup preserved for semantic SSR inspection */}
          <details className="hidden" aria-hidden="true">
            <summary>View {event.sessions ? 'workshop' : 'event'} details <span aria-hidden="true">+</span></summary>
            <div className="event-details-body">
              <h3>Overview</h3>
              <p>{event.overview}</p>
              {event.sessions && <><h3>Sessions & learning</h3><ul>{event.sessions.map(session => <li key={session}>{session}</li>)}</ul></>}
              {event.organizerExperience && <><h3>From the organizers</h3><p>{event.organizerExperience}</p></>}
              <h3>Rules & guidelines</h3>
              {!event.rulesConfirmed && <p>Final rules and guidelines to be announced by the organizers.</p>}
              {event.rules.length > 0 && <ul>{event.rules.map(rule => <li key={rule}>{rule}</li>)}</ul>}
              <dl className="event-facts">
                <div><dt>Participation format</dt><dd>{event.format || 'To Be Announced'}</dd></div>
                <div><dt>Team size</dt><dd>{event.teamSize || 'To Be Announced'}</dd></div>
                <div><dt>Registration Fee</dt><dd className="text-hack-yellow font-bold">{event.fee || 'Free / To Be Announced'}</dd></div>
                <div><dt>Schedule</dt><dd>{event.schedule.days.length ? event.schedule.days.map(day => `Day ${day}`).join(' + ') : 'To Be Announced'}{event.schedule.time ? ` · ${event.schedule.time} IST` : ' · Time TBA'}</dd></div>
                <div><dt>Venue</dt><dd>{event.schedule.venue || 'To Be Announced'}</dd></div>
                {event.sessions && <>
                  <div><dt>Duration</dt><dd>{event.duration || 'To Be Announced'}</dd></div>
                  <div><dt>What to bring</dt><dd>{event.prerequisites || 'Equipment and prerequisites to be announced'}</dd></div>
                </>}
              </dl>
            </div>
          </details>
        </div>
      </motion.article>

      <EventDetailsModal event={event} isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
}
