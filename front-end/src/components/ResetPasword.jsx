import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import './ResetPassword.css';

function ResetPasword() {
    const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {token} = useParams();
  const handleSubmit = (a)=>{
    a.preventDefault();
    axios.post(`http://localhost:3500/auth/resetpassword/${token}`,{
        password
    }).then((res)=>{
      if(res.data.status){
        Swal.fire("New Password Updated");
        navigate('/login');
      }
    }).catch(err=>{
      console.log("Error while resetting password");
      console.log(err);
    });          
}

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label className="input-reset" htmlFor="password">
          Password :
        </label>
        <input
          className="input-reset"
          type="password"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="reset-btn" type="submit">
          Set
        </button>
        <span>
          Back to LogIn <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default ResetPasword;
