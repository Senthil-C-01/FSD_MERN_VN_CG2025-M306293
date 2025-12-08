import React, { useState, useEffect } from 'react';
import DepartmentCard from '../components/DepartmentCard';
import './Departments.css';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('/data/departments.json')
      .then(response => response.json())
      .then(data => setDepartments(data));
  }, []);

  return (
    <div className="departments">
      <h1>Departments</h1>
      <div className="department-list">
        {departments.map(dept => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
  );
};

export default Departments;
