import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import CarouselComponent from "./assets/components/CarouselComponent";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      
      <div className="main">
        <CarouselComponent />
        
      </div>
      <Footer />
    </>
  );
}

export default App;
