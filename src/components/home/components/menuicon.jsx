import React from "react";
import "./menuicon.css";
import { useNavigate } from "react-router-dom";

   
function Menuicon(props){
    const navigate = useNavigate();
    function clicked(){
        if(props.action==="teams"){
            navigate('/myteams');
        }
        else if(props.action==="createProject"){
            navigate('/createproject');
        }
        else if(props.action==="clubs"){
            navigate('/clubs');
        }
        else if(props.action==="requests"){
            navigate('/requests');
        }
    }
    return(
        <div onClick={clicked} className="menuicons" style={{backgroundColor: props.color}}><div className="menuiconimg">{props.img}</div>
    <div className="text">{props.text}</div></div>
    )
}

export default Menuicon;