import React, { useState } from "react";
import "./Requests.css";
import { useNavigate } from "react-router-dom";

function RequestBox(props){
    const navigate=useNavigate();
    function openprofile(){
        navigate(`/userprofile/${props.requester}`);
    }
    const handleDecline = async () => {
        try {
            const response = await fetch('http://localhost:8003/api/declineRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestid: props.reqid }), // Send requestid to the backend
            });

            if (response.ok) {
                // Handle successful decline (e.g., show a success message or update state)
                console.log("Request declined successfully.");
            } else {
                console.error("Failed to decline request.");
            }
            window.location.reload();
        } catch (error) {
            console.error("Error declining request:", error);
        }
    };
    const handleAccept = async () => {
        try {
            const response = await fetch('http://localhost:8003/api/acceptRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestid: props.reqid, username: JSON.parse(window.localStorage.getItem('username')), newmember: props.requester }), // Send requestid to the backend
            });

            if (response.ok) {
                // Handle successful decline (e.g., show a success message or update state)
                console.log("Request accepted successfully.");
                window.location.reload();
            } else {
                console.error("Failed to accept request.");
            }
            
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };
    return <div className="requestBox">
        <div className="details"><div className="reqtitle"><b className="roboto-mono"> {props.title}</b></div>
        <div className="leader" onClick={openprofile}>  {props.requester} wants to join you</div></div>
        <div className="buttons"><button  className="accept" onClick={handleAccept}>Accept</button>
        <button className="ignore"  onClick={handleDecline}>Decline</button></div>
        
    </div>
}

export default RequestBox;