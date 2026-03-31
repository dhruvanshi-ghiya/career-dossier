import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    company: 'SMART Center',
    location: 'Waterloo, ON',
    role: 'Software Developer',
    duration: 'Sep 2023 - Dec 2023',
    highlights: [
      '30% increase in overall efficiency',
      '40% faster onboarding with documentation',
      '15% improvement in software performance',
    ],
  },
  {
    company: 'ThinkLP',
    location: 'Waterloo, ON',
    role: 'Software Developer / QA Specialist',
    duration: 'May 2022 - Aug 2023',
    highlights: [
      '20% decline in software bugs',
      '15% decrease in user support requests',
      '30% increase in code quality',
    ],
  },
  {
    company: 'ICAN Infotech',
    location: 'Ahmedabad, India',
    role: 'Technical Content Writer',
    duration: 'Oct 2020 - Feb 2021',
    highlights: [
      '20% increase in user satisfaction',
      '15% product performance improvement',
    ],
  },
  {
    company: 'Royal Technosoft',
    location: 'Ahmedabad, India',
    role: 'Summer Intern',
    duration: 'Apr 2020 - Jun 2020',
    highlights: [
      '90% technical issues resolved',
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <section id="experience" className="experience" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">04</span>
        <h2>Experience</h2>
        <div className="header-line" />
      </motion.div>

      <div className="timeline">
        <div className="timeline-track">
          <motion.div className="timeline-fill" style={{ height: lineHeight }} />
        </div>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content glass-card">
              <span className="timeline-duration">{exp.duration}</span>
              <h3>{exp.role}</h3>
              <h4>{exp.company} <span className="location">&bull; {exp.location}</span></h4>
              <div className="timeline-highlights">
                {exp.highlights.map((h, i) => (
                  <span key={i} className="timeline-badge">{h}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;