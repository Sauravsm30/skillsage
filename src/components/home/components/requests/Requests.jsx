import React from "react";
import "./Requests.css";
import RequestBox from "./requestbox";
import Navbar from "../../../Navbar";

function Requests(){
    return <><Navbar logout="true"/> <div className="reqbody">
        
        <div className="reqcontainer">
        <h1>My Requests</h1>
        <div className="scrollbox">
            <RequestBox title={"Student collaboration platform"} leader={"Saurav S Menon"} />
            <hr />No more Requests

            </div>
        </div>
    </div></>
}

export default Requests;