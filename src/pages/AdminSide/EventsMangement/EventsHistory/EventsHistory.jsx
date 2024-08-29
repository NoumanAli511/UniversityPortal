import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Pie } from "react-chartjs-2"; // Import Pie from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import ChartJS modules
import "./eventshistory.css";

ChartJS.register(ArcElement, Tooltip, Legend); // Register chart elements

const ViewResults = () => {
  const [surveys, setSurveys] = useState([]); // State to hold the list of surveys
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [surveyResults, setSurveyResults] = useState(null); // State to hold the survey results data
  const [isViewingResults, setIsViewingResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "http://localhost/studentminiportal/api/Survey/FetchAllSurveys"
        );
        if (response.status === 200) {
          setSurveys(response.data);
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

  const handleViewResults = async () => {
    if (selectedSurvey) {
      try {
        const response = await axios.get(
          `http://localhost/studentminiportal/api/survey/GetSurveyResult?survey_id=${selectedSurvey}`
        );
        if (response.status === 200) {
          setSurveyResults(response.data);
          setIsViewingResults(true);
        } else {
          console.error("Error fetching survey results:", response.data);
        }
      } catch (error) {
        console.error("Error fetching survey results:", error);
      }
    } else {
      alert("Please select a survey.");
    }
  };

  const handleEdit = () => {
    setIsViewingResults(false);
    setSurveyResults(null);
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Function to create pie chart data
  const createPieChartData = (questionData) => {
    return {
      labels: Object.keys(questionData.OptionCounts), // Options as labels
      datasets: [
        {
          label: "Responses",
          data: Object.values(questionData.OptionCounts), // Counts as data
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <div className="container">
      <div className="header">
        <h2>View Results</h2>
      </div>
      <div className="content">
        {!isViewingResults ? (
          <div className="form-group">
            <label htmlFor="surveySelect">Select Survey</label>
            <select
              id="surveySelect"
              value={selectedSurvey}
              onChange={handleSelectChange}
            >
              <option value="" disabled style={{ fontSize: 10 }}>
                Select Survey
              </option>
              {surveys.map((survey) => (
                <option key={survey.surveyID} value={survey.surveyID}>
                  {" "}
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
            <h4>Survey Results</h4>
            {surveyResults &&
              surveyResults.map((questionData, index) => (
                <div key={index}>
                  <h2
                    style={{
                      border: "1px solid gray",
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    {questionData.QuestionText}
                  </h2>
                  <Pie data={createPieChartData(questionData)} />
                </div>
              ))}
            <button className="edit-button" onClick={handleEdit}>
              Back
            </button>
          </div>
        )}
        <Link to="/Survey">
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
  );
};

export default ViewResults;
