import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import SearchBar from "./SearchBar"; // Import SearchBar component
import ServiceCard from "./ServiceCard"; // Import ServiceCard component

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

      {/* Use the SearchBar component */}
      <SearchBar query={query} setQuery={setQuery} />

      <Grid container spacing={4}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Grid item xs={12} key={service.phone_number}>
              {/* Pass dummy rating to ServiceCard */}
              <ServiceCard service={{ ...service, rating: 4}} />  {/* Example dummy rating of 4.5 */}
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
