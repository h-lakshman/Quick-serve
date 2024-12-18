import '../assets/styles/NavBar.css';
import '@fontsource/roboto/700.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../assets/images/logo.png';
import darkLogo from '../assets/images/darkLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated, setLoginForm, setSearchCategory, setSearchLocation, setSearchResults, setSignUpForm } from '../redux/actions';
import { useLocation, useNavigate } from "react-router-dom";
import { cities } from '../assets/constansts/cities';
import { Autocomplete, Select } from '@mui/material';

export default function NavBar() {
    const url = useLocation();
    const path = url.pathname;
    let theme = 'white';
    const routes = ['create-buisness', 'search', 'about-us', 'services', 'my-business', 'directions', 'trust'];
    for (let route of routes) {
        if (path.includes(route)) {
            theme = 'black';
            break;
        }
    }

    const categories = [
        { key: 1, value: "Beauty" },
        { key: 2, value: "Electricians" },
        { key: 3, value: "Plumbers" },
        { key: 4, value: "Caters" },
        { key: 5, value: "Packers and Movers" },
        { key: 6, value: "Carpenters" },
        { key: 7, value: "Mechanics" },
        { key: 8, value: "Automobile services" },
        { key: 9, value: "Puncture Works" }
    ];

    const [lattitude, setLattitude] = useState('');
    const [longtitude, setLongtitude] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchButtonWork, setSearchButtonWork] = useState(false);
    const searchLocation = useSelector((state) => state.reducer.searchLocation);
    const searchCategory = useSelector((state) => state.reducer.searchCategory);
    const searchResults = useSelector((state) => state.reducer.searchResults);

    const getCurrentCity = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLattitude(latitude);
                    setLongtitude(longitude);
                    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            if (data.results.length > 0) {
                                const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
                                console.log(`Current city: ${city}`);
                                dispatch(setSearchLocation(city));
                            } else {
                                console.log("City not found.");
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching geolocation data:", error);
                        });
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const handleLocationChange = (event, newValue) => {
        if (newValue.value === 'current-location') {
            getCurrentCity();
        } else {
            const city = newValue.value;
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}&language=en&pretty=1`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const lattitude = data.results[0].geometry.lat;
                        const longtitude = data.results[0].geometry.lng;
                        setLattitude(lattitude);
                        setLongtitude(longtitude);
                        console.log(`Current city: ${city}`);
                        dispatch(setSearchLocation(city));
                    } else {
                        console.log("City not found.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching geolocation data:", error);
                });
            dispatch(setSearchLocation(city));
        }
    };

    const searchSubmit = async () => {
        if (searchButtonWork) {
            const request = await fetch(`http://127.0.0.1:8000/api/search/?&find_desc=${searchCategory}&find_loc=${searchLocation}`, {
                method: 'GET',
            });
            const response = await request.json();
            console.log(response);
            const data = {
                results: response.results, category: searchCategory,
                location: searchLocation, longtitude: longtitude, lattitude: lattitude,
                desired: response.desired,
            };
            navigate('/search', { state: data });
            return;
        }
        return;
    };

    return (
        <div className='nav' style={{
            paddingBottom: theme === 'white' ? '0' : '15px',
            boxShadow: theme === 'white' ? '' : '0 3px 0 0 rgba(0, 0, 0, 0.3)',
            zIndex: 2, position: 'fixed', width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div className='logo-search' >
                <a href='/' style={{ height: '100%' }}>
                    <img className='logo' src={theme === 'white' ? Logo : darkLogo} alt="Quick Serve"
                        width="220px" height="70px" style={{
                            top: 3, zIndex: 2,
                        }} />
                </a>
                <div className='search-item-fields' style={{ zIndex: '1', marginTop: '10px' }}>
                    <div className='search-box-left'>
                        {/* Autocomplete for category search */}
                        <Autocomplete
                            options={categories}  // Use categories as the options
                            getOptionLabel={(option) => option.value} // Option label is category value
                            onChange={(event, newValue) => {
                                setSearchButtonWork(true);
                                dispatch(setSearchCategory(newValue ? newValue.value : ''));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Categories"
                                    variant="filled"
                                    size="small"
                                    sx={{
                                        backgroundColor: 'white',
                                        width: '200px',
                                        zIndex: 1,
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className='divider-container'>
                        <div className='divider'></div>
                    </div>
                    <div className='search-box-right'>
                        <Autocomplete
                            disablePortal
                            onChange={handleLocationChange}
                            options={cities}
                            sx={{ width: '25ch' }}
                            renderInput={(params) =>
                                <TextField {...params} label="Search Location"
                                    size="small"
                                    variant="filled"
                                    sx={{ top: '0', width: '100%', height: '100%', backgroundColor: 'white', }} />}
                        />
                    </div>
                </div>

                <div className='search-icon-div' onClick={searchSubmit} style={{ zIndex: '1', marginTop: '10px' }}>
                    <div className='search-icon' >
                        <img width="25" height="25" className='seach-image' src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png" alt="search--v1" />
                    </div>
                </div>
            </div>

            <TextButtons theme={theme} />
        </div >
    );
}

function TextButtons() {
    const url = useLocation();
    const path = url.pathname;
    let theme = 'white';
    const routes = ['create-buisness', 'search', 'about-us', 'services', 'my-business', 'directions', 'trust'];
    for (let route of routes) {
        if (path.includes(route)) {
            theme = 'black';
            break;
        }
    }

    const isAuthenticated = useSelector((state) => state.reducer.isAuthenticated);
    const dispatch = useDispatch();
    const openSignIn = () => {
        dispatch(setLoginForm(true));
    };

    const openSignUp = () => {
        dispatch(setSignUpForm(true));
    };

    const navigate = useNavigate();
    const handleSignOut = () => {
        dispatch(setAuthenticated(false));
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Stack direction="row" spacing={2} style={{
            zIndex: '1', display: 'flex',
            alignItems: 'center', height: '100%',
            justifyContent: 'center'
        }}>
            <div>
                <Button
                    onClick={() => navigate('/about-us')}
                    sx={{
                        color: theme === 'white' ? 'rgba(255, 255, 255, 1)' : 'rgba(45, 46, 47, 1)',
                        backgroundColor: 'transparent',
                        border: '1px solid transparent',
                        fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: '15px',
                        fontWeight: '740',
                        lineHeight: '18px',
                        width: '100px',
                        padding: '0px 5px',
                        top: isAuthenticated ? '4px' : '1px',
                        ":hover": theme === 'white' ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.368)',
                        } : {
                            backgroundColor: 'rgba(45, 46, 47, 0.368)',
                        }
                    }}> <p >About us</p></Button>
            </div>

            {!isAuthenticated ? <div>
                <Button
                    onClick={openSignIn}
                    sx={{
                        color: theme === 'white' ? 'rgba(255, 255, 255, 1)' : 'rgba(45, 46, 47, 1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.168)',
                        border: '1px solid transparent',
                        fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: '740',
                        lineHeight: '24px',
                        width: '110px',
                        padding: '0px 5px',
                        marginRight: "15px",
                        height: '40px',
                        ":hover": theme === 'white' ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.368)',
                        } : {
                            backgroundColor: 'rgba(45, 46, 47, 0.368)',
                        }
                    }}> <p>Login</p> </Button>
                <Button
                    onClick={openSignUp}
                    sx={{
                        color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
                        border: '1px solid transparent',
                        fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: '16px',
                        width: '110px',
                        fontWeight: '740',
                        lineHeight: '24px',
                        padding: '0px 5px',
                        height: '40px',
                        marginRight: '20px'
                    }}> <p>Sign Up</p> </Button>
            </div> : <div style={{ marginTop: '10px', marginRight: '20px' }}>
                <Button
                    onClick={() => navigate('/create-buisness')}
                    sx={{
                        color: theme === 'white' ? 'rgba(255, 255, 255, 1)' : 'rgba(45, 46, 47, 1)',
                        backgroundColor: 'transparent',
                        border: '1px solid transparent',
                        fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: '15px',
                        fontWeight: '740',
                        lineHeight: '18px',
                        width: '150px',
                        height: '73%',
                        padding: '0px 5px',
                        marginRight: "10px",
                        ":hover": theme === 'white' ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.368)',
                        } : {
                            backgroundColor: 'rgba(45, 46, 47, 0.368)',
                        }
                    }}><p>List Buisness </p></Button>
                <Button
                    onClick={() => navigate('/my-business')}
                    sx={{
                        color: theme === 'white' ? 'rgba(255, 255, 255, 1)' : 'rgba(45, 46, 47, 1)',
                        backgroundColor: 'transparent',
                        border: '1px solid transparent',
                        fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: '15px',
                        fontWeight: '740',
                        lineHeight: '18px',
                        width: '150px',
                        height: '73%',
                        padding: '0px 5px',
                        marginRight: "10px",
                        ":hover": theme === 'white' ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.368)',
                        } : {
                            backgroundColor: 'rgba(45, 46, 47, 0.368)',
                        }
                    }}><p>My Business</p></Button>
                <Button
                    onClick={handleSignOut}
                    sx={{
                        color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
                        border: '1px solid transparent',
                        fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: '16px',
                        width: '110px',
                        fontWeight: '740',
                        lineHeight: '24px',
                        height: '40px',
                        padding: '0px 5px',
                    }}> <p>Sign Out</p> </Button>
            </div>}
        </Stack >
    );
}

const apiKey = 'b064301c2beb4e558573c1cc028a2436'; 
