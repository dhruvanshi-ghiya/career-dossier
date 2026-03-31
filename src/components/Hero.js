import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);

  const nameLetters = "Dhruvanshi Ghiya".split('');

  return (
    <motion.section
      id="hero"
      className="hero"
      style={{ y, opacity, scale }}
    >
      <div className="hero-content">
        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="greeting-line" />
          <span>Hello, I'm</span>
        </motion.div>

        <h1 className="hero-name">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="hero-letter"
              initial={{ opacity: 0, y: 80, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.04,
                ease: [0.6, 0, 0.2, 1],
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="hero-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.6, 0, 0.2, 1] }}
        >
          <span className="title-accent">Software Developer</span>
          <span className="title-divider">/</span>
          <span className="title-secondary">Creative Technologist</span>
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          Crafting digital experiences with code and creativity
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <a
            href="#projects"
            className="cta-button interactive"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>View My Work</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="scroll-mouse">
          <motion.div
            className="scroll-dot"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span>Scroll</span>
      </motion.div>

      <div className="hero-orbs">
        <motion.div
          className="orb orb-1"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="orb orb-2"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="orb orb-3"
          animate={{
            x: [0, 20, -30, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.section>
  );
};

export default Hero;
