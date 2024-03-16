import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-menu">
          <li><a href="#">About</a></li>
          <li><a href="#">Skills</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Education & Experience</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="header-content">
        <h1>Dhruvanshi Ghiya</h1>
        <p>Software Developer</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/dhruvanshi-ghiya/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/DhruvanshiGhiya" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;