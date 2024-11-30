
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/home.css';
import Navbar from './Navbar';
import comedy from '../images/comedy.jpeg';
import movie from '../images/movie.jpeg';
import allsports from '../images/sports.jpeg';

const HomeComponent = () => {
    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-warning text-white text-center py-2">
                <h1 className="display-4 text-black">Welcome to EventHub</h1>
                <p className="lead">Your one-stop solution for discovering and booking events.</p>
                <a href="#intro" className="btn btn-outline-light btn-lg mt-3">Learn More</a>
            </div>

            {/* Introduction Section */}
            <div id="intro" className="container-fluid my-4">
                <div className="row align-items-center">
                    {/* <div className="col-md mb-3 mb-md-0">
                        <img src={movie} alt="Events" className="img-fluid rounded shadow-lg" />
                    </div> */}
                    <div className="col-md-10">
                        <h2 className="fw-bold">About EventHub</h2>
                        <p className="text-muted">
                            EventHub revolutionizes the way you discover and attend events. Whether it's a music concert, art exhibition, or a sports game, EventHub makes it easy to book your tickets and stay updated.
                        </p>
                        <p className="text-muted">
                            Our platform ensures a seamless experience for both organizers and attendees, providing efficient planning tools and personalized event recommendations.
                        </p>
                        <a href="#events" className="btn btn-primary mt-2">Explore Events</a>
                    </div>
                </div>
            </div>

            {/* Events Section */}
            <div id="events" className="bg-light py-4">
    <div className="container-fluid">
        <h2 className="text-center fw-bold mb-4">Upcoming Events</h2>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card event-card shadow-sm h-100">
                    <img src={movie} className="card-img-top event-img" alt="Movie Event" />
                    <div className="card-body">
                        <h5 className="card-title">Movie Night</h5>
                        <p className="card-text">Join us for an exclusive movie screening with an amazing ambiance.</p>
                        <a href="/login" className="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card event-card shadow-sm h-100">
                    <img src={comedy} className="card-img-top event-img" alt="Comedy Event" />
                    <div className="card-body">
                        <h5 className="card-title">Comedy Show</h5>
                        <p className="card-text">Laugh out loud at our live comedy show featuring top comedians.</p>
                        <a href="/login" className="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card event-card shadow-sm h-100">
                    <img src={allsports} className="card-img-top event-img" alt="Sports Event" />
                    <div className="card-body">
                        <h5 className="card-title">Sports Event</h5>
                        <p className="card-text">Catch the thrill of live sports action with your favorite teams.</p>
                        <a href="/login" className="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


            {/* Call to Action Section */}
            <div className="bg-warning text-white text-center py-4">
                <h2 className="fw-bold">Ready to Join the Fun?</h2>
                <p className="lead">Create an account today and never miss an event!</p>
                <a href="/login" className="btn btn-outline-light btn-lg mt-2">Sign Up Now</a>
            </div>
        </div>
    );
};

export default HomeComponent;

