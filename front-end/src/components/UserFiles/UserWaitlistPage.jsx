import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserWaitlistPage.css'; // You can create a separate CSS file for styling

const UserWaitlistPage = () => {
  const [waitlists, setWaitlists] = useState([]);

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

  return (
    <div className="user-waitlist-page-container">
      <h2>Available Waitlists</h2>
      <div className="waitlist-grid">
        {waitlists.map((waitlist) => (
          <div key={waitlist._id} className="waitlist-item">
            <div
              className="waitlist-image"
              style={{
                backgroundImage: waitlist.image
                  ? `url(${waitlist.image})`
                  : 'url(default-image.jpg)', // Fallback image if no image data
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="waitlist-info">
              <h3>PRODUCT NAME : {waitlist.name || 'No Name'}</h3>
              <Link to={`/view-waitlist/${waitlist._id}`} className="view-button">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWaitlistPage;
