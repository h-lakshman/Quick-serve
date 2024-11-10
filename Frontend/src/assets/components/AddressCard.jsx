import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AddressCard = ({ service }) => {
  const { name, phone, address, daysavailable = {}, opening_time, closing_time } = service;

  const daysOfWeek = [
    { label: "Monday", key: "monday" },
    { label: "Tuesday", key: "tuesday" },
    { label: "Wednesday", key: "wednesday" },
    { label: "Thursday", key: "thursday" },
    { label: "Friday", key: "friday" },
    { label: "Saturday", key: "saturday" },
    { label: "Sunday", key: "sunday" },
  ];

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
        padding: '24px',
        backgroundColor: '#fff',
        width: '95%',  // Ensure full width
        margin: 'auto',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Grid container spacing={3}>
        {/* Left Section: Image and Address */}
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Box display="flex" justifyContent="center">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?size=315x150&sensor=false&client=gme-yelp&language=en&scale=2&zoom=15&center=37.753070%2C-122.416016&markers=scale%3A2%7Cicon%3Ahttps%3A%2F%2Fyelp-images.s3.amazonaws.com%2Fassets%2Fmap-markers%2Fannotation_64x86.png%7C37.753070%2C-122.416016&signature=5LKOTAru2eURBYs7hfDezAi1TTk="
                alt="Service"
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center" mt={2} mb={2} textAlign="center">
              <LocationOnIcon fontSize="medium" sx={{ marginRight: '8px', color: 'red' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                Location:
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ paddingLeft: '24px', paddingTop: '10px', lineHeight: 1.6 }}>
                {address.building_name}, {address.street}, {address.area}, {address.city}
                <br />
                {address.state}, {address.pincode}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Section: Available Days */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '16px', textAlign: 'center' }}>
            Available Days
          </Typography>

          <Box mt={2}>
            {daysOfWeek.map(({ label, key }) => (
              <Box
                key={key}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  padding: '12px 20px',
                  backgroundColor: '#fafafa',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: '#333',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {label}:
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: daysavailable[key] ? 'green' : 'red', // Green if available, red if closed
                    fontWeight: 'bold',
                  }}
                >
                  {daysavailable[key]
                    ? `Open: ${opening_time} - ${closing_time}`
                    : "Closed"}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressCard;
