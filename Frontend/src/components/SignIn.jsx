import Dialog from "@mui/material/Dialog";
import { DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated, setEmail, setLoginForm, setPassword } from "../redux/actions.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GoogleButton from "react-google-button";

export default function SignInForm() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.reducer.openLoginForm);
  const email = useSelector((state) => state.reducer.email);
  const password = useSelector((state) => state.reducer.password);

  const handleClose = () => {
    dispatch(setLoginForm(false));
  };
  const setLoginFormItem = (e) => {
    if (e.target.id == "email") {
      dispatch(setEmail(e.target.value));
    } else if (e.target.id == "password") {
      dispatch(setPassword(e.target.value));
    }
  };
  const submitLoginForm = async () => {
    const request = await fetch("http://127.0.0.1:8000/auth/login/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });
    const response = await request.json();
    if (response.ok) {
      dispatch(setAuthenticated(true))
      localStorage.setItem('token', response.token)

      handleClose()
    }
    console.log(response);
  };

  return (
    <Dialog open={isLogin} onClose={handleClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          width: "400px",
        }}
      >
        <AccountCircleIcon
          fontSize="large"
          sx={{
            marginBottom: "3px",
            paddingBottom: "0px",
            marginTop: "2px",
            paddingTop: "0px",
          }}
        />
        <DialogTitle>Sign In to QuickServe</DialogTitle>
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
          Connect with great local businesses
        </div>
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
        <TextField
          onChange={setLoginFormItem}
          id="email"
          label="Email"
          sx={{ marginTop: "15px", width: "80%" }}
        />
        <TextField
          onChange={setLoginFormItem}
          id="password"
          label="Password"
          type="password"
          sx={{ marginTop: "15px", width: "80%" }}
        />
        <Button
          onClick={submitLoginForm}
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
          Login
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
          New To QuickServe{" "}
          <Button style={{ textDecoration: "none" }}>Sign Up</Button>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
