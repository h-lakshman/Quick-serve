import React, { useState } from "react";
import { Card, CardMedia, Typography, } from "@mui/material";
import Grid from "@mui/material/Grid2";


const CardSection = () => {
    const [selectedService, setSelectedService] = useState(null);

    const handleCardClick = (name) => {
        setSelectedService(name);
    };

    const services = [
        {
            name: "Home Services",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/7fc312973cf8/assets/img/svg_illustrations/40x40_home_services_v2.svg",
        },
        {
            name: "Gift Shops",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/488aeb87ef6e/assets/img/svg_illustrations/40x40_gift_shops_v2.svg",
        },
        {
            name: "Barbers",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/5bd5d2648742/assets/img/svg_illustrations/40x40_barbers_v2.svg",
        },
        {
            name: "Beauty and Spa's",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/5bd5d2648742/assets/img/svg_illustrations/40x40_barbers_v2.svg",
        },
        {
            name: "Automotive",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/5967f38fe621/assets/img/svg_illustrations/40x40_auto_v2.svg",
        },
        {
            name: "Shopping",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/488aeb87ef6e/assets/img/svg_illustrations/40x40_gift_shops_v2.svg",
        },
        {
            name: "Gift Shops",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/488aeb87ef6e/assets/img/svg_illustrations/40x40_gift_shops_v2.svg",
        },
        {
            name: "More",
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/assets/public/40x40_more_v2.yji-961fdce2fd036f85fb01.svg",
        },
    ];

    return (
        <div
            style={{
                padding: "20px 50px",
                display: "flex",
                justifyContent: "space-around",
                margin: "30px",
            }}
        >
            <Grid container spacing={4} justifyContent="space-between">
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{}}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                padding: 2,
                                justifyContent: "center",
                                width: "180px",
                                borderRadius: 1,
                                height: "180px",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                                },
                            }}
                            onClick={() => handleCardClick(service.name)}
                        >
                            <CardMedia
                                component="img"
                                image={service.imageUrl}
                                alt={service.name}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    marginBottom: 2,
                                    objectFit: "contain",
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    color: "#333",
                                }}
                            >
                                {service.name}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CardSection;