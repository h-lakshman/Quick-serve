import React from "react";
import { Box, Typography } from "@mui/material";
import AboutUs from "./AboutUs";
import Navbar from "../Navbar";
import Footer from "../Footer";

const HeroSection = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          position: "relative",
          height: "510px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          padding: "0 20px",
          backgroundImage:
            "url('https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Background image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        <Typography
          variant="h4"
          sx={{
            position: "relative",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            maxWidth: "80%",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Quick Serve, the trusted partner for all your local service needs.
        </Typography>
      </Box>
      <AboutUs />
      <Footer />
    </>
  );
};

export default HeroSection;