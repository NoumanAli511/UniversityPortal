import React, { useState } from "react";
import axios from "axios";
import "./alumniselect.css";
import { useNavigate } from "react-router-dom";

const CombinedSelection = () => {
  const [entries, setEntries] = useState([]);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState([]);
  const [address, setAddress] = useState([]);
  const [graduation, setGraduation] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [recentSurvey, setRecentSurvey] = useState(
    JSON.parse(localStorage.getItem("recentSurvey"))
  );
  const navigate = useNavigate();

  const handleCheckboxChange = (event, setState, state) => {
    const value = event.target.value;
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleAddNew = () => {
    const newEntry = { graduation, degree, address, technology, gender };
    setEntries([...entries, newEntry]);
    // Clear form fields
    setGender("");
    setDegree([]);
    setAddress([]);
    setGraduation([]);
    setTechnology([]);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSaveAndBack = async () => {
    if (!recentSurvey) {
      console.error("No survey data found");
      return;
    }

    // Prepare the data for the API call
    const surveyPopulation = {
      surveyID: recentSurvey.SurveyID, // Ensure you are using the correct key here
      studentType: "alumni", // or "current" depending on your condition
      degree,
      address,
      graduation,
      Technology: technology,
      gender,
    };

    try {
      const response = await axios.post(
        "http://localhost/studentminiportal/api/Survey/ManagePopulation",
        surveyPopulation,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      if (response.status === 200) {
        console.log("Entries added successfully");
        localStorage.setItem("savedEntries", JSON.stringify(entries));
        navigate(-1); // Navigate back to the previous screen
      } else {
        console.error("Error adding Entries:", response.data);
      }
    } catch (error) {
      console.error("Error adding Entries:", error);
    }
  };

  const graduationYears = [
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];

  return (
    <div className="container">
      <h1 className="title">Select Population</h1>
      <div className="form-group">
        <label>Gender</label>
        <div className="gender-radios">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Discipline</label>
        <div className="discipline-checkboxes">
          {["BSCS", "BSSE", "BSAI", "BSIT"].map((disc) => (
            <label key={disc}>
              <input
                type="checkbox"
                value={disc}
                checked={degree.includes(disc)}
                onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
              />
              {disc}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Address</label>
        <div className="address-checkboxes">
          {["Rawalpindi", "Islamabad", "Bahria Town"].map((addr) => (
            <label key={addr}>
              <input
                type="checkbox"
                value={addr}
                checked={address.includes(addr)}
                onChange={(e) => handleCheckboxChange(e, setAddress, address)}
              />
              {addr}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Graduation Year</label>
        <div className="graduation-years">
          {graduationYears.map((year) => (
            <label key={year}>
              <input
                type="checkbox"
                value={year}
                checked={graduation.includes(year)}
                onChange={(e) =>
                  handleCheckboxChange(e, setGraduation, graduation)
                }
              />
              {year}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Technology</label>
        <div className="technology-checkboxes">
          {["flutter", "Android", "Web"].map((sec) => (
            <label key={sec}>
              <input
                type="checkbox"
                value={sec}
                checked={technology.includes(sec)}
                onChange={(e) =>
                  handleCheckboxChange(e, setTechnology, technology)
                }
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
              Graduation Year: {entry.graduation.join(", ")}, Degree:{" "}
              {entry.degree.join(", ")}, Address: {entry.address.join(", ")},
              Technology: {entry.technology.join(", ")}, Gender: {entry.gender}
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

export default CombinedSelection;
