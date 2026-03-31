import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend Systems',
    icon: '◈',
    skills: ['React.js', 'Redux', 'JavaScript', 'HTML5', 'CSS3'],
    color: '#4fc3f7',
    status: 'ONLINE',
  },
  {
    title: 'Backend Core',
    icon: '⬡',
    skills: ['Node.js', 'SQL', 'NoSQL', 'ETL', 'REST APIs'],
    color: '#7c4dff',
    status: 'ONLINE',
  },
  {
    title: 'Infrastructure',
    icon: '◇',
    skills: ['Git', 'Linux', 'Apache', 'Salesforce', 'Unity3D'],
    color: '#ff6b6b',
    status: 'ONLINE',
  },
  {
    title: 'Languages',
    icon: '△',
    skills: ['JavaScript', 'C++', 'C#', 'Python', 'SQL'],
    color: '#ffd740',
    status: 'ONLINE',
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  const handleCardMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo('.skills-section .section-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-section .section-header', start: 'top 82%' },
        }
      );

      /* Cards power-on stagger with 3D rotation */
      gsap.utils.toArray('.skill-card-3d').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: -20, rotateY: 10 },
          {
            opacity: 1, y: 0, rotateX: 0, rotateY: 0,
            duration: 1, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );

        /* Power-on flash after card appears */
        const statusEl = card.querySelector('.card-status');
        if (statusEl) {
          gsap.fromTo(statusEl,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1, scale: 1, duration: 0.4, delay: i * 0.15 + 0.6,
              ease: 'back.out(2)',
              scrollTrigger: { trigger: card, start: 'top 88%' },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-number">{'// 02 — SYSTEMS ONLINE'}</span>
        <h2>Power Grid</h2>
        <div className="header-accent-line" />
      </div>

      <div className="skills-grid-3d">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="skill-card-3d interactive"
            onMouseMove={handleCardMouseMove}
          >
            <div className="skill-card-glow" />
            <div className="card-header-row">
              <div className="skill-card-icon" style={{ color: cat.color }}>{cat.icon}</div>
              <span className="card-status" style={{ color: cat.color }}>{cat.status}</span>
            </div>
            <h3 className="skill-card-title">{cat.title}</h3>
            <div className="skill-pill-row">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill interactive"
                  style={{ '--pill-color': cat.color }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="card-power-line" style={{ background: cat.color }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;