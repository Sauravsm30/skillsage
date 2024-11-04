import React from "react";
import "./slidemenu.css";

function Slidemenu(props){
    return <>
    <div className={props.className} id="slidemenu">
        <a href="/home" className="slideicons">Home</a>
        <a href="/profile" className="slideicons">Profile</a>
        <a href="" className="slideicons">Contact</a>
        <a href="/" id="slidelogout">Logout</a>
    </div>
    </>
}

export default Slidemenu;