import '../assets/styles/Home.css'
import { useSelector, useDispatch } from "react-redux";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CardSection from './CardSection';

export default function Home() {
  const isLoginOpen = useSelector((state) => state.reducer.openLoginForm);
  const isSignupOpen = useSelector((state) => state.reducer.openSignUpForm);

  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [<Background2 />, <Background3 />, <Background1 />, <Background4 />, <Background5 />];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Background background={backgrounds[backgroundIndex]} />
      {isLoginOpen ? <SignInForm /> : ""}
      {isSignupOpen ? <SignUpForm /> : ""}
    </>
  );
}

function Background({ background }) {
  return (
    <div>
      {background}
      <div style={{ top: '100vh', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: '30px',
          fontWeight: '900',
          letterSpacing: '-0.8px',
          lineHeight: '38px',
          color: 'rgba(0,0,0, 1)',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          Categories
        </h1>
        <CardSection />
      </div>
    </div>
  );
}

const Background1 = () => {
  return (
    <div style={{
      height: '85vh',
      width: '100%',
    }}>
      <img
        style={{
          backgroundSize: "cover",
          left: "0",
          position: "absolute",
          right: "0",
          top: "0",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "100%",
          height: "100vh",
        }}
        src="https://s3-media0.fl.yelpcdn.com/educatorphoto/ccPzYQQGD-GXSUadmL3SPw/o.jpg"
        alt=""
      />
      <div style={{
        display: "flex", flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', height: '100%', width: '90%',
        paddingLeft: '100px'
      }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '50px',
          fontWeight: '900',
          letterSpacing: '-0.8px',
          lineHeight: '38px',
          color: 'rgba(255,255,255, 1)',
        }}>
          Dial up the comfort
        </h1>
        <Button
          sx={{
            color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
            border: '1px solid transparent',
            fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            width: '100px',
            fontWeight: '740',
            lineHeight: '24px',
            padding: '0px 5px',
          }}>
          <SearchIcon />
          <p style={{ marginLeft: '5px' }}>HVAC</p></Button>
      </div>
    </div >
  )
}

const Background2 = () => {
  return (
    <div style={{
      height: '90vh',
      width: '100%',
    }}>
      <img
        style={{
          backgroundSize: "cover",
          left: "0",
          position: "absolute",
          right: "0",
          top: "0",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "100%",
          height: "100vh",
        }}
        src="https://s3-media0.fl.yelpcdn.com/educatorphoto/qCeYjXM6N03MTsfQF6LREg/o.jpg"
        alt=""
      />
      <div style={{
        display: "flex", flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', height: '100%', width: '90%',
        paddingLeft: '100px'
      }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '50px',
          fontWeight: '900',
          letterSpacing: '-0.8px',
          lineHeight: '38px',
          color: 'rgba(255,255,255, 1)',
        }}>
          The gift of a clean
          <br />
          <br />
          home
        </h1>
        <Button
          sx={{
            color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
            border: '1px solid transparent',
            fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '12px',
            width: '150px',
            fontWeight: '740',
            lineHeight: '24px',
            padding: '0px 5px',
          }}>
          <SearchIcon />
          <p style={{ marginLeft: '5px' }}>Home Cleaner</p> </Button>
      </div>
    </div >
  )
}

const Background3 = () => {
  return (
    <div style={{
      height: '90vh',
      width: '100%',
    }}>
      <img
        style={{
          backgroundSize: "cover",
          left: "0",
          position: "absolute",
          right: "0",
          top: "0",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "100%",
          height: "100vh",
        }}
        src='https://static.vecteezy.com/system/resources/previews/010/508/286/non_2x/side-view-of-a-handsome-asian-electrician-repairing-an-electrical-box-with-pliers-in-the-corridor-free-photo.jpg'
        alt=""
      />
      <div style={{
        display: "flex", flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', height: '100%', width: '90%',
        paddingLeft: '100px'
      }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '50px',
          fontWeight: '900',
          letterSpacing: '-0.8px',
          lineHeight: '38px',
          color: 'rgba(255,255,255, 1)',
        }}>
          Powering Your Home,
          <br />
          <br />
          One Connection at a Time!
        </h1>
        <Button
          sx={{
            color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
            border: '1px solid transparent',
            fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '12px',
            width: '150px',
            fontWeight: '740',
            lineHeight: '24px',
            padding: '0px 5px',
          }}>
          <SearchIcon />
          <p style={{ marginLeft: '5px' }}>
            Electricians
          </p> </Button>
      </div>
    </div >
  )
}

const Background4 = () => {
  return (
    <div style={{
      height: '90vh',
      width: '100%',
    }}>
      <img
        style={{
          backgroundSize: "cover",
          left: "0",
          position: "absolute",
          right: "0",
          top: "0",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "100%",
          height: "100vh",
        }}
        src="https://static.vecteezy.com/system/resources/previews/039/896/808/large_2x/ai-generated-a-plumber-is-fixing-the-drain-in-the-bathroom-generated-by-artificial-intelligence-free-photo.jpg"
        alt=""
      />
      <div style={{
        display: "flex", flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', height: '100%', width: '90%',
        paddingLeft: '100px'
      }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '50px',
          fontWeight: '900',
          letterSpacing: '-0.8px',
          lineHeight: '38px',
          color: 'rgba(255,255,255, 1)',
        }}>
          Fixing Leaks, Building Trust
        </h1>
        <Button
          sx={{
            color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
            border: '1px solid transparent',
            fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '12px',
            width: '150px',
            fontWeight: '740',
            lineHeight: '24px',
            padding: '0px 5px',
          }}>
          <SearchIcon />
          <p style={{ marginLeft: '5px' }}>
            Plumbers
          </p> </Button>
      </div>
    </div >
  )
}

const Background5 = () => {
  return (
    <div style={{
      height: '90vh',
      width: '100%',
    }}>
      <img
        style={{
          backgroundSize: "cover",
          left: "0",
          position: "absolute",
          right: "0",
          top: "0",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "100%",
          height: "100vh",
        }}
        src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg"
        alt=""
      />
      <div style={{
        display: "flex", flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', height: '100%', width: '90%',
        paddingLeft: '100px'
      }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '50px',
          fontWeight: '900',
          letterSpacing: '-0.8px',
          lineHeight: '38px',
          color: 'rgba(255,255,255, 1)',
        }}>
          Where Learning Meets Excellence,
          <br />
          <br />
          Right at Home!
        </h1>
        <Button
          sx={{
            color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
            border: '1px solid transparent',
            fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '12px',
            width: '150px',
            fontWeight: '740',
            lineHeight: '24px',
            padding: '0px 5px',
          }}>
          <SearchIcon />
          <p style={{ marginLeft: '5px' }}>
            Home Tutors
          </p> </Button>
      </div>
    </div >
  )
}