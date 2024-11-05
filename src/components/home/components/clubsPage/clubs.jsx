import React from "react";
import "./clubs.css";
import Navbar from "../../../Navbar";

function Clubs() {
    return (
        <>
            <Navbar logout={"true"} />
            <div className="clubs-container">
                <h1>     </h1>
                <div className="clubs-list">
                    {["Tech Club", "Music Club", "Art Club", "Sports Club"].map((club, index) => (
                        <div className="club-item" key={index}>
                            <span>{club}</span>
                            <button className="request-btn">Request to Join</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Clubs;