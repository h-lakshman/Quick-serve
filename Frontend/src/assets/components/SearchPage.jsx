import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";

const SearchPage = () => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(query.toLowerCase()) ||
    service.phone_number.includes(query) ||
    `${service.address.building_name} ${service.address.street} ${service.address.area} ${service.address.city} ${service.address.state} ${service.address.pincode}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="container my-5">
      <Typography variant="h3" color="warning" align="center" gutterBottom>
        Available Services
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Explore the list of services available for your needs.
      </Typography>

      {/* Search input */}
      <div className="input-box" style={{ textAlign: "center", marginBottom: "20px" }}>
        <TextField
          label="Search Services"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, or address"
        />
      </div>

      <Grid container spacing={4}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
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
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No services found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default SearchPage;
