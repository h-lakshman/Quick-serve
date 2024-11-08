import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CarouselComponent from "./CarouselComponent";
import CardSection from "./CardSection";
import SearchPage from './SearchPage';
import OneService from './OneService'

function Home() {
  return (
    <>
      <Navbar />
      <div className="main">
        <CarouselComponent />
        <CardSection />
        <SearchPage />
        
      </div>
      <Footer />
    </>
  );
}

export default Home;
