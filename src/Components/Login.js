// src/Login.js
import React, { useState } from 'react';

function Login(props) {
  const [formData, setFormData] = useState({ "userName": "", "password": "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
  };
  console.log(formData);
  const handleSubmit = (e) => {
    fetch("http://localhost:8080/api/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json"}, // Set the content type to JSON 
        })
          .then((res) => res.json())
          .then((res) => {
           if(res.message)
           {
            localStorage.setItem("token",res.message);
            props.history.push("/employees");
            document.location.reload();
           }
           else{
            props.history.push("/");
           }

          });
          e.preventDefault();
        console.log('Form submitted with data:', formData);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
