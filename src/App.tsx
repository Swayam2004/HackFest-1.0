import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/globals.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import SectionDivider from './components/sections/SectionDivider';
import About from './components/sections/About';
import Register from './components/sections/Register';
import PrizePool from './components/sections/PrizePool';
import GuestSpeaker from './components/sections/GuestSpeaker';
import Events from './components/sections/Events';
import PeripheralNodes from './components/sections/PeripheralNodes';
import Sponsors from './components/sections/Sponsors';
import FAQs from './components/sections/FAQs';
import ScanlineOverlay from './components/ui/ScanlineOverlay';
import Preloader from './components/layout/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import { crtFlicker } from './lib/animations';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (!preloaderDone) return;
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const onScroll = () => {
      setShowNavbar(heroEl.getBoundingClientRect().bottom <= 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [preloaderDone]);

  return (
    <>
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader key="preloader" onDone={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {preloaderDone && (
        <motion.div
          variants={crtFlicker}
          initial="initial"
          animate="animate"
        >
          <ScanlineOverlay />
          <CustomCursor />

          {/* Sticky Navbar — slides in after scrolling past the hero */}
          <AnimatePresence>
            {showNavbar && (
              <motion.div
                key="navbar"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0, 0.25, 1] }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>

          <main>
            <Hero />
            <SectionDivider />
            <About />
            <Register />
            <PrizePool />
            <GuestSpeaker />
            <Events />
            <PeripheralNodes />
            <Sponsors />
            <FAQs />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
