import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DepartmentCard from '../components/DepartmentCard';
import './Home.css';

const Home = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('/data/departments.json')
      .then(response => response.json())
      .then(data => setDepartments(data.slice(0, 3))); // Show top 3
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Our College</h1>
        <p>Excellence in Education</p>
      </section>
      <section className="why-college">
        <h2>Why Choose Our College?</h2>
        <p>Quality education, experienced faculty, state-of-the-art facilities.</p>
      </section>
      <section className="top-departments">
        <h2>Top Departments</h2>
        <div className="department-list">
          {departments.map(dept => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
        <Link to="/departments" className="view-all-btn">View All Departments</Link>
      </section>
    </div>
  );
};

export default Home;
