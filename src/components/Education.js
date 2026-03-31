import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="education" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">05</span>
        <h2>Education</h2>
        <div className="header-line" />
      </motion.div>

      <motion.div
        className="education-card glass-card"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="edu-icon">&#127891;</div>
        <div className="edu-info">
          <h3>Conestoga College</h3>
          <p className="edu-program">Software Engineering Technology (Co-op)</p>
          <p className="edu-date">Graduated April 2024</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;