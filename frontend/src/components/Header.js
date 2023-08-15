import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <Link to="/signup"><button className="secondary-button">Sign Up</button></Link>
            <Link to="/login"><button className="primary-button">Log In</button></Link>
        </>
    )
}