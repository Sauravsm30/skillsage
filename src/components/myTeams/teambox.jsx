import React from "react";
import "./myTeams.css";

function TeamBox(props){
    return <div className="teamBox">
        <div className="teamname">Team name: {props.name}</div>
        <div className="teamtitle">Project: {props.title}</div>
    </div>
}

export default TeamBox;