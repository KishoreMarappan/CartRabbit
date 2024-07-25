import React, { useState } from "react";
import "../components/signins.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3500/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data.token);
        if (res.data.status) {
          navigate("/home");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>LogIn</h2>
        <label className="lb-signin" htmlFor="email">
          Email :
        </label>
        <input
          className="input-signin"
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="lb-signin" htmlFor="password">
          Password :
        </label>
        <input
          className="input-signin"
          type="password"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="signin-btn" type="submit">
          LogIn
        </button>
        <span>
          <Link to="/forgotpassword">Forgotpassword</Link>
        </span>
        <p>
          Don't have an account ? <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
