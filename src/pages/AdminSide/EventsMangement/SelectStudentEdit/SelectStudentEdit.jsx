import React from "react";
import "./selectStudentEdit.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
const SelectStudentEdit = () => {
  const navigate = useNavigate();
  return (
    <div className="mainselectstudent">
      <div className="contentelectstudent">
        <div className="headingselectstudent">
          <h1 style={{ color: "white" }}>Select Students</h1>
        </div>
        <div className="iconselectstudent">
          <div onClick={() => navigate("/CurrentStudentEdit")}>
            <SupervisedUserCircleRoundedIcon
              style={{ fontSize: 125, marginLeft: "50px", cursor: "pointer" }}
            />
            <h1 style={{ color: "white", cursor: "pointer" }}>
              Current Students
            </h1>
          </div>
        </div>
        <div className="iconselectstudent">
          <div onClick={() => navigate("/AlumniStudentEdit")}>
            <LayersRoundedIcon
              style={{ fontSize: 125, marginLeft: "50px", cursor: "pointer" }}
            />
            <h1 style={{ color: "PAPAYAWHIP", cursor: "pointer" }}>
              Alumni Students
            </h1>
          </div>
        </div>
        <Link to="/AdminDashboard">
          <div
            className="Admindashboardback__btn"
            style={{ marginTop: "20px" }}
          >
            <ArrowBackIcon style={{ fontSize: 45 }} />
            <h2>Back</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectStudentEdit;
