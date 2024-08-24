import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./selectpopulation.css";

const SelectPopulation = () => {
  const [entries, setEntries] = useState([]);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState([]);
  const [semester, setSemester] = useState([]);
  const [section, setSection] = useState([]);
  const navigate = useNavigate();
  const [recentSurvey, setRecentSurvey] = useState(
    JSON.parse(localStorage.getItem("recentSurvey"))
  );
  const handleCheckboxChange = (event, setState, state) => {
    const value = event.target.value;
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleAddNew = () => {
    const newEntry = { gender, degree, semester, section };
    setEntries([...entries, newEntry]);
    // Clear form fields
    setGender("");
    setDegree([]);
    setSemester([]);
    setSection([]);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSaveAndBack = async () => {
    // Prepare the data to be sent to the backend
    const data = {
      surveyID: recentSurvey.SurveyID,
      gender: gender,
      degree: degree,
      semester: semester,
      section: section,
      studentType: "current", // or "alumni" depending on your context
      address: [], // Add address if needed
      Technology: [], // Add Technology if needed
      graduation: [], // Add graduation year if needed
    };

    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Survey/ManagePopulation`,
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
          navigate("/SelectStudent");
          alert(result);
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
      surveyId: recentSurvey.SurveyId,
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
        // navigate("/SelectStudent"); // Uncomment to navigate after successful API call
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
          Save & Back
        </button>
      </div>
    </div>
  );
};

export default SelectPopulation;
