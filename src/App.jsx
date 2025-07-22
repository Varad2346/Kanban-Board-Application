import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import "./App.css"
import Home from "./Pages/Home";
const App = () => {
  return (
  
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
      <Route path='/home' element={<Home/>}></Route> 
    </Routes>
  );
};

export default App;
