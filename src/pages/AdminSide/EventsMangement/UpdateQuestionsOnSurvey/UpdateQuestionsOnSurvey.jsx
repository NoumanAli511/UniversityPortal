import React, { useState, useEffect } from "react";
import "./updateQuestions.css";
import { useNavigate } from "react-router-dom";

const UpdateQuestionsOnSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [recentSurvey, setRecentSurvey] = useState(
    JSON.parse(localStorage.getItem("recentSurvey"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing questions for the survey
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost/studentminiportal/api/Survey/fetchQuestions?surveyID=${recentSurvey.SurveyID}`
        );
        const data = await response.json();
        if (response.ok) {
          setQuestions(data);
          setShowUpdateButton(data.length > 0); // Show the update button if there are questions
        } else {
          console.error("Failed to fetch questions:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [recentSurvey, questions]);

  const updateQuestion = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].QuestionText = text;
    setQuestions(updatedQuestions);
    setShowUpdateButton(true); // Show update button when changes are made
  };

  const updateOption = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][`Option${optionIndex + 1}`] = text;
    setQuestions(updatedQuestions);
    setShowUpdateButton(true); // Show update button when changes are made
  };

  const deleteQuestion = async (index) => {
    const questionToDelete = questions[index];
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Survey/DeleteQuestionFromSurveyQuestions?questionID=${questionToDelete.QuestionID}`
      );
      const result = await response.text();
      if (result === "Question Deleted") {
        // Remove question from state
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        setShowUpdateButton(updatedQuestions.length > 0); // Hide update button if no questions left
        alert("Question Deleted");
      } else {
        alert(result);
        const errorData = await response.json();
        console.error("Error deleting question:", errorData);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/Survey/UpdateSurveyQuestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questions),
        }
      );

      if (response.ok) {
        console.log("Questions updated successfully");
        setShowUpdateButton(false); // Hide update button after successful update
      } else {
        const errorData = await response.json();
        console.error("Error updating questions:", errorData);
      }
    } catch (error) {
      console.error("Error updating questions:", error);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        surveyID: recentSurvey.SurveyID,
        QuestionText: "",
        Option1: "",
        Option2: "",
        Option3: "",
      },
    ]);
  };

  return (
    <div className="container">
      <h1 className="header">Update Questions</h1>
      <div className="allQuestions">
        {questions.map((question, index) => (
          <div key={index} className="questionContainer">
            <input
              type="text"
              className="questionInput"
              placeholder={`Question ${index + 1}`}
              value={question.QuestionText}
              onChange={(e) => updateQuestion(index, e.target.value)}
            />
            <div className="optionsContainer">
              {[1, 2, 3].map((optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  className="optionInput"
                  placeholder={`Option ${optionIndex}`}
                  value={question[`Option${optionIndex}`]}
                  onChange={(e) =>
                    updateOption(index, optionIndex - 1, e.target.value)
                  }
                />
              ))}
            </div>
            <button
              className="deleteButton"
              onClick={() => deleteQuestion(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button className="addButton" onClick={addQuestion}>
        <i className="fa fa-plus" aria-hidden="true"></i>
        Add New Question
      </button>
      {showUpdateButton && (
        <button className="nextButton" onClick={handleUpdate}>
          Update
        </button>
      )}
      <button
        className="addButton"
        onClick={() => {
          navigate("/SelectStudentEdit");
        }}
      >
        Edit Population
      </button>
    </div>
  );
};

export default UpdateQuestionsOnSurvey;
