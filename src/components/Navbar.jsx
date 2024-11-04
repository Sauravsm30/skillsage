import React, { useState,useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom"; 
import Slidemenu from "./slidemenu";
import axios from "axios";

function Navbar(props) {
  const[data,setData]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:8003/users')
    .then(res=>res.json())
    .then(data=>setData(data))
    .catch(err=>console.log(err));
  })

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function Gohome() {
    if(props.logout != "true"){
      navigate("/");
      return;
    }
    navigate("/home");
  }

  function Logoff() {
    window.localStorage.removeItem("username");
    navigate("/");
  }

  function logoutbutton() {
    return props.logout === "true" ? <button onClick={Logoff}>Logout</button> : null;
  }

  function opennavmenu() {
    setMenuOpen(!menuOpen); 
  }

  return (
    <>
      <nav className="nav">
        <div className="menuicon">
          <svg className="menubutton" onClick={opennavmenu}
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            ></path>
          </svg>
        </div>
        <div className="home" onClick={Gohome}>SkillSage</div>
        <div className="navmenu">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="">Contact</a>
        </div>
        <div className="logoutbutton">{logoutbutton()}</div>
      </nav>
      <Slidemenu className={menuOpen ? "open" : ""} />
    </>
  );
}

export default Navbar;
