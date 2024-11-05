import React from "react";
import "./myTeams.css";
import { useNavigate } from "react-router-dom";

function Teamsforyou(props){
    const navigate=useNavigate();
    function openprofile(){
        navigate(`/userprofile/${props.leader}`);
    }
    async function handlerequest() {
        try {
            const response = await fetch('http://localhost:8003/api/joinProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId: props.id,
                    username: JSON.parse(window.localStorage.getItem('username'))
                 }), // Sending project ID to the backend
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Request to join response:', result);
            // Handle success (e.g., show a success message, update UI, etc.)
        } catch (error) {
            console.error('Failed to send request:', error);
            // Handle error (e.g., show an error message)
        }
    }
    return <form className="foryouteam">
        <div className="title"> <b>Project:</b>  {props.name}</div>
        <div className="proposedby" onClick={openprofile}><b>Lead by: </b>{props.leader}</div>
        <div className="skillsneeded"><b>Skill requirements: </b>{props.skills}</div>
        <button className="requestbutton" type="submit" onClick={handlerequest}>Request to join</button>
        <button className="viewdesc">View description</button>
    </form>
}

export default Teamsforyou;