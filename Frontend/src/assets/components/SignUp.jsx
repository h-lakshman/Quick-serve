import Dialog from "@mui/material/Dialog";
import { DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setSignUpForm,
  setEmail,
  setPassword,
  setfirstName,
  setlastName,
  setPhoneNumber,
} from "../redux/actions";
import GoogleButton from "react-google-button";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const isSignUp = useSelector((state) => state.reducer.openSignUpForm);
  const email = useSelector((state) => state.reducer.email);
  const password = useSelector((state) => state.reducer.password);
  const firstName = useSelector((state) => state.reducer.firstName);
  const lastName = useSelector((state) => state.reducer.lastName);
  const phoneNumber = useSelector((state) => state.reducer.phoneNumber);
  const handleClose = () => {
    dispatch(setSignUpForm(false));
  };
  const setRegsiterForm = (e) => {
    if (e.target.id == "email") {
      dispatch(setEmail(e.target.value));
    } else if (e.target.id == "password") {
      dispatch(setPassword(e.target.value));
    } else if (e.target.id == "firstName") {
      dispatch(setfirstName(e.target.value));
    } else if (e.target.id == "lastName") {
      dispatch(setlastName(e.target.value));
    } else if (e.target.id == "phoneNumber") {
      dispatch(setPhoneNumber(e.target.value));
    }
  };
  const submitRegisterForm = async () => {
    const request = await fetch("http://127.0.0.1:8000/auth/register/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      }),
    });

    const response = await request.json();

    console.log(response);
  };
  return (
    <Dialog open={isSignUp} onClose={handleClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          width: "400px",
          zIndex: "1",
        }}
      >
        <DialogTitle>Sign Up to QuickServe</DialogTitle>

        <div
          style={{
            textAlign: "center",
            fontFa: "Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "25x",
            fontWeight: "400",
            letterSpacing: "0px",
            lineHeight: "20px",
            color: "rgb(45, 46, 47)",
          }}
        >
          By proceeding, you agree to QuickServe's Terms of Service and
          acknowledge QuickServe's Privacy Policy.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: "15px",
            width: "80%",
          }}
        >
          <TextField
            onChange={setRegsiterForm}
            id="firstName"
            label="First Name"
            sx={{ width: "50%", marginRight: "5px" }}
          />
          <TextField
            onChange={setRegsiterForm}
            id="lastName"
            label="Last Name"
            sx={{ width: "50%", marginLeft: "5px" }}
          />
        </div>
        <TextField
          onChange={setRegsiterForm}
          id="email"
          label="Email"
          sx={{ marginTop: "15px", width: "80%" }}
        />
        <TextField
          onChange={setRegsiterForm}
          id="password"
          label="Password"
          type="password"
          sx={{ marginTop: "15px", width: "80%" }}
        />
        <TextField
          onChange={setRegsiterForm}
          id="phoneNumber"
          label="Mobile Number"
          sx={{ marginTop: "15px", width: "80%" }}
        />
        <Button
          onClick={submitRegisterForm}
          sx={{
            color: "rgba(255, 255, 255, 1)",
            backgroundColor: "rgba(215, 22, 22, 1)",
            border: "1px solid transparent",
            fontFamily: "Poppins, Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "16px",
            width: "80%",
            fontWeight: "740",
            lineHeight: "24px",
            height: "50px",
            marginTop: "15px",
          }}
        >
          SignUp
        </Button>
        <div
          style={{
            marginTop: "15px",
            fontFamily:
              "Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0px",
            lineHeight: "20px",
            color: "rgb(107, 109, 111)",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          or
        </div>
        <div style={{ marginBottom: "20px" }}>
          <GoogleButton
            type="light"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: "rgb(107, 109, 111)",
            height: "2px",
            width: "100%",
            marginRight: "250px",
            marginLeft: "250px",
          }}
        ></div>
        <DialogTitle>
          already have an account?
          <Button style={{ textDecoration: "none" }}>Sign Up</Button>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
