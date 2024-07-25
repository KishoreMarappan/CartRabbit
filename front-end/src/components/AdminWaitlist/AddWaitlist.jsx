import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddWaitlist.css';
import AdminDashboard from './AdminDashboard.jsx';

const AddWaitlist = () => {
  const [formData, setFormData] = useState({
    name: '',
    coupon: '',
    amount: '',
    description: '',
    imageFile: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('coupon', formData.coupon);
      data.append('amount', formData.amount);
      data.append('description', formData.description);
      data.append('image', formData.imageFile); // Ensure the field name matches
  
      const response = await axios.post('http://localhost:3500/api/admin/add-waitlist', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.status) {
        Swal.fire('Waitlist Created!');
      }
  
      setMessage(`Waitlist created: ${response.data.name}`);
      setFormData({
        name: '',
        coupon: '',
        amount: '',
        description: '',
        imageFile: null,
      });
    } catch (error) {
      setMessage('Error creating waitlist');
    }
  };
  
  return (
    <div>
      <AdminDashboard />
      <div className="add-waitlist-container">
        <h2>Create Waitlist</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Waitlist Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="coupon">Coupon Code:</label>
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={formData.coupon}
            onChange={handleChange}
            required
          />
          <label htmlFor="amount">Product Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Product Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image" // Make sure this matches what Multer expects
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Create</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddWaitlist;
