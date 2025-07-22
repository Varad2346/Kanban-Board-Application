import React from "react";
import "./Home.css"
import SideBar from "../components/Sidebar";
import MainBar from "../components/MainBar";
import Content from "../components/Content";

const Home = () => {
  return <div className="home-container">
    <SideBar/>
    <MainBar/>
    <Content/>
  </div>;
};

export default Home;
