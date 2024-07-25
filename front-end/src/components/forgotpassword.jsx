import React, { useState } from 'react';
import axios  from 'axios';
import Swal from 'sweetalert2';
import {  Link, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function forgotpassword() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3500/auth/forgotpassword',{
            email
        }).then((res)=>{
          if(res.data.status){
            Swal.fire("Check your email for password reset link!!");
            navigate('/login');
          }
        }).catch(err=>{
          console.log("Error while resetting password");
          console.log(err);
        });          
    }
  return (
    <div className="forgot-container">
      <form className="forgotpassword-form" onSubmit={handleSubmit} >
        <h2 >Forgot Password</h2>
        <label className="lb-signup" htmlFor="email">
          Email :
        </label>
        <input
          className="input-signup"
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="forgot-btn" type="submit">
          send
        </button>
        <span>Back to LogIn <Link to="/login">Login</Link></span> 
      </form>
    </div>
  )
}

export default forgotpassword