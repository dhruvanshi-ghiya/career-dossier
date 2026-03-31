import React, { useState, useEffect, useRef } from 'react';

const navItems = [
  { label: 'Mission', href: '#hero' },
  { label: 'Signal', href: '#about' },
  { label: 'Systems', href: '#skills' },
  { label: 'Missions', href: '#projects' },
  { label: 'Flight Path', href: '#experience' },
  { label: 'Comms', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) navRef.current.classList.add('visible');
    }, 600);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 250) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-logo interactive">
        <span className="logo-bracket">{'{'}</span>
        <span className="logo-text">DG</span>
        <span className="logo-bracket">{'}'}</span>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`interactive ${activeSection === item.href.slice(1) ? 'active' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
