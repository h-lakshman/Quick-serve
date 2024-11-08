import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RatingIcon = ({ rating }) => {
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
          style={{ marginRight: "4px" }}
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

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/service/${service.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          display: "flex",
          height: "auto",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          borderRadius: "12px",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={service.image || "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"}
          alt="service image"
          sx={{ padding: "20px", width: "25%", height: "250px", objectFit: "contain" }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "60%",
            padding: "24px",
          }}
        >
          <Typography variant="h4" fontWeight="600" sx={{ textDecoration: "underline" }}>
            {service.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "19px", fontWeight: 500, mb: 1 }}>
            Phone: <span style={{ fontWeight: "bold", color: "#555" }}>{service.phone_number}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "19px", fontWeight: 500, mb: 1 }}>
            <strong>Address:</strong> {service.address.building_name}, {service.address.street}, {service.address.area}, {service.address.city}
            <br />
            {service.address.state} - {service.address.pincode}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", fontSize: "18px", fontWeight: 500 }}>
            Rating:&nbsp; <RatingIcon rating={service.rating || 0} />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
