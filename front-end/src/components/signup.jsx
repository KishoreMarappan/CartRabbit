import React, { useState } from "react";
import Axios from "axios";
import {Link , useNavigate} from 'react-router-dom';
import "../components/signups.css";
// import Login from "./Login";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == confirmpassword) {
      Axios.post("http://localhost:3500/auth/signup", {
        username,
        email,
        password,
      }).then(response =>{
        if(response.data.status){
          console.log("Account created successfully!");
          navigate('/login'); 
        }
      }).catch(error=>{
        console.log(error)
      })
    }
    else{
      console.log("password mismatching");
    }
  };

  // https://www.youtube.com/watch?v=a0OteSViYpg

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} >
        <h2 >SignUp</h2>
        {/* <label className='lb-signup' htmlFor="fullname">FullName : </label>
        <input className='input-signup' type="text" placeholder='Username' required/> */}
        <label className="lb-signup" htmlFor="username">
          UserName :
        </label>
        <input
          className="input-signup"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <label className="lb-signup" htmlFor="password">
          Password :
        </label>
        <input
          className="input-signup"
          type="password"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="lb-signup" htmlFor="confirm-password">
          Confirm Password :
        </label>
        <input
          className="input-signup"
          type="password"
          placeholder="********"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="signup-btn" type="submit">
          signup
        </button>
        <span>Already have an account ? <Link to="/login">Login</Link></span> 
      </form>
    </div>
  );
}

export default SignUp;
