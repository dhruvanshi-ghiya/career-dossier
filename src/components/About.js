import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);

  const words = "The signal was curiosity. A fascination with how things work beneath the surface. I'm a Software Developer who transforms that curiosity into elegant, impactful solutions — building full-stack experiences that push boundaries and leave lasting impressions.".split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section header reveal */
      gsap.fromTo('.about-section .section-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-section .section-header', start: 'top 82%' },
        }
      );

      /* Word-by-word decode on scroll */
      gsap.utils.toArray('.word-reveal').forEach((word) => {
        gsap.fromTo(word,
          { color: 'rgba(255,255,255,0.08)' },
          {
            color: '#e8e8f0',
            ease: 'none',
            scrollTrigger: { trigger: word, start: 'top 85%', end: 'top 55%', scrub: 0.5 },
          }
        );
      });

      /* Stats counter animation */
      gsap.utils.toArray('.about-stat').forEach((stat, i) => {
        gsap.fromTo(stat,
          { opacity: 0, y: 50, rotateX: -20 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.9, delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: stat, start: 'top 85%' },
          }
        );
      });

      /* Philosophy reveal */
      gsap.fromTo('.about-philosophy',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-philosophy', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Mouse parallax on header */
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(el, { x: cx * 10, y: cy * 6, duration: 0.9, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="section-header" ref={parallaxRef}>
        <span className="section-number">{'// 01 — THE SIGNAL'}</span>
        <h2>Origin Story</h2>
        <div className="header-accent-line" />
      </div>

      <div className="about-panel-content">
        <p className="about-mega-text">
          {words.map((word, i) => (
            <span key={i} className="word-reveal">{word} </span>
          ))}
        </p>
      </div>

      <div className="about-stats-row">
        <div className="about-stat">
          <span className="stat-value">3+</span>
          <span className="stat-label">Years in the Field</span>
        </div>
        <div className="about-stat">
          <span className="stat-value">10+</span>
          <span className="stat-label">Missions Completed</span>
        </div>
        <div className="about-stat">
          <span className="stat-value">5+</span>
          <span className="stat-label">Core Technologies</span>
        </div>
      </div>

      <div className="about-philosophy">
        <p>
          I believe in the power of <span className="accent-text">clean architecture</span> and{' '}
          <span className="accent-text">purposeful design</span>. Every line of code
          is a step in the mission. Every interaction is a chance to inspire.
        </p>
      </div>
    </section>
  );
};

export default About;