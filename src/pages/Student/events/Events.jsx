import React, { useEffect, useState } from "react";

const CombinedView = () => {
  // State for sports events
  const [sportsEvents, setSportsEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [type, setType] = useState("");
  // State for job applications
  const [jobApplications, setJobApplications] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  useEffect(() => {
    fetchEvents();
    fetchJobApplications();
  }, []);

  // Fetch sports events
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/Event/GetEvents"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setSportsEvents(data);
      setEventsLoading(false);
    } catch (error) {
      setEventsError(error.message);
      setEventsLoading(false);
    }
  };

  // Fetch job applications
  const fetchJobApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/student/FetchAllJobsApplications"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job applications");
      }
      const data = await response.json();
      setJobApplications(data);
      setJobsLoading(false);
      console.log(data);
    } catch (error) {
      setJobsError(error.message);
      setJobsLoading(false);
    }
  };

  // Handle job approval
  const handleApprove = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/ApproveJobApplication?ApplicationID=${applicationId}`,
        { method: "POST" }
      );
      if (response.ok) {
        alert("Application approved successfully!");
        fetchJobApplications();
      } else {
        alert("Failed to approve application");
      }
    } catch (error) {
      console.log("Error approving application:", error);
    }
  };

  // Render the content based on the selected type
  const renderContent = () => {
    if (type === "events") {
      return (
        <div>
          <h2>All Events</h2>
          {eventsLoading ? (
            <p>Loading events...</p>
          ) : eventsError ? (
            <p>Error loading events: {eventsError}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                padding: "20px",
              }}
            >
              {sportsEvents.map((event) => (
                <div
                  key={event.event_id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={`http://localhost/studentminiportal/Images/${event.image_path}`}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else if (type === "jobs") {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>Job Applications</h2>
          {jobsLoading ? (
            <p>Loading jobs...</p>
          ) : jobsError ? (
            <p>Error loading jobs: {jobsError}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                padding: "20px",
              }}
            >
              {jobApplications.map((application, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <h3>{application?.JobTitle}</h3>
                  <p>{application?.CompanyName}</p>
                  <p>{application?.JobDescription}</p>
                  {/* <button
                    onClick={() => handleApprove(application?.ApplicationID)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      border: "none",
                      marginTop: "10px",
                    }}
                  >
                    Approve
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      return <p>Please select a type to view content.</p>;
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            backgroundColor: "white",
            width: "90%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 10,
            padding: "20px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>All Events & Jobs</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              gap: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: "aqua",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "5px",
                borderRadius: "5px",
                fontSize: "18px",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => setType("events")}
            >
              Events
            </button>
            <button
              style={{
                backgroundColor: "aqua",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "5px",
                borderRadius: "5px",
                fontSize: "18px",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => setType("jobs")}
            >
              Jobs
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CombinedView;
