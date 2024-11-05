import React from "react";
import "./myTeams.css";

function TeamBox(props){
    return <div className="teamBox">
        <div className="teamname">Project: {props.name}</div>
        <div className="teamtitle">Leader: {props.leader}</div>
    </div>
}

export default TeamBox;