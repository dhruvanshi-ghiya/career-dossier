import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const words = "I'm a Software Developer who thrives at the intersection of technology and creativity. With a strong foundation in full-stack development, I build elegant solutions that push boundaries and deliver exceptional user experiences.".split(' ');

  return (
    <section id="about" className="about" ref={ref}>
      <motion.div className="section-label" style={{ y }}>
        <span>01</span>
        <div className="label-line" />
        <span>About</span>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-text-reveal"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="about-large-text">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="word"
                variants={{
                  hidden: { opacity: 0.15 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </p>
        </motion.div>

        <motion.div
          className="about-details"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="about-stat">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="about-stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="about-stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Technologies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;