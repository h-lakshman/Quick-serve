import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/Home.jsx";
import CreateBuisness from "./components/CreateBusiness.jsx";
import Search from './components/Search.jsx'
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "./redux/actions.js";
import ServiceDetailPage from "./components/ServiceDetail.jsx";
import MyBusiness from "./components/MyBusiness.jsx";
import DirectionsPage from "./components/DirectionsPage.jsx";
import TrustPage from "./components/Trustpage.jsx";


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      if (localStorage.getItem('token') != null) {
        dispatch(setAuthenticated(true));
      }
    };

    checkAuth();
  }, [dispatch, navigate, location]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-buisness" element={<CreateBuisness />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/my-business" element={<MyBusiness />} />
        <Route path="/directions" element={<DirectionsPage />} />
        <Route path="/trust" element={<TrustPage />} />


      </Routes>
      {!location.pathname.includes('direction') ? <Footer /> : ''}


    </>
  );
}

export default App;
