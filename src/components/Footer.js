import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p>Designed & Built by <span className="footer-name">Dhruvanshi Ghiya</span></p>
        <p className="footer-year">&copy; {new Date().getFullYear()}</p>
      </motion.div>
    </footer>
  );
};

export default Footer;