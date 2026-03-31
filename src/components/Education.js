import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.education-section .section-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.education-section .section-header', start: 'top 82%' },
        }
      );

      gsap.fromTo('.dossier-card',
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.dossier-card', start: 'top 82%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-number">{'// 05 — ACADEMY'}</span>
        <h2>Training Protocol</h2>
        <div className="header-accent-line" />
      </div>

      <div className="dossier-card interactive">
        <div className="dossier-stamp">CERTIFIED</div>
        <div className="dossier-icon">&#127891;</div>
        <h3>Conestoga College</h3>
        <p className="dossier-program">Software Engineering Technology (Co-op)</p>
        <p className="dossier-date">Graduated April 2024</p>
        <div className="dossier-border-glow" />
      </div>
    </section>
  );
};

export default Education;