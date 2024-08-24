import React, { useState } from "react";
import "./searching.css";
import { FaSearch } from "react-icons/fa";
//import { Api } from "./LinkApi";

const Mates = () => {
  const [graduationYear, setGraduationYear] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/GetStudents?graduationYear=${graduationYear}&department=${department}&section=${section}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setResults((prevResults) => [...prevResults, ...data]);
        setError("");
      } else {
        console.log("error: ", data);
        setError(data);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch1 = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/GetAlumni?graduationYear=${graduationYear}&department=${department}&section=${section}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setResults((prevResults) => [...prevResults, ...data]);

        setError("");
      } else {
        console.log("error: ", data);
        setError(data);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchAll = async () => {
    setResults([]); // Clear previous results
    await handleSearch();
    await handleSearch1();
  };

  return (
    <div className="container">
      <h1 className="title">Search Mates</h1>
      <div className="pickerContainer">
        <select
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          className="picker"
        >
          <option value="">Select Graduation Year</option>
          {Array.from({ length: 14 }, (_, i) => 2010 + i).map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="pickerContainer">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="picker"
        >
          <option value="">Select Department</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSAI">BSAI</option>
          <option value="BSSE">BSSE</option>
        </select>
      </div>
      <div className="pickerContainer">
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="picker"
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <button className="searchButton" onClick={handleSearchAll}>
        <FaSearch className="searchIcon" size={20} color="#fff" />
        <span className="buttonText">Search</span>
      </button>
      {error ? (
        <p className="errorText">{error}</p>
      ) : (
        <div className="results">
          {results.map((item, index) => (
            <div key={index} className="resultItem">
              <p className="resultTitle">
                Name: <span className="resultValue">{item.name}</span>
              </p>
              <p className="resultTitle">
                Email: <span className="resultValue">{item.email}</span>
              </p>
              <p className="resultTitle">
                Ph no: <span className="resultValue">{item.phone_number}</span>
              </p>
              <p className="resultTitle">
                Address: <span className="resultValue">{item.address}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mates;
