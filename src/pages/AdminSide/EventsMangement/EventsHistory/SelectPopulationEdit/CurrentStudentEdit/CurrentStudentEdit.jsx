import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./currentStudentEdit.css";

const SelectPopulation = () => {
  const [entries, setEntries] = useState([]);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState([]);
  const [semester, setSemester] = useState([]);
  const [section, setSection] = useState([]);
  const [assignmentId, setAssignmentID] = useState([]);
  const navigate = useNavigate();
  const [recentSurvey, setRecentSurvey] = useState(
    JSON.parse(localStorage.getItem("recentSurvey"))
  );
  console.log(recentSurvey);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = recentSurvey.SurveyID;
        const response = await fetch(
          `http://localhost/studentminiportal/api/survey/FetchTheCurrentPopulation?surveyId=${id}`
        );
        if (response.ok) {
          const data = await response.json();
          processFetchedData(data);
        } else {
          console.error("Error fetching population data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchData();
  }, [recentSurvey]);

  const processFetchedData = (data) => {
    const newDegree = new Set();
    const newSemester = new Set();
    const newSection = new Set();
    let newGender = "";
    let assignmentID = new Set();

    data.forEach((item) => {
      if (item.Gender) newGender = item.Gender;
      if (item.Department) newDegree.add(item.Department);
      if (item.Semester) newSemester.add(item.Semester);
      if (item.Section) newSection.add(item.Section);
      if (item.AssignmentID) assignmentID.add(item.AssignmentID);
    });

    // Convert sets to arrays for state setting
    setGender(newGender);
    setDegree(Array.from(newDegree));
    setSemester(Array.from(newSemester).map(String)); // Ensure semester values are strings
    setSection(Array.from(newSection));
    setAssignmentID(Array.from(assignmentID));
  };

  const handleCheckboxChange = (event, setState, state) => {
    const value = event.target.value;
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleAddNew = () => {
    const newEntry = { gender, degree, semester, section, assignmentId };
    setEntries([...entries, newEntry]);
    // Clear form fields
    setGender("");
    setDegree([]);
    setSemester([]);
    setSection([]);
    setAssignmentID([]);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSaveAndBack = async () => {
    const data = {
      surveyID: recentSurvey.SurveyID,
      gender: gender,
      degree: degree,
      semester: semester,
      section: section,
      studentType: "current",
      assignmentID: assignmentId, // Include AssignmentID here
      address: [],
      Technology: [],
      graduation: [],
    };
    console.log(data);
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Survey/ManagePopulationUpdating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result);
        if (result === "Data successfully inserted") {
          alert(result);
          navigate("/EventsHistory");
        } else {
          alert(result);
        }
      } else {
        console.error("Error saving population data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving population data:", error);
    }
  };

  const handleNext = async () => {
    const data = entries.map((entry) => ({
      surveyId: recentSurvey.SurveyID,
      gender: entry.gender,
      degree: entry.degree.join(", "),
      semester: entry.semester.join(", "),
      section: entry.section.join(", "),
    }));

    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Survey/SurveyAlluminiStudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result);
      } else {
        console.error("Error adding Entries:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding Entries:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Select Population</h1>
      <div className="form-group">
        <label>Gender</label>
        <div className="gender-buttons">
          <button
            onClick={() => setGender("male")}
            className={gender === "male" ? "active" : ""}
          >
            Male
          </button>
          <button
            onClick={() => setGender("female")}
            className={gender === "female" ? "active" : ""}
          >
            Female
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Degree</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              value="BSAI"
              checked={degree.includes("BSAI")}
              onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
            />
            BSAI
          </label>
          <label>
            <input
              type="checkbox"
              value="BSCS"
              checked={degree.includes("BSCS")}
              onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
            />
            BSCS
          </label>
          <label>
            <input
              type="checkbox"
              value="BSIT"
              checked={degree.includes("BSIT")}
              onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
            />
            BSIT
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Semester</label>
        <div className="checkbox-group">
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
            <label key={sem}>
              <input
                type="checkbox"
                value={sem}
                checked={semester.includes(sem)}
                onChange={(e) => handleCheckboxChange(e, setSemester, semester)}
              />
              {sem}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Section</label>
        <div className="checkbox-group">
          {["A", "B", "C", "D"].map((sec) => (
            <label key={sec}>
              <input
                type="checkbox"
                value={sec}
                checked={section.includes(sec)}
                onChange={(e) => handleCheckboxChange(e, setSection, section)}
              />
              {sec}
            </label>
          ))}
        </div>
      </div>
      <div className="entry-list">
        {entries.map((entry, index) => (
          <div key={index} className="entry-item">
            <p>
              Gender: {entry.gender}, Degree: {entry.degree.join(", ")},
              Semester: {entry.semester.join(", ")}, Section:{" "}
              {entry.section.join(", ")}
            </p>
            <button
              onClick={() => handleDelete(index)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleAddNew} className="add-button">
          Add New
        </button>
        <button onClick={handleSaveAndBack} className="save-button">
          Update Now
        </button>
      </div>
      <Link to="/CurrentStudentEdit">
        <div className="Admindashboardback__btn" style={{ marginTop: "20px" }}>
          <ArrowBackIcon style={{ fontSize: 45 }} />
          <h2>Back</h2>
        </div>
      </Link>
    </div>
  );
};

export default SelectPopulation;
