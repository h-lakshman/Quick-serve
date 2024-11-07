import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import CarouselComponent from "./assets/components/CarouselComponent";
import CardSection from "./assets/components/CardSection";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      
      <div className="main">
        <CarouselComponent />
        <CardSection/>
      </div>
      <Footer />
    </>
  );
}

export default App;
