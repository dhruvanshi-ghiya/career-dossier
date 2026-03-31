import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: 'Chat Application',
    description: 'Real-time messaging platform with profile creation, friend management, group chats, and live notifications.',
    technologies: ['Node.js', 'Socket.io', 'MongoDB', 'React.js', 'Redux'],
    highlights: ['30% faster login', '20% more engagement'],
    gradient: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
  },
  {
    title: 'Movie Recommendation System',
    description: 'ML-powered recommendation engine using collaborative filtering, content-based filtering, and matrix factorization.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn'],
    highlights: ['AI-Powered', 'Smart Filtering'],
    gradient: 'linear-gradient(135deg, #ff6b9d, #ffd93d)',
  },
  {
    title: 'Inventory Management System',
    description: 'Enterprise-grade inventory software built with agile methodologies for streamlined warehouse operations.',
    technologies: ['React.js', 'Node.js', 'SQL', 'REST APIs'],
    highlights: ['30% efficiency gain', '20% fewer errors'],
    gradient: 'linear-gradient(135deg, #00d4ff, #6c63ff)',
  },
];

const ProjectCard = ({ project, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 15);
    setRotateY((centerX - x) / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card interactive"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="card-gradient" style={{ background: project.gradient }} />
      <div className="card-content">
        <span className="card-index">0{index + 1}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="card-highlights">
          {project.highlights.map((h, i) => (
            <span key={i} className="highlight-badge">{h}</span>
          ))}
        </div>
        <div className="card-tech">
          {project.technologies.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="projects" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">03</span>
        <h2>Featured Projects</h2>
        <div className="header-line" />
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;