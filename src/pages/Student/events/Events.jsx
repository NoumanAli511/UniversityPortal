import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Modal, Box, Typography, Button, Input } from "@mui/material";

const CombinedView = () => {
  // State for sports events
  const [sportsEvents, setSportsEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [type, setType] = useState("events");
  const [showCommitBox, setShowCommitBox] = useState(false);
  const [commitText, setCommitText] = useState("");
  // State for job applications
  const [jobApplications, setJobApplications] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  // State for modal
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  // handle Add View
  const handleAddView = async (studentId, eventID) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/MarkAsViewed?eventId=${eventID}&student_id=${studentId}`,
        {
          method: "POST",
          "Content-Type": "application/json",
        }
      );
      const result = await response.json();
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const student = JSON.parse(localStorage.getItem("student"));

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    setShowCommitBox(false);
    handleAddView(student.student_id, event.event_id);
  };
  // Handle commit
  const handleCommit = () => {
    // Implement your commit logic here
    // For example, sending a POST request or updating state
    setShowCommitBox((curr) => !curr);
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/AddComment?eventId=${selectedEvent.event_id}&studentId=${student.student_id}&comment=${commitText}`,
        {
          method: "POST",
          "Content-Type": "application/json",
        }
      );
      const result = await response.json();
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Close modal
  const handleClose = () => setOpen(false);

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
                    cursor: "pointer",
                  }}
                  onClick={() => handleEventClick(event)}
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

      {/* Event Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "1px solid gray",
            boxShadow: 24,
            borderRadius: "20px",
            p: 4,
          }}
        >
          {selectedEvent && (
            <div>
              <Typography
                variant="h6"
                component="h2"
                style={{ textAlign: "center", fontSize: "24px" }}
              >
                {selectedEvent.title}
              </Typography>
              <Typography
                sx={{ mt: 2 }}
                style={{ textAlign: "center", fontSize: "14px" }}
              >
                {selectedEvent.description}
              </Typography>
              <Typography
                sx={{ mt: 2 }}
                style={{ textAlign: "right", fontSize: "12px" }}
              >
                Date: {new Date(selectedEvent.event_date).toLocaleDateString()}
              </Typography>
              <Typography
                sx={{ mt: 2 }}
                style={{ textAlign: "center", fontSize: "17px" }}
              >
                Venue: {selectedEvent.venue}
              </Typography>
              <img
                src={`http://localhost/studentminiportal/Images/${selectedEvent.image_path}`}
                alt={selectedEvent.title}
                style={{ width: "100%", height: "auto", marginTop: "10px" }}
              />
              {showCommitBox ? (
                <input
                  value={commitText}
                  onChange={(e) => setCommitText(e.target.value)}
                  style={{
                    border: "1 solid black",
                    width: "80%",
                    height: "23px",
                  }}
                  placeholder="Enter Commit.."
                />
              ) : (
                <></>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  onClick={!showCommitBox ? handleCommit : handleSubmit}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  {!showCommitBox ? "commit" : "Submit"}
                </Button>
                <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CombinedView;
