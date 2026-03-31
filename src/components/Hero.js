import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      /* Boot sequence */
      tl.fromTo('.boot-text',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .fromTo('.boot-line', 
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.2, ease: 'power2.out' }
      )
      /* Flash */
      .to('.hero-flash', { opacity: 0.9, duration: 0.06 }, '+=0.5')
      .to('.hero-flash', { opacity: 0, duration: 0.4, ease: 'power2.out' })
      /* Boot text fades */
      .to('.boot-text', { opacity: 0, y: -20, duration: 0.4 }, '-=0.2')
      /* Name SLAMS in */
      .fromTo('.hero-name-main',
        { opacity: 0, scale: 1.2, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power4.out' },
        '-=0.1'
      )
      /* Title line expands */
      .fromTo('.hero-title-line',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      /* Subtitle */
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      /* CTAs */
      .fromTo('.hero-cta-group',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      /* Scroll prompt */
      .fromTo('.hero-scroll-prompt',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.1'
      );

      /* Scroll-out: content parallaxes away */
      gsap.to(contentRef.current, {
        y: -160,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: 0.4,
        },
      });

      /* Scroll prompt fades fast */
      gsap.to('.hero-scroll-prompt', {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=15%',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Mouse parallax on hero content */
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(content, { x: cx * 18, y: cy * 12, duration: 1, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Flash overlay */}
      <div className="hero-flash" />

      {/* Boot sequence text */}
      <div className="boot-text">
        <span className="boot-line">{'>_ INITIALIZING SYSTEMS...'}</span>
        <span className="boot-line">{'>_ LOADING PORTFOLIO_MATRIX...'}</span>
        <span className="boot-line boot-ready">{'>_ READY'}</span>
      </div>

      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-name-main">
          <span className="hero-firstname">Dhruvanshi</span>
          <span className="hero-lastname">Ghiya</span>
        </h1>

        <div className="hero-title-line">
          <span className="line-accent" />
          <span className="hero-title-text">Software Developer &amp; Creative Technologist</span>
          <span className="line-accent" />
        </div>

        <p className="hero-subtitle">
          Turning curiosity into code, and code into impact.
        </p>

        <div className="hero-cta-group">
          <a
            href="#projects"
            className="cta-primary interactive"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span>{'{ Explore Missions }'}</span>
          </a>
          <a
            href="#contact"
            className="cta-secondary interactive"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span>Open Channel</span>
          </a>
        </div>
      </div>

      {/* Scroll prompt — clearly visible */}
      <div className="hero-scroll-prompt">
        <div className="scroll-line-track">
          <div className="scroll-line-fill" />
        </div>
        <span className="scroll-prompt-text">SCROLL TO BEGIN MISSION</span>
        <div className="scroll-arrows">
          <span className="scroll-arrow" />
          <span className="scroll-arrow" />
          <span className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
