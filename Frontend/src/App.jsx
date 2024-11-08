
import "./App.css";
import Home from "./assets/components/Home";
import OneService from "./assets/components/OneService";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/service/:id' element={<OneService/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
