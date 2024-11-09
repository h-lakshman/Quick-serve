import { useSelector, useDispatch } from "react-redux";

import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

function Home() {
  const isLoginOpen = useSelector((state) => state.reducer.openLoginForm);
  const isSignupOpen = useSelector((state) => state.reducer.openSignUpForm);
  return (
    <>
      <Background />
      {isLoginOpen ? <SignInForm /> : ""}
      {isSignupOpen ? <SignUpForm /> : ""}
    </>
  );
}
export default Home;

function Background() {
  return (
    <img
      style={{
        backgroundSize: "cover",
        left: "0",
        position: "absolute",
        right: "0",
        top: "0",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        width: "100vw",
        height: "100vh",
      }}
      src="https://s3-media0.fl.yelpcdn.com/educatorphoto/ccPzYQQGD-GXSUadmL3SPw/o.jpg"
      alt=""
    />
  );
}
