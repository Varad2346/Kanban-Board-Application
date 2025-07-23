import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {  useSnackbar } from 'notistack';

const Login = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        enqueueSnackbar("Login successful!", { variant: "success" });
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="project-heading">Kanban Application</div>
      <div className="login-container">
        <form className="login-content" onSubmit={handleSubmit}>
          <div className="login-header" style={{ textAlign: "center" }}>
            Welcome to Kanban!
          </div>
          <div className="login-body">
            <div className="login-email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="login-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-show-password">
              <input
                type="checkbox"
                className="password-checkbox"
                onChange={() => {
                  let input = document.getElementById("password");
                  input.type = input.type == "password" ? "text" : "password";
                }}
              />
              <span>Show Password</span>
            </div>
            <div className="login-submit">
              <button className="login-btn">Log In</button>
            </div>
          </div>
          <div className="login-footer">
            <span>Don't have an account? </span>
            <a
              href="/register"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
