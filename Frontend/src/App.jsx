
import "./App.css";
import Home from "./assets/components/Home";
import OneService from "./assets/components/OneService";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from "./assets/components/Signup";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import CreateBuisness from "./components/CreateBuisness.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/service/:id' element={<OneService/>} />
          <Route path='/signup' elemnt={<Signup/>} />
        </Routes>
      </Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-buisness" element={<CreateBuisness />} />
      </Routes>
    </>
  );
}

export default App;
