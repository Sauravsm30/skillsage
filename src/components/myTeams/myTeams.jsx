import React, { useEffect, useState } from "react";
import "./myTeams.css";
import Navbar from "../Navbar";
import Teamsforyou from "./teamsforyou";

function MyTeams() {
    const [matchingTeams, setMatchingTeams] = useState([]);
    const username = JSON.parse(window.localStorage.getItem('username')); // Directly get the username string

    useEffect(() => {
        const fetchMatchingTeams = async () => {
            try {
                // Fetch user's skills
                const userResponse = await fetch(`http://localhost:8003/api/teamsforyou?username=${username}`);
                if (!userResponse.ok) throw new Error(`Error fetching user data: ${userResponse.statusText}`);
                const userData = await userResponse.json();
        
                // Handle user skills
                let userSkills;
                if (typeof userData.skills === 'string') {
                    userSkills = userData.skills.split(',').map(skill => skill.trim());
                } else if (Array.isArray(userData.skills)) {
                    userSkills = userData.skills.map(skill => skill.trim());
                } else {
                    throw new Error("Unexpected format for userData.skills");
                }
        
                // Fetch project ideas
                const projectResponse = await fetch('http://localhost:8003/api/projectideas');
                if (!projectResponse.ok) throw new Error(`Error fetching project ideas: ${projectResponse.statusText}`);
                const projectIdeas = await projectResponse.json();
        
                // Match user skills with project skills
                const matchingProjects = projectIdeas.filter(project => {
                    let skillsRequired;
        
                    // Handle project.skills_required
                    if (typeof project.skills_required === 'string') {
                        skillsRequired = project.skills_required.split(',').map(skill => skill.trim());
                    } else if (Array.isArray(project.skills_required)) {
                        skillsRequired = project.skills_required.map(skill => skill.trim());
                    } else {
                        console.error("Unexpected format for project.skills_required:", project.skills_required);
                        return false; // Skip this project if the format is unexpected
                    }
        
                    return skillsRequired.some(skill => userSkills.includes(skill));
                });
        
                setMatchingTeams(matchingProjects);
            } catch (error) {
                console.error("Failed to fetch matching teams:", error);
            }
        };
        
        fetchMatchingTeams();
    }, [username]);

    return (
        <>
            <Navbar logout="true" />
            <div className="teambody">
                <div className="teamscontainer">
                    <h1>My Teams</h1>
                    <div className="teamscroll">
                        <div>No more Teams to display</div>
                    </div>
                </div>
                <div className="teamscontainer">
                    <h1>Teams for You</h1>
                    <div className="teamscroll">
                        {matchingTeams.length > 0 ? (
                            matchingTeams.map((project, index) => (
                                <div key={index}>
                                    <Teamsforyou 
                                        name={project.title} 
                                        leader={project.proposedby}
                                        skills={project.skills_required} // Directly use as string
                                    />
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <div>No matching teams for your skills.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyTeams;
