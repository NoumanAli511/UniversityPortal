import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/landingPage/LandingPage.jsx";
import StudentLogin from "./pages/Student/StudentLogin/StudentLogin.jsx";

import Dashboard from "./pages/Student/dashboard/Dashboard.jsx";
import Profile from "./pages/Student/profile/Profile.jsx";
import EditProfile from "./pages/Student/EditProfile/EditProfile.jsx";
import Events from "./pages/Student/events/Events.jsx";
import Chats from "./pages/Student/Chats/Chats.jsx";
// import AlumniLogin from "./pages/Alumni/AlumniLogin/AlumniLogin.jsx";
// import Alumnidashboard from "./pages/Alumni/Dashboard/Alumnidashboard.jsx";
// import Alumniprofile from "./pages/Alumni/alumniprofile/Alumniprofile.jsx";
// import Alumnievents from "./pages/Alumni/alumniEvents/Alumnievents.jsx";
import AdminSide from "./pages/AdminSide/AdminLogin/AdminLogin.jsx";

import AdminLogin from "./pages/AdminSide/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminSide/AdminDashboard/AdminDashboard.jsx";
import AdminProfile from "./pages/AdminSide/AdminProfile/Adminprofile.jsx";
import EventManagement from "./pages/AdminSide/EventsMangement/EventsManagements.jsx";
// import StudentManagement from "./pages/AdminSide/StudentMangaement/StudentManagement.jsx";
import ChangeProfile from "./pages/AdminSide/AdminProfile/ChangeProfile.jsx";

import EventsFirstScreen from "./pages/AdminSide/EventsMangement/EventsFirstScreen/EventsFirstScreen.jsx";
import EventsFirstScreenEdit from "./pages/AdminSide/EventFirstScreenEdit/EventFirstScreenEdit.jsx";

//import CreateEvent from "./pages/AdminSide/EventsMangement/EventsFirstScreen/CreateEvent/CreateEvent.jsx";
//import CreatEvents from "./pages/AdminSide/EventsMangement/CreateEvents.jsx";
import EventsHistory from "./pages/AdminSide/EventsMangement/EventsHistory/EventsHistory.jsx";
import AddEvent from "./pages/AddEvent/AddEvent.jsx";
//import PostingEvent from "./pages/AdminSide/EventsMangement/EventsHistory/EventsHistory.jsx";

import Survey from "./pages/AdminSide/Survey/SurveyManagement/SurveyManagement.jsx";
import Createsurvey from "./pages/AdminSide/Survey/SurveyManagement/SurveyCreate/Createsurvey.jsx";
import JobAnnouncement from "./pages/AdminSide/JobAnnouncement/JobAnnouncement.jsx";
import ViewResult from "./pages/AdminSide/PostRequest/ViewResult/ViewResult.jsx";

import EventsEdit from "./pages/AdminSide/EventsMangement/EventsEdit/EventEdit.jsx";
import SelectPopulation from "./pages/AdminSide/SelectPopulation/SelectPopulation.jsx";
import BothStudent from "./pages/AdminSide/Survey/SurveyManagement/BothStudent/BothStudent.jsx";
import SelectStudent from "./pages/AdminSide/Survey/SurveyManagement/SelectStudent/SelectStudent.jsx";
import AlumniSelect from "./pages/AdminSide/AlumniSelect/AlumniSelect.jsx";
import PostRequest from "./pages/AdminSide/PostRequest/PostRequest.jsx";
import Searching from "./pages/Student/Searching/Searching.jsx";
import SurveyResponse from "./pages/Alumni/SurveyManagement/SurveyResponse.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/Dashboard" element={<Dashboard />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/events" element={<Events />} />
      <Route path="/Chats" element={<Chats />} />
      {/* <Route path="/AluminiLogin" element={<AlumniLogin />} /> */}
      {/* <Route path="/alumnidashboard" element={<Alumnidashboard />} /> */}
      {/* <Route path="/alumniprofile" element={<Alumniprofile />} /> */}
      {/* <Route path="/alumnievents" element={<Alumnievents />} /> */}
      <Route path="/AdminSide" element={<AdminSide />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/EventsFirstScreen" element={<EventsFirstScreen />} />
      <Route path="/EventFirstScreenEdit" element={<EventsFirstScreenEdit />} />

      <Route path="/AdminProfile" element={<AdminProfile />} />
      <Route path="/ChangeProfile" element={<ChangeProfile />} />
      <Route path="/EventsManagement" element={<EventManagement />} />
      <Route path="/AddEvent" element={<AddEvent />} />
      {/* <Route path="/CreatEvent" element={<CreateEvent />} /> */}

      <Route path="/EventsHistory" element={<EventsHistory />} />
      <Route path="/PostRequest" element={<PostRequest />} />
      <Route path="/JobAnnouncement" element={<JobAnnouncement />} />
      <Route path="/ViewResult" element={<ViewResult />} />
      {/* <Route path="/StudentManagement" element={<StudentManagement />} /> */}
      <Route path="/Survey" element={<Survey />} />
      <Route path="/Createsurvey" element={<Createsurvey />} />
      <Route path="/EventEdit" element={<EventsEdit />} />
      <Route path="/SelectPopulation" element={<SelectPopulation />} />
      <Route path="/AlumniSelect" element={<AlumniSelect />} />
      {/* Survey Management at Student */}
      <Route path="/SurveyResponse" element={<SurveyResponse />} />

      <Route path="/BothStudent" element={<BothStudent />} />
      <Route path="/SelectStudent" element={<SelectStudent />} />
      <Route path="/Searching" element={<Searching />} />
    </Routes>
  );
}

export default App;
