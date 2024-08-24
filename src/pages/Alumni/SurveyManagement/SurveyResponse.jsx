import React from "react";

function SurveyResponse() {
  // getting student's data for fetching the data of survey and store the response
  const student = JSON.parse(localStorage.getItem("student"));
  console.log(student);
  return <div></div>;
}

export default SurveyResponse;
