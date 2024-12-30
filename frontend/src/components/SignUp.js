import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [userForm, setUserForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    function handleChange(event) {
        setUserForm({
            ...userForm,
            [event.target.name]:  event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userForm);

        axios.post(process.env.REACT_APP_API_BASE_URL + 'user/register/', userForm)
        .then(result => {
            console.log(result);
            navigate('/login');
        })
    }


    return (
        <div className="signup">
            <Link to="/"><h2>Weigh My Pack 🎒</h2></Link>

            <form action="" className="signupform">
                <h1 class="title">Sign up</h1>
    
                <div className="inputContainer">
                    <label for="" className="label">Email</label>
                    <input type="text" className="input" name='email' value={userForm.email} onChange={handleChange}/>
                </div>
                <div className="inputContainer">
                    <label for="" className="label">Password</label>
                    <input type="password" className="input" name='password' value={userForm.password} onChange={handleChange}/> 
                </div>
            
                <input type="submit" className="primary-button" value="Sign up" onClick={handleSubmit}/>

                <div>
                    <Link to="/login">Already have an account? Login</Link>
                </div>
                <div>
                    <Link to="/">Skip Sign Up</Link>
                </div>
            </form>
        </div>
    )
}