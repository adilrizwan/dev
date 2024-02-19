import * as React from 'react'
import { Box, useTheme, Switch, AppBar, Toolbar, Container, Button } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext } from "../constants/theme"
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../constants/firebaseConfig';

function LoggedUser() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        window.location.assign('/')

    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, "gs://parksense-82db2.appspot.com");
    const role = localStorage.getItem('userRole');
    var LogoRedirect;
    if (role === 'CAROWNER') {
        LogoRedirect = "car/dashboard"
    } else if (role === 'LOTOWNER') {
        LogoRedirect = "lot/dashboard"
    } else {
        LogoRedirect = "admin/dashboard"
    }

    const [logoUrl, setLogoUrl] = React.useState(null);
    const logoRef = ref(storage, 'Logo/parksense_logo.png');
    React.useEffect(() => {
        getDownloadURL(logoRef)
            .then((url) => {
                setLogoUrl(url);
            })
            .catch((error) => {
                console.error('Error fetching logo URL:', error);
            });
    }, [logoRef]);

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <AppBar color='inherit' position="sticky" style={{ marginBottom: '5px', backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={LogoRedirect} style={{ textDecoration: 'none' }}>
                            <img src={logoUrl} alt="logo" style={{ width: '140px' }} />
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
                        <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default LoggedUser;
