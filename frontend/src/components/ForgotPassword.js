import { useState } from "react";
import axios from "axios";
export default function ForgotPassword() {
    const [emailForm, setEmailForm] = useState({
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState();
    const [emailSent, setEmailSent] = useState(false);

    function handleChange(event) {
        setEmailForm({
            ...emailForm,
            [event.target.name]:  event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/user/forgot-password/', emailForm)
        .then(result => {
            console.log(result);
            setEmailSent(true);
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(error.response.data.error);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="text" name="email" value={emailForm.email} onChange={handleChange}/>
                <button type="submit" className="primary-button">Reset Password</button>
            </form>
            <p>{errorMessage}</p>
            {emailSent && (
                <p>Recovery email has been sent</p>
            )}
        </div>
    )
}