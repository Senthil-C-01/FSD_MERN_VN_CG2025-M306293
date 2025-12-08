import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DepartmentDetail.css';

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    fetch('/data/departments.json')
      .then(response => response.json())
      .then(data => {
        const dept = data.find(d => d.id === id);
        setDepartment(dept);
      });
  }, [id]);

  if (!department) return <div>Loading...</div>;

  return (
    <div className="department-detail">
      <h1>{department.name}</h1>
      <section>
        <h2>Description</h2>
        <p>{department.description}</p>
      </section>
      <section>
        <h2>Courses Offered</h2>
        <ul>
          {department.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Faculty</h2>
        <ul>
          {department.faculty.map((fac, index) => (
            <li key={index}>{fac}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Labs / Facilities</h2>
        <ul>
          {department.labs.map((lab, index) => (
            <li key={index}>{lab}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DepartmentDetail;
