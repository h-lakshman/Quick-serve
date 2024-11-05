// src/components/Navbar.js
import React from "react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [seen, setSeen] = useState(false);
  function togglePop() {
    setSeen(!seen);
  }
  const [signup, setsignup] = useState(false);

  function togglesignup() {
    setsignup(!signup);
  }

  useEffect(() => {
    if (seen || signup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [seen, signup]);

  return (
    <nav className="navbar1">
      <div className="">
        <img src="nobg2.png" alt="" className="logoleft"/>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a onClick={togglePop}>Login</a>
        </li>
        {seen ? <Login toggle={togglePop} /> : null}

        <li>
          <a onClick={togglesignup}>Signup</a>
        </li>
        {signup ? <Signup toggl={togglesignup} /> : null}
      </ul>
    </nav>
  );
};

export default Navbar;

