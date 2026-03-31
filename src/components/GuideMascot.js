import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const GuideMascot = () => {
  const bodyRef = useRef(null);
  const pupilRef = useRef(null);
  const irisRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const trackEye = useCallback(() => {
    const pupil = pupilRef.current;
    const iris = irisRef.current;
    const body = bodyRef.current;
    if (!pupil || !iris || !body) return;

    const onMove = (e) => {
      const rect = body.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 6;
      const offset = Math.min(dist / 40, 1) * maxOffset;
      const angle = Math.atan2(dy, dx);
      const px = Math.cos(angle) * offset;
      const py = Math.sin(angle) * offset;

      gsap.to(pupil, { x: px, y: py, duration: 0.12, ease: 'power2.out' });
      gsap.to(iris, { x: px * 0.6, y: py * 0.6, duration: 0.18, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const cleanup = trackEye();
    return cleanup;
  }, [trackEye]);

  /* Squish on fast scroll */
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    let scrollTimeout;
    const onScroll = () => {
      body.classList.add('squish');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => body.classList.remove('squish'), 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  /* Excitement near interactive elements */
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('.interactive, a, button')) {
        body.classList.add('excited');
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest('.interactive, a, button')) {
        body.classList.remove('excited');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <div className={`guide-mascot ${visible ? 'visible' : ''}`}>
      <div className="mascot-ring" />
      <div className="mascot-body interactive" ref={bodyRef}>
        <div className="mascot-eye">
          <div className="mascot-iris" ref={irisRef} />
          <div className="mascot-pupil" ref={pupilRef} />
        </div>
      </div>
      <div className="mascot-label">GUIDE</div>
    </div>
  );
};

export default GuideMascot;
