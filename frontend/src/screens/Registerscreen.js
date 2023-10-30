import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waitMessage, setWaitMessage] = useState(false);
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  async function register() {
    if (!name || !email || !password || !cpassword) {
      setValidationError("All fields are required");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setValidationError("Invalid email format");
      return;
    }

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long");
      return;
    }

    if (password !== cpassword) {
      setValidationError("Passwords do not match");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      const result = (await axios.post("/api/users/register", user)).data;
      setLoading(false);
      setSuccess(true);
      console.log(result);
      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");

      // Display "Login success" message for 2 seconds
      setTimeout(() => {
        setSuccess(false);
        setWaitMessage(true);
        // Display "Wait a moment..." message for 2 seconds
        setTimeout(() => {
          // Redirect to the login page after the second message is hidden
          navigate("/login");
        }, 2000);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="gifs" style={{ margin: "125px 0px 0px 0px" }}>
      <div className="glass">
        {loading && <Loader />}
        {error && <Error />}
        {success && !waitMessage && <Success message="Login success" />}
        {waitMessage && <Success message="Wait a moent..." />}

        <center>
          <h1 className="rl">Register</h1>
        </center>
        {validationError && (
          <div className="error-message">{validationError}</div>
        )}
        <input
          type="text"
          placeholder="name"
          className="form"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="email"
          placeholder="email"
          className="form"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          className="form"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="confirm password"
          className="form"
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
        />
        <br />
        <button className="rlb" onClick={register}>
          Register
        </button>{" "}
        <br /> <br />
        <a className="click-lo-ri" href="/login">
          Click here to login
        </a>
      </div>
    </div>
  );
}

export default Registerscreen;
