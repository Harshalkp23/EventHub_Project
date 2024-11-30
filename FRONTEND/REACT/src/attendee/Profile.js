
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../component/loginSlice";
import Attendee from "../component/Attendee";

const Profile = () => {
    const [user, setUser] = useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userId'));
        
        if (storedData && storedData.user && storedData.user.userId) {
            const userId = storedData.user.userId;
            fetch(`http://localhost:8080/users/${userId}`)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Failed to fetch user details.');
                    }
                    return resp.json();
                })
                .then(obj => {
                    localStorage.setItem("loggedUser", JSON.stringify(obj));
                    setUser(obj);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        } else {
            console.error('User ID not found in localStorage.');
        }
    }, []);

    return (
        <div>
        <Attendee/>
        <div className="container-fluid mt-1">
           
            <h2 className="text-success">Welcome {user ? `${user.fname} ${user.lname}` : 'Loading...'}</h2>
            {user && (
                
                <table className="table table-bordered table-info table-hover table-striped">
                <thead className="thead-light">
                    {/* <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr> */}
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Username</strong></td>
                        <td>{user.userName}</td>
                    </tr>
                    <tr>
                        <td><strong>First Name</strong></td>
                        <td>{user.fname}</td>
                    </tr>
                    <tr>
                        <td><strong>Last Name</strong></td>
                        <td>{user.lname}</td>
                    </tr>
                    <tr>
                        <td><strong>Date of Birth</strong></td>
                        <td>{user.dob}</td>
                    </tr>
                    <tr>
                        <td><strong>Aadhar Number</strong></td>
                        <td>{user.aadharNo}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Pincode</strong></td>
                        <td>{user.pincode}</td>
                    </tr>
                    <tr>
                        <td><strong>Address</strong></td>
                        <td>{user.address}</td>
                    </tr>
                    <tr>
                        <td><strong>Mobile Number</strong></td>
                        <td>{user.mobileNo}</td>
                    </tr>
                </tbody>
            </table>
            
                    
                  
                
            )}
        </div>
        </div>
    );
}

export default Profile;
