import React from "react";
import "./viewresult.css";

const JobAnnouncement = () => {
  return (
    <div className="container">
      <h1 className="heading">Job Announcement</h1>
      <h2 className="jobTitle">React Developer</h2>
      <div className="jobDetailsContainer">
        <p className="companyName">Company: ABC Software</p>
        <p className="jobInfo">
          Skills Required: Mobile Development, App Development
        </p>
        <p className="jobInfo">Experience Level: Medium</p>
        <p className="jobInfo">Salary Range: $40,000 - $60,000</p>
        <p className="jobInfo">Location: Rawalpindi</p>
        <p className="jobInfo">Apply Before: 4/4/2024</p>
        <p className="email">Send Resume to: example@example.com</p>
      </div>
      <button className="approveButton">
        <span className="buttonText">Approve</span>
      </button>
    </div>
  );
};

export default JobAnnouncement;
