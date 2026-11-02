import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FestivalEvent } from '../../data/events';
import { RegistrationButton } from './EventCard';

interface EventDetailsModalProps {
  event: FestivalEvent;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${event.id}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[#0c0c0c] border-4 border-hack-yellow shadow-[10px_10px_0px_#c00100] md:shadow-[14px_14px_0px_#c00100] flex flex-col overflow-hidden"
          >
            {/* Cyber HUD Brackets */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-hack-yellow pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-hack-yellow pointer-events-none" />

            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-[#181818] to-[#0c0c0c] border-b-2 border-hack-yellow/40 shrink-0">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {event.fee && (
                    <span className="font-mono text-[10px] md:text-xs font-bold text-hack-yellow border border-hack-yellow/40 bg-hack-yellow/10 px-2 py-0.5 tracking-wider">
                      {event.fee}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-xs font-bold text-hack-yellow hover:text-white border-2 border-hack-yellow hover:border-white px-3 py-1 bg-black/50 transition-colors uppercase cursor-pointer"
                  aria-label="Close dialog"
                >
                  [ ✕ ESC ]
                </button>
              </div>

              <h2
                id={`modal-title-${event.id}`}
                className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white uppercase mt-3 leading-tight tracking-tight"
              >
                {event.name}
              </h2>

              <p className="font-mono text-xs text-hack-yellow/90 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  {event.schedule.days.length
                    ? event.schedule.days.map((day) => `Day ${day}`).join(' + ')
                    : 'Day to be announced'}
                </span>
                <span>·</span>
                <span>{event.schedule.time && event.schedule.time !== 'TBA' ? `${event.schedule.time} IST` : 'Time TBA'}</span>
                {event.schedule.venue && (
                  <>
                    <span>·</span>
                    <span className="text-white/80">{event.schedule.venue}</span>
                  </>
                )}
              </p>
            </div>

            {/* Modal Body — Scrollable */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-white/85">
              {/* Overview */}
              <div>
                <h3 className="font-mono text-xs font-bold text-hack-yellow tracking-widest uppercase mb-2">
                  01 // OVERVIEW
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  {event.overview}
                </p>
              </div>

              {/* Sessions & Curriculum (if applicable) */}
              {event.sessions && event.sessions.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs font-bold text-hack-yellow tracking-widest uppercase mb-2">
                    02 // SESSIONS & TOPICS
                  </h3>
                  <ul className="list-square pl-5 space-y-1.5 text-sm sm:text-base text-white/85">
                    {event.sessions.map((session) => (
                      <li key={session}>{session}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Organizer Experience (if applicable) */}
              {event.organizerExperience && (
                <div>
                  <h3 className="font-mono text-xs font-bold text-hack-yellow tracking-widest uppercase mb-2">
                    FROM THE ORGANIZERS
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/85">
                    {event.organizerExperience}
                  </p>
                </div>
              )}

              {/* Rules & Guidelines */}
              <div>
                <h3 className="font-mono text-xs font-bold text-hack-yellow tracking-widest uppercase mb-2">
                  {event.sessions ? '03 // GUIDELINES & PREREQUISITES' : '02 // RULES & GUIDELINES'}
                </h3>
                {!event.rulesConfirmed && (
                  <p className="text-sm text-white/70 italic mb-2">
                    Final rules and guidelines to be announced by the organizers.
                  </p>
                )}
                {event.rules.length > 0 && (
                  <ul className="list-square pl-5 space-y-1.5 text-sm sm:text-base text-white/85">
                    {event.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Event Facts / Specifications */}
              <div>
                <h3 className="font-mono text-xs font-bold text-hack-yellow tracking-widest uppercase mb-3">
                  SPECIFICATIONS MATRIX
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="border border-white/20 bg-white/5 p-3">
                    <span className="font-mono text-[10px] uppercase text-hack-yellow block font-bold">
                      Participation Format
                    </span>
                    <span className="mt-1 block font-medium">
                      {event.format || 'To Be Announced'}
                    </span>
                  </div>

                  <div className="border border-white/20 bg-white/5 p-3">
                    <span className="font-mono text-[10px] uppercase text-hack-yellow block font-bold">
                      Team Size
                    </span>
                    <span className="mt-1 block font-medium">
                      {event.teamSize || 'To Be Announced'}
                    </span>
                  </div>

                  <div className="border border-white/20 bg-white/5 p-3">
                    <span className="font-mono text-[10px] uppercase text-hack-yellow block font-bold">
                      Registration Fee
                    </span>
                    <span className="mt-1 block font-bold text-hack-yellow">
                      {event.fee || 'Free / To Be Announced'}
                    </span>
                  </div>

                  <div className="border border-white/20 bg-white/5 p-3">
                    <span className="font-mono text-[10px] uppercase text-hack-yellow block font-bold">
                      Venue
                    </span>
                    <span className="mt-1 block font-medium">
                      {event.schedule.venue || 'To Be Announced'}
                    </span>
                  </div>

                  {event.sessions && (
                    <>
                      <div className="border border-white/20 bg-white/5 p-3">
                        <span className="font-mono text-[10px] uppercase text-hack-yellow block font-bold">
                          Duration
                        </span>
                        <span className="mt-1 block font-medium">
                          {event.duration || 'To Be Announced'}
                        </span>
                      </div>
                      <div className="border border-white/20 bg-white/5 p-3">
                        <span className="font-mono text-[10px] uppercase text-hack-yellow block font-bold">
                          What to Bring
                        </span>
                        <span className="mt-1 block font-medium">
                          {event.prerequisites || 'Equipment and prerequisites to be announced'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Requirements & Equipment (if specified) */}
              {event.requirements && (
                <div className="border border-hack-yellow/40 bg-hack-yellow/5 p-3 sm:p-4">
                  <span className="font-mono text-xs font-bold text-hack-yellow uppercase block mb-1">
                    Requirements & Equipment
                  </span>
                  <p className="text-sm text-white/90">{event.requirements}</p>
                </div>
              )}

              {/* Event Coordinators */}
              {event.coordinators && event.coordinators.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs font-bold text-hack-yellow tracking-widest uppercase mb-3">
                    EVENT COORDINATORS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {event.coordinators.map((coordinator) => (
                      <div key={coordinator.name} className="border border-white/20 bg-white/5 p-3">
                        <span className="font-mono text-xs font-bold text-white block uppercase">
                          {coordinator.name}
                        </span>
                        {coordinator.phone && (
                          <a
                            href={`tel:${coordinator.phone.replace(/[^0-9+]/g, '')}`}
                            className="font-mono text-xs text-hack-yellow hover:underline mt-1 inline-flex items-center gap-1"
                          >
                            <span>📞</span> {coordinator.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#121212] border-t-2 border-white/20 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="font-mono text-xs text-white/70">
                <span className="text-hack-yellow font-bold uppercase block sm:inline">
                  {event.name}
                </span>
                <span className="hidden sm:inline"> · </span>
                <span>{event.schedule.days.length ? `Days: ${event.schedule.days.join(', ')}` : 'Schedule TBA'}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 font-mono text-xs font-bold uppercase text-white/80 hover:text-white border border-white/30 hover:border-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <RegistrationButton event={event} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
