import React from 'react'
import { useState } from 'react'
function Login() {
    const[formdata, setformdata] = useState({
        email : "",
        password : "",
    })
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${formdata.email} | ${formdata.password}`);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formdata.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formdata.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login