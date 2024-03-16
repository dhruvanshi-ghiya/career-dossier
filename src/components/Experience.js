import React from 'react';

const Experience = () => {
  const experiences = [
    {
      company: 'SMART Center',
      location: 'Waterloo, ON',
      role: 'Software Developer',
      duration: 'Sep 2023 - Dec 2023',
      responsibilities: [
        'Developed an inventory management software utilizing agile methodologies, resulting in a 30% increase in overall efficiency and a 20% reduction in inventory errors.',
        'Maintained comprehensive technical documentation for the inventory management software, enabling seamless knowledge transfer and reducing onboarding time for new team members by 40%.',
        'Conducted regular code reviews and debugging sessions to identify and fix issues in the software codebase, resulting in a 15% improvement in software performance and reliability.',
      ],
    },
    {
      company: 'ThinkLP',
      location: 'Waterloo, ON',
      role: 'Software Developer/ QA Specialist',
      duration: 'May 2022 - Aug 2023',
      responsibilities: [
        'Orchestrated comprehensive testing protocols within the Salesforce ecosystem, contributing to a 20% decline in software bugs and accelerating overall project delivery speed by 10% in agile environments.',
        'Streamlined documentation practices specific to Salesforce applications, leading to a 15% decrease in user support requests. By offering clear instructions on utilizing the Salesforce software product, user satisfaction significantly improved.',
        'Spearheaded code review sessions within the Salesforce development team, identifying and rectifying software issues. This initiative resulted in a remarkable 30% increase in Salesforce code quality, effectively reducing production bugs by 25%.',
      ],
    },
    {
      company: 'ICAN Infotech',
      location: 'Ahmedabad, India',
      role: 'Technical Content Writer',
      duration: 'Oct 2020 - Feb 2021',
      responsibilities: [
        'Developed engaging and user-friendly content for multinational projects, resulting in a 20% increase in user satisfaction ratings.',
        'Collaborated with a professional engineer to create detailed design specifications and conducted rigorous usability tests, ensuring a 15% product functionality and performance improvement.',
      ],
    },
    {
      company: 'Royal Technosoft Pvt. Ltd.',
      location: 'Ahmedabad, India',
      role: 'Summer Intern',
      duration: 'Apr 2020 - Jun 2020',
      responsibilities: [
        'Resolved 90% of technical issues by providing timely and effective troubleshooting support, resulting in improved system reliability and increased end-user productivity.',
      ],
    },
  ];

  return (
    <section>
      <h2>Experience</h2>
      {experiences.map((experience, index) => (
        <div key={index}>
          <h3>{experience.company}</h3>
          <p>{experience.location}</p>
          <p>{experience.role}</p>
          <p>{experience.duration}</p>
          <ul>
            {experience.responsibilities.map((responsibility, i) => (
              <li key={i}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Experience;