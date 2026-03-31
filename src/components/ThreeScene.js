import React, { useEffect, useRef } from 'react';

/* ── Pure Canvas 2D Starfield — no Three.js, maximum performance ── */
const ThreeScene = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const stars = [];
    const STAR_COUNT = 160;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        brightness: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Subtle nebula gradients */
      const grd = ctx.createRadialGradient(
        canvas.width * 0.25, canvas.height * 0.75, 0,
        canvas.width * 0.25, canvas.height * 0.75, canvas.width * 0.45
      );
      grd.addColorStop(0, 'rgba(79, 195, 247, 0.012)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grd2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.15, 0,
        canvas.width * 0.8, canvas.height * 0.15, canvas.width * 0.35
      );
      grd2.addColorStop(0, 'rgba(124, 77, 255, 0.008)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* Mouse parallax */
      const mx = (mouse.current.x - 0.5) * 2;
      const my = (mouse.current.y - 0.5) * 2;

      /* Draw stars */
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const parallaxX = mx * s.z * 25;
        const parallaxY = my * s.z * 25;
        const sx = s.x + parallaxX;
        const sy = s.y + parallaxY;

        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.brightness * (0.5 + 0.5 * twinkle);
        const size = s.size * (0.8 + 0.2 * twinkle) * (0.4 + s.z * 0.7);

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 210, 255, ${alpha})`;
        ctx.fill();

        /* Near stars get a subtle glow */
        if (s.z > 0.75) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 195, 247, ${alpha * 0.06})`;
          ctx.fill();
        }
      }

      /* Slow drift */
      for (let i = 0; i < stars.length; i++) {
        stars[i].y += 0.04 * stars[i].z;
        if (stars[i].y > canvas.height + 10) {
          stars[i].y = -10;
          stars[i].x = Math.random() * canvas.width;
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default ThreeScene;
