import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditSurvey = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Retrieve the survey ID from local storage
  const surveyId = localStorage.getItem("selectedSurvey");

  useEffect(() => {
    // Fetch survey data when component mounts
    const fetchSurvey = async () => {
      try {
        const response = await fetch(
          `http://localhost/studentminiportal/api/Survey/FetchSingleSurvey?surveyId=${surveyId}`
        );
        const result = await response.json();
        if (result) {
          setTitle(result.SurveyTitle);
          setStartDate(result.StartDate.split("T")[0]);
          setEndDate(result.EndDate.split("T")[0]);
          localStorage.setItem("recentSurvey", JSON.stringify(result));
        }
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Survey/UpdatingSurvey?surveyId=${surveyId}&surveyTitle=${title}&startDate=${startDate}&endDate=${endDate}`,
        {
          method: "POST",
          "Content-Type": "application/json",
        }
      );
      const data = await response.json();
      if (data === "Updated the Survey") {
        alert(data);
        //navigate("/Survey"); // Navigate back to the surveys list
      } else {
        console.log(
          "Error",
          `Failed to update survey: ${JSON.stringify(data)}`
        );
      }
    } catch (error) {
      console.error("Error updating survey:", error);
      alert("Failed to update survey");
    }
  };

  return (
    <div className="container">
      <h1 className="header">Edit Survey</h1>
      <div className="input-container">
        <i className="fa fa-clipboard icon"></i>
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Survey Title"
        />
      </div>
      <div className="input-container">
        <i className="fa fa-calendar icon"></i>
        <input
          type="date"
          className="input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Select Start Date"
          min={getTodayDate()} // Set minimum date to today
        />
      </div>
      <div className="input-container">
        <i className="fa fa-calendar icon"></i>
        <input
          type="date"
          className="input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Select End Date"
          min={getTodayDate()} // Set minimum date to today
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <button
          className="button"
          onClick={() => {
            navigate("/updateQuestions");
          }}
        >
          Edit More
        </button>
        <button className="button" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
      <Link to="/Survey">
        <div className="Admindashboardback__btn" style={{ marginTop: "20px" }}>
          <ArrowBackIcon style={{ fontSize: 45 }} />
          <h2>Back</h2>
        </div>
      </Link>
    </div>
  );
};

export default EditSurvey;
