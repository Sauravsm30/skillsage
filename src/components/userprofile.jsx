import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Skillbox from "./login/skillbox";

function Userprofile() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch data from the backend
        fetch(`http://localhost:8003/api/userprofile/${username}`)
            .then(response => response.json())
            .then(data => setProfile(data))
            .catch(error => console.error('Error fetching profile:', error));
    }, [username]);

    if (!profile) return <div>Loading...</div>;

    // Parse the skills if it's a JSON string, else use it as an array
    let skills = [];
    try {
        // Check if profile.skills is a string and needs to be parsed
        if (typeof profile.skills === 'string') {
            skills = JSON.parse(profile.skills);  // Parse the JSON string into an array
        } else if (Array.isArray(profile.skills)) {
            skills = profile.skills;  // If it's already an array, use it directly
        }
    } catch (error) {
        console.error('Error parsing skills JSON:', error);
        skills = []; // Fallback to an empty array in case of an error
    }

    return (
        <>
            <Navbar logout="true" />
            <div className="pbody">
                <h1>{username}'s Profile</h1>
                <div className="profilecontainer">
                    <div className="col1">Username: <div className="pusername">{profile.studentid}</div></div>
                    <div className="col2">Email: <div className="pemail">{profile.email}</div></div>
                    <div className="col3">First name: <div className="pfirstname">{profile.firstname}</div></div>
                    <div className="col4">Last Name: <div className="plastname">{profile.lastname}</div></div>
                    <div className="col5">Phone no: <div className="pphno">{profile.phone || '123456789'}</div></div>
                </div>
                <h2>Skills:</h2>
                <div className="skillscontainer">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <Skillbox key={index} skill={skill} />
                        ))
                    ) : (
                        <div>No skills available</div>  // Display this if skills array is empty
                    )}
                </div>
            </div>
        </>
    );
}

export default Userprofile;
