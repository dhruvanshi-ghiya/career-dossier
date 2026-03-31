import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-line" />
        <p className="footer-sign-off">{'// END_TRANSMISSION'}</p>
        <p className="footer-credit">
          Designed &amp; Engineered by{' '}
          <span className="footer-name">Dhruvanshi Ghiya</span>
        </p>
        <p className="footer-year">&copy; {new Date().getFullYear()} &mdash; All Systems Nominal</p>
      </div>
    </footer>
  );
};

export default Footer;