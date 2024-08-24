import React, { useState } from "react";
import "./profile.css";
import logo from "../../../assets/logo.jpeg";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentProfile = () => {
  const userString = localStorage.getItem("student");
  const studentFounded = userString && JSON.parse(userString);
  const [student, setstudent] = useState(studentFounded);
  console.log(student);
  return (
    <>
      <div className="profilePage__mainContainer">
        <div className="profilePage__container">
          <img className="profilePage__logo" src={logo} alt="logo" />
          <div className="profilePage__heading"></div>
          <div className="profilePage__input">
            <div className="profile__form">
              <input
                className="my-input"
                placeholder="Name"
                type="text"
                name="Name"
                value={student && student.name}
                readOnly
              />
              <input
                className="my-input"
                placeholder="Arid-Number"
                type="text"
                name="AridNumber"
                value={student && student.arid_number}
                readOnly
              />
              <input
                className="my-input"
                placeholder="Email"
                type="text"
                name="Email"
                value={student && student.email}
                readOnly
              />
              <input
                type="text"
                name="Phone Number"
                className="my-input"
                placeholder="Phone Number"
                value={student && student.phone_number}
                readOnly
              />
              <input
                type="text"
                name="Degree"
                className="my-input"
                placeholder="Degree"
                value={student && student.department}
                readOnly
              />
            </div>
            <br></br>
            <div className="rows_btn">
              <Link to="/EditProfile">
                <button className="editbtn">Edit</button>
              </Link>
            </div>

            <Link to="/Dashboard">
              <div
                className="Admindashboardback__btn"
                style={{ marginTop: "20px" }}
              >
                <ArrowBackIcon style={{ fontSize: 45 }} />
                <h2>Back</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
