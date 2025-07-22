import React, { useContext, useState } from "react";
import "./BoardHeader.css";
import ProfileCard from "./ProfileCard";
import { MyContext } from "../store/MyContext";

const BoardHeader = () => {
  
  const [profileVisible, setProfileVisible] = useState(false);
  const {userDetails}=useContext(MyContext);
  return (
    <div className="board-nav">
      <div className="board-heading"><span>Kanban Board</span></div>
      <div className="board-options">
        <span className="board-header-option" style={{color:"white"}}>
        <i class="fa-solid fa-bell"></i>
        </span>
        <span
          className="board-header-option"
          style={{ color: "white" }}
          title="user profile"
          onClick={() => setProfileVisible(!profileVisible)}
        >
          <img
            className="user-image1"
            src="user_icon.png"
            style={{ width: "2rem", margin: "5px", cursor: "pointer" }}
            alt=""
          />
        </span>
        {console.log(userDetails)}
        {/* <ProfileCar/> */}
        <ProfileCard visible={profileVisible} id={userDetails._id} name={userDetails?.name} email={userDetails?.email} /> 
      </div>
    </div>
  );
};

export default BoardHeader;
