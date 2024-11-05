import React, { useState, useEffect } from "react"; // Import useState and useEffect
import "./Requests.css";
import RequestBox from "./requestbox";
import Navbar from "../../../Navbar";
import Invite from "./invite";
import { useNavigate } from "react-router-dom";

function Requests() {
    const username = JSON.parse(window.localStorage.getItem('username'));
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:8003/api/getRequests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }), // Send username in the request body
                });
                if (response.ok) {
                    const data = await response.json();
                    setRequests(data.requests); // Assuming backend responds with { requests: [...] }
                } else {
                    console.error("Failed to fetch requests");
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [username]);

    return (
        <>
            <Navbar logout="true" />
            <div className="reqbody">
                <div className="reqcontainer">
                    <h1>My Requests</h1>
                    <div className="scrollbox">
                        {loading ? (
                            <p>Loading requests...</p>
                        ) : requests.length > 0 ? (
                            requests.map((request, index) => (
                                <RequestBox
                                    key={index} // Use index or a unique identifier
                                    requester={request.requestedby} // Assuming requestedby is in the request object
                                    reqid={request.requestid}
                                    title={request.title} // Assuming title is in the request object
                                />
                            ))
                        ) : (
                            <p>No more Requests</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Requests;
