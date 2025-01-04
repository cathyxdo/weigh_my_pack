import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  // extract from url path i.e.reset-password/12837189237821/123812738912
  let { uidb64, token } = useParams();
  let apiUrl = "/api/user/reset-password/" + uidb64 + "/" + token + "/";

  const [apiResponse, setApiResponse] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    new_password: "",
  });

  function handleChange(event) {
    setPasswordForm({
      ...passwordForm,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(apiUrl, passwordForm)
      .then((result) => {
        console.log(result);
        setApiResponse("success");
      })
      .catch((error) => {
        console.log(error);
        setApiResponse("error");
      });
  }

  return (
    <div>
      <p>Reset Password</p>
      <p>{uidb64}</p>
      <p>{token}</p>

      {apiResponse === "" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="" className="label">
            Password
          </label>
          <input
            type="password"
            className="input"
            name="new_password"
            value={passwordForm.new_password}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="primary-button"
            value="Reset Password"
          />
        </form>
      )}
      {apiResponse === "success" && (
        <p>Password was successfully updated, go log in</p>
      )}
      {apiResponse === "error" && <p>Reset Link Invalid, go home</p>}
    </div>
  );
}
