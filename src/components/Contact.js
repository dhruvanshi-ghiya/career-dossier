import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 70%',
        },
      });

      tl.fromTo('.contact-eyebrow',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.contact-heading',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.contact-desc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.contact-cta-row',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.contact-social-links',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-content">
        <div className="contact-eyebrow">{'// 06 — OPEN CHANNEL'}</div>

        <h2 className="contact-heading">
          <span className="gradient-text">Ready to</span><br />
          <span className="gradient-text">Connect?</span>
        </h2>

        <p className="contact-desc">
          Have a mission in mind or want to explore collaboration?
          Open a channel — let's build something extraordinary together.
        </p>

        <div className="contact-cta-row">
          <a
            href="mailto:dhruvanshi.ghiya@example.com"
            className="contact-email-btn interactive"
          >
            <span>{'{ Open Channel }'}</span>
          </a>
        </div>

        <div className="contact-social-links">
          <a
            href="https://www.linkedin.com/in/dhruvanshi-ghiya/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link interactive"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/DhruvanshiGhiya"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link interactive"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;