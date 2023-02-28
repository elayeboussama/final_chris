import React ,{   useContext  } from "react";
import "../App.css" ;
import BasicTabs from "../components/Tab";



const Application = () => {
    return (
        <div className="main">
          <h1>Complete Your Profile</h1>
            <BasicTabs/>
        </div>
    )
}

export default Application


