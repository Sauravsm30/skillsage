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
        .then(data => setProfile(data))
        .catch(error => console.error('Error fetching profile:', error));
}, [username]);

    if (!profile) return <div>Loading...</div>;

    // Parse the skills if it's a JSON string
    let skills = [];
    try {
        skills = JSON.parse(profile.skills) || [];
    } catch (error) {
        console.error('Error parsing skills JSON:', error);
    }

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
                    {skills.map((skill, index) => (
                        <Skillbox key={index} skill={skill} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Profile;
