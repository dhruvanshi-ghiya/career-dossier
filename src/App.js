import React, { useEffect, useRef, useState } from 'react';
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

/* ═══ Time-of-day palette ═══ */
const getTimeOfDayPalette = () => {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return { name: 'morning', bg: '#0a0814', accent: '#ffb74d', glow: 'rgba(255,183,77,0.12)' };
  if (h >= 12 && h < 18) return { name: 'afternoon', bg: '#040818', accent: '#4fc3f7', glow: 'rgba(79,195,247,0.12)' };
  return { name: 'night', bg: '#030014', accent: '#7c4dff', glow: 'rgba(124,77,255,0.12)' };
};

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

/* Favicon SVG data URIs per section */
const FAVICONS = {
  hero:       'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">🚀</text></svg>',
  about:      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">🧠</text></svg>',
  skills:     'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">⚙️</text></svg>',
  projects:   'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">🧊</text></svg>',
  experience: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">📍</text></svg>',
  education:  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">🎓</text></svg>',
  contact:    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="24" font-size="24">📡</text></svg>',
};

const NAV_SECTIONS = [
  { id: 'hero', label: 'Mission' },
  { id: 'about', label: 'Signal' },
  { id: 'skills', label: 'Systems' },
  { id: 'projects', label: 'Missions' },
  { id: 'experience', label: 'Flight Path' },
  { id: 'education', label: 'Academy' },
  { id: 'contact', label: 'Comms' },
];

/* ═══ Magnetic Nav Dots Component ═══ */
const MagneticNavDots = ({ activeSection }) => {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const onMove = (e) => {
      dotsRef.current.forEach(dot => {
        if (!dot) return;
        const rect = dot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist < maxDist) {
          const pull = (1 - dist / maxDist) * 8;
          const scale = 1 + (1 - dist / maxDist) * 0.6;
          gsap.to(dot, { x: (dx / dist) * pull, y: (dy / dist) * pull, scale, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(dot, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
        }
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="mag-nav">
      {NAV_SECTIONS.map((sec, i) => (
        <div
          key={sec.id}
          ref={el => dotsRef.current[i] = el}
          className={`mag-dot ${activeSection === sec.id ? 'mag-dot-active' : ''}`}
          onClick={() => handleClick(sec.id)}
        >
          <span className="mag-dot-inner" />
          <span className="mag-dot-label">{sec.label}</span>
        </div>
      ))}
    </div>
  );
};

/* ═══ Preloader ═══ */
const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const curtainLRef = useRef(null);
  const curtainRRef = useRef(null);
  const kodaPreRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) preloaderRef.current.style.pointerEvents = 'none';
        onComplete();
      }
    });

    /* Koda preloader eye appears */
    tl.fromTo(kodaPreRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' })
      /* Blink */
      .to('.pre-lid', { scaleY: 1, duration: 0.08, ease: 'power2.in' }, '+=0.3')
      .to('.pre-lid', { scaleY: 0, duration: 0.12, ease: 'power2.out' })
      /* Look around */
      .to('.pre-pupil', { x: 5, duration: 0.3 }, '+=0.2')
      .to('.pre-pupil', { x: -4, duration: 0.4 }, '+=0.3')
      .to('.pre-pupil', { x: 0, duration: 0.3 })
      /* Text */
      .fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.3')
      /* Progress bar fills */
      .to(progressRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' })
      /* Koda excited */
      .to(kodaPreRef.current, { scale: 1.15, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 })
      /* Text changes */
      .call(() => { if (textRef.current) textRef.current.textContent = 'Ready!'; })
      /* Curtains open */
      .to(curtainLRef.current, { x: '-100%', duration: 0.8, ease: 'power3.inOut' }, '+=0.3')
      .to(curtainRRef.current, { x: '100%', duration: 0.8, ease: 'power3.inOut' }, '<')
      .to([kodaPreRef.current, textRef.current, progressRef.current?.parentElement], { opacity: 0, duration: 0.3 }, '<')
      .to(preloaderRef.current, { opacity: 0, duration: 0.3 });
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={curtainLRef} className="preloader-curtain preloader-curtain--left" />
      <div ref={curtainRRef} className="preloader-curtain preloader-curtain--right" />
      <div className="preloader-center">
        <div ref={kodaPreRef} className="preloader-koda">
          <div className="pre-eye pre-eye--left">
            <div className="pre-lid pre-lid--top" />
            <div className="pre-lid pre-lid--bot" />
            <div className="pre-iris" />
            <div className="pre-pupil" />
            <div className="pre-specular" />
          </div>
          <div className="pre-eye pre-eye--right">
            <div className="pre-lid pre-lid--top" />
            <div className="pre-lid pre-lid--bot" />
            <div className="pre-iris" />
            <div className="pre-pupil" />
            <div className="pre-specular" />
          </div>
        </div>
        <div className="preloader-progress-track">
          <div ref={progressRef} className="preloader-progress-fill" style={{ transform: 'scaleX(0)' }} />
        </div>
        <span ref={textRef} className="preloader-text" style={{ opacity: 0 }}>Loading systems...</span>
      </div>
    </div>
  );
};

function App() {
  const progressRef = useRef(null);
  const sectionWrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lastFavSection = useRef('hero');

  useEffect(() => {
    if (!loaded) return;

    /* Apply time-of-day palette */
    const palette = getTimeOfDayPalette();
    document.documentElement.style.setProperty('--bg-void', palette.bg);
    document.body.setAttribute('data-time', palette.name);

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
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });
    }

    /* Scene color transitions */
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
          setActiveSection(section);
        },
        onEnterBack: () => {
          document.documentElement.style.setProperty('--scene-color', color);
          document.documentElement.style.setProperty('--scene-glow', glow);
          setActiveSection(section);
        },
      });
    });

    /* Scroll velocity distortion */
    let lastScrollTime = Date.now();
    let lastScrollTop = 0;
    const wrapper = sectionWrapperRef.current;
    const onScrollDistort = () => {
      const now = Date.now();
      const dt = Math.max(now - lastScrollTime, 1);
      const velocity = Math.abs(window.scrollY - lastScrollTop) / dt;
      lastScrollTime = now;
      lastScrollTop = window.scrollY;
      const skew = Math.min(velocity * 1.5, 2.5);
      if (wrapper) {
        gsap.to(wrapper, { skewY: velocity > 0.3 ? skew * (window.scrollY > lastScrollTop ? 1 : -1) : 0, duration: 0.2, ease: 'power2.out' });
        gsap.to(wrapper, { skewY: 0, duration: 0.6, delay: 0.1, ease: 'power3.out', overwrite: false });
      }
    };
    window.addEventListener('scroll', onScrollDistort, { passive: true });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('scroll', onScrollDistort);
    };
  }, [loaded]);

  /* Dynamic favicon */
  useEffect(() => {
    if (activeSection === lastFavSection.current) return;
    lastFavSection.current = activeSection;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = FAVICONS[activeSection] || FAVICONS.hero;
  }, [activeSection]);

  return (
    <div className="App">
      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Scroll Progress */}
      <div ref={progressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />

      {/* Ambient overlays */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />
      <div className="ambient-glow" />

      {/* Background starfield */}
      <ThreeScene />

      {/* Cursor code trail */}
      <CursorTrail />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Guide mascot */}
      <GuideMascot />

      {/* Navigation */}
      <Navbar />

      {/* Magnetic nav dots */}
      <MagneticNavDots activeSection={activeSection} />

      {/* Narrative sections */}
      <Hero />
      <div className="section-wrapper" ref={sectionWrapperRef}>
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