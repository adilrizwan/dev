import * as React from 'react';
import { Box, useTheme, Switch } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext } from "../constants/theme"
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/parksense_logo.png'
function GuestUser() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const theme = useTheme();

    const colorMode = useContext(ColorModeContext);

    return (
        <AppBar color='inherit' position="sticky" style={{ marginBottom: '5px', backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Logo} alt="logo" style={{ width: '120px', marginRight: '10px' }} />
                            </Box>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <IconButton onClick={colorMode.toggleColorMode}>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeOutlinedIcon sx={{ color: theme.palette.white.main }} />
                            ) : (
                                <LightModeOutlinedIcon sx={{ color: theme.palette.black.main }} />
                            )}
                        </IconButton> */}
                        <Switch
                            checked={theme.palette.mode === 'dark'}
                            onChange={colorMode.toggleColorMode}
                            icon={<LightModeOutlinedIcon style={{ color: theme.palette.primary.main }} />}
                            checkedIcon={<DarkModeOutlinedIcon style={{ color: theme.palette.primary.main }} />}
                            size='large'
                            sx={{
                                '& .MuiSwitch-thumb': {
                                    color: theme.palette.primary.main
                                },
                                '& .MuiSwitch-track': {
                                    backgroundColor: theme.palette.primary.main
                                }
                            }}
                        />

                        <Button
                            sx={{ margin: "10px" }}
                            variant="contained"
                            size='medium'
                            onClick={handleLoginClick}
                            style={{ backgroundColor: theme.palette.primary.main }}>
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleRegisterClick}
                            size='medium'
                            style={{ backgroundColor: theme.palette.primary.main }}>
                            Register
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default GuestUser;

