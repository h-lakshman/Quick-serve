import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import CreateBuisness from "./components/CreateBusiness.jsx";
import Search from './components/Search.jsx'
import NavBar from "./components/NavBar.jsx";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-buisness" element={<CreateBuisness />} />
        <Route path="/search" element={<Search />} />

      </Routes>
    </>
  );
}

export default App;
