import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import ServiceCard from './Search';
import { Link } from 'react-router-dom';
import { RatingIcon } from './ServiceDetail';
import toast, { Toaster } from 'react-hot-toast';

const MyBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const isAuthenticated = useSelector((state) => state.reducer.isAuthenticated);
    const userId = useSelector((state) => state.reducer.user?.id); // Get user ID from Redux state
    const [toastdone, setToastDone] = useState(0)
    // Debugging logs
    useEffect(() => {
        console.log('Auth State:', {
            isAuthenticated,
            token: !!token,
            userId
        });
    }, [isAuthenticated, token, userId]);

    useEffect(() => {
        const fetchMyBusinesses = async () => {
            // Check both authentication and token
            if (!isAuthenticated || !token) {
                setError("Please login to view your businesses");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/my-business/', {
                    method: 'GET',
                    headers: {
                        'token': `${token}`, // Using token in headers
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 401) {
                    // Token expired or invalid
                    setError("Session expired. Please login again.");
                    // You might want to dispatch a logout action here
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch businesses');
                }

                const data = await response.json();

                // Check if the response data is correctly structured
                if (Array.isArray(data.services)) {
                    setBusinesses(data.services);  // Assuming data.services is the array
                    setError(null); // Clear any previous errors
                } else {
                    setError("No businesses found.");
                }
                if (toastdone < 1) {
                    toast.custom((t) => (
                        <div
                            style={{
                                display: 'flex',
                                maxWidth: '28rem', // 448px
                                width: '100%',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                borderRadius: '0.5rem',
                                pointerEvents: 'auto',
                                flexDirection: 'row',
                                ring: '1px solid black',
                                ringOpacity: 0.05,
                                animation: t.visible ? 'enter 0.3s ease-out' : 'leave 0.3s ease-out',
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    width: 0,
                                    padding: '1rem',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ flexShrink: 0, paddingTop: '0.125rem' }}>
                                        <img
                                            style={{
                                                height: '2.5rem', // 40px
                                                width: '2.5rem', // 40px
                                                borderRadius: '9999px',
                                            }}
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ marginLeft: '0.75rem', flex: 1 }}>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                                            Admin
                                        </p>
                                        <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                            If you want to make changes to your Business! Reach out at admin@quickserve.com.
                                            Sorry for the inconvenience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', borderLeft: '1px solid #e5e7eb' }}>
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    style={{
                                        width: '100%',
                                        border: '1px solid transparent',
                                        borderRadius: '0 0.375rem 0.375rem 0',
                                        padding: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#4f46e5', // Indigo color
                                        backgroundColor: 'transparent',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s ease-in-out',
                                    }}
                                    onMouseOver={(e) => e.target.style.color = '#4338ca'} // Darker indigo
                                    onMouseOut={(e) => e.target.style.color = '#4f46e5'} // Default indigo
                                    onFocus={(e) => e.target.style.outline = '2px solid #6366f1'} // Focus state
                                    onBlur={(e) => e.target.style.outline = 'none'}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ));
                    setToastDone(false)
                }
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBusinesses();
    }, [token, isAuthenticated, userId]); // Added userId to dependencies


    // Authentication check view
    if (!isAuthenticated || !token) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <Typography variant="h5" color="textSecondary">
                    Please login to view your businesses
                </Typography>
            </Box>
        );
    }

    // Loading view
    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    // Error view
    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }


    return (
        <Box sx={{ padding: '24px', marginTop: '110px' }}>
            <Typography variant="h4" fontWeight="700" sx={{ marginBottom: '24px' }}>
                My Businesses
            </Typography>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {businesses.length === 0 ? (
                <Typography variant="body1" color="textSecondary" align="center" sx={{ py: 4 }}>
                    You haven't registered any businesses yet.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {businesses.map((service) => (
                        <Grid item xs={12} key={service.id}>
                            <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{
                                    display: "flex",
                                    height: "auto",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                    },
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={service.image || "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"}
                                        alt="service image"
                                        sx={{ padding: "20px", width: "25%", height: "250px", objectFit: "contain" }}
                                    />
                                    <CardContent sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        width: "60%",
                                        padding: "24px",
                                    }}>
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
                                        <Typography
                                            component="div"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontSize: "18px",
                                                fontWeight: 500
                                            }}
                                        >
                                            Rating:&nbsp; <RatingIcon rating={service.averageRating || 0} />
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyBusiness;