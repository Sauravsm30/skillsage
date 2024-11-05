import React from "react";
import "./myTeams.css";
import { useNavigate } from "react-router-dom";



function TeamBox(props){
    const navigate = useNavigate();
    const username = props.leader;
    function openprofile(){
        navigate(`/userprofile/${username}`);
    }
    return <div className="teamBox">
        <div className="teamname" >Project: {props.name}</div>
        <div className="teamtitle" onClick={openprofile}>Leader: {props.leader}</div>
    </div>
}

export default TeamBox;