import React, { useState } from "react";
import "./createProject.css";
import Navbar from "../../../Navbar";
import Skillbox from "../../../login/skillbox";
import { useNavigate } from "react-router-dom";


function CreateProject(){
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();

        const projectData = {
            username: username,
            title: title,
            description: description,
            skills: skills,
        };

        try {
            const response = await fetch("http://localhost:8003/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                const data = await response.json(); // Get the response data
                const projectid = data.projectId; // Extract the project ID

                alert("Project created successfully!");
                navigate(`/inviteppl/${projectid}`); // Use the project ID for navigation
            } else {
                alert("Failed to create project.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    const[skills,setSkill]=useState([]);
    const[skill,setskill]=useState("");
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const username = JSON.parse(window.localStorage.getItem('username'));
    function handleinputchange1(e){
        setskill(e.target.value);
    }
    function handletitlechange(e){
        setTitle(e.target.value);
    }
    function handledescchange(e){
        setDescription(e.target.value)
    }
    const skilladd=(e)=>{
        e.preventDefault();
        if (skill && !skills.includes(skill)) {
            setSkill([...skills, skill]); 
            setskill(""); 
        }
        document.getElementById("skillinput").value = "";
    }
    return <>
    <Navbar logout="true" />
    <div className="body1">
        <form action="" onSubmit={handleSubmit}>
            <div className="createcontainer">
                <div>Enter Project Title:<input required type="text" onChange={handletitlechange} placeholder="Enter title" id="projectTitle"/></div>{/*project title */}
                <div>Enter Description for the project: <textarea required name="" onChange={handledescchange} id="projectDescription" placeholder="Enter description"></textarea></div>{/*project description */}
               
                <div className="enteryourskills1">Enter skill requirements:
        <input type="text" name="" id="skillinput" list="suggestions" onChange={handleinputchange1}/>
        <datalist id="suggestions">
            <option value="HTML"></option>
            <option value="CSS"></option>
            <option value="JavaScript"></option>
            <option value="Python"></option>
            <option value="Java"></option>
            <option value="C++"></option>
            <option value="SQL"></option>
            <option value="NoSQL"></option>
            <option value="Machine Learning"></option>
            <option value="Data Structures"></option>
            <option value="Algorithms"></option>
            <option value="Operating Systems"></option>
            <option value="Database Management"></option>
            <option value="Cloud Computing"></option>
            <option value="Version Control (Git)"></option>
            <option value="OOP"></option>
            <option value="Network Security"></option>
            <option value="AI"></option>
            <option value="Cybersecurity"></option>
            <option value="Software Development"></option>
            <option value="DevOps"></option>
            <option value="Blockchain"></option>
            <option value="Mobile App Development"></option>
            <option value="Computer Networks"></option>
            <option value="Big Data"></option>
            <option value="Web Development"></option>
            <option value="System Design"></option>
        </datalist>
        <button onClick={skilladd} className="addbutt">add</button></div>
        
        <div id="skillstextarea1">{skills.map((s)=>(
             <Skillbox key={s} skill={s} />
        ))}</div>

                <button className="subbutt" type="submit">Create</button>
            </div>
        </form>
    </div>
    </>
}

export default CreateProject;