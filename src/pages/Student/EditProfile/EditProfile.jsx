import React, { useState } from "react";
import "./editprofile.css";
import { useLocation } from "react-router-dom";

const EditProfile = () => {
  const location = useLocation();
  const userFounded = location.state;
  console.log(userFounded);
  const [email, setEmail] = useState(userFounded.email);
  const [phone_no, setPhone_no] = useState(
    userFounded.phone_number || userFounded.phone_no
  );

  const handleSubmit = async () => {
    if (email && phone_no) {
      const response = await fetch(
        `http://localhost/studentminiportal/api/miniportal/updateEmailAndPhoneNumberOfStudent?email=${email}&phone_no=${phone_no}&studentId=${userFounded.student_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.json();
      if (result) {
        alert("updated the Records");
      }
    } else {
      alert("Fields must not be empty");
    }
  };
  return (
    <div className="edit-profile-maincontainer">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <div className="input-container">
          <label htmlFor="email" style={{ fontSize: "18px", color: "white" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="phone" style={{ fontSize: "18px", color: "white" }}>
            Phone:
          </label>
          <input
            type="tel"
            value={phone_no}
            onChange={(e) => setPhone_no(e.target.value)}
          />
        </div>
        <button className="save-changes-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
