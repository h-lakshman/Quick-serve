import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import CarouselComponent from "./assets/components/CarouselComponent";

import "./App.css";
import SearchPage from "./assets/components/SearchPage";
import CardSection from "./assets/components/CardSection";

function App() {
  return (
    <>
      <Navbar />
      
      <div className="main">
        <CarouselComponent />
        <CardSection/><br />
      </div>
      
      <Footer />
      
    </>
  );
}

export default App;
