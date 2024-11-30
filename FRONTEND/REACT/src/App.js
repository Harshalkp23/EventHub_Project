import './App.css';
import AttendeeRegistration from './component/AttendeeRegistration';
import OrganizerRegistration from './component/OrganizerRegistration';
import HomeComponent from './component/HomeComponent';
import LoginComponent from './component/LoginComponent';
import EventsComponent from './component/EventsComponent';
import { Routes, Route} from 'react-router-dom';
import { Organizer } from './component/Organizer';
// import { useSelector } from 'react-redux';
// import { EventNavbar } from './navbars/EventNavbar';
import Attendee from './component/Attendee';
import Bookings from './attendee/MyBookings';
// import AddEvent from './component/AddEvents';
import AddEvents from './component/AddEvents';
import MyEvents from './organizer/MyEvents';
import Navbar from './component/Navbar';
import Profile from './attendee/Profile';
import ViewEvents from './attendee/ViewEvents';
import BookedEvents from './attendee/BookedEvents';
import AdminPage from './component/Admin';
import OrganizerBookings from './organizer/OrganizerBookings';

function App() {
  // const { isLoggedIn } = useSelector((state) => state.login);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/attendee_register" element={<AttendeeRegistration />} />
        <Route path="/organizer" element={<Organizer />} /> 
        <Route path="/attendee" element={<Attendee />} /> 
        <Route path="/organiser_register" element={<OrganizerRegistration />} />
        <Route path="/bookevents" element={<OrganizerBookings />} />
        <Route path="/events" element={<EventsComponent />} />
        <Route path="/addevents" element={<AddEvents />} />
        <Route path="/organizer/myevents" element={<MyEvents />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/attendee/profile" element={<Profile />} />
        <Route path="/attendee/viewevents" element={<ViewEvents />} />
        <Route path="/attendee/bookedevents" element={<BookedEvents />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/attendee/bookings" element={<Bookings />} />
        <Route path="/attendee/bookedevents" element={<BookedEvents />} />
        <Route path="/organizer/organizerbookings" element={<OrganizerBookings />} />

        

      </Routes>
    </div>
  );
}

export default App;
