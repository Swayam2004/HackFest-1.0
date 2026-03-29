import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from '../ui/GlitchText';

const navLinks = [
  { label: '01_About', href: '#about' },
  { label: '02_Register', href: '#register' },
  { label: '03_Prize Pool', href: '#prize-pool' },
  { label: '04_Events', href: '#events' },
  { label: '05_FAQ', href: '#faq' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 bg-hack-yellow border-b-4 border-hack-black flex items-center justify-between px-4 py-3 md:px-6 md:py-4 lg:py-5">
        {/* Logo */}
        <GlitchText
          as="span"
          className="font-display font-bold text-xl md:text-3xl tracking-tighter text-hack-black leading-none"
        >
          HACK_FEST
        </GlitchText>

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display font-bold text-sm xl:text-base tracking-tight uppercase text-hack-black hover:text-hack-red transition-colors duration-50"
            >
              {link.label}
            </a>
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
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-110"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <motion.span
            className="block w-7 h-0.75 bg-hack-black origin-center"
            animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-7 h-0.75 bg-hack-black"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
          <motion.span
            className="block w-7 h-0.75 bg-hack-black origin-center"
            animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.15 }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-99 bg-hack-black flex flex-col items-center justify-center gap-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: [0.25, 0, 0.25, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-display font-bold text-3xl md:text-5xl tracking-tight uppercase text-hack-yellow hover:text-hack-red transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
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

            {/* Decorative HUD corners */}
            <div className="absolute top-16 left-4 w-8 h-8 border-t-4 border-l-4 border-hack-red" />
            <div className="absolute bottom-8 right-4 w-8 h-8 border-b-4 border-r-4 border-hack-red" />

            {/* Status text */}
            <div className="absolute bottom-8 left-4 font-mono text-[10px] tracking-[0.3em] text-hack-red uppercase">
              NAV_PROTOCOL_ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
