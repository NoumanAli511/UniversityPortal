import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./eventshistory.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ViewResults = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [surveyResults, setSurveyResults] = useState(null);
  const [isViewingResults, setIsViewingResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "http://localhost/studentminiportal/api/Survey/FetchAllSurveys"
        );
        if (response.status === 200) {
          setSurveys(response.data);
          setFilteredSurveys(response.data);
        } else {
          console.error("Error fetching surveys:", response.data);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  useEffect(() => {
    const filtered = surveys.filter((survey) =>
      survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSurveys(filtered);
  }, [searchTerm, surveys]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectSurvey = async (surveyID) => {
    setSelectedSurvey(surveyID);
    try {
      const response = await axios.get(
        `http://localhost/studentminiportal/api/survey/GetSurveyResult?survey_id=${surveyID}`
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
  };

  const handleEdit = (surveyID) => {
    navigate(`/editSurvey`);
    localStorage.setItem("selectedSurvey", surveyID);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const createPieChartData = (questionData) => {
    return {
      labels: Object.keys(questionData.OptionCounts),
      datasets: [
        {
          label: "Responses",
          data: Object.values(questionData.OptionCounts),
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

  const createBarChartData = (questionData) => {
    return {
      labels: Object.keys(questionData.OptionCounts),
      datasets: [
        {
          label: "Responses",
          data: Object.values(questionData.OptionCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const fetchStudents = async (optionIndex, surveySelected, QuestionID) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/event/GetStudentResponseSections?answer=${optionIndex}&surveyId=${surveySelected}&questionId=${QuestionID}`
      );
      const result = await response.json();
      if (result) {
        setModalContent(result);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePieClick = (event, chartElement, questionId) => {
    const index = chartElement[0].index;
    if (chartElement.length > 0) {
      fetchStudents(index, selectedSurvey, questionId);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>View Results</h2>
      </div>
      <div className="content">
        {!isViewingResults ? (
          <div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by survey title..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <table className="survey-table" border={1}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurveys.map((survey) => (
                  <tr key={survey.surveyID}>
                    <td>{survey.title}</td>
                    <td>{survey.endDate.split("T")[0]}</td>
                    <td>
                      <button
                        onClick={() => handleSelectSurvey(survey.surveyID)}
                      >
                        View Results
                      </button>
                      <button onClick={() => handleEdit(survey.surveyID)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="Graphs">
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
                  <Pie
                    data={createPieChartData(questionData)}
                    options={{
                      onClick: (event, chartElement) => {
                        handlePieClick(
                          event,
                          chartElement,
                          questionData.QuestionID
                        );
                      },
                    }}
                  />
                  <Bar data={createBarChartData(questionData)} />
                </div>
              ))}
            <button
              className="edit-button"
              onClick={() => setIsViewingResults(false)}
            >
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

      {/* Modal for displaying student details */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Student Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>ARID Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {modalContent.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>{student.arid_number}</td>
                    <td>{student.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewResults;
