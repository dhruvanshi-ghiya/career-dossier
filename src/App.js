import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import ThreeScene from './components/ThreeScene';
import CursorTrail from './components/CursorTrail';
import GuideMascot from './components/GuideMascot';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* Scene accent colors per narrative act */
const SCENE_COLORS = [
  { section: 'hero', color: '#4fc3f7', glow: 'rgba(79,195,247,0.12)' },
  { section: 'about', color: '#4fc3f7', glow: 'rgba(79,195,247,0.10)' },
  { section: 'skills', color: '#7c4dff', glow: 'rgba(124,77,255,0.12)' },
  { section: 'projects', color: '#7c4dff', glow: 'rgba(124,77,255,0.10)' },
  { section: 'experience', color: '#00e5ff', glow: 'rgba(0,229,255,0.10)' },
  { section: 'education', color: '#00e5ff', glow: 'rgba(0,229,255,0.08)' },
  { section: 'contact', color: '#ff6b6b', glow: 'rgba(255,107,107,0.10)' },
];

function App() {
  const progressRef = useRef(null);

  useEffect(() => {
    /* Lenis smooth scroll */
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* Scroll progress bar */
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    /* Scene color transitions — ambient shifts as narrative progresses */
    SCENE_COLORS.forEach(({ section, color, glow }) => {
      const el = document.getElementById(section);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          document.documentElement.style.setProperty('--scene-color', color);
          document.documentElement.style.setProperty('--scene-glow', glow);
        },
        onEnterBack: () => {
          document.documentElement.style.setProperty('--scene-color', color);
          document.documentElement.style.setProperty('--scene-glow', glow);
        },
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="App">
      {/* Scroll Progress */}
      <div ref={progressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />

      {/* Ambient overlays */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />
      <div className="ambient-glow" />

      {/* Background starfield (pure Canvas 2D) */}
      <ThreeScene />

      {/* Cursor code trail */}
      <CursorTrail />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Guide mascot */}
      <GuideMascot />

      {/* Navigation */}
      <Navbar />

      {/* Narrative sections */}
      <Hero />
      <div className="section-wrapper">
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;