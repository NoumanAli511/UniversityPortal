import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Retrieve and parse the student data from localStorage
  const studentFounded = localStorage.getItem("student");
  const student = JSON.parse(studentFounded);

  return (
    <>
      <div className="dashboard__maincontainer">
        <div className="dashboard__content">
          <h3 className="biit">BIIT STUDENT PORTAL</h3>

          <Link to={"/profile"}>
            <div className="StudentButton">
              <h2>Profile</h2>
            </div>
          </Link>

          <Link to={"/events"}>
            <div className="StudentButton">
              <h2>Upcoming Events</h2>
            </div>
          </Link>

          <Link to={"/SurveyResponse"}>
            <div className="StudentButton">
              <h2>Survey</h2>
            </div>
          </Link>

          {student && student.status !== "current" ? (
            <Link to={"/job-announcement"}>
              <div className="StudentButton">
                <h2>Job Announcement</h2>
              </div>
            </Link>
          ) : null}

          <Link to={"/Searching"}>
            <div className="StudentButton">
              <h2>Searching</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
