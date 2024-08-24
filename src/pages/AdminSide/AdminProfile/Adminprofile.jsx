import React, { useState } from "react";
import "./adminprofile.css";
import userprofile from "../../../assets/userprofile.png";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Profile = () => {
  const userString = localStorage.getItem("admin");
  const admin = userString && JSON.parse(userString);
  const [user, setUser] = useState(admin.admin);
  console.log(admin);
  return (
    <>
      <div className="adminprofilePage__mainContainer">
        <div className="adminprofilePage__container">
          <div className="adminprofilePage__heading">Profile</div>
          <img className="adminloginPage__logo" alt="" src={userprofile} />

          <div className="adminprofilePage__input">
            <div className="adminprofile__form">
              <input
                className="my-input"
                placeholder="Name"
                type="text"
                name="Name"
                readOnly
                value={user.username}
              />
              <input
                className="my-input"
                placeholder="std-ID"
                type="text"
                name="std-ID"
                readOnly
                value={user.admin_id}
              />
              <input
                className="my-input"
                placeholder="Email"
                type="text"
                name="Email"
                value={user.email}
                readOnly
              />
              <input
                type="text"
                name="Phone Number"
                className="my-input"
                placeholder="Phone Number"
                value={user.phone_no}
                readOnly
              />
              <input
                type="text"
                name="role"
                className="my-input"
                placeholder="Role"
                value={user.role}
                readOnly
              />
            </div>
            <br></br>
            <div className="rows_btn">
              <Link to="/ChangeProfile">
                <button className="editbtn">Edit</button>
              </Link>
            </div>
            <Link to="/AdminDashboard">
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

export default Profile;
