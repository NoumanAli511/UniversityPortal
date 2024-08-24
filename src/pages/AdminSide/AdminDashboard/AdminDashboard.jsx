import React from "react";
import "./admindashboard.css";
import { Link } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dashboard = () => {
  return (
    <>
      <div className="Admindashboard__maincontainer">
        <div className="Admindashboard__content">
          <h3 className="biit">BIIT STUDENT PORTAL</h3>

          <Link to={"/AdminProfile"}>
            <div className="Admindashboard__btn">
              <AccountCircleIcon style={{ fontSize: 45 }} />
              <h2>Profile</h2>
            </div>
          </Link>

          <Link to={"/EventsfIRSTScreen"}>
            <div className="Admindashboard__btn">
              <EventNoteIcon style={{ fontSize: 45 }} />
              <h2>Events Management</h2>
            </div>
          </Link>

          <Link to={"/Survey"}>
            <div className="Admindashboard__btn">
              <PostAddOutlinedIcon style={{ fontSize: 45 }} />
              <h2>Survey Management</h2>
            </div>
          </Link>

          <Link to={"/PostRequest"}>
            <div className="Admindashboard__btn">
              <TouchAppOutlinedIcon style={{ fontSize: 45 }} />
              <h2>Post Request</h2>
            </div>
          </Link>
          {/* <Link to={"/JobAnnouncement"}>
            <div className="Admindashboard__btn">
              <TouchAppOutlinedIcon style={{ fontSize: 45 }} />
              <h2>JobAnnouncement</h2>
            </div>
          </Link> */}

          {/* Back button */}
          <Link to="/AdminLogin">
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
    </>
  );
};

export default Dashboard;
