import React, { useEffect, useState } from "react";
import "./Survey.css"; // Import your custom CSS

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

function SurveyResponse() {
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedSurvey, setSelectedSurvey] = useState(false);
  const [surveyDetails, setSurveyDetails] = useState();
  const student = JSON.parse(localStorage.getItem("student"));

  const handleSurveyDetails = (survey) => {
    setSelectedSurvey((curr) => !curr);
    setSurveyDetails(survey);
  };

  const fetchSurveys = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/survey/SurveyFetchingAsStudentInfo?StudentId=${student.arid_number}`
      );
      const data = await response.json();
      setSurveys(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch surveys:", error);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setResponses({
      ...responses,
      [questionId]: option,
    });
  };
  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleSubmit = async (surveyID) => {
    try {
      // Convert responses to the correct format for API
      const formattedResponses = Object.entries(responses).map(
        ([questionId, answer]) => ({
          QuestionId: parseInt(questionId), // Convert to integer if necessary
          answer: answer,
          surveyId: surveyID,
          studentId: student.student_id, // Assuming you have the studentId stored in the state or retrieved elsewhere
        })
      );

      // Sending the formatted responses directly as an array
      const response = await fetch(
        "http://localhost/studentminiportal/api/survey/SaveTheResponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedResponses),
        }
      );

      if (response.ok) {
        handleSurveyDetails();
        fetchSurveys();
        alert("Responses submitted successfully!");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to submit responses: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };

  // Function to handle skipping a question
  const handleSkipQuestion = (questionId) => {
    setResponses({
      ...responses,
      [questionId]: -1, // Store -1 for skipped questions
    });

    // Remove the skipped question from the surveyDetails
    setSurveyDetails((prevDetails) => ({
      ...prevDetails,
      questions: prevDetails.questions.filter(
        (question) => question.options.QuestionID !== questionId
      ),
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: 23,
          borderRadius: 10,
          width: "80%",
          height: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "23px",
            textAlign: "center",
            fontFamily: "Arial",
          }}
        >
          {selectedSurvey ? surveyDetails.SurveyTitle : "All Surveys"}
        </h1>
        {!selectedSurvey ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {surveys.length ? (
                surveys?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: "center",
                      fontSize: 23,
                      borderBottom: "1px solid gray",
                      margin: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleSurveyDetails(item);
                    }}
                  >
                    {item.SurveyTitle}
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Setting the Survey Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: 20,
              }}
            >
              {surveyDetails.questions.map((question, index) => (
                <React.Fragment key={index}>
                  <h2 style={{ fontWeight: 300, marginLeft: 140 }}>
                    {question.QuestionText}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    {Object.entries(question.options)
                      .filter(([key]) => key.startsWith("Option"))
                      .map(([optionKey, optionValue], idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center", // Center text vertically
                            marginRight: 15, // Adds space between options
                          }}
                        >
                          <input
                            type="radio"
                            name={`question_${question.options.QuestionID}`}
                            value={optionValue}
                            checked={
                              responses[question.options.QuestionID] === idx + 1
                            }
                            onChange={() =>
                              handleOptionChange(
                                question.options.QuestionID,
                                idx + 1
                              )
                            }
                            style={{
                              cursor: "pointer",
                              marginRight: 5,
                            }}
                          />
                          <label
                            style={{
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          >
                            {optionValue}
                          </label>
                        </div>
                      ))}
                  </div>
                  {/* Skip and Maybe buttons */}
                  <div style={{ marginLeft: 140, marginTop: 10 }}>
                    <button
                      style={{
                        marginRight: 10,
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleSkipQuestion(question.options.QuestionID)
                      }
                    >
                      Skip
                    </button>
                    <button
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleOptionChange(question.options.QuestionID, 0)
                      } // 0 for maybe
                    >
                      Maybe
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button className="back-button" onClick={handleSurveyDetails}>
                Back
              </button>
              <button
                className="submit-button"
                onClick={() => handleSubmit(surveyDetails.SurveyID)}
                style={{ alignSelf: "center", marginTop: 20 }}
              >
                Submit Responses
              </button>
            </div>
          </>
        )}
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
  );
}

export default SurveyResponse;
