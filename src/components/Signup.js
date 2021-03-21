import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({ setCurrentUser }) {
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
    fetch(`https://evening-dusk-01854.herokuapp.com/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
          // setFormData({
          //     username: "",
          //     password: "",
          //   })
        } else {
          const { user, token } = data;

          localStorage.setItem("token", token);
          setCurrentUser(data);
          console.log(data);
          history.push("/");
        }
      });
  }

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <div className="signup-form-box">
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
          <input className="signup-btn" type="submit" value="REGISTER" />
        </form>
      </div>
    </div>
  );
}

export default Signup;
