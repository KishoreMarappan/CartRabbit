import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import './Userviewlist.css';

const UserViewList = () => {
  const { id } = useParams(); // Get the waitlist ID from the URL
  const [waitlist, setWaitlist] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/admin/view-waitlist/${id}`);
        setWaitlist(response.data.data); // Adjust according to the API response structure
      } catch (error) {
        console.error("Error fetching waitlist details:", error);
      }
    };
    fetchWaitlist();
  }, [id]);

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      // Assume there's an endpoint to join a waitlist, update as necessary
      const response = await axios.post(`http://localhost:3500/api/user/join-waitlist/${id}`);
      if (response.data.status) {
        Swal.fire("Successfully joined the waitlist!");
      } else {
        Swal.fire("Failed to join the waitlist.");
      }
    } catch (error) {
      Swal.fire("Error joining the waitlist.");
    } finally {
      setIsJoining(false);
    }
  };

  if (!waitlist) return <p>Loading...</p>;

  return (
    <div className="user-view-list-container">
      <h2>Waitlist Details</h2>
      <div className="waitlist-detail">
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
          <h3>{waitlist.name}</h3>
          <p>{waitlist.description}</p>
          <p><strong>Amount:</strong> ${waitlist.amount}</p>
          <button
            onClick={handleJoin}
            disabled={isJoining}
            className="join-button"
          >
            {isJoining ? 'Joining...' : 'Join Waitlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserViewList;
