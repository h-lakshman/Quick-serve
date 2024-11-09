import '../assets/styles/NavBar.css'
import '@fontsource/roboto/700.css';
 
import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../assets/images/logo.png'
import darkLogo from '../assets/images/darkLogo.png'
import { useSelector, useDispatch } from 'react-redux';
import { setLoginForm, setSignUpForm } from '../redux/actions';
import { useNavigate } from "react-router-dom";
 
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
export default function NavBar() {
    const url = String(location.href)
    let theme = 'white'
    const routes = ['create-buisness']
    for (let route in routes) {
        url.includes(routes[route])
        if (url.includes(routes[route])) {
            theme = 'black'
            break
        }
    }
 
 
    return (
        <div className='nav' style={{
            paddingBottom: theme === 'white' ? '0' : '15px',
            boxShadow: theme === 'white' ? '' : '0 3px 0 0 rgba(0, 0, 0, 0.3)',
        }}>
            <div className='logo-search'>
                <a href='/'>
                    <img className='logo' src={theme === 'white' ? Logo : darkLogo} alt="Quick Serve"
                        width="150px" height="48px" style={{ zIndex: '1' }} />
                </a>
                <div className='search-item-fields'>
                    <div className='search-box-left'>
                        <TextField id="outlined-search" label="search" type='search' variant='filled' size='small'
                            sx={{
                                backgroundColor: 'white', height: '100%',
                            }} />
                    </div>
                    <div className='divider-container'>
 
                        <div className='divider'>
                        </div>
                    </div>
                    <div className='search-box-right'>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Location"
                            size="small"
                            variant="filled"
                            sx={{ top: '0', width: '25ch', height: '100%', backgroundColor: 'white', }}
 
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
 
                <div className='search-icon-div'>
                    <a className='search-icon' href='/'>
                        <img width="25" height="25" className='seach-image' src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png" alt="search--v1" />
                    </a>
                </div>
            </div>
 
            <TextButtons theme={theme} />
        </div >
    )
}
 
function TextButtons() {
    const navigate = useNavigate()
    const url = String(location.href)
    let theme = 'white'
    const routes = ['create-buisness']
    for (let route in routes) {
        if (url.includes(routes[route])) {
            theme = 'black'
            break
        }
    }
    const dispatch = useDispatch()
    const openSignIn = () => {
        dispatch(setLoginForm(true))
 
    }
    const openSignUp = () => {
        dispatch(setSignUpForm(true))
    }
 
    return (
        <Stack direction="row" spacing={2}>
            <Button sx={{
                color: theme === 'white' ? 'rgba(255, 255, 255, 1)' : 'rgba(45, 46, 47, 1)',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                fontSize: '15px',
                fontWeight: '740',
                lineHeight: '18px',
                width: '100px',
                height: '73%',
                padding: '0px 5px',
                ":hover": theme === 'white' ? {
                    backgroundColor: 'rgba(255, 255, 255, 0.368)',
                } : {
                    backgroundColor: 'rgba(45, 46, 47, 0.368)',
                }
            }}>About us</Button>
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
                    ":hover": theme === 'white' ? {
                        backgroundColor: 'rgba(255, 255, 255, 0.368)',
                    } : {
                        backgroundColor: 'rgba(45, 46, 47, 0.368)',
                    }
                }}>List Buisness</Button>
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
                    width: '100px',
                    height: '73%',
                    padding: '0px 5px',
                    ":hover": theme === 'white' ? {
                        backgroundColor: 'rgba(255, 255, 255, 0.368)',
                    } : {
                        backgroundColor: 'rgba(45, 46, 47, 0.368)',
                    }
                }}>Login</Button>
            <Button
                onClick={openSignUp}
                sx={{
                    color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
                    border: '1px solid transparent',
                    fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontSize: '16px',
                    width: '100px',
                    fontWeight: '740',
                    lineHeight: '24px',
                    height: '73%',
                    padding: '0px 5px',
                }}>Sign Up</Button>
        </Stack >
    );
}