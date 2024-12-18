import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Button,
} from "@mui/material";
import AddressCard from "./AddressCard.jsx";
import ReviewForm from "./ReviewForrm.jsx";
import { useSelector } from "react-redux";
import SignInForm from "./SignIn.jsx";
import SignUpForm from "./SignUp.jsx";


export const RatingIcon = ({ rating, onRate }) => {
    const numStars = Math.round(rating || 0);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    style={{ marginRight: "4px", cursor: "pointer" }}
                    onClick={() => onRate(index + 1)} // Set rating based on star clicked
                >
                    <path
                        fill={index < numStars ? "red" : "lightgray"}
                        d="M0 4C0 1.79086 1.79086 0 4 0H10V20H4C1.79086 20 0 18.2091 0 16V4Z"
                    ></path>
                    <path
                        fill={index < numStars ? "red" : "lightgray"}
                        d="M20 4C20 1.79086 18.2091 0 16 0H10V20H16C18.2091 20 20 18.2091 20 16V4Z"
                    ></path>
                    <path
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 13.3736L12.5949 14.7111C12.7378 14.7848 12.9006 14.8106 13.0593 14.7847C13.4681 14.718 13.7454 14.3325 13.6787 13.9237L13.2085 11.0425L15.2824 8.98796C15.3967 8.8748 15.4715 8.72792 15.4959 8.569C15.5588 8.15958 15.2779 7.77672 14.8685 7.71384L11.983 7.2707L10.6699 4.66338C10.5975 4.51978 10.481 4.40322 10.3374 4.33089C9.96742 4.14458 9.51648 4.29344 9.33017 4.66338L8.01705 7.2707L5.13157 7.71384C4.97265 7.73825 4.82577 7.81309 4.71261 7.92731C4.42109 8.22158 4.42332 8.69645 4.71759 8.98796L6.79152 11.0425L6.32131 13.9237C6.29541 14.0824 6.3212 14.2452 6.39486 14.3881C6.58464 14.7563 7.03696 14.9009 7.40514 14.7111L10 13.3736Z"
                    ></path>
                </svg>
            ))}
        </div>
    );
};


const OneService = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation()
    const route = location.pathname.split('/')
    console.log(route)
    const isLoginOpen = useSelector((state) => state.reducer.openLoginForm);
    const isSignupOpen = useSelector((state) => state.reducer.openSignUpForm);
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/services/${route[2]}/`);
                const data = await response.json()
                console.log(data)
                setService({ ...data, rating: data.average_rating });
            } catch (err) {
                setError("Failed to fetch service details.");
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);



    const submitRating = async () => {
        window.scrollTo({ top: 700, behavior: "smooth" })
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    maxWidth: "95%",
                    padding: "16px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: '110px'

                }}
            >
                {isLoginOpen ? <SignInForm /> : ""
                }
                {isSignupOpen ? <SignUpForm /> : ""}
                <CardMedia
                    component="img"
                    image={
                        service.image ||
                        "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"
                    }
                    alt="service image"
                    sx={{
                        padding: "10px",
                        width: "25%",
                        height: "250px",
                        objectFit: "contain",
                    }}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h4" fontWeight="600" gutterBottom>
                            {service.name}
                        </Typography>
                        &nbsp;&nbsp;
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/11648/11648438.png"
                            alt="Verified"
                            style={{ width: "20px", height: "20px", marginBottom: "4px" }}
                        /><Typography sx={{ fontWeight: 'bold' }}>Verified</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: 500 }}>
                        <RatingIcon rating={service.rating} />
                    </Typography>{" "}
                    <br /><div style={{ display: 'flex' }}>
                        <Button
                            variant="contained"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px 20px",
                                backgroundColor: "#4caf50",
                                "&:hover": {
                                    backgroundColor: "#45a049",
                                },
                                marginRight: '15px'
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                style={{ marginRight: "8px" }}
                            >
                                <path
                                    fill="white"
                                    d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"
                                />
                            </svg>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "white" }}
                            >
                                {service.phone_number}
                            </Typography>
                        </Button>
                        <br />
                        {/* Whatsapp Button */}
                        <Button
                            variant="contained"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "6px 19px",
                                backgroundColor: "#ffffff",
                                "&:hover": {
                                    backgroundColor: "#45a049",
                                },
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="30"
                                height="30"
                                viewBox="0 0 56 48"
                            >
                                <path
                                    fill="#fff"
                                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                                ></path>
                                <path
                                    fill="#cfd8dc"
                                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                                ></path>
                                <path
                                    fill="#40c351"
                                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                                ></path>
                                <path
                                    fill="#fff"
                                    fill-rule="evenodd"
                                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>&nbsp;
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "black" }}
                            >
                                {service.phone_number}
                            </Typography>
                        </Button>
                    </div>
                    {/* <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: 500 }}>
          Phone: {service.phone_number}
        </Typography> */}
                    <br />
                    <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: 500 }}>
                        <strong>Address:</strong> {service.address.building_name},{" "}
                        {service.address.street}, {service.address.area},{" "}
                        {service.address.city}
                        <br />
                        {service.address.state} - {service.address.pincode}
                    </Typography>
                </CardContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "16px",
                    }}
                >

                    {/* <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
          {userRating} / 5
        </Typography> */}
                    <br />
                    <Button
                        variant="contained"
                        onClick={submitRating}
                        sx={{
                            fontWeight: "bold",
                            backgroundColor: "rgba(250,22,22,1)",
                            "&:hover": { backgroundColor: "rgba(215,22,22,1) " },
                        }}
                    >
                        Submit Rating
                    </Button>

                </Box>
            </Card>
            <AddressCard service={service} /><br />
            <TrustMessage />
            <ReviewForm />
        </>

    );
};

export default OneService;


import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function TrustMessage() {
    return (
        <Box
            sx={{
                backgroundColor: '#e3f2fd', // Light blue background
                color: '#0d47a1', // Dark blue text color for contrast
                padding: '16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: 1, // Subtle shadow for depth
                justifyContent: 'space-between', // Space between icon and text
            }}
        >
            {/* Icon */}
            <IconButton sx={{ color: '#0d47a1' }}>
                <InfoIcon />
            </IconButton>

            {/* Text content */}
            <Box sx={{ flexGrow: 1, marginLeft: '8px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Your trust is our top concern
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '4px' }}>
                    So businesses can't pay to alter or remove their reviews.
                </Typography>
                <a href="/about-us" sx={{ marginTop: '8px', color: '#0d47a1', textDecoration: 'underline' }}>
                    Learn more about reviews
                </a>
            </Box>
        </Box>
    );
}