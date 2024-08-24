import React from "react";
import "./selectstudent.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
const SelectStudent = () => {
  const navigate = useNavigate();
  return (
    <div className="mainselectstudent">
      <div className="contentelectstudent">
        <div className="headingselectstudent">
          <h1 style={{ color: "white" }}>Select Students</h1>
        </div>
        <div className="iconselectstudent">
          <div onClick={() => navigate("/SelectPopulation")}>
            <SupervisedUserCircleRoundedIcon
              style={{ fontSize: 125, marginLeft: "50px" }}
            />

            <h1 style={{ color: "yellow" }}>Current Students</h1>
          </div>
        </div>
        <div className="iconselectstudent">
          <div onClick={() => navigate("/AlumniSelect")}>
            <LayersRoundedIcon style={{ fontSize: 125, marginLeft: "50px" }} />
            <h1 style={{ color: "PAPAYAWHIP" }}>Alumni Students</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectStudent;
