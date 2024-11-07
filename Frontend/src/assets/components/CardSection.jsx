import React, { useState } from "react";
import { Card, CardMedia, Typography, Grid } from "@mui/material";


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
      name: "Food Services",
      imageUrl:
        "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/8bc05b287157/assets/img/svg_illustrations/40x40_food_v2.svg",
    },
    {
      name: "Barbershops",
      imageUrl:
        "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/5bd5d2648742/assets/img/svg_illustrations/40x40_barbers_v2.svg",
    },
  ];

  return (
    <div
      style={{
        padding: "20px 50px",
        display: "flex",
        justifyContent: "center",
        margin: "30px",
      }}
    >
      <Grid container spacing={4} alignItems="stretch">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{}}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: 2,
                justifyContent: "center",
                width: "100%",
                borderRadius: 1,
                height: "250px",
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
