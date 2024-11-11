
import React from "react";
import { Typography, IconButton, Box, Avatar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Grid from "@mui/material/Grid";
import DarkLogo from '../assets/images/darkLogo.png'

const FooterLink = ({ children }) => {
    return (
        <Typography
            variant="body2"
            sx={{
                color: "text.secondary",
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
                mb: "8px",
            }}
        >
            {children}
        </Typography>
    );
};

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#f0f0f0",
                color: "black",
                padding: "40px 20px",
                marginTop: "20px",
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={3}>
                    <Box sx={{ paddingLeft: "50px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ pb: "10px" }}>
                            Quick Links
                        </Typography>
                        <FooterLink>About Us</FooterLink>
                        <FooterLink>Advertise</FooterLink>
                        <FooterLink>Investor Relations</FooterLink>
                        <FooterLink>Media</FooterLink>
                        <FooterLink>We're Hiring</FooterLink>
                        <FooterLink>Testimonials</FooterLink>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box sx={{ paddingLeft: "50px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ pb: "10px" }}>
                            Customer Care
                        </Typography>
                        <FooterLink>Feedback</FooterLink>
                        <FooterLink>Free Listing</FooterLink>
                        <FooterLink>Business Badge</FooterLink>
                        <FooterLink>What's New</FooterLink>
                        <FooterLink>Report a Bug</FooterLink>
                        <FooterLink>Client Success Videos</FooterLink>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box sx={{ paddingLeft: "50px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ pb: "10px" }}>
                            Services
                        </Typography>
                        <FooterLink>Restaurants</FooterLink>
                        <FooterLink>Doctors</FooterLink>
                        <FooterLink>Hospitals</FooterLink>
                        <FooterLink>Schools</FooterLink>
                        <FooterLink>Colleges</FooterLink>
                        <FooterLink>AC Repair</FooterLink>
                        <FooterLink>Car Services</FooterLink>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box sx={{ paddingLeft: "50px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ pb: "10px" }}>
                            More
                        </Typography>
                        <FooterLink>Hotels</FooterLink>
                        <FooterLink>Real Estate</FooterLink>
                        <FooterLink>Bills & Recharge</FooterLink>
                        <FooterLink>Sitemap</FooterLink>
                        <FooterLink>B2B Sitemap</FooterLink>
                        <FooterLink>B2B India Sitemap</FooterLink>
                    </Box>
                </Grid>
            </Grid>

            <Box textAlign="center" mb={4} sx={{ pt: '20px' }}>
                <img
                    src={DarkLogo   }
                    alt="Your Logo"
                    style={{
                        width: 'auto',
                        height: '70px',
                        maxWidth: '100%',
                    }}
                />
            </Box>

            <Grid container justifyContent="center" mt={2}>
                <Grid item xs={12} textAlign="center" >
                    <Typography variant="h6" fontWeight="bold">
                        Follow Us
                    </Typography>
                    <Box>
                        <IconButton href="https://facebook.com" target="_blank" sx={{ color: "black" }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" sx={{ color: "black" }}>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href="https://instagram.com" target="_blank" sx={{ color: "black" }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "black" }}>
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Box textAlign="center" mt={4}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Quick Serve. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
