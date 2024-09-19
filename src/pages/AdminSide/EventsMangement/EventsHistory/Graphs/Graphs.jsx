import React, { useState } from "react";
import { Pie } from "react-chartjs-2"; // Import Pie from react-chartjs-2
import "./Graphs.css";
function Graphs({ surveyResult }) {
  const [isViewingResults, setIsViewingResults] = useState(false);
  const [surveyResults, setSurveyResults] = useState(surveyResult); // State to hold the survey results data

  const handleEdit = () => {
    setIsViewingResults(false);
    setSurveyResults(null);
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
    <div className="Graphs-container">
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
  );
}

export default Graphs;
