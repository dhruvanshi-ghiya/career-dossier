import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'SMART Center',
    location: 'Waterloo, ON',
    role: 'Software Developer',
    duration: 'Sep 2023 — Dec 2023',
    highlights: ['30% efficiency boost', '40% faster onboarding', '15% performance gain'],
  },
  {
    company: 'ThinkLP',
    location: 'Waterloo, ON',
    role: 'Software Developer / QA Specialist',
    duration: 'May 2022 — Aug 2023',
    highlights: ['20% fewer bugs', '15% less support requests', '30% code quality up'],
  },
  {
    company: 'ICAN Infotech',
    location: 'Ahmedabad, India',
    role: 'Technical Content Writer',
    duration: 'Oct 2020 — Feb 2021',
    highlights: ['20% user satisfaction', '15% performance improvement'],
  },
  {
    company: 'Royal Technosoft',
    location: 'Ahmedabad, India',
    role: 'Summer Intern',
    duration: 'Apr 2020 — Jun 2020',
    highlights: ['90% issues resolved'],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo('.experience-section .section-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.experience-section .section-header', start: 'top 82%' },
        }
      );

      /* Timeline fills as you scroll */
      gsap.fromTo('.flight-path-progress',
        { scaleY: 0 },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.flight-path', start: 'top 70%', end: 'bottom 30%', scrub: 0.3 },
        }
      );

      /* Waypoints slide in */
      gsap.utils.toArray('.waypoint').forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 84%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-number">{'// 04 — FLIGHT PATH'}</span>
        <h2>Journey Log</h2>
        <div className="header-accent-line" />
      </div>

      <div className="flight-path">
        <div className="flight-path-line">
          <div className="flight-path-progress" />
        </div>

        {experiences.map((exp, index) => (
          <div key={index} className="waypoint">
            <div className="waypoint-content">
              <span className="waypoint-duration">{exp.duration}</span>
              <h3>{exp.role}</h3>
              <h4>
                {exp.company}
                <span className="waypoint-location"> · {exp.location}</span>
              </h4>
              <div className="waypoint-badges">
                {exp.highlights.map((h, i) => (
                  <span key={i} className="waypoint-badge">{h}</span>
                ))}
              </div>
            </div>
            <div className="waypoint-node">
              <div className="waypoint-dot" />
              <div className="waypoint-pulse" />
            </div>
            <div className="waypoint-spacer" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;