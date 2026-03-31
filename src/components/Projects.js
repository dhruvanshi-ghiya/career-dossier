import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Mini-demo definitions ── */
const TERMINAL_LINES = [
  { prompt: '$ ', text: 'npm init chat-engine', delay: 40 },
  { prompt: '', text: '✓ Initializing WebSocket server...', delay: 20 },
  { prompt: '', text: '✓ MongoDB connected — cluster0.abc.net', delay: 20 },
  { prompt: '', text: '✓ Auth middleware configured', delay: 25 },
  { prompt: '$ ', text: 'npm start', delay: 40 },
  { prompt: '', text: '🚀 Server running on port 3001', delay: 20 },
  { prompt: '', text: '📡 Socket.io listening for clients...', delay: 25 },
  { prompt: '', text: '[user_01] connected — "Hey team!"', delay: 30 },
];

const ML_CODE = [
  'import tensorflow as tf',
  'from sklearn.metrics import precision_score',
  '',
  'model = tf.keras.Sequential([',
  '  tf.keras.layers.Dense(256, activation="relu"),',
  '  tf.keras.layers.Dropout(0.3),',
  '  tf.keras.layers.Dense(128, activation="relu"),',
  '  tf.keras.layers.Dense(n_movies, activation="softmax")',
  '])',
  '',
  'model.compile(optimizer="adam", loss="categorical_crossentropy")',
  'model.fit(X_train, y_train, epochs=25, batch_size=64)',
  '# Precision: 0.94 | Recall: 0.91',
];

const UI_ELEMENTS = [
  { type: 'header', text: 'Inventory Dashboard' },
  { type: 'stat', label: 'Total Items', value: '12,847' },
  { type: 'stat', label: 'Low Stock', value: '23' },
  { type: 'stat', label: 'Orders Today', value: '156' },
  { type: 'bar', label: 'Electronics', pct: 78 },
  { type: 'bar', label: 'Furniture', pct: 45 },
  { type: 'bar', label: 'Supplies', pct: 92 },
];

const projects = [
  {
    title: 'Chat Application',
    codename: 'COMM_LINK',
    description: 'Real-time messaging platform with profile creation, friend management, group chats, and live notifications. A full communication suite.',
    technologies: ['Node.js', 'Socket.io', 'MongoDB', 'React.js', 'Redux'],
    highlights: ['30% faster login', '20% more engagement'],
    gradient: 'linear-gradient(135deg, #4fc3f7, #7c4dff)',
    icon: '💬',
    demoType: 'terminal',
  },
  {
    title: 'Movie Recommendation System',
    codename: 'NEURAL_LENS',
    description: 'ML-powered recommendation engine using collaborative filtering, content-based filtering, and matrix factorization techniques.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn'],
    highlights: ['AI-Powered', 'Smart Filtering'],
    gradient: 'linear-gradient(135deg, #ff6b6b, #ffd740)',
    icon: '🧠',
    demoType: 'code',
  },
  {
    title: 'Inventory Management System',
    codename: 'SUPPLY_CHAIN',
    description: 'Enterprise-grade inventory software built with agile methodologies for streamlined warehouse operations and tracking.',
    technologies: ['React.js', 'Node.js', 'SQL', 'REST APIs'],
    highlights: ['30% efficiency gain', '20% fewer errors'],
    gradient: 'linear-gradient(135deg, #00e5ff, #7c4dff)',
    icon: '📦',
    demoType: 'ui',
  },
];

/* ── Terminal Demo ── */
const TerminalDemo = ({ active }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    setLines([]); setCurrentLine(0); setCurrentChar(0);
  }, [active]);

  useEffect(() => {
    if (!active || currentLine >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[currentLine];
    const fullText = line.prompt + line.text;
    if (currentChar < fullText.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), line.delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines(prev => [...prev, fullText]);
      setCurrentLine(l => l + 1);
      setCurrentChar(0);
    }, 200);
    return () => clearTimeout(t);
  }, [active, currentLine, currentChar]);

  const typing = currentLine < TERMINAL_LINES.length
    ? (TERMINAL_LINES[currentLine].prompt + TERMINAL_LINES[currentLine].text).slice(0, currentChar)
    : '';

  return (
    <div className="demo-terminal">
      <div className="demo-terminal-bar"><span /><span /><span /></div>
      <div className="demo-terminal-body">
        {lines.map((l, i) => <div key={i} className="demo-term-line">{l}</div>)}
        {currentLine < TERMINAL_LINES.length && (
          <div className="demo-term-line demo-term-typing">{typing}<span className="demo-cursor">▌</span></div>
        )}
      </div>
    </div>
  );
};

/* ── Code Assembly Demo ── */
const CodeDemo = ({ active }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    setVisibleLines(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= ML_CODE.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="demo-code">
      <div className="demo-code-bar"><span className="demo-code-dot" /><span className="demo-code-dot" /><span className="demo-code-dot" /><span className="demo-code-filename">model.py</span></div>
      <pre className="demo-code-body">
        {ML_CODE.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="demo-code-line" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="demo-line-num">{i + 1}</span>
            <span className="demo-line-text">{colorize(line)}</span>
          </div>
        ))}
      </pre>
    </div>
  );
};

/* Simple syntax coloring */
function colorize(line) {
  return line
    .replace(/(import|from|def|class|return|if|else|for)/g, '<kw>$1</kw>')
    .replace(/(#.*$)/g, '<cmt>$1</cmt>')
    .replace(/(".*?")/g, '<str>$1</str>')
    .replace(/(\d+\.?\d*)/g, '<num>$1</num>');
}

/* ── UI Dashboard Demo ── */
const UiDemo = ({ active }) => {
  const [show, setShow] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    setTimeout(() => setShow(true), 200);
  }, [active]);

  return (
    <div className={`demo-ui ${show ? 'demo-ui-active' : ''}`}>
      {UI_ELEMENTS.map((el, i) => {
        if (el.type === 'header') return <div key={i} className="demo-ui-header" style={{ animationDelay: `${i * 0.1}s` }}>{el.text}</div>;
        if (el.type === 'stat') return (
          <div key={i} className="demo-ui-stat" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="demo-ui-stat-val">{el.value}</span>
            <span className="demo-ui-stat-label">{el.label}</span>
          </div>
        );
        return (
          <div key={i} className="demo-ui-bar-row" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="demo-ui-bar-label">{el.label}</span>
            <div className="demo-ui-bar-track">
              <div className="demo-ui-bar-fill" style={{ width: show ? `${el.pct}%` : '0%', transitionDelay: `${i * 0.15}s` }} />
            </div>
            <span className="demo-ui-bar-pct">{el.pct}%</span>
          </div>
        );
      })}
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeDemo, setActiveDemo] = useState(null);

  const handleActivate = useCallback((idx) => {
    setActiveDemo(prev => prev === idx ? null : idx);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-section .section-header',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.projects-section .section-header', start: 'top 82%' } }
      );

      gsap.utils.toArray('.project-mission').forEach((project, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(project,
          { opacity: 0, x: fromX, y: 40 },
          { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: project, start: 'top 85%' } }
        );
        const visual = project.querySelector('.mission-visual');
        if (visual) {
          gsap.to(visual, { y: -40, ease: 'none', scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
        }
      });

      const visuals = document.querySelectorAll('.mission-visual');
      const onMove = (e) => {
        visuals.forEach(v => {
          const r = v.getBoundingClientRect();
          const cx = (e.clientX - r.left) / r.width - 0.5;
          const cy = (e.clientY - r.top) / r.height - 0.5;
          if (Math.abs(cx) < 1 && Math.abs(cy) < 1) {
            gsap.to(v, { rotateY: cx * 10, rotateX: -cy * 8, duration: 0.5, ease: 'power2.out' });
          }
        });
      };
      const onLeave = () => visuals.forEach(v => gsap.to(v, { rotateY: 0, rotateX: 0, duration: 0.6 }));
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
      return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave); };
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-number">{'// 03 — MISSION LOG'}</span>
        <h2>Featured Missions</h2>
        <div className="header-accent-line" />
      </div>

      <div className="projects-showcase">
        {projects.map((project, index) => (
          <div key={project.title} className={`project-mission ${index % 2 !== 0 ? 'reverse' : ''}`}>
            <div
              className={`mission-visual interactive ${activeDemo === index ? 'demo-active' : ''}`}
              style={{ perspective: '1000px' }}
              onClick={() => handleActivate(index)}
            >
              {/* Default visual (fades out when demo active) */}
              <div className={`mission-visual-inner ${activeDemo === index ? 'mission-visual-hidden' : ''}`}>
                <div className="mission-visual-gradient" style={{ background: project.gradient }} />
                <span className="mission-number">0{index + 1}</span>
                <span className="mission-icon">{project.icon}</span>
              </div>

              {/* Interactive demo */}
              <div className={`mission-demo-layer ${activeDemo === index ? 'mission-demo-visible' : ''}`}>
                {project.demoType === 'terminal' && <TerminalDemo active={activeDemo === index} />}
                {project.demoType === 'code' && <CodeDemo active={activeDemo === index} />}
                {project.demoType === 'ui' && <UiDemo active={activeDemo === index} />}
              </div>

              <div className="mission-codename">{project.codename}</div>
              <div className="mission-demo-hint interactive">
                {activeDemo === index ? '✕ Close' : '▶ Live Preview'}
              </div>
            </div>

            <div className="mission-info">
              <span className="mission-label">MISSION 0{index + 1}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="mission-metrics">
                {project.highlights.map((h, i) => (
                  <div key={i} className="metric-item">
                    <span className="metric-dot" />
                    <span className="metric-text">{h}</span>
                  </div>
                ))}
              </div>
              <div className="mission-tech-row">
                {project.technologies.map(tech => <span key={tech} className="tech-chip">{tech}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;