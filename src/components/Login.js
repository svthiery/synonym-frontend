import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setCurrentUser, currentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  console.log(errors);

  const history = useHistory();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: login the user
    // POST /login
    fetch(`https://evening-dusk-01854.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        // use the response to set state
        //   console.log(user)
        if (data.errors) {
          setErrors(data.errors);
          setFormData({
            username: "",
            password: "",
          });
        } else {
          const { user, token } = data;

          localStorage.setItem("token", token);

          setCurrentUser(user);
          history.push("/");
        }
      });
  }

  return (
    <div className="login">
      <h1>Log In</h1>
      <div className="login-form-box">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="username-div">
            <label>Username </label>
            <input
            className="login-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="password-div">
            <label>Password </label>
            <input
            className="login-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.map((error) => {
            return <p className="error">{error}</p>;
          })}
          <input className="login-btn" type="submit" value="LOG IN" />
        </form>
        <div>
          <p>To play without creating an account, use the following credentials to log in:</p>
          <p>Username: anon</p>
          <p>Password: play</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
