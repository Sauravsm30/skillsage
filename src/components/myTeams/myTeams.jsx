import React from "react";
import "./myTeams.css";
import Navbar from "../Navbar";
import TeamBox from "./teambox";
import Teamsforyou from "./teamsforyou";
function MyTeams(){
    document.getElementById("body").style.backgroundColor="black";
    return <>
    <Navbar logout="true" />
    <div className="teambody">
    <div className="teamscontainer">
        <h1>My Teams</h1>
        <div className="teamscroll">
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>
        <TeamBox name="Tech Rebels" title="Student Collaboration Platform"/>

        <hr /><div>No more Teams to display</div>

    </div></div>
    <div className="teamscontainer"><h1>Teams for you</h1>
    <div className="teamscroll">
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    <Teamsforyou name="Vehicle Rental System" leader="Devadutt Mohan" skills="HTML, CSS, JavaScript"/>
    
    <hr /><div>No more Teams to display</div>
    </div></div>
    </div>
    </>
}

export default MyTeams;