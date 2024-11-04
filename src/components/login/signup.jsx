import React,{ useState } from "react";
import Navbar from "../Navbar";
import "./signup.css";
import Skillbox from "./skillbox";
import { useNavigate } from "react-router-dom";
function Signup(props){
    const navigate = useNavigate();
    const[skills,setSkill]=useState([]);
    const[skill,setskill]=useState("");
    function handleinputchange(e){
        setskill(e.target.value);
    }
    const skilladd=(e)=>{
        e.preventDefault();
        if (skill && !skills.includes(skill)) {
            setSkill([...skills, skill]); 
            setskill(""); 
        }
        document.getElementById("skillinput").value = "";
    }

    //
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            username: props.username,
            email: props.email,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            dob: document.getElementById("dob").value,
            department: document.getElementById("department").value,
            skills: skills
        };
    
        fetch("http://localhost:8003/signupcompletion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then(response =>navigate("/home"))
        .then(data => {
            if (data == "User registered successfully") {
                alert("Profile completed successfully!");
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));
    };
    
    //
    //

    return <>
    <Navbar logout={"false"}/><form action="" onSubmit={handleSubmit}>
    <div className="body">
        
        <div className="container">
            <div className="fullname"> <input id="firstName" type="text" placeholder="enter first name"/> <input id="lastName" type="text" placeholder="enter last name"/></div>
            <div className="enteryourskills">Enter your skills:
        <input type="text" name="" id="skillinput" list="suggestions" onChange={handleinputchange}/>
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
        <button onClick={skilladd}>add</button></div>
        
        <div id="skillstextarea">{skills.map((s)=>(
             <Skillbox key={s} skill={s} />
        ))}</div>
        <div className="dob" id="dob">Date of Birth: <input type="date"/></div><div className="dept"> Department: <select name="" id="department">
            <option value="">CS</option>
            <option value="">EC</option>
            <option value="">CU</option>
            <option value="">MECH</option>
            <option value="">EB</option>
            <option value="">EEE</option>
            </select></div> <button type="submit" className="completesignup">Complete signup</button>
    </div>
    
    </div>
   </form>
    </>
}

export default Signup;