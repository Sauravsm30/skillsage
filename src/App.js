import Login from "./components/login/login.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/home/Home.jsx"
import MyTeams from "./components/myTeams/myTeams.jsx";
import Clubs from "./components/home/components/clubsPage/clubs.jsx";
import CreateProject from "./components/home/components/createProject/createProject.jsx";
import Signup from "./components/login/signup.jsx";
import Requests from "./components/home/components/requests/Requests.jsx";
import Profile from "./components/profile.jsx";
import { useState,useEffect } from "react";
import InvitePeople from "./components/home/components/createProject/InvitePeople.jsx";
import Contact from "./components/contact.jsx";
function App() {
 return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myteams" element={<MyTeams />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inviteppl/:pid" element={<InvitePeople />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
