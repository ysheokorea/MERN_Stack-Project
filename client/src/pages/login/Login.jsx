import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './login.css'

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type:'LOGIN_START'})
    try {
        const res = await axios.post("/auth/login", credentials);
        dispatch({type:'LOGIN_SUCCESS', payload:res.data})
        navigate("/");
    } catch (err) {
        dispatch({type:'LOGIN_FAILURE', payload:err.response.data})
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          onChange={handleChange}
          className="lInput"
          id="username"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="lInput"
          id="password"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}
