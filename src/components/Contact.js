import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="contact" ref={ref}>
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">06</span>
        <h2>Let's Work Together</h2>
        <p className="contact-subtitle">
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </p>
        <motion.a
          href="mailto:dhruvanshi.ghiya@example.com"
          className="contact-email interactive"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Say Hello &rarr;
        </motion.a>
        <div className="contact-links">
          <motion.a
            href="https://www.linkedin.com/in/dhruvanshi-ghiya/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link interactive"
            whileHover={{ y: -3 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/DhruvanshiGhiya"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link interactive"
            whileHover={{ y: -3 }}
          >
            GitHub
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;