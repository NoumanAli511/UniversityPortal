import React, { useState } from "react";
import "./chats.css";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("company", name);
      formData.append("description", description);

      const response = await fetch(
        `http://localhost/studentminiportal/api/student/CreateJob`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Job posted");
      } else {
        console.error("Error: ", data);
        // Handle error
      }
    } catch (error) {
      console.error("Error: ", error);
      // Handle error
    }
  };

  return (
    <div className="container">
      {/* Job Title */}
      <div className="inputContainer">
        <input
          type="text"
          className="input"
          placeholder="Job Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      {/* Company Name */}
      <div className="inputContainer">
        <input
          type="text"
          className="input"
          placeholder="Company Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      {/* Job Description */}
      <div className="inputContainer">
        <textarea
          className="input"
          placeholder="Job Description"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button className="submitButton" onClick={handleSaveChanges}>
        Post Job
      </button>
    </div>
  );
};

export default PostJob;
