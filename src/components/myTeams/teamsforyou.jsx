import React from "react";
import "./myTeams.css";

function Teamsforyou(props){
    return <div className="foryouteam">
        <div className="title"> <b>Project:</b>  {props.name}</div>
        <div className="proposedby"><b>Lead by: </b>{props.leader}</div>
        <div className="skillsneeded"><b>Skill requirements: </b>{props.skills}</div>
        <button className="requestbutton">Request to join</button>
        <button className="viewdesc">View description</button>
    </div>
}

export default Teamsforyou;