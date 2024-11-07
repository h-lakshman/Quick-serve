import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Rating } from "@mui/material";

const ServiceCard = ({ service }) => {
  return (
    <Card
      sx={{
        display: "flex",
        height: "auto",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
        sx={{ padding: '20px', width: "25%", height: "250px", objectFit: "contain" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {service.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {`Phone: ${service.phone_number}`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {`${service.address.building_name}, ${service.address.street}, ${service.address.area}, ${service.address.city}, ${service.address.state} - ${service.address.pincode}`}
        </Typography>

        {/* Rating Display */}
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: "8px" }}>
          Rating:{" "}
          <Rating
            name="service-rating"
            value={service.rating || 0} // Use the rating passed from SearchPage
            precision={0.5}
            readOnly
            
          />
        </Typography>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Button variant="contained" color="warning" disabled={!service.id}>
            View Details
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
