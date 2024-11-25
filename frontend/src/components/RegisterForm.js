import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "USER",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      alert("Error registering. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="phone"
            name="phone"
            placeholder="0123456789"
            onChange={handleChange}
            className="register-input"
          />
          <select
            name="role"
            onChange={handleChange}
            className="register-select"
          >
            <option value="USER">User</option>
            <option value="OWNER">Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p>
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
