import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

/*
  KODA — Playful 3D Guide Character
  Features:
  - localStorage memory (first visit vs return visit)
  - Easter eggs: Konami code, click 5x, type "hello", idle 30s sleep
  - Mobile support: bottom-fixed, tap interactions, scroll velocity reactions
  - Time-of-day moods
  - All original expression/blink/idle/section systems preserved
*/

const EXPRESSIONS = {
  idle:      { eyeX: 1, eyeY: 1, pupil: 1, browLA: 0, browRA: 0, browLY: 0, browRY: 0, mouth: 'M8 7 Q16 10 24 7', mouthO: 0.8, blush: 0, squashX: 1, squashY: 1, glow: 0.25, bounce: 0 },
  curious:   { eyeX: 1.08, eyeY: 1.12, pupil: 1.1, browLA: -8, browRA: 8, browLY: -3, browRY: -3, mouth: 'M10 8 Q16 9 22 8', mouthO: 0.6, blush: 0, squashX: 1, squashY: 1.02, glow: 0.35, bounce: 0 },
  excited:   { eyeX: 1.15, eyeY: 1.2, pupil: 1.15, browLA: -12, browRA: 12, browLY: -5, browRY: -5, mouth: 'M6 5 Q16 16 26 5', mouthO: 1, blush: 0.6, squashX: 0.96, squashY: 1.04, glow: 0.55, bounce: 3 },
  surprised: { eyeX: 1.25, eyeY: 1.3, pupil: 0.8, browLA: -15, browRA: 15, browLY: -8, browRY: -8, mouth: 'M12 5 Q16 14 20 5', mouthO: 1, blush: 0.3, squashX: 0.92, squashY: 1.08, glow: 0.6, bounce: -5 },
  focused:   { eyeX: 1.05, eyeY: 0.85, pupil: 1.05, browLA: 5, browRA: -5, browLY: 1, browRY: 1, mouth: 'M10 8 Q16 8 22 8', mouthO: 0.5, blush: 0, squashX: 1, squashY: 0.98, glow: 0.4, bounce: 0 },
  proud:     { eyeX: 1, eyeY: 0.55, pupil: 0.9, browLA: -5, browRA: 5, browLY: -2, browRY: -2, mouth: 'M6 4 Q16 15 26 4', mouthO: 1, blush: 0.7, squashX: 0.97, squashY: 1.03, glow: 0.55, bounce: 2 },
  thinking:  { eyeX: 1, eyeY: 0.9, pupil: 0.95, browLA: -10, browRA: 3, browLY: -4, browRY: 0, mouth: 'M11 8 Q14 6 18 9', mouthO: 0.7, blush: 0, squashX: 1, squashY: 1, glow: 0.25, bounce: 0 },
  warm:      { eyeX: 1.05, eyeY: 0.95, pupil: 1.05, browLA: -3, browRA: 3, browLY: -1, browRY: -1, mouth: 'M7 5 Q16 13 25 5', mouthO: 0.9, blush: 0.5, squashX: 1, squashY: 1, glow: 0.45, bounce: 1 },
  sleepy:    { eyeX: 1, eyeY: 0.35, pupil: 0.8, browLA: 5, browRA: -5, browLY: 3, browRY: 3, mouth: 'M10 7 Q16 10 22 7', mouthO: 0.4, blush: 0, squashX: 1.02, squashY: 0.98, glow: 0.15, bounce: 0 },
  dance:     { eyeX: 1.1, eyeY: 1.1, pupil: 1, browLA: -10, browRA: 10, browLY: -4, browRY: -4, mouth: 'M6 4 Q16 16 26 4', mouthO: 1, blush: 0.8, squashX: 0.94, squashY: 1.06, glow: 0.7, bounce: 0 },
};

const SECTION_MAP = {
  hero: 'curious', about: 'thinking', skills: 'excited', projects: 'focused',
  experience: 'warm', education: 'proud', contact: 'warm',
};

/* Time-of-day base mood */
const getTimeMood = () => {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'excited';   // morning: energetic
  if (h >= 12 && h < 18) return 'focused';  // afternoon: focused
  if (h >= 18 && h < 22) return 'warm';     // evening: warm
  return 'sleepy';                           // night: calm/sleepy
};

const BUBBLES = {
  hero: ['Hey there! 👋', 'Welcome!', 'Scroll down ↓'],
  about: ["That's me!", 'Keep reading...'],
  skills: ['Pretty cool right?', 'I love coding!'],
  projects: ['Check these out!', 'Built with love ❤️'],
  experience: ["It's been a ride", 'Growing every day'],
  education: ['Always learning!', 'Knowledge = power'],
  contact: ["Let's connect!", 'Say hello! 👋'],
};

/* Konami code sequence */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const GuideMascot = () => {
  const containerRef = useRef(null);
  const bodyRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftIrisRef = useRef(null);
  const rightIrisRef = useRef(null);
  const leftBrowRef = useRef(null);
  const rightBrowRef = useRef(null);
  const mouthRef = useRef(null);
  const leftCheekRef = useRef(null);
  const rightCheekRef = useRef(null);
  const leftLidTopRef = useRef(null);
  const leftLidBotRef = useRef(null);
  const rightLidTopRef = useRef(null);
  const rightLidBotRef = useRef(null);
  const glowRef = useRef(null);
  const bubbleRef = useRef(null);
  const bubbleTextRef = useRef(null);
  const shadowRef = useRef(null);
  const hatRef = useRef(null);
  const snoreRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const speed = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const animFrame = useRef(null);
  const idleTimeout = useRef(null);
  const deepIdleTimeout = useRef(null);
  const currentExpr = useRef('curious');
  const sectionExpr = useRef('curious');
  const section = useRef('hero');
  const hovering = useRef(false);
  const locked = useRef(false);
  const isMobile = useRef(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const konamiIdx = useRef(0);
  const hasPartyHat = useRef(false);
  const isSleeping = useRef(false);
  const typedChars = useRef('');

  /* ═══════ APPLY EXPRESSION ═══════ */
  const applyExpression = useCallback((name, duration = 0.5) => {
    const e = EXPRESSIONS[name];
    if (!e) return;
    currentExpr.current = name;
    const spring = 'elastic.out(1, 0.75)';
    const quick = 'power3.out';
    [leftEyeRef, rightEyeRef].forEach(r => { if (r.current) gsap.to(r.current, { scaleX: e.eyeX, scaleY: e.eyeY, duration, ease: spring }); });
    [leftPupilRef, rightPupilRef].forEach(r => { if (r.current) gsap.to(r.current, { scale: e.pupil, duration: duration * 0.8, ease: quick }); });
    if (leftBrowRef.current) gsap.to(leftBrowRef.current, { rotation: e.browLA, y: e.browLY, duration, ease: spring });
    if (rightBrowRef.current) gsap.to(rightBrowRef.current, { rotation: e.browRA, y: e.browRY, duration, ease: spring });
    if (mouthRef.current) {
      gsap.to(mouthRef.current, { opacity: e.mouthO, duration: duration * 0.6, ease: quick });
      const path = mouthRef.current.querySelector('path');
      if (path) gsap.to(path, { attr: { d: e.mouth }, duration, ease: quick });
    }
    [leftCheekRef, rightCheekRef].forEach(r => { if (r.current) gsap.to(r.current, { opacity: e.blush, duration, ease: quick }); });
    if (bodyRef.current) gsap.to(bodyRef.current, { scaleX: e.squashX, scaleY: e.squashY, duration, ease: spring });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: e.glow, scale: 0.9 + e.glow * 0.3, duration, ease: quick });
    if (e.bounce !== 0 && containerRef.current) {
      gsap.to(containerRef.current, { y: `+=${e.bounce}`, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 });
    }
  }, []);

  /* ═══════ BLINK ═══════ */
  const blink = useCallback(() => {
    [leftLidTopRef, rightLidTopRef].forEach(r => {
      if (r.current) gsap.to(r.current, { scaleY: 1, duration: 0.06, ease: 'power2.in',
        onComplete: () => gsap.to(r.current, { scaleY: 0, duration: 0.1, ease: 'power2.out' }) });
    });
    [leftLidBotRef, rightLidBotRef].forEach(r => {
      if (r.current) gsap.to(r.current, { scaleY: 1, duration: 0.06, ease: 'power2.in',
        onComplete: () => gsap.to(r.current, { scaleY: 0, duration: 0.1, ease: 'power2.out' }) });
    });
  }, []);

  /* ═══════ SHOW BUBBLE ═══════ */
  const showBubble = useCallback((msg, holdMs = 2800) => {
    if (bubbleRef.current && bubbleTextRef.current) {
      bubbleTextRef.current.textContent = msg;
      gsap.killTweensOf(bubbleRef.current);
      gsap.fromTo(bubbleRef.current, { opacity: 0, scale: 0.5, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(2)' });
      gsap.to(bubbleRef.current, { opacity: 0, scale: 0.8, y: -5, duration: 0.3, delay: holdMs / 1000, ease: 'power2.in' });
    }
  }, []);

  /* ═══════ WAKE FROM SLEEP ═══════ */
  const wakeUp = useCallback(() => {
    if (!isSleeping.current) return;
    isSleeping.current = false;
    if (snoreRef.current) gsap.to(snoreRef.current, { opacity: 0, duration: 0.3 });
    applyExpression('surprised', 0.25);
    setTimeout(() => applyExpression(sectionExpr.current, 0.5), 500);
    showBubble('Oh! You\'re back! 😄', 2000);
  }, [applyExpression, showBubble]);

  /* ═══════ EASTER EGG: DANCE ═══════ */
  const doDance = useCallback(() => {
    locked.current = true;
    applyExpression('dance', 0.3);
    showBubble('💃 Let\'s dance! 🕺', 3000);
    const tl = gsap.timeline({
      onComplete: () => { locked.current = false; applyExpression(sectionExpr.current, 0.5); }
    });
    tl.to(bodyRef.current, { rotation: 15, duration: 0.15, ease: 'power2.out' })
      .to(bodyRef.current, { rotation: -15, duration: 0.15, ease: 'power2.out' })
      .to(bodyRef.current, { rotation: 15, duration: 0.15 })
      .to(bodyRef.current, { rotation: -15, duration: 0.15 })
      .to(bodyRef.current, { y: -20, scaleY: 1.15, scaleX: 0.9, duration: 0.2, ease: 'power2.out' })
      .to(bodyRef.current, { y: 0, scaleY: 0.9, scaleX: 1.1, duration: 0.15, ease: 'bounce.out' })
      .to(bodyRef.current, { rotation: 360, duration: 0.5, ease: 'power2.inOut' })
      .to(bodyRef.current, { rotation: 0, scaleY: 1, scaleX: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
  }, [applyExpression, showBubble]);

  /* ═══════ EASTER EGG: SPACE LAUNCH ═══════ */
  const doSpaceLaunch = useCallback(() => {
    locked.current = true;
    applyExpression('surprised', 0.2);
    showBubble('🚀 To infinity!', 1500);
    const tl = gsap.timeline({
      onComplete: () => {
        hasPartyHat.current = true;
        if (hatRef.current) gsap.to(hatRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
        locked.current = false;
        applyExpression('proud', 0.5);
        showBubble('🎉 Party mode ON!', 3000);
      }
    });
    tl.to(containerRef.current, { y: -window.innerHeight - 200, duration: 0.8, ease: 'power3.in' })
      .set(containerRef.current, { y: window.innerHeight + 200 })
      .to(containerRef.current, { y: 0, duration: 0.6, ease: 'bounce.out' });
  }, [applyExpression, showBubble]);

  /* ═══════ EASTER EGG: KONAMI → 8-bit mode ═══════ */
  const doKonami = useCallback(() => {
    locked.current = true;
    applyExpression('excited', 0.3);
    showBubble('🕹️ RETRO MODE!', 3000);
    document.body.classList.add('retro-mode');
    setTimeout(() => {
      document.body.classList.remove('retro-mode');
      locked.current = false;
      applyExpression(sectionExpr.current, 0.5);
    }, 5000);
  }, [applyExpression, showBubble]);

  /* ═══════ IDLE BEHAVIORS ═══════ */
  const playIdle = useCallback(() => {
    const pool = ['lookAround', 'doubleBlink', 'wiggle', 'yawn', 'headTilt'];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    switch (pick) {
      case 'lookAround': {
        const dir = Math.random() > 0.5 ? 1 : -1;
        [leftPupilRef, rightPupilRef, leftIrisRef, rightIrisRef].forEach(r => {
          if (r.current) { gsap.to(r.current, { x: dir * 5, duration: 0.4, ease: 'power2.out',
            onComplete: () => gsap.to(r.current, { x: 0, duration: 0.6, ease: 'power2.out', delay: 0.7 }) }); }
        });
        break;
      }
      case 'doubleBlink': blink(); setTimeout(() => blink(), 180); break;
      case 'wiggle':
        if (bodyRef.current) { gsap.to(bodyRef.current, { rotation: 5, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 5,
          onComplete: () => gsap.set(bodyRef.current, { rotation: 0 }) }); }
        break;
      case 'yawn':
        applyExpression('sleepy', 0.4);
        setTimeout(() => applyExpression(sectionExpr.current, 0.6), 1800);
        break;
      case 'headTilt':
        if (bodyRef.current) { const angle = Math.random() > 0.5 ? 14 : -14;
          gsap.to(bodyRef.current, { rotation: angle, duration: 0.5, ease: 'elastic.out(1, 0.5)',
            onComplete: () => gsap.to(bodyRef.current, { rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }) }); }
        break;
      default: break;
    }
  }, [applyExpression, blink]);

  /* ═══════ SECTION DETECTION ═══════ */
  useEffect(() => {
    const secs = ['hero','about','skills','projects','experience','education','contact'];
    const onScroll = () => {
      if (isSleeping.current) wakeUp();
      clearTimeout(deepIdleTimeout.current);
      deepIdleTimeout.current = setTimeout(() => {
        if (!locked.current) {
          isSleeping.current = true;
          applyExpression('sleepy', 0.8);
          showBubble('💤 Zzz...', 4000);
          if (snoreRef.current) gsap.to(snoreRef.current, { opacity: 1, duration: 0.5 });
        }
      }, 30000);

      const sy = window.scrollY + window.innerHeight * 0.5;
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.offsetTop <= sy) {
          const next = secs[i];
          if (next !== section.current) {
            section.current = next;
            sectionExpr.current = SECTION_MAP[next];
            if (!locked.current) {
              locked.current = true;
              applyExpression('surprised', 0.25);
              setTimeout(() => { applyExpression(SECTION_MAP[next], 0.6); locked.current = false; }, 400);
            }
          }
          break;
        }
      }
      const scrollDelta = Math.abs(window.scrollY - lastScrollY.current);
      if (scrollDelta > 60 && bodyRef.current) {
        gsap.to(bodyRef.current, { scaleY: 0.88, scaleX: 1.08, duration: 0.1, ease: 'power2.out',
          onComplete: () => gsap.to(bodyRef.current, { scaleY: 1, scaleX: 1, duration: 0.4, ease: 'elastic.out(1, 0.6)' }) });
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [applyExpression, showBubble, wakeUp]);

  /* ═══════ MOUSE TRACKING ═══════ */
  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const onMove = (e) => {
      if (isSleeping.current) wakeUp();
      mouse.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      speed.current = Math.sqrt(dx * dx + dy * dy);
      lastMouse.current = { x: e.clientX, y: e.clientY };
      clearTimeout(idleTimeout.current);
      clearTimeout(deepIdleTimeout.current);
      idleTimeout.current = setTimeout(() => { if (!locked.current && !hovering.current) playIdle(); }, 4000);
      deepIdleTimeout.current = setTimeout(() => {
        if (!locked.current) {
          isSleeping.current = true;
          applyExpression('sleepy', 0.8);
          showBubble('💤 Zzz...', 4000);
          if (snoreRef.current) gsap.to(snoreRef.current, { opacity: 1, duration: 0.5 });
        }
      }, 30000);
    };
    if (isMobile.current) {
      mouse.current = { x: window.innerWidth * 0.85, y: window.innerHeight - 80 };
      pos.current = { ...mouse.current };
    } else {
      mouse.current = { x: window.innerWidth - 140, y: window.innerHeight * 0.4 };
      pos.current = { ...mouse.current };
      window.addEventListener('mousemove', onMove);
    }
    return () => window.removeEventListener('mousemove', onMove);
  }, [playIdle, wakeUp, applyExpression, showBubble]);

  /* ═══════ MOBILE: TAP interaction ═══════ */
  useEffect(() => {
    if (!isMobile.current) return;
    const onTap = (e) => {
      if (isSleeping.current) { wakeUp(); return; }
      const touch = e.changedTouches?.[0];
      if (!touch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && touch.clientX >= rect.left - 20 && touch.clientX <= rect.right + 20 && touch.clientY >= rect.top - 20 && touch.clientY <= rect.bottom + 20) {
        blink();
        const msgs = BUBBLES[section.current] || BUBBLES.hero;
        showBubble(msgs[Math.floor(Math.random() * msgs.length)]);
      }
    };
    window.addEventListener('touchend', onTap, { passive: true });
    return () => window.removeEventListener('touchend', onTap);
  }, [blink, showBubble, wakeUp]);

  /* ═══════ BLINK INTERVAL ═══════ */
  useEffect(() => {
    let t;
    const loop = () => { t = setTimeout(() => { blink(); loop(); }, 2500 + Math.random() * 4000); };
    loop();
    return () => clearTimeout(t);
  }, [blink]);

  /* ═══════ SPEECH BUBBLES (periodic) ═══════ */
  useEffect(() => {
    const show = () => {
      if (isSleeping.current) return;
      const msgs = BUBBLES[section.current] || BUBBLES.hero;
      showBubble(msgs[Math.floor(Math.random() * msgs.length)]);
    };
    const interval = setInterval(show, 14000 + Math.random() * 6000);
    return () => clearInterval(interval);
  }, [showBubble]);

  /* ═══════ KODA's MEMORY (localStorage) ═══════ */
  useEffect(() => {
    const key = 'koda_visits';
    const raw = localStorage.getItem(key);
    const visits = raw ? parseInt(raw, 10) : 0;
    localStorage.setItem(key, String(visits + 1));
    const delay = 3500;
    if (visits === 0) {
      setTimeout(() => showBubble('Hey, welcome! Let me show you around 👋', 4000), delay);
    } else if (visits === 1) {
      setTimeout(() => showBubble("You're back! 👋 Missed you!", 3500), delay);
    } else if (visits < 5) {
      setTimeout(() => showBubble(`Welcome back! Visit #${visits + 1} 🎉`, 3000), delay);
    } else {
      setTimeout(() => showBubble("Hey friend! Good to see you again! 💜", 3000), delay);
    }
  }, [showBubble]);

  /* ═══════ HOVER → excited ═══════ */
  useEffect(() => {
    const sel = 'a, button, .project-mission, .skill-card-3d, .cta-primary, .cta-secondary, .contact-email-btn, .dossier-card, .mission-demo-hint';
    const over = (e) => {
      if (e.target.closest && e.target.closest(sel)) { hovering.current = true; if (!locked.current) applyExpression('excited', 0.3); }
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest(sel)) { hovering.current = false; if (!locked.current) applyExpression(sectionExpr.current, 0.5); }
    };
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => { document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); };
  }, [applyExpression]);

  /* ═══════ CLICK → happy pulse + 5-click Easter egg ═══════ */
  useEffect(() => {
    const onClick = (e) => {
      if (isSleeping.current) { wakeUp(); return; }
      blink();
      if (bodyRef.current) gsap.to(bodyRef.current, { scale: 1.12, duration: 0.1, ease: 'power2.out', yoyo: true, repeat: 1 });

      /* Check if click was on Koda */
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        clickCount.current++;
        clearTimeout(clickTimer.current);
        clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
        if (clickCount.current >= 5) {
          clickCount.current = 0;
          doSpaceLaunch();
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [blink, doSpaceLaunch, wakeUp]);

  /* ═══════ KEYBOARD: Konami code + "hello" ═══════ */
  useEffect(() => {
    const onKey = (e) => {
      if (isSleeping.current) wakeUp();
      /* Konami */
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++;
        if (konamiIdx.current >= KONAMI.length) { konamiIdx.current = 0; doKonami(); }
      } else { konamiIdx.current = 0; }
      /* "hello" */
      typedChars.current += e.key.toLowerCase();
      if (typedChars.current.length > 10) typedChars.current = typedChars.current.slice(-10);
      if (typedChars.current.endsWith('hello')) { typedChars.current = ''; doDance(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doKonami, doDance, wakeUp]);

  /* ═══════ MAIN ANIMATION LOOP ═══════ */
  useEffect(() => {
    const lerp = isMobile.current ? 0.08 : 0.045;
    const offset = isMobile.current ? { x: 0, y: 0 } : { x: 90, y: -70 };
    const margin = 55;
    let breath = 0;

    const loop = () => {
      if (isMobile.current) {
        /* Fixed position on mobile */
        pos.current.x = window.innerWidth * 0.88;
        pos.current.y = window.innerHeight - 70;
      } else {
        const tx = Math.min(Math.max(mouse.current.x + offset.x, margin), window.innerWidth - margin);
        const ty = Math.min(Math.max(mouse.current.y + offset.y, margin), window.innerHeight - margin);
        pos.current.x += (tx - pos.current.x) * lerp;
        pos.current.y += (ty - pos.current.y) * lerp;
      }
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      [{ eye: leftEyeRef, pupil: leftPupilRef, iris: leftIrisRef },
       { eye: rightEyeRef, pupil: rightPupilRef, iris: rightIrisRef }].forEach(({ eye, pupil, iris }) => {
        if (!eye.current || !pupil.current) return;
        const r = eye.current.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = mouse.current.x - cx, dy = mouse.current.y - cy;
        const a = Math.atan2(dy, dx);
        const t = Math.min(Math.sqrt(dx * dx + dy * dy) / 80, 1);
        pupil.current.style.transform = `translate(-50%, -50%) translate(${Math.cos(a) * t * 7}px, ${Math.sin(a) * t * 5}px)`;
        if (iris.current) iris.current.style.transform = `translate(-50%, -50%) translate(${Math.cos(a) * t * 4}px, ${Math.sin(a) * t * 4}px)`;
      });

      if (bodyRef.current) {
        const dx = mouse.current.x - pos.current.x, dy = mouse.current.y - pos.current.y;
        bodyRef.current.style.setProperty('--tiltX', `${(dy / window.innerHeight) * 15}deg`);
        bodyRef.current.style.setProperty('--tiltY', `${-(dx / window.innerWidth) * 15}deg`);
      }

      breath += 0.015;
      if (bodyRef.current) {
        bodyRef.current.style.setProperty('--breathScale', 1 + Math.sin(breath) * 0.012);
        bodyRef.current.style.setProperty('--breathY', `${Math.sin(breath * 0.7) * 2}px`);
      }
      if (shadowRef.current) shadowRef.current.style.transform = `translateX(-50%) scaleX(${0.85 + Math.sin(breath) * 0.05})`;

      if (!isMobile.current && speed.current > 45 && !locked.current && !hovering.current && currentExpr.current !== 'surprised') {
        locked.current = true;
        applyExpression('surprised', 0.2);
        setTimeout(() => { applyExpression(sectionExpr.current, 0.5); locked.current = false; }, 600);
      }
      speed.current *= 0.9;
      animFrame.current = requestAnimationFrame(loop);
    };
    animFrame.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame.current);
  }, [applyExpression]);

  /* ═══════ ENTRANCE ═══════ */
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.2, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 2.5, ease: 'elastic.out(1, 0.5)' });
    }
    const timeMood = getTimeMood();
    setTimeout(() => applyExpression(timeMood === 'sleepy' ? 'curious' : timeMood, 0.8), 2800);
  }, [applyExpression]);

  return (
    <div ref={containerRef} className="koda" style={{ opacity: 0, pointerEvents: 'auto' }}>
      <div ref={bubbleRef} className="koda-bubble" style={{ opacity: 0 }}>
        <span ref={bubbleTextRef} />
        <div className="koda-bubble-tail" />
      </div>

      <div ref={glowRef} className="koda-glow" />
      <div ref={shadowRef} className="koda-shadow" />

      {/* Snore Z particles */}
      <div ref={snoreRef} className="koda-snore" style={{ opacity: 0 }}>
        <span className="snore-z snore-z-1">Z</span>
        <span className="snore-z snore-z-2">z</span>
        <span className="snore-z snore-z-3">Z</span>
      </div>

      {/* Party hat (appears after 5-click Easter egg) */}
      <div ref={hatRef} className="koda-party-hat" style={{ opacity: 0, transform: 'scale(0)' }}>🎩</div>

      <div ref={bodyRef} className="koda-body">
        <div className="koda-antenna"><div className="koda-antenna-stem" /><div className="koda-antenna-tip" /></div>
        <div className="koda-face">
          <svg ref={leftBrowRef} className="koda-brow koda-brow--left" viewBox="0 0 20 6" fill="none">
            <path d="M3 5 Q10 1 17 3" stroke="var(--scene-color)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg ref={rightBrowRef} className="koda-brow koda-brow--right" viewBox="0 0 20 6" fill="none">
            <path d="M3 3 Q10 1 17 5" stroke="var(--scene-color)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div ref={leftEyeRef} className="koda-eye koda-eye--left">
            <div ref={leftLidTopRef} className="koda-lid koda-lid--top" />
            <div ref={leftLidBotRef} className="koda-lid koda-lid--bot" />
            <div ref={leftIrisRef} className="koda-iris" />
            <div ref={leftPupilRef} className="koda-pupil" />
            <div className="koda-specular" />
          </div>
          <div ref={rightEyeRef} className="koda-eye koda-eye--right">
            <div ref={rightLidTopRef} className="koda-lid koda-lid--top" />
            <div ref={rightLidBotRef} className="koda-lid koda-lid--bot" />
            <div ref={rightIrisRef} className="koda-iris" />
            <div ref={rightPupilRef} className="koda-pupil" />
            <div className="koda-specular" />
          </div>
          <div ref={leftCheekRef} className="koda-cheek koda-cheek--left" style={{ opacity: 0 }} />
          <div ref={rightCheekRef} className="koda-cheek koda-cheek--right" style={{ opacity: 0 }} />
          <svg ref={mouthRef} className="koda-mouth" viewBox="0 0 32 16" fill="none">
            <path d="M8 7 Q16 10 24 7" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div className="koda-sparkles">
          {[0,1,2,3,4,5].map(i => <div key={i} className="koda-sparkle" style={{ '--si': i }} />)}
        </div>
      </div>
    </div>
  );
};

export default GuideMascot;
