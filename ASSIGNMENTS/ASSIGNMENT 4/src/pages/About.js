import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1>About Our College</h1>
      <section className="history">
        <h2>History</h2>
        <p>Founded in 1950, our college has been a pioneer in education for over 70 years.</p>
      </section>
      <section className="mission-vision">
        <h2>Mission & Vision</h2>
        <p>Mission: To provide quality education and foster innovation.</p>
        <p>Vision: To be a leading institution in higher education.</p>
      </section>
      <section className="achievements">
        <h2>Achievements</h2>
        <ul>
          <li>Ranked #1 in the state</li>
          <li>100% placement record</li>
          <li>Research excellence awards</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
