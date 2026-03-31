import React, { useEffect, useRef } from 'react';

/*
  Starfield Canvas with:
  - Time-of-day palette (morning/afternoon/night)
  - GPU-like warp speed effect on section transitions
  - Mouse parallax
*/
const ThreeScene = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const stars = [];
    const STAR_COUNT = 180;
    let warpSpeed = 0;       // 0 = normal, 1 = full warp
    let warpTarget = 0;
    let lastSection = 'hero';

    /* Time-of-day palette */
    const hour = new Date().getHours();
    let palette;
    if (hour >= 6 && hour < 12) {
      palette = { nebula1: 'rgba(255,183,77,0.015)', nebula2: 'rgba(255,138,101,0.01)', starColor: [255, 230, 200] };
    } else if (hour >= 12 && hour < 18) {
      palette = { nebula1: 'rgba(79,195,247,0.012)', nebula2: 'rgba(0,229,255,0.008)', starColor: [200, 220, 255] };
    } else {
      palette = { nebula1: 'rgba(79,195,247,0.012)', nebula2: 'rgba(124,77,255,0.008)', starColor: [190, 210, 255] };
    }

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * 2 - 0.5,   // normalized -0.5 to 1.5
        y: Math.random() * 2 - 0.5,
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

    /* Listen for section changes to trigger warp */
    const resetWarp = () => { warpTarget = 0; };
    const onScroll = () => {
      const secs = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const sy = window.scrollY + window.innerHeight * 0.5;
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.offsetTop <= sy) {
          if (secs[i] !== lastSection) {
            lastSection = secs[i];
            warpTarget = 1;
            setTimeout(resetWarp, 600);
          }
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let time = 0;

    const animate = () => {
      time += 0.016;
      warpSpeed += (warpTarget - warpSpeed) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Nebula gradients */
      const grd = ctx.createRadialGradient(canvas.width * 0.25, canvas.height * 0.75, 0, canvas.width * 0.25, canvas.height * 0.75, canvas.width * 0.45);
      grd.addColorStop(0, palette.nebula1);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grd2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.15, 0, canvas.width * 0.8, canvas.height * 0.15, canvas.width * 0.35);
      grd2.addColorStop(0, palette.nebula2);
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = (mouse.current.x - 0.5) * 2;
      const my = (mouse.current.y - 0.5) * 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        /* Move stars outward from center during warp */
        if (warpSpeed > 0.01) {
          const dx = s.x - 0.5;
          const dy = s.y - 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          s.x += (dx / dist) * warpSpeed * 0.04 * s.z;
          s.y += (dy / dist) * warpSpeed * 0.04 * s.z;
        }

        /* Wrap around */
        if (s.x < -0.5 || s.x > 1.5 || s.y < -0.5 || s.y > 1.5) {
          s.x = 0.5 + (Math.random() - 0.5) * 0.3;
          s.y = 0.5 + (Math.random() - 0.5) * 0.3;
          s.z = Math.random();
        }

        const parallaxX = mx * s.z * 25;
        const parallaxY = my * s.z * 25;
        const sx = s.x * canvas.width + parallaxX;
        const sy2 = s.y * canvas.height + parallaxY;

        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.brightness * (0.5 + 0.5 * twinkle);
        const size = s.size * (0.8 + 0.2 * twinkle) * (0.4 + s.z * 0.7);

        /* During warp: draw streaks instead of dots */
        if (warpSpeed > 0.15) {
          const dx = s.x - 0.5;
          const dy = s.y - 0.5;
          const streakLen = warpSpeed * 60 * s.z;
          const angle = Math.atan2(dy, dx);
          ctx.beginPath();
          ctx.moveTo(sx, sy2);
          ctx.lineTo(sx + Math.cos(angle) * streakLen, sy2 + Math.sin(angle) * streakLen);
          ctx.strokeStyle = `rgba(${palette.starColor[0]}, ${palette.starColor[1]}, ${palette.starColor[2]}, ${alpha * 0.8})`;
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy2, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${palette.starColor[0]}, ${palette.starColor[1]}, ${palette.starColor[2]}, ${alpha})`;
          ctx.fill();
          if (s.z > 0.75) {
            ctx.beginPath();
            ctx.arc(sx, sy2, size * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79, 195, 247, ${alpha * 0.06})`;
            ctx.fill();
          }
        }
      }

      /* Normal slow drift */
      if (warpSpeed < 0.1) {
        for (let i = 0; i < stars.length; i++) {
          stars[i].y += 0.0003 * stars[i].z;
        }
      }

      /* Warp flash overlay */
      if (warpSpeed > 0.4) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(warpSpeed - 0.4) * 0.04})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default ThreeScene;
