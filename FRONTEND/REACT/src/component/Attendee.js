
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setUser } from "./loginSlice";
import { useEffect } from "react";

const Attendee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Retrieve user information from the Redux store
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg w-100 navbar-light bg-warning">
                <div className="container-fluid">
                    <div className="navbar-brand">Attendee</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/attendee/viewevents" className="nav-link">View Events</Link></li>
                            <li className="nav-item"><Link to="/attendee/bookedevents" className="nav-link">Booked Events</Link></li>
                            <li className="nav-item"><Link to="/attendee/profile" className="nav-link">Profile</Link></li>
                        </ul>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <h2 className="text-center text-bg-dark my-4">
                Welcome, {user?.fname} {user?.lname}!
            </h2>
        </div>
    );
}

export default Attendee;

