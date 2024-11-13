import React from "react";
import { Box, Typography, Grid } from "@mui/material";

function TrustPage() {
    return (
        <>

            <Box
                sx={{
                    position: "relative",
                    height: "600px",
                    width: "100%",
                    backgroundImage:
                        "url('https://trust.yelp.com/wp-content/uploads/2020/11/2560x1138_ts_homepage.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginTop: '110px'
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "15%",
                        left: "30%",
                        transform: "translateX(-50%)",
                        color: "black",
                        width: "600px",
                        background: "white",
                        padding: "40px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{ fontWeight: "bold", fontSize: "3.5rem", textAlign: 'justify' }}
                    >
                        Earning Your Trust. Always.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: "1.3rem", marginTop: "2rem", textAlign: 'justify' }}
                    >
                        Our community is built on trust. Whether you’re a consumer or a
                        business owner, you put your trust in us to provide information that
                        people can rely on to make informed decisions. We work hard to
                        maintain that trust, making Quick Serve truly helpful for everyone.
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    backgroundColor: "white",
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <Grid container alignItems="center" spacing={4} textAlign="left">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            sx={{
                                paddingLeft: "20px",
                                fontWeight: "bold",
                                marginBottom: "1.3rem",
                                fontSize: "2rem",
                            }}
                        >
                            Reputation matters
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                paddingLeft: "20px",
                                fontSize: "1rem",
                                lineHeight: 1.75,
                                maxWidth: "900px",
                                margin: "0 auto",
                                textAlign: 'justify'
                            }}
                        >
                            Businesses earn great reviews on Quick Serve the same way they
                            build their reputations in the community: by creating great
                            products, services, and customer experiences. Quick Serve works
                            hard to feature content that reflects real experiences that
                            consumers are inspired to share.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://trust.yelp.com/wp-content/uploads/2021/02/Reputation-matters.png"
                            alt="Business Image"
                            sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    backgroundColor: "white",
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <Grid container alignItems="center" spacing={4} textAlign="left">
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://trust.yelp.com/wp-content/uploads/2020/11/graphic-3-honesty-and-fair-play-e1606857190424.png"
                            alt="Business Image"
                            sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                paddingRight: "20px",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "1.3rem",
                                fontSize: "2rem",
                            }}
                        >
                            Authenticity & reliability
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "1rem",
                                lineHeight: 1.75,
                                maxWidth: "900px",
                                margin: "0 auto",
                                textAlign: 'justify'
                            }}
                        >
                            At Quick Serve, we believe that customer reviews should be based
                            on real, first-hand experiences. Businesses are not allowed to ask
                            for reviews, ensuring that all feedback remains authentic.
                            Additionally, we employ automated software designed to filter and
                            highlight the most trustworthy and reliable reviews for your
                            confidence.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    backgroundColor: "white",
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <Grid container alignItems="center" spacing={4} textAlign="left">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "800",
                                marginBottom: "1.3rem",
                                fontSize: "2rem",
                                paddingLeft: "20px",
                            }}
                        >
                            Fighting misinformation
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                paddingLeft: "20px",
                                fontSize: "1rem",
                                lineHeight: 1.75,
                                maxWidth: "900px",
                                margin: "0 auto",
                                textAlign: 'justify'
                            }}
                        >
                            Fake news and deceptive behavior are unfortunately common on the
                            web. At Quick Serve, we have dedicated teams and policies in place
                            to protect our community of consumers and service providers,
                            ensuring that misleading information is prevented from spreading.
                            We work hard to maintain a trustworthy environment, keeping our
                            platform reliable and safe for everyone.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://trust.yelp.com/wp-content/uploads/2020/11/graphic-4-alerting-the-community-e1606857279853.png"
                            alt="Business Image"
                            sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

        </>
    );
}

export default TrustPage;