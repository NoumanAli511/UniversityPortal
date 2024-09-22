import React, { useState } from "react";
import "./passwordGenenator.css";
import { useNavigate } from "react-router-dom";

function PasswordGenerator() {
  const navigate = useNavigate();
  const studentFinding = JSON.parse(localStorage.getItem("student"));

  const [firstName, setFirstName] = useState(studentFinding.name);
  const [oldPassword, setOldPassword] = useState(studentFinding.password);
  const [newPassword, setNewPassword] = useState("");

  const handleGeneratePassword = () => {
    // Logic to generate new password
    let newPassword = "";
    const differentLetters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      "@",
      "!",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
    ];
    for (let i = 0; i < 8; i++) {
      newPassword +=
        differentLetters[Math.floor(Math.random() * differentLetters.length)];
    }
    setNewPassword(newPassword);
    // const generatedPassword = `${firstName}${Math.floor(
    //   Math.random() * 10000
    // )}`;
    // setNewPassword(generatedPassword);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/passwordChanging?studentId=${studentFinding.student_id}&newPassword=${newPassword}`,
        {
          method: "POST",
          "Content-Type": "application/json",
        }
      );
      const result = await response.text();
      if (result) {
        alert(result);
        navigate("/StudentLogin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="title">Password Generator</h1>
      <div className="main-content">
        <label>First Name:</label>
        <input type="text" value={firstName} readOnly />

        <label>Old Password:</label>
        <input type="text" value={oldPassword} readOnly />

        <label>New Password:</label>
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password will appear here"
        />
        <div className="buttons">
          <button onClick={handleGeneratePassword}>
            Generate New Password
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
