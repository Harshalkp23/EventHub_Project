import { useState } from "react";
import AttendeeRegistration from "./AttendeeRegistration";

const Registration=()=>{

    const [selectedOption, setSelectedOption] = useState('attendee'); // Default to attendee

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    return(
        <div>
            <h2>Registration</h2>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="orgnizer">Organizer</option>
        <option value="attendee">Attendee</option>
      </select>
      {selectedOption === 'customer' ? <AttendeeRegistration />:null}
        </div>
    )
}
export default Registration;