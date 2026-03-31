import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Chat Application',
    codename: 'COMM_LINK',
    description: 'Real-time messaging platform with profile creation, friend management, group chats, and live notifications. A full communication suite.',
    technologies: ['Node.js', 'Socket.io', 'MongoDB', 'React.js', 'Redux'],
    highlights: ['30% faster login', '20% more engagement'],
    gradient: 'linear-gradient(135deg, #4fc3f7, #7c4dff)',
    icon: '💬',
  },
  {
    title: 'Movie Recommendation System',
    codename: 'NEURAL_LENS',
    description: 'ML-powered recommendation engine using collaborative filtering, content-based filtering, and matrix factorization techniques.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn'],
    highlights: ['AI-Powered', 'Smart Filtering'],
    gradient: 'linear-gradient(135deg, #ff6b6b, #ffd740)',
    icon: '🧠',
  },
  {
    title: 'Inventory Management System',
    codename: 'SUPPLY_CHAIN',
    description: 'Enterprise-grade inventory software built with agile methodologies for streamlined warehouse operations and tracking.',
    technologies: ['React.js', 'Node.js', 'SQL', 'REST APIs'],
    highlights: ['30% efficiency gain', '20% fewer errors'],
    gradient: 'linear-gradient(135deg, #00e5ff, #7c4dff)',
    icon: '📦',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo('.projects-section .section-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-section .section-header', start: 'top 82%' },
        }
      );

      /* Each project card - cinematic slide in */
      gsap.utils.toArray('.project-mission').forEach((project, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(project,
          { opacity: 0, x: fromX, y: 40 },
          {
            opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: project, start: 'top 85%' },
          }
        );

        /* Parallax on the project visual */
        const visual = project.querySelector('.mission-visual');
        if (visual) {
          gsap.to(visual, {
            y: -40,
            ease: 'none',
            scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          });
        }
      });

      /* Mouse tilt on project visuals */
      const visuals = document.querySelectorAll('.mission-visual');
      const onMove = (e) => {
        visuals.forEach((v) => {
          const r = v.getBoundingClientRect();
          const cx = (e.clientX - r.left) / r.width - 0.5;
          const cy = (e.clientY - r.top) / r.height - 0.5;
          if (Math.abs(cx) < 1 && Math.abs(cy) < 1) {
            gsap.to(v, { rotateY: cx * 10, rotateX: -cy * 8, duration: 0.5, ease: 'power2.out' });
          }
        });
      };
      const onLeave = () => {
        visuals.forEach((v) => gsap.to(v, { rotateY: 0, rotateX: 0, duration: 0.6 }));
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);

      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      };
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
            <div className="mission-visual interactive" style={{ perspective: '1000px' }}>
              <div className="mission-visual-inner">
                <div className="mission-visual-gradient" style={{ background: project.gradient }} />
                <span className="mission-number">0{index + 1}</span>
                <span className="mission-icon">{project.icon}</span>
              </div>
              <div className="mission-codename">{project.codename}</div>
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
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;