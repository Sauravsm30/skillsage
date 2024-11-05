import React from "react";
import "./Requests.css";

function Invite(props){
    return <div className="requestBox invitebox">
        <div className="details"><div className="reqtitle"><b className="roboto-mono"> {props.title}</b></div>
        <div className="leader">  {props.leader} invites you</div></div>
        <div className="buttons"><button className="accept">Accept</button>
        <button className="ignore">Decline</button></div>
        
    </div>
}

export default Invite;