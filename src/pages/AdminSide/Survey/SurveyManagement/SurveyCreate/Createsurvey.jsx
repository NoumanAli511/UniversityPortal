import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createsurvey.css";

const NewSurvey = () => {
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

  const handleSubmit = async () => {
    try {
      console.log("Submitting survey:", { title, startDate, endDate });
      const response = await fetch(
        `http://localhost/studentminiportal/api/Survey/Addsurvey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SurveyTitle: title,
            StartDate: startDate,
            EndDate: endDate,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem("recentSurvey", JSON.stringify(data));
        navigate("/BothStudent", { state: { name: title } });
      } else {
        console.log("Error", `Failed to add survey: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error adding survey:", error);
      alert("Failed to add survey");
    }
  };

  return (
    <div className="container">
      <h1 className="header">Survey Form</h1>
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
      <button className="button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default NewSurvey;
