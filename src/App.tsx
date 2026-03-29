import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
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
import { crtFlicker } from './lib/animations';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

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
          <Navbar />
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
