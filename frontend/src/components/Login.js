import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axios";
import axios from "axios";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(event) {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "user/token/", loginForm)
      .then((result) => {
        localStorage.setItem("access_token", result.data.access);
        localStorage.setItem("refresh_token", result.data.refresh);

        //initialize header with JWT token, so that when redirect happens to home it will have the auth header inside
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(result);
        navigate("/");
      });
  }
  return (
    <div className="login">
      <Link to="/">
        <h2>Weigh My Pack 🎒</h2>
      </Link>

      <form action="" className="loginform">
        <h2 className="title">Login</h2>

        <div className="inputContainer">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            className="input"
            name="email"
            value={loginForm.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="input"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="primary-button"
          value="Login"
          onClick={handleSubmit}
        />
        <div>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
