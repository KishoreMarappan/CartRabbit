import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navContainer">
      <button onClick={() => handleNavigation('/admin-homepage')} className="navButton">Home</button>
      <button onClick={() => handleNavigation('/addwaitlist')} className="navButton">Create</button>
      <button onClick={() => handleNavigation('/delete-waitlist')} className="navButton">Delete</button>
      <button onClick={() => handleNavigation('/update-waitlist')} className="navButton">Update</button>
    </nav>
  );
};

export default AdminNavigation;
