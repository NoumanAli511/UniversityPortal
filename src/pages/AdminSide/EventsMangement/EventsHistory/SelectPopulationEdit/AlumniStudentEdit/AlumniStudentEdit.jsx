import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./alumniStudentEdit.css";

const AlumniStudentEdit = () => {
  const [entries, setEntries] = useState([]);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState([]);
  const [graduationYear, setGraduationYear] = useState([]);
  const [address, setAddress] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [assignmentId, setAssignmentID] = useState([]);

  const [recentSurvey, setRecentSurvey] = useState(
    JSON.parse(localStorage.getItem("recentSurvey"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = recentSurvey.SurveyID;
        const response = await fetch(
          `http://localhost/studentminiportal/api/survey/FetchTheAlumniPopulation?surveyId=${id}`
        );
        if (response.ok) {
          const data = await response.json();
          processFetchedData(data);
        } else {
          console.error("Error fetching alumni data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      }
    };

    fetchData();
  }, [recentSurvey]);
  const processFetchedData = (data) => {
    const newDegree = new Set();
    const newGraduationYear = new Set();
    const newAddress = new Set();
    const newTechnology = new Set();
    const newAssignmentID = new Set(); // Add this line
    let newGender = "";

    data.forEach((item) => {
      if (item.Gender) newGender = item.Gender;
      if (item.Department) newDegree.add(item.Department);
      if (item.GraduationYear) newGraduationYear.add(item.GraduationYear);
      if (item.City) newAddress.add(item.City);
      if (item.Technology) newTechnology.add(item.Technology);
      if (item.AssignmentID) newAssignmentID.add(item.AssignmentID); // Add this line
    });

    setGender(newGender);
    setDegree(Array.from(newDegree));
    setGraduationYear(Array.from(newGraduationYear));
    setAddress(Array.from(newAddress));
    setTechnology(Array.from(newTechnology));
    setAssignmentID(Array.from(newAssignmentID)); // Add this line
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
    const newEntry = { gender, degree, graduationYear, address, technology };
    setEntries([...entries, newEntry]);
    // Clear form fields
    setGender("");
    setDegree([]);
    setGraduationYear([]);
    setAddress([]);
    setTechnology([]);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };
  const handleSaveAndBack = async () => {
    const data = {
      surveyID: recentSurvey.SurveyID,
      gender,
      degree,
      graduationYear,
      address,
      technology,
      assignmentId, // Include AssignmentID here
      studentType: "alumni",
    };

    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/Survey/ManagePopulationUpdating",
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
        if (result === "Data successfully inserted") {
          alert(result);
          navigate("/EventsHistory");
        } else {
          alert(result);
        }
      } else {
        console.error("Error saving alumni data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving alumni data:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Select Alumni Population</h1>
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
          {["BSAI", "BSCS", "BSIT"].map((deg) => (
            <label key={deg}>
              <input
                type="checkbox"
                value={deg}
                checked={degree.includes(deg)}
                onChange={(e) => handleCheckboxChange(e, setDegree, degree)}
              />
              {deg}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Graduation Year</label>
        <div className="checkbox-group">
          {[
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
          ].map((year) => (
            <label key={year}>
              <input
                type="checkbox"
                value={year}
                checked={graduationYear.includes(year)}
                onChange={(e) =>
                  handleCheckboxChange(e, setGraduationYear, graduationYear)
                }
              />
              {year}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Address</label>
        <div className="checkbox-group">
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
        <label>Technology</label>
        <div className="checkbox-group">
          {["flutter", "Android", "Web"].map((tech) => (
            <label key={tech}>
              <input
                type="checkbox"
                value={tech}
                checked={technology.includes(tech)}
                onChange={(e) =>
                  handleCheckboxChange(e, setTechnology, technology)
                }
              />
              {tech}
            </label>
          ))}
        </div>
      </div>
      <div className="entry-list">
        {entries.map((entry, index) => (
          <div key={index} className="entry-item">
            <p>
              Gender: {entry.gender}, Degree: {entry.degree.join(", ")},
              Graduation Year: {entry.graduationYear.join(", ")}, Address:{" "}
              {entry.address.join(", ")}, Technology:{" "}
              {entry.technology.join(", ")}
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
      <Link to="/CurrentStudentEdit">
        <div className="Admindashboardback__btn" style={{ marginTop: "20px" }}>
          <ArrowBackIcon style={{ fontSize: 45 }} />
          <h2>Back</h2>
        </div>
      </Link>
    </div>
  );
};

export default AlumniStudentEdit;
