import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, Box, Skeleton, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import 'leaflet-routing-machine';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const AddressCard = ({ service }) => {
    const { address, daysavailable = {}, opening_time, closing_time } = service;
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const navigate = useNavigate();

    const daysOfWeek = [
        { label: "Monday", key: "monday" },
        { label: "Tuesday", key: "tuesday" },
        { label: "Wednesday", key: "wednesday" },
        { label: "Thursday", key: "thursday" },
        { label: "Friday", key: "friday" },
        { label: "Saturday", key: "saturday" },
        { label: "Sunday", key: "sunday" }
    ];

    const handleGetDirections = () => {
        if (destinationCoords) {
            navigate('/directions', {
                state: {
                    destination: destinationCoords,
                    address: `${address.building_name}, ${address.street}, ${address.area}, ${address.city}`
                }
            });
        }
    };

    useEffect(() => {
        const searchAddress = `${address.building_name}, ${address.street}, ${address.area}, ${address.city}, ${address.state}, ${address.pincode}`;

        const initializeMap = async () => {
            try {
                const response = await fetch(
                    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchAddress)}&key=b064301c2beb4e558573c1cc028a2436&language=en&pretty=1`
                );
                const data = await response.json();

                if (data.results?.[0]?.geometry) {
                    const { lat, lng } = data.results[0].geometry;
                    setDestinationCoords({ lat, lng });

                    if (!mapInstance && mapRef.current) {
                        const map = L.map(mapRef.current).setView([lat, lng], 15);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }).addTo(map);

                        L.marker([lat, lng])
                            .addTo(map)
                            .bindPopup(searchAddress);

                        setMapInstance(map);
                    }
                }
            } catch (error) {
                console.error("Error initializing map:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeMap();

        return () => {
            if (mapInstance) {
                mapInstance.remove();
                setMapInstance(null);
            }
        };
    }, [address]);

    return (
        <Box
            sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                padding: '32px',
                backgroundColor: '#fff',
                width: '95%',
                margin: 'auto',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)'
                }
            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box mb={3}>
                        <Typography variant="h6" sx={{
                            fontWeight: '600',
                            color: '#2c3e50',
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2
                        }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#e74c3c' }} />
                            Location Details
                        </Typography>

                        {isLoading ? (
                            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '12px' }} />
                        ) : (
                            <Box
                                ref={mapRef}
                                sx={{
                                    height: '300px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid #e0e0e0'
                                }}
                            />
                        )}

                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}>
                            <Typography variant="body1" sx={{
                                p: 2,
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                color: '#34495e',
                                lineHeight: 1.6
                            }}>
                                {address.building_name}, {address.street},
                                <br />
                                {address.area}, {address.city},
                                <br />
                                {address.state} - {address.pincode}
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<DirectionsIcon />}
                                onClick={handleGetDirections}
                                sx={{
                                    backgroundColor: '#3498db',
                                    '&:hover': {
                                        backgroundColor: '#2980b9'
                                    }
                                }}
                            >
                                Get Directions
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Rest of the component remains the same */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{
                        fontWeight: '600',
                        color: '#2c3e50',
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                    }}>
                        <AccessTimeIcon sx={{ mr: 1, color: '#2ecc71' }} />
                        Business Hours
                    </Typography>

                    <Box sx={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}>
                        {daysOfWeek.map(({ label, key }, index) => (
                            <Box
                                key={key}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 2,
                                    backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                                    borderBottom: index !== daysOfWeek.length - 1 ? '1px solid #eee' : 'none',
                                    transition: 'background-color 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#f1f3f5'
                                    }
                                }}
                            >
                                <Typography sx={{
                                    fontWeight: '500',
                                    color: '#2c3e50'
                                }}>
                                    {label}
                                </Typography>

                                <Typography sx={{
                                    color: daysavailable[key] ? '#2ecc71' : '#e74c3c',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {daysavailable[key]
                                        ? `${opening_time} - ${closing_time}`
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