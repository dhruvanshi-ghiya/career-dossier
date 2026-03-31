import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let animFrame;

    const handleMouseMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x - 3, y: pos.y - 3, duration: 0.08, ease: 'power2.out' });
    };

    const updateRing = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.1;
      ringPos.y += (pos.y - ringPos.y) * 0.1;
      ring.style.transform = `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)`;
      animFrame = requestAnimationFrame(updateRing);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest && e.target.closest('a, button, .interactive')) {
        ring.classList.add('hovering');
        gsap.to(dot, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest && e.target.closest('a, button, .interactive')) {
        ring.classList.remove('hovering');
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animFrame = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
