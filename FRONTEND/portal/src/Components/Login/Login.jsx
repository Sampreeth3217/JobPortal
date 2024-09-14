// Login.js
import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., authenticate the user)
    console.log('Login data submitted:', formData);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email ID"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Confirm</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:'218vh',
    backgroundColor: '#000',
  },
  form: {
    backgroundColor: '#e0e0e0',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
  },
  button: {
    display: 'block',
    width: '40%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default Login;
