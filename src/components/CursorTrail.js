import React, { useEffect, useRef } from 'react';

const CODE_CHARS = ['{', '}', '<', '/>', '=', ';', '()', '=>', '[]', '::', '0x', 'fn', 'if', '++', '/**/', '&&', '||'];

const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    let mouseX = -200, mouseY = -200;
    let lastX = -200, lastY = -200;
    let lastSpawn = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const spawnParticle = (x, y) => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--scene-color').trim() || '#4fc3f7';
      particles.push({
        x,
        y,
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
        opacity: 0.8,
        size: Math.random() * 11 + 9,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.6 - 0.3,
        rotation: (Math.random() - 0.5) * 0.4,
        life: 1,
        decay: Math.random() * 0.007 + 0.005,
        color,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 10 && now - lastSpawn > 50) {
        spawnParticle(mouseX, mouseY);
        lastSpawn = now;
        lastX = mouseX;
        lastY = mouseY;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.opacity = p.life * 0.8;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${Math.max(6, p.size * p.life)}px 'Space Grotesk', monospace`;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      if (particles.length > 60) {
        particles.splice(0, particles.length - 60);
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

  return <canvas ref={canvasRef} className="trail-canvas" />;
};

export default CursorTrail;
