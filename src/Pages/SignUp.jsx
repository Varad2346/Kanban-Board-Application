import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [formData, setFormData] = useState({ email: "", password: "",name:"" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name,email, password } = formData;
      console.log(name,email, password);
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/");
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
      <div className="register-container">
        <form className="login-content" onSubmit={handleSubmit}>
          <div className="login-header" style={{ textAlign: "center" }}>
            Create Account
          </div>
          <div className="login-body">
            <div className="login-email">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                id="email"
                name="name"
                className="login-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="login-input"
                  value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-input"
                  value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-show-password">
              <input type="checkbox" className="password-checkbox" />
              <span>Show Password</span>
            </div>
            <div className="login-submit">
              <button className="login-btn">Register</button>
            </div>
          </div>
          <div className="login-footer">
            <span>Already have an account? </span>
            <a href="/" style={{ textDecoration: "none", color: "blue" }}>
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
