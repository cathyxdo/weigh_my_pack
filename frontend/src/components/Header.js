import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

export default function Header() {
    const navigate = useNavigate();
    function logout() {
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
        <>
            <Link to="/signup"><button className="secondary-button">Sign Up</button></Link>
            <Link to="/login"><button className="primary-button">Login</button></Link>
            <Link to="/changepassword">Change Password</Link>
            <button className="primary-button" onClick={logout}>Logout</button>
        </>
    )
}