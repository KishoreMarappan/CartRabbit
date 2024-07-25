import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './DeleteWaitlist.css'; // Make sure to define styles in this file
import AdminDashboard from './AdminDashboard.jsx';

const DeleteWaitlist = () => {
  const [waitlists, setWaitlists] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchWaitlists = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/admin/view-waitlists');
        setWaitlists(response.data);
      } catch (error) {
        console.error('Error fetching waitlists:', error);
      }
    };
    fetchWaitlists();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3500/api/admin/delete-waitlist/${id}`);
      if (response.data.status) {
        Swal.fire("Waitlist Deleted!");
        setWaitlists(waitlists.filter(waitlist => waitlist._id !== id));
      }
    } catch (error) {
      setMessage('Error deleting waitlist');
    }
  };

  return (
    <div>
      <AdminDashboard />
      <div className="delete-waitlist-container">
        <h2>Delete Waitlist</h2>
        <div className="waitlist-grid">
          {waitlists.map((waitlist) => (
            <div key={waitlist._id} className="waitlist-item">
              <div
                className="waitlist-image"
                style={{
                  backgroundImage: waitlist.image
                    ? `url(${waitlist.image})`
                    : "url(default-image.jpg)", // Fallback image if no image data
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="waitlist-info">
                <h3>PRODUCT NAME: {waitlist.name || "No Name"}</h3>
                <button onClick={() => handleDelete(waitlist._id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DeleteWaitlist;
