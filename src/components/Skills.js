import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React.js', 'Redux', 'JavaScript', 'HTML5', 'CSS3'],
    color: '#6c63ff',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'SQL', 'NoSQL', 'ETL', 'REST APIs'],
    color: '#00d4ff',
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'Linux', 'Apache', 'Salesforce', 'Unity3D'],
    color: '#ff6b9d',
  },
  {
    title: 'Languages',
    skills: ['JavaScript', 'C++', 'C#', 'Python', 'SQL'],
    color: '#ffd93d',
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">02</span>
        <h2>Skills & Expertise</h2>
        <div className="header-line" />
      </motion.div>

      <div className="skills-grid">
        {skillCategories.map((cat, catIndex) => (
          <motion.div
            key={cat.title}
            className="skill-category"
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.7, delay: catIndex * 0.15 }}
          >
            <div className="category-header" style={{ '--accent': cat.color }}>
              <h3>{cat.title}</h3>
              <div className="category-glow" style={{ background: cat.color }} />
            </div>
            <div className="skill-tags">
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-tag interactive"
                  style={{ '--tag-color': cat.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: catIndex * 0.15 + i * 0.06 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 20px ${cat.color}40`,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;