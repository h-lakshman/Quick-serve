import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Paper,
    Chip,
    Drawer,
    IconButton,
    useMediaQuery,
    useTheme,
    styled
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuIcon from '@mui/icons-material/Menu';
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import L from 'leaflet';
import 'leaflet-routing-machine';

const DirectionsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [mapInstance, setMapInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { destination, address } = location.state || {};

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0
            ? `${hours}h ${minutes}m`
            : `${minutes} minutes`;
    };

    const formatDistance = (meters) => {
        const km = (meters / 1000).toFixed(1);
        return `${km} km`;
    };

    useEffect(() => {
        if (!destination) {
            setError("Destination coordinates not provided");
            setIsLoading(false);
            return;
        }

        const initializeMap = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude: userLat, longitude: userLng } = position.coords;
                const centerLat = (userLat + destination.lat) / 2;
                const centerLng = (userLng + destination.lng) / 2;

                if (!mapInstance && mapRef.current) {
                    const map = L.map(mapRef.current,
                        {
                            // zoomControl: Tru // We'll reposition this
                        }).setView([centerLat, centerLng], 8);

                    // // Reposition zoom control
                    // L.control.zoom({
                    //     position: 'bottomright'
                    // }).addTo(map);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    // Custom markers with shadows
                    const startMarker = L.marker([userLat, userLng], {
                        title: 'Your Location',
                        icon: L.divIcon({
                            className: 'custom-div-icon',
                            html: `<div style="background-color: #3498db; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                            iconSize: [16, 16],
                            iconAnchor: [8, 8]
                        })
                    }).addTo(map);

                    const endMarker = L.marker([destination.lat, destination.lng], {
                        title: address,
                        icon: L.divIcon({
                            className: 'custom-div-icon',
                            html: `<div style="background-color: #e74c3c; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                            iconSize: [16, 16],
                            iconAnchor: [8, 8]
                        })
                    }).addTo(map);

                    // Add routing with custom styling
                    const routingControl = L.Routing.control({
                        waypoints: [
                            L.latLng(userLat, userLng),
                            L.latLng(destination.lat, destination.lng)
                        ],
                        routeWhileDragging: true,
                        lineOptions: {
                            styles: [{
                                color: '#3498db',
                                weight: 6,
                                opacity: 0.8
                            }],
                            addWaypoints: false
                        },
                        createMarker: function () { return null; }, // Don't create default markers
                    }).addTo(map);

                    routingControl.on('routesfound', function (e) {
                        const routes = e.routes;
                        const fastest = routes[0];
                        setRouteInfo({
                            distance: fastest.summary.totalDistance,
                            duration: fastest.summary.totalTime,
                            steps: fastest.instructions
                        });
                    });

                    setMapInstance(map);
                }
            } catch (error) {
                setError(error.message);
                console.error("Error initializing directions:", error);
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
    }, [destination, address]);

    const RouteInfoPanel = () => (
        <Box sx={{ p: 2, overflow: 'scroll', height: '65vh' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2c3e50' }}>
                <DirectionsIcon sx={{ color: '#3498db', mr: 1 }} />
                Route Details
            </Typography>
            {routeInfo && (
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip
                        icon={<AccessTimeIcon />}
                        label={formatDuration(routeInfo.duration)}
                        sx={{ backgroundColor: '#f8f9fa' }}
                    />
                    <Chip
                        icon={<DirectionsCarIcon />}
                        label={formatDistance(routeInfo.distance)}
                        sx={{ backgroundColor: '#f8f9fa' }}
                    />
                </Box>
            )}
            <Box sx={{ backgroundColor: '#f8f9fa', borderRadius: 1, p: 2 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MyLocationIcon sx={{ color: '#3498db' }} />
                    Your Location
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <PlaceIcon sx={{ color: '#e74c3c' }} />
                    {address}
                </Typography>
            </Box>

            {routeInfo?.steps && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Turn by Turn Directions
                    </Typography>
                    {routeInfo.steps.map((step, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 2,
                                mb: 1,
                                backgroundColor: '#f8f9fa',
                                borderLeft: '3px solid #3498db'
                            }}
                        >
                            <Typography variant="body2">{step.text}</Typography>
                            {step.distance > 0 && (
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    {formatDistance(step.distance)}
                                </Typography>
                            )}
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', marginTop: '98px' }}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ color: '#3498db' }}
                >
                    Back
                </Button>
                <Typography variant="h6" sx={{ color: '#2c3e50', flex: 1, fontWeight: 600 }}>
                    Directions
                </Typography>
                {isMobile && (
                    <IconButton
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        sx={{ color: '#3498db' }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </Paper>

            <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
                {isLoading && (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <CircularProgress sx={{ color: '#3498db' }} />
                        <Typography>Loading directions...</Typography>
                    </Box>
                )}

                {error && (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: '#e74c3c',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h6">Error</Typography>
                        <Typography>{error}</Typography>
                    </Box>
                )}

                <Box
                    ref={mapRef}
                    sx={{
                        flex: '1',
                        width: '80%',
                        height: '80%',
                        borderLeft: '1px solid #ddd',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                />

                {isMobile && (
                    <Drawer
                        anchor="bottom"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        PaperProps={{
                            sx: { maxHeight: '70vh', borderTopLeftRadius: 16, borderTopRightRadius: 16 }
                        }}
                    >
                        <RouteInfoPanel />
                    </Drawer>
                )}

                {!isMobile && (
                    <Paper elevation={3} sx={{
                        width: 360,
                        height: '80vh',
                        overflow: 'hidden',
                        borderRadius: 0,
                        borderRight: '1px solid rgba(0,0,0,0.1)'
                    }}>
                        <RouteInfoPanel />
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default DirectionsPage;
