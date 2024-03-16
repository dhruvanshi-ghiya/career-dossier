import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skills = [
    'Certified Salesforce Developer and Administrator',
    'JavaScript',
    'React.js',
    'Redux',
    'HTML',
    'CSS',
    'Apache Web Server',
    'Networking and Cybersecurity',
    'C++',
    'C#',
    'Unity3D',
    'SQL/NoSQL Databases',
    'ETL',
    'Business Intelligence',
    'Linux',
    'Git',
    'Problem-solving and Creative Thinking',
    'Agile Software Development',
  ];

  return (
    <section className="skills">
      <h2>Skills</h2>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;