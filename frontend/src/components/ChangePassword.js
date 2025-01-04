import { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    old_password: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(event) {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    axiosInstance.put("user/changepassword/", passwords).then((result) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;
      navigate("/login");
    });
  }

  return (
    <div className="changepassword">
      <form action="" className="changepasswordform">
        <h1 class="title">Change Password</h1>

        <div className="inputContainer">
          <label htmlFor="old_password" className="label">
            Old Password
          </label>
          <input
            type="password"
            className="input"
            name="old_password"
            value={passwords.old_password}
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password" className="label">
            New Password
          </label>
          <input
            type="password"
            className="input"
            name="password"
            value={passwords.password}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="primary-button"
          value="Change Password"
          onClick={handleSubmit}
        />

        <div>
          <Link to="/">Go Back</Link>
        </div>
      </form>
    </div>
  );
}
