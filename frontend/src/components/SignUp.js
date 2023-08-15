import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [userForm, setUserForm] = useState({
        email: '',
        user_name: '',
        first_name: '',
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

        axiosInstance.post('user/register/', userForm)
        .then(result => {
            console.log(result);
            navigate('/login');
        })
    }


    return (
        <div className="signupForm">
            <form action="" class="form">
                <h1 class="title">Sign up</h1>
    
                <div className="inputContainer">
                    <label for="" className="label">Email</label>
                    <input type="text" className="input" name='email' value={userForm.email} onChange={handleChange}/>
                </div>
    
                <div className="inputContainer">
                    <label for="" className="label">Username</label>
                    <input type="text" className="input" name='user_name' value={userForm.user_name} onChange={handleChange}/>
                </div>
                <div className="inputContainer">
                    <label for="" className="label">First Name</label>
                    <input type="text" className="input" name='first_name' value={userForm.first_name} onChange={handleChange}/> 
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