import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./createsurvey.css";
import { useNavigate } from "react-router-dom";

const NewSurvey = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

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
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Select Start Date"
          className="input"
        />
      </div>
      <div className="input-container">
        <i className="fa fa-calendar icon"></i>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Select End Date"
          className="input"
        />
      </div>
      <button className="button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default NewSurvey;
