import "../assets/styles/CreateBuisness.css";
import BuisnessDetail from "../assets/images/dummy_buisness.jpg";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import SuccessIcon from "../assets/images/success.png";
import {
  setAdhaar,
  setArea,
  setBuildingName,
  setBuisnessName,
  setCategory,
  setCity,
  setContactEmail,
  setContactPerson,
  setFirstCreatePage,
  setFourthCreatePage,
  setPhone,
  setPincode,
  setSecondCreatePage,
  setState,
  setOpenAt,
  setThirdCreatePage,
  setCloseAt,
  setStreet,
  setSuccessPage,
  setDaysOpen,
  buisnessCreated,
} from "../redux/actions.js";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { Typography } from "@mui/material";

export default function CreateBusiness() {
  const firstPage = useSelector(
    (state) => state.createBuisnessReducer.firstPage
  );
  const secondPage = useSelector(
    (state) => state.createBuisnessReducer.secondPage
  );
  const thirdPage = useSelector(
    (state) => state.createBuisnessReducer.thirdPage
  );
  const fourthPage = useSelector(
    (state) => state.createBuisnessReducer.fourthPage
  );
  const successPage = useSelector(
    (state) => state.createBuisnessReducer.successPage
  );
  const [animationClass, setAnimationClass] = useState("");
  const isLoginOpen = useSelector((state) => state.reducer.openLoginForm);
  const isSignupOpen = useSelector((state) => state.reducer.openSignUpForm);
  useEffect(() => {
    setAnimationClass("fade-in");
  }, [firstPage, secondPage, thirdPage, fourthPage]);
  return (
    <div className="main">
      <div className="buisness-image-div">
        <img
          src={BuisnessDetail}
          alt=""
          style={{
            height: "550px",
            marginTop: "20px",
          }}
        />
      </div>
      {isLoginOpen ? <SignInForm /> : ""}
      {isSignupOpen ? <SignUpForm /> : ""}
      {firstPage && <FirstPage className={animationClass} />}
      {secondPage && <SecondPage className={animationClass} />}
      {thirdPage && <ThirdPage className={animationClass} />}
      {fourthPage && <FourthPage className={animationClass} />}
      {successPage && <SuccesPage className={animationClass} />}
    </div>
  );
}

function FirstPage({ className }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const buisnessName = useSelector((state) => state.createBuisnessReducer.buisnessName)
  const buildingName = useSelector((state) => state.createBuisnessReducer.buildingName)
  const pincode = useSelector((state) => state.createBuisnessReducer.pincode)
  const city = useSelector((state) => state.createBuisnessReducer.city)
  const street = useSelector((state) => state.createBuisnessReducer.street)
  const state = useSelector((state) => state.createBuisnessReducer.state)
  const area = useSelector((state) => state.createBuisnessReducer.area)

  const validateForm = () => {
    const newErrors = {};

    if (!buisnessName) {
      newErrors.buisnessName = "This field is required";
    }
    if (!buildingName) {
      newErrors.buildingName = "This field is required";
    }
    if (!street) {
      newErrors.street = "This field is required";
    }
    if (!city) {
      newErrors.city = "This field is required";
    }
    if (!state) {
      newErrors.state = "This field is required";
    }
    if (!pincode) {
      newErrors.pincode = "This field is required";
    }
    if (!area) {
      newErrors.area = "This field is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }
  const toSecondPage = () => {

    if (validateForm()) {
      dispatch(setFirstCreatePage(false));
      dispatch(setSecondCreatePage(true));
    }

  };
  return (
    <div className={className}>
      <h2 style={{ fontFamily: "sans-serif" }}>Enter your buisness details</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "30px",
        }}
      >
        <TextField
          id="buisnessName"
          label="Buisness Name"
          required
          onChange={(event) => dispatch(setBuisnessName(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.buisnessName}
          helperText={errors.buisnessName}
        />
        <TextField
          id="pincode"
          label="Pincode"
          required
          onChange={(event) => dispatch(setPincode(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.pincode}
          helperText={errors.pincode}
        />
        <TextField
          id="buildingName"
          label="Building Name"
          required
          onChange={(event) => dispatch(setBuildingName(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.buildingName}
          helperText={errors.buildingName}
        />
        <TextField
          id="street"
          required
          onChange={(event) => dispatch(setStreet(event.target.value))}
          label="Street"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.street}
          helperText={errors.street}
        />
        <TextField
          id="area"
          label="Area"
          required
          onChange={(event) => dispatch(setArea(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.area}
          helperText={errors.area}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="city"
            label="City"
            required
            onChange={(event) => dispatch(setCity(event.target.value))}
            variant="outlined"
            sx={{ marginRight: "20px", width: "50%" }}
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            id="state"
            label="State"
            required
            onChange={(event) => dispatch(setState(event.target.value))}
            variant="outlined"
            sx={{ marginLeft: "20px", width: "50%" }}
            error={!!errors.state}
            helperText={errors.state}
          />
        </div>
        <Button
          variant="contained"
          sx={{ marginTop: "10px", backgroundColor: "rgba(215, 22, 22, 1)" }}
          onClick={toSecondPage}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

function SecondPage({ className }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const contactPerson = useSelector((state) => state.createBuisnessReducer.contactPerson)
  const contactEmail = useSelector((state) => state.createBuisnessReducer.contactEmail)
  const phoneNumber = useSelector((state) => state.createBuisnessReducer.phoneNumber)
  const adhaar = useSelector((state) => state.createBuisnessReducer.adhaar)
  const validateForm = () => {
    const newErrors = {};

    if (!contactPerson) {
      newErrors.contactPerson = "This field is required";
    }
    if (!contactEmail) {
      newErrors.contactEmail = "This field is required";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "This field is required";
    }
    if (!adhaar) {
      newErrors.adhaar = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }
  const toThirdPage = () => {
    if (validateForm()) {
      dispatch(setSecondCreatePage(false));
      dispatch(setThirdCreatePage(true));
    }
  };
  return (
    <div className={className}>
      <h2 style={{ fontFamily: "sans-serif" }}>Add Contact Details</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "30px",
        }}
      >
        <TextField
          id="contactPerson"
          label="Contact Person"
          required
          onChange={(event) => dispatch(setContactPerson(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.contactPerson}
          helperText={errors.contactPerson}
        />
        <TextField
          id="phoneNumber"
          label="Mobile Number"
          required
          onChange={(event) => dispatch(setPhone(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          id="email"
          label="Email"
          required
          onChange={(event) => dispatch(setContactEmail(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.contactEmail}
          helperText={errors.contactEmail}
        />
        <TextField
          id="adhaar"
          label="Adhaar Number"
          required
          onChange={(event) => dispatch(setAdhaar(event.target.value))}
          variant="outlined"
          sx={{ margin: "10px 0" }}
          error={!!errors.adhaar}
          helperText={errors.adhaar}
        />

        <Button
          variant="contained"
          sx={{ marginTop: "10px", backgroundColor: "rgba(215, 22, 22, 1)" }}
          onClick={toThirdPage}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

function ThirdPage({ className }) {
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [errors, setErrors] = useState({});

  const openAt = useSelector((state) => state.createBuisnessReducer.openAt)
  const closeAt = useSelector((state) => state.createBuisnessReducer.closeAt)

  const validateForm = () => {
    const newErrors = {};

    const selectedDayCount = Object.values(selectedDays).filter(Boolean).length;
    if (selectedDayCount === 0) {
      newErrors.daysOpen = "Please select at least one day of the week.";
    }
    if (!openAt) {
      newErrors.openAt = "This field is required";
    }
    if (!closeAt) {
      newErrors.closeAt = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }
  const handleCheckBox = (event) => {
    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
    dispatch(setDaysOpen(selectedDays))
  };
  const toFourthPage = () => {
    if (validateForm()) {
      dispatch(setThirdCreatePage(false));
      dispatch(setFourthCreatePage(true));
    }

  };
  return (
    <div className={className}>
      <h2 style={{ fontFamily: "sans-serif" }}>Add Buisness Timings</h2>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "15px",
          paddingBottom: "6px",
        }}
      >
        Let your customers know when you are open for business
      </p>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "17px",
          paddingBottom: "1px",
          marginTop: "10px",
        }}
      >
        Select Days of the Week
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "30px",
        }}
      >
        {errors.daysOpen && (
          <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
            {errors.daysOpen}
          </Typography>
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.Monday}
                onChange={handleCheckBox}
                name="Monday"
              />
            }
            label="Monday"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.Tuesday}
                onChange={handleCheckBox}
                name="Tuesday"
              />
            }
            label="Tuesday"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.Wednesday}
                onChange={handleCheckBox}
                name="Wednesday"
              />
            }
            label="Wednesday"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.Thursday}
                onChange={handleCheckBox}
                name="Thursday"
              />
            }
            label="Thursday"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.Friday}
                onChange={handleCheckBox}
                name="Friday"
              />
            }
            label="Friday"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.Saturday}
                onChange={handleCheckBox}
                name="Saturday"
              />
            }
            label="Saturday"
          />
        </FormGroup>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <TextField
            id="openAt"
            label="Open at"
            variant="outlined"
            onChange={() => dispatch(setOpenAt(event.target.value))}
            sx={{ marginRight: "20px", width: "50%" }}
            error={!!errors.openAt}
            helperText={errors.openAt ? errors.openAt : "in HH:MM"}

          />
          <TextField
            id="closeAt"
            label="Close at"
            variant="outlined"
            onChange={() => dispatch(setCloseAt(event.target.value))}
            sx={{ marginLeft: "20px", width: "50%" }}
            error={!!errors.closeAt}
            helperText={errors.closeAt ? errors.closeAt : "in HH:MM"}

          />
        </div>

        <Button
          variant="contained"
          sx={{ marginTop: "10px", backgroundColor: "rgba(215, 22, 22, 1)" }}
          onClick={toFourthPage}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

function FourthPage({ className }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({})
  const category = useSelector((state) => state.createBuisnessReducer.category);
  const validateForm = () => {
    const newErrors = {};

    if (!category) {
      newErrors.openAt = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const buisnessName = useSelector((state) => state.createBuisnessReducer.buisnessName)
  const buildingName = useSelector((state) => state.createBuisnessReducer.buildingName)
  const pincode = useSelector((state) => state.createBuisnessReducer.pincode)
  const city = useSelector((state) => state.createBuisnessReducer.city)
  const street = useSelector((state) => state.createBuisnessReducer.street)
  const state = useSelector((state) => state.createBuisnessReducer.state)
  const area = useSelector((state) => state.createBuisnessReducer.area)
  const contactPerson = useSelector((state) => state.createBuisnessReducer.contactPerson)
  const contactEmail = useSelector((state) => state.createBuisnessReducer.contactEmail)
  const phoneNumber = useSelector((state) => state.createBuisnessReducer.phoneNumber)
  const adhaar = useSelector((state) => state.createBuisnessReducer.adhaar)
  const daysOpen = useSelector((state) => state.createBuisnessReducer.daysOpen)
  const openAt = useSelector((state) => state.createBuisnessReducer.openAt)
  const closeAt = useSelector((state) => state.createBuisnessReducer.closeAt)
  const successPage = async () => {
    if (validateForm()) {
      console.log(buildingName, "buildingName")
      const request = await fetch("http://127.0.0.1:8000/api/services/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          name: buisnessName,
          phone_number: phoneNumber,
          address: {
            building_name: buildingName,
            street: street,
            area: area,
            city: city,
            state: state,
            pincode: pincode,
          },
          category: 1,
          daysavailable: daysOpen,
          opening_time: openAt,
          closing_time: closeAt,
        })
      });
      const response = request.json();
      console.log(response)
      if (response) {
        dispatch(buisnessCreated(true))
        dispatch(setFourthCreatePage(false));
        dispatch(setSuccessPage(true));
      }

    }

  };
  return (
    <div className={className}>
      <h2 style={{ fontFamily: "sans-serif" }}>Add Buisness Category</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "30px",
        }}
      >
        <div style={{ width: "100%" }}>
          <InputLabel htmlFor="Search">Type Buisness Category</InputLabel>
          <OutlinedInput
            id="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            label="Type Buisness Category"
            sx={{ width: "100%" }}
            onChange={(event) => dispatch(setCategory(event.target.value))}
          />
        </div>

        <Button
          variant="contained"
          sx={{ marginTop: "20px", backgroundColor: "rgba(215, 22, 22, 1)" }}
          onClick={successPage}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

function SuccesPage({ className }) {
  const navigate = useNavigate();
  const buisnessCreated = useSelector((state) => state.createBuisnessReducer.buisnessCreated)
  useEffect(() => {
    if (buisnessCreated) toast.success("Buisness created successfully!Go to My Buisness for more details")

  }, [buisnessCreated])

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={SuccessIcon}
          width={"8%"}
          height={"50%"}
          style={{ paddingRight: "15px" }}
        />
        <p
          style={{
            fontSize: "26px",
            color: "#000",
            fontWeight: "600",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Congratulations - Your business is now registered with QuickServe
        </p>
      </div>
      <Button
        variant="contained"
        sx={{ marginTop: "10px", backgroundColor: "rgba(215, 22, 22, 1)" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home Page
      </Button>
      <Toaster
        position="left-center"
        reverseOrder={false}
      />
    </div>
  );
}
