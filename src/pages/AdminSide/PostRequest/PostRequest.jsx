import React, { useState, useEffect } from "react";
import "./postrequest.css"; // Ensure your CSS handles both list and detail views

const PendingRequest = () => {
  const [jobsApplications, setJobApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold the selected job

  const FetchAllJobsApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/student/FetchAllJobsApplications"
      );
      const result = await response.json();
      if (result.length > 0) {
        setJobApplications(result);
        setSelectedJob(result[0]);
      } else {
        alert("No job applications found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchAllJobsApplications();
  }, []);

  const handleApprove = async (applicationId, status) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/survey/AproveTheJob?application_id=${applicationId}&status=${status}`,
        {
          method: "POST",
          "Content-Type": "application/json",
        }
      );
      if (response.ok) {
        const result = await response.json();
        alert(result);
        // Update the job applications list after approval
        FetchAllJobsApplications();
        setSelectedJob(null);
      } else {
        alert("Failed to approve application");
      }
    } catch (error) {
      console.log("Error approving application:", error);
    }
  };

  return (
    <div className="job-container">
      <div className="job-list">
        {jobsApplications.map((job, index) => (
          <div
            key={index}
            className="job-item"
            onClick={() => setSelectedJob(job)}
          >
            <p className="job-title">{job.JobTitle}</p>
            <p className="job-company">{job.CompanyName}</p>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="job-detail">
          <h2>{selectedJob.JobTitle}</h2>
          <h3>{selectedJob.CompanyName}</h3>
          <p>{selectedJob.JobDescription}</p>
          <div className="student-info">
            <h4>Applicant Details:</h4>
            <p>
              <strong>Name:</strong> {selectedJob.studentInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedJob.studentInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedJob.studentInfo.phone_number}
            </p>
            <p>
              <strong>ARID:</strong> {selectedJob.studentInfo.arid_number}
            </p>
            <p>
              <strong>Department:</strong> {selectedJob.studentInfo.department}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <button
              className="approve-button"
              onClick={() => handleApprove(selectedJob.ApplicationID, 1)}
            >
              Approve
            </button>
            <button
              className="approve-button"
              style={{ backgroundColor: "red" }}
              onClick={() => handleApprove(selectedJob.ApplicationID, -1)}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequest;
