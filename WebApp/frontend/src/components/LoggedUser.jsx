import * as React from 'react'
import { Box, useTheme, Switch, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, AppBar, Toolbar, Container } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext } from "../constants/theme"
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { settings } from '../constants/Menus'
import Logo from '../images/parksense_logo.png'
import avatar from '../images/avatar.jpg'

function LoggedUser() {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        window.location.assign('/')
        setAnchorElUser(null);
    };
    const role = localStorage.getItem('userRole');
    const handleDashboard = () => {
        navigate(`/${role.toLowerCase()}/dashboard`)
        setAnchorElUser(null);
    };
    const handleProfile = () => {
        window.location.assign(`/${role.toLowerCase()}/profile`)
        setAnchorElUser(null);
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
                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={avatar} />
                                    </IconButton>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : setting === 'Dashboard' ? handleDashboard : setting === 'Profile' ? handleProfile : handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default LoggedUser;

