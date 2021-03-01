import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setCurrentUser, currentUser }) {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
  
    const history = useHistory();
  
    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  
  
    function handleSubmit(e) {
      e.preventDefault();
      // TODO: login the user
      // POST /login
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((user) => {
          // use the response to set state
        //   console.log(user)
          setCurrentUser(user);
        //   console.log(currentUser)
          history.push("/");
          console.log(currentUser)
        }); 
    }
  
  
    return (
      <div className="login">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input className="login-btn" type="submit" value="LOG IN" />
        </form>
      </div>
    );
  }
  
  export default Login;