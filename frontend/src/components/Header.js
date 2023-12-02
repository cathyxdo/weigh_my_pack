import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

export default function Header({ isLoggedIn }) {
    const navigate = useNavigate();
    function logout(event) {
        console.log('logout');
        const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
        navigate('/login');

    }
    return (
        <div className="userHeader">
            {!isLoggedIn && 
                <>
                    <Link to="/signup"><button className="secondary-button">Sign Up</button></Link>
                    <Link to="/login"><button className="primary-button">Login</button></Link>
                </>
            }
            {isLoggedIn && 
                <>
                    <button className="primary-button" onClick={logout}>Logout</button>
                    <Link to="/changepassword">Change Password</Link>

                </>
            }
        </div>
    )
}