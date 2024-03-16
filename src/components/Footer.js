import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Dhruvanshi Ghiya. All rights reserved.</p>
      <div>
        <a href="https://www.linkedin.com/in/dhruvanshi-ghiya/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/Dhruvanshi-ghiya" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;