import React from "react";
import "./Home.css"
import Navbar from "../Navbar.jsx";
import Menu from "./components/menu.jsx";
function Home() {
  const nav = document.querySelector(".nav");
  if(nav) document.querySelector(".nav").style.color = "white";
  const username = JSON.parse(window.localStorage.getItem('username'));
  return (
    <>
    <Navbar logout={"true"}/>
      <div className="hellouser">
        {/* <div className="avatar"><img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="" /></div> */}

        <h1>{`Welcome ${username ? username:""}`}</h1>  <Menu />
      </div>
    </>
  );
}

export default Home;
