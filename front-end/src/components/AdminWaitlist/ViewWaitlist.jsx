import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminDashboard from './AdminDashboard.jsx'
import "./ViewWaitlist.css";

const WaitlistDetail = () => {
  const { id } = useParams(); // Get the ID from the route parameters
  const [waitlist, setWaitlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/api/admin/view-waitlist/${id}`
        );
        setWaitlist(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching waitlist details:", error);
        setError("Error fetching waitlist details");
        setLoading(false);
      }
    };
    fetchWaitlist();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AdminDashboard />
      <div className="waitlist-detail-container">
        <h2>Waitlist Details</h2>
        {waitlist && (
          <div>
            <h3>{waitlist.name}</h3>
            <p>
              <strong>Coupon:</strong> {waitlist.coupon}
            </p>
            <p>
              <strong>Amount:</strong> {waitlist.amount}
            </p>
            <p>
              <strong>Description:</strong> {waitlist.description}
            </p>
            {waitlist.image && <img src={waitlist.image} alt={waitlist.name} />}
            {/* Display users if included */}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistDetail;
