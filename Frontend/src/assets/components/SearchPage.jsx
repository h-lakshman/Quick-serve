import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const SearchPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get("http://127.0.0.1:8000/api/services/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container my-5">
      <Typography variant="h3" color="warning" align="center" gutterBottom>
        Available Services
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Explore the list of services available for your needs.
      </Typography>

      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} key={service.phone_number}>
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
                image="https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"
                alt="service image"
                sx={{ width: "40%", height: "250px", objectFit: "cover" }}
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  <Button variant="contained" color="warning" disabled>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchPage;
