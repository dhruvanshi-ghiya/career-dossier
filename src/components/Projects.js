import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Chat Application',
      description: 'Develop a chat application with real-time messaging, profile creation, friend addition, group creation, and notification features.',
      technologies: ['Node.js', 'Socket.io', 'MongoDB', 'HTML', 'CSS', 'React.js', 'Redux'],
      achievements: [
        'Developed REST APIs (Node.js, Socket.io, MongoDB) reducing user login time by 30%',
        'Implemented responsive front-end interfaces (HTML, CSS, React.js, Redux) for a 20% increase in website engagement',
      ],
    },
    {
      title: 'Movie Recommendation System',
      description: 'Develop a movie recommendation system using machine learning algorithms like collaborative filtering, content-based filtering, and matrix factorization.',
      technologies: ['Python', 'Pandas', 'NumPy', 'TensorFlow', 'Scikit-learn'],
    },
  ];

  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-list">
              <h4>Technologies Used:</h4>
              <ul>
                {project.technologies.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            {project.achievements && (
              <div className="achievements">
                <h4>Achievements:</h4>
                <ul>
                  {project.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;