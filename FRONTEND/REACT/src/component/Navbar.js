import { NavLink } from "react-router-dom";
import logo from '../images/eventhub-high-resolution-logo-transparent(1).png'
import '../style/navbar.css'


const Navbar = () => {
        const navbarStyle = {
            backgroundColor: '#5a2e8e', // Custom purple color
        };
    return(
        <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
            
            <div className="container-fluid">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/organiser_register">Organizer Registration</NavLink>
                    <NavLink className="nav-link" to="/attendee_register">Attendee Registration</NavLink>
                    <NavLink className="nav-link" to="/events">Events</NavLink>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    
                </div>
                </div>
                <div className="navbar-logo ">
                    <img src={logo} className="logo"></img>
                </div>
            </div>
    </nav>
    )
}
export default Navbar;