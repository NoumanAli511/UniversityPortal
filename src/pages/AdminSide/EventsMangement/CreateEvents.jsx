import React from "react";
import "./createvent.css";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";

const CreateEvents = () => {
  return (
    <>
      <div className="createventsmain">
        <div className="contentcreatevents">
          <div className="headercontentCreateevents">
            <h1>Create Events</h1>
          </div>
          <AddPhotoAlternate style={{ fontSize: 190 }} className="addphot" />
          <div className="startcreateevents">
            <h2>Details</h2>
          </div>
          <div className="createevents__input">
            <div className="createevents__form">
              <input
                className="my-inputCreatevent"
                placeholder="Title"
                type="text"
                name="Title"
              />
              <input
                className="my-inputCreatevent"
                placeholder="Date"
                type="date"
                name="Date"
              />
              <input
                className="my-inputCreatevent"
                placeholder="Description"
                type="text"
                name="Description"
              />
              <input
                className="my-inputCreatevent"
                placeholder="Venue"
                type="text"
                name="Venue"
              />
            </div>
          </div>
          <div className="createventsbutton">
            <button className="editbutn">Cancel</button>
            <button className="editbutn">Upload</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvents;
