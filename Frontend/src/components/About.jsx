import React from "react";
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { useSelector } from "react-redux";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

const About = () => {
    const isLoginOpen = useSelector((state) => state.reducer.openLoginForm);
    const isSignupOpen = useSelector((state) => state.reducer.openSignUpForm);
    return (
        <>
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
                    marginLeft: '0px',
                    top: '10px',
                    width: "100%",
                    right: '10px',
                    marginTop: '100px'
                }}
            >
                {isLoginOpen ? <SignInForm /> : ""
                }
                {isSignupOpen ? <SignUpForm /> : ""}
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
        </>
    );
};


const AboutUs = () => {
    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
            <Paper elevation={3} sx={{ padding: '2rem' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" paragraph>
                    Quick Serve is India's trusted platform for finding local service providers, dedicated to making it easy
                    for users to discover and connect with verified professionals for a variety of essential services. From
                    home repairs and cleaning to tutoring and personal care, Quick Serve connects you to reliable service
                    providers across India through our website, mobile platform, and app (available on Android and iOS).
                </Typography>
                <Typography variant="body1" paragraph>
                    Quick Serve goes beyond just connecting people to services. With our platform, users can securely book,
                    schedule, and manage services with trusted providers. To further streamline this experience, we are
                    expanding our platform with features such as QuickPay for seamless digital transactions, and Service+ for
                    exclusive, value-added services tailored to users' needs.
                </Typography>

                <Divider sx={{ marginY: '2rem' }} />

                <Typography variant="h5" component="h3" gutterBottom>
                    Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                    To simplify the process of finding and hiring trustworthy, skilled professionals for every need, while
                    empowering service providers with a platform to grow their business. Quick Serve aims to be your go-to
                    destination for finding dependable, verified service providers in your community.
                </Typography>

                <Divider sx={{ marginY: '2rem' }} />

                <Typography variant="h5" component="h3" gutterBottom>
                    Corporate Information
                </Typography>
                <Typography variant="body1" paragraph>
                    Since its inception, Quick Serve has aimed to bridge the gap between users seeking services and providers
                    across multiple industries. Our platform enables users to find and book services effortlessly, while
                    helping businesses gain visibility and connect with customers.
                </Typography>

                <Divider sx={{ marginY: '2rem' }} />

                <Typography variant="h5" component="h3" gutterBottom>
                    Key Highlights
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            <strong>Pan India Reach:</strong> Quick Serve operates across major cities, with a growing network in
                            smaller towns and communities to meet the diverse needs of users everywhere.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            <strong>Trustworthy Services:</strong> Through third-party verification and our rigorous selection
                            process, we ensure that users connect with only the most reliable providers.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            <strong>Engaged User Community:</strong> Our users actively contribute reviews and ratings, helping
                            others make informed decisions and fostering a trusted community.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            <strong>Technology-Driven Platform:</strong> With an advanced, scalable technology backbone, Quick
                            Serve offers a seamless user experience, with secure payment options, real-time chat support, and
                            instant service booking.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            <strong>Dedicated to MSME Growth:</strong> Quick Serve empowers local businesses with tools to manage
                            their online presence, receive bookings, and build lasting customer relationships, making it an
                            attractive option for MSMEs.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            <strong>Local Expertise:</strong> Our experienced team brings deep market insights and strong local
                            connections to deliver the best service experience to our users.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
export default About;