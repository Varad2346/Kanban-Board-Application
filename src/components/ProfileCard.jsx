import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";
import { MyContext } from "../store/MyContext";
import { jwtDecode } from "jwt-decode";

const ProfileCard = ({ visible, id }) => {
  const { shouldRefresh } = useContext(MyContext);

  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserDetails(() => decoded.user);
    }
  }, [shouldRefresh]);

  const navigate = useNavigate();
  const deleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id,
        }),
      });
      console.log(id, response);
      navigate("/register");
    } catch (err) {
      console.error("Error updating backend:", err);
    }
  };

  // if (!visible) return null;
  return (
    <div className={`profile-card ${visible ? "show" : ""}`}>
      <div className="profile-card-one" onClick={console.log("click")}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "70px",
            marginLeft: "20px",
          }}
        >
          <img
            className="user-image1"
            src="user_icon.png"
            style={{ width: "40px", margin: "5px" }}
            alt=""
          />
        </div>
        <div className="profile-details">
          <span>{userDetails?.name}</span>
          <span>{userDetails?.email}</span>
        </div>
      </div>

      <div className="profile-card-options">
        <div className="profile-option">
          <i
            class="fa-solid fa-pen-to-square"
            style={{ marginLeft: "20px", fontWeight: "100" }}
          ></i>
          <span style={{ marginLeft: "20px" }} onClick={deleteProfile}>
            Delete Profile
          </span>
        </div>
        <div className="profile-option">
          <i
            class="fa-solid fa-pen-to-square"
            style={{ marginLeft: "20px", fontWeight: "100" }}
          ></i>
          <span style={{ marginLeft: "20px" }}>Account settings</span>
        </div>
        <div
          className="profile-option"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <i
            class="fa-solid fa-right-from-bracket"
            style={{ marginLeft: "20px" }}
          ></i>
          <span style={{ marginLeft: "20px" }}>Log out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
