import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./createProject.css";
import Navbar from "../../../Navbar";

function InvitePeople() {
    const { pid } = useParams();
    const [matchingStudents, setMatchingStudents] = useState([]);

    const handleInvite = async (studentId) => {
        // Logic to handle inviting a student can go here
        // For now, we'll just log the studentId
        console.log(`Inviting student with ID: ${studentId}`);
    };

    useEffect(() => {
        const fetchMatchingStudents = async () => {
            // Call the backend to get matching students based on the pid
            try {
                const response = await fetch(`http://localhost:8003/api/matchingStudents?pid=${pid}`);
                if (response.ok) {
                    const data = await response.json();
                    setMatchingStudents(data); // Store matching student IDs
                } else {
                    console.error("Failed to fetch matching students");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchMatchingStudents(); // Fetch matching students when the component mounts
    }, [pid]);

    return (
        <>
            <Navbar logout="true" />
            <div className="invitepplbody"><div>
                <h1>Suggested people</h1>
                
                    {matchingStudents.length > 0 ? (
                        matchingStudents.map(student => (
                            <form key={student.studentid} className="invitepplform">
                                <div className="inviteppldetails">
                                    <div className="suggname">{student.studentid}</div>
                                    <button type="button" onClick={() => handleInvite(student.studentid)}>Invite</button>
                                </div>
                            </form>
                        ))
                    ) : (
                        <div>No matching students found.</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default InvitePeople;
