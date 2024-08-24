import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import "./eventshistory.css";

const ViewResults = () => {
  const [surveys, setSurveys] = useState([]); // State to hold the list of surveys
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [isViewingResults, setIsViewingResults] = useState(false);
  const navigate = useNavigate();

  // Fetch surveys when the component mounts
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "http://localhost/studentminiportal/api/Survey/FetchAllSurveys"
        );
        if (response.status === 200) {
          setSurveys(response.data); // Set the retrieved surveys to the state
        } else {
          console.error("Error fetching surveys:", response.data);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedSurvey(event.target.value);
  };

  const handleViewResults = () => {
    if (selectedSurvey) {
      setIsViewingResults(true);
    } else {
      alert("Please select a survey.");
    }
  };

  const handleEdit = () => {
    setIsViewingResults(false);
  };

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          &larr;
        </button>
        <h2>View Results</h2>
      </div>
      <div className="content">
        <h3>Select Survey to View Results</h3>
        {!isViewingResults ? (
          <div className="form-group">
            <label htmlFor="surveySelect">Select Survey</label>
            <select
              id="surveySelect"
              value={selectedSurvey}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select Survey
              </option>
              {surveys.map((survey) => (
                <option key={survey.surveyID} value={survey.surveyID}>
                  {survey.title} ({survey.startDate})
                </option>
              ))}
            </select>
            <button className="view-results-button" onClick={handleViewResults}>
              View Results
            </button>
          </div>
        ) : (
          <div>
            {/* Graph Creation */}
            <h4>Selected Survey: {selectedSurvey}</h4>
            <button className="edit-button" onClick={handleEdit}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResults;
