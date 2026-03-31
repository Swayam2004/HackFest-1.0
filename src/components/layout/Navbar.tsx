import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from '../ui/GlitchText';

const navLinks = [
  { label: '01_ABOUT', href: '#about', section: 'about' },
  { label: '02_REGISTER', href: '#register', section: 'register' },
  { label: '03_PRIZE POOL', href: '#prize-pool', section: 'prize-pool' },
  { label: '04_EVENTS', href: '#events', section: 'events' },
  { label: '05_FAQ', href: '#faq', section: 'faq' },
];

/* ─── Blinking dot status indicator ─────────────────────────────────── */
function SysStatus() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-1.5 ml-4">
      <span
        className="inline-block w-2 h-2 rounded-full bg-green-400"
        style={{ opacity: on ? 1 : 0.2, transition: 'none' }}
      />
      <span className="font-mono text-[9px] tracking-[0.2em] text-hack-black uppercase font-bold">
        SYS.ONLINE
      </span>
    </div>
  );
}

/* ─── Desktop nav link ───────────────────────────────────────────────── */
function NavLink({ link, active }: { link: typeof navLinks[0]; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative font-display font-bold text-sm xl:text-base tracking-tight uppercase"
      style={{
        backgroundColor: hovered ? '#000' : 'transparent',
        color: hovered ? '#fde403' : active ? '#c00100' : '#000',
        padding: hovered ? '2px 6px' : '2px 6px',
        transition: 'none',
      }}
    >
      {active && !hovered ? (
        <>
          <span className="text-hack-black">[</span>
          {link.label}
          <span
            className="text-hack-red ml-0.5"
            style={{ animation: 'blink-nav 0.7s step-start infinite' }}
          >
            _
          </span>
          <span className="text-hack-black">]</span>
        </>
      ) : (
        link.label
      )}
    </a>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // IntersectionObserver to track which section is in view
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.section);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink-nav {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <nav className="relative w-full z-[100] bg-hack-yellow border-b-4 border-hack-black flex items-center justify-between px-4 py-3 md:px-6 md:py-4 lg:py-5">
        {/* Logo + status */}
        <div className="flex items-center">
          <GlitchText
            as="span"
            className="font-display font-bold text-xl md:text-3xl tracking-tighter text-hack-black leading-none"
          >
            HACK_FEST
          </GlitchText>
          <SysStatus />
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-8 xl:gap-12 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              active={activeSection === link.section}
            />
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="#register"
          className="hidden lg:inline-block bg-hack-black text-hack-yellow font-body font-black text-xs xl:text-sm tracking-widest uppercase px-6 xl:px-8 py-3"
          style={{ boxShadow: '4px 4px 0px #c00100' }}
          whileHover={{ boxShadow: '2px 2px 0px #c00100', x: 2, y: 2 }}
          whileTap={{ boxShadow: '0px 0px 0px #c00100', x: 4, y: 4 }}
          transition={{ duration: 0.04 }}
        >
          INITIATE_UPLOAD
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-[110]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <motion.span
            className="block w-7 h-[3px] bg-hack-black origin-center"
            animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-7 h-[3px] bg-hack-black"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
          <motion.span
            className="block w-7 h-[3px] bg-hack-black origin-center"
            animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.15 }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-hack-black flex flex-col items-center justify-center gap-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: [0.25, 0, 0.25, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-display font-bold text-3xl md:text-5xl tracking-tight uppercase text-hack-yellow hover:text-hack-red"
                style={{ transition: 'none' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
              >
                {activeSection === link.section ? `[ ${link.label}_ ]` : link.label}
              </motion.a>
            ))}

            <motion.a
              href="#register"
              className="mt-4 bg-hack-red text-white font-body font-black text-lg tracking-widest uppercase px-10 py-4 border-4 border-white"
              style={{ boxShadow: '8px 8px 0px #fde403' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            >
              INITIATE_UPLOAD
            </motion.a>

            {/* HUD corners */}
            <div className="absolute top-16 left-4 w-8 h-8 border-t-4 border-l-4 border-hack-red" />
            <div className="absolute bottom-8 right-4 w-8 h-8 border-b-4 border-r-4 border-hack-red" />

            {/* Status */}
            <div className="absolute bottom-8 left-4 font-mono text-[10px] tracking-[0.3em] text-hack-red uppercase">
              NAV_PROTOCOL_ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
