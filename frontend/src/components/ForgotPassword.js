import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const [emailForm, setEmailForm] = useState({
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const [emailSent, setEmailSent] = useState(false);

  function handleChange(event) {
    setEmailForm({
      ...emailForm,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "user/forgot-password/",
        emailForm
      )
      .then((result) => {
        console.log(result);
        setEmailSent(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
      });
  }
  return (
    <div className="forgotpassword">
      <Link to="/">
        <h2>Weigh My Pack 🎒</h2>
      </Link>

      <form onSubmit={handleSubmit} className="forgotpasswordform">
        <h2>Forgot Password</h2>
        <div className="inputContainer">
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={emailForm.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="primary-button">
          Reset Password
        </button>
        <div>
          <Link to="/login">Go back to Login</Link>
        </div>
      </form>
      <p>{errorMessage}</p>
      {emailSent && <p>Recovery email has been sent</p>}
    </div>
  );
}
