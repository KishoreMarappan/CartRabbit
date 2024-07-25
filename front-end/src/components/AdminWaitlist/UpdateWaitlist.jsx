import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminDashboard from './AdminDashboard.jsx';
import './UpdateWaitlist.css';

const UpdateWaitlist = () => {
  const [waitlists, setWaitlists] = useState([]);
  const [selectedWaitlist, setSelectedWaitlist] = useState('');
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
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

  const handleSelect = async (e) => {
    const waitlistId = e.target.value;
    setSelectedWaitlist(waitlistId);

    if (waitlistId) {
      try {
        const response = await axios.get(`http://localhost:3500/api/admin/view-waitlist/${waitlistId}`);
        const { name, coupon, amount, description, image } = response.data;
        setName(name || '');
        setCoupon(coupon || '');
        setAmount(amount || '');
        setDescription(description || '');
        setImage(image || null);
        setMessage('');
      } catch (error) {
        console.error('Error fetching waitlist details:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedWaitlist) {
      setMessage('Please select a waitlist to update');
      return;
    }

    const updateData = {};
    if (coupon) updateData.coupon = coupon;
    if (amount) updateData.amount = amount;
    if (description) updateData.description = description;
    
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const uploadResponse = await axios.post('http://localhost:3500/api/admin/upload-image', formData);
        updateData.image = uploadResponse.data.image;
      } catch (error) {
        console.error('Error uploading image:', error);
        setMessage('Error uploading image');
        return;
      }
    }

    try {
      const response = await axios.put(`http://localhost:3500/api/admin/update-waitlist/${selectedWaitlist}`, updateData);
      if (response.data.status) {
        Swal.fire('Waitlist Updated!');
        setWaitlists(waitlists.map(waitlist =>
          waitlist._id === selectedWaitlist ? { ...waitlist, ...updateData } : waitlist
        ));
      }
      setMessage('');
    } catch (error) {
      setMessage('Error updating waitlist');
    }
  };

  return (
    <div>
      <AdminDashboard />
      <div className="update-waitlist-container">
        <h2>Update Waitlist</h2>
        <select value={selectedWaitlist} onChange={handleSelect}>
          <option value="">Select a waitlist</option>
          {waitlists.map((waitlist) => (
            <option key={waitlist._id} value={waitlist._id}>{waitlist.name}</option>
          ))}
        </select>
        <div>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button onClick={handleUpdate}>Update</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateWaitlist;
