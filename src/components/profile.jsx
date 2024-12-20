import React, { useEffect, useState } from "react";
import "./profile.css";
import Navbar from "./Navbar";
import Skillbox from "./login/skillbox";

function Profile(props) {
    const [profile, setProfile] = useState(null);
    const username = JSON.parse(window.localStorage.getItem('username'));

    useEffect(() => {
        // Fetch data from the backend
        fetch(`http://localhost:8003/api/profile/${username}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Profile:', data); // Log the entire profile for debugging
                setProfile(data);
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, [username]);

    if (!profile) return <div>Loading...</div>;

    // Parse the skills JSON string if it's a string
    let skills = [];
    try {
        // Check if profile.skills is a valid JSON string that can be parsed
        if (typeof profile.skills === 'string') {
            skills = JSON.parse(profile.skills);  // Parse the JSON string into an array
        } else if (Array.isArray(profile.skills)) {
            skills = profile.skills;  // If it's already an array, use it directly
        }
    } catch (error) {
        console.error('Error parsing skills JSON:', error);
    }

    console.log(skills); // Log the parsed skills array for debugging

    return (
        <>
            <Navbar logout="true" />
            <div className="pbody">
                <h1>My Profile</h1>
                <div className="profilecontainer">
                    <div className="col1">Username: <div className="pusername">{profile.studentid}</div></div>
                    <div className="col2">Email: <div className="pemail">{profile.email}</div></div>
                    <div className="col3">First name: <div className="pfirstname">{profile.firstname}</div></div>
                    <div className="col4">Last Name: <div className="plastname">{profile.lastname}</div></div>
                    <div className="col5">Phone no: <div className="pphno">{profile.phone || 'N/A'}</div></div>
                </div>
                <h2>My Skills:</h2>
                <div className="skillscontainer">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <Skillbox key={index} skill={skill} />
                        ))
                    ) : (
                        <div>No skills available</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
