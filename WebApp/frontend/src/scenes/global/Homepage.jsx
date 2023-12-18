import React from 'react';
import { Typography, Container, Grid, useTheme, Button } from '@mui/material';
import img from "../../images/32.png";
import first from "../../images/first.png";
import woman from "../../images/parker.png";
import customersupport from "../../images/customersupport.png";
import realtime from "../../images/realtime.png";
import user from "../../images/user.png";
import Plans from './Plans';

export default function Homepage() {
    const theme = useTheme()

    return (
        <Container sx={{ p: 5 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} >
                    <Typography
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        The Easiest Way To Park!
                    </Typography>
                    <Typography variant="h5" color="text.grey" >
                        With ParkSense, you can find and pay for parking with just a few taps. No need to carry cash, and no need to worry about parking meters. ParkSense uses real-time data to show you where available parking spots are, and you can pay for parking directly from the app.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={first} alt="lot" style={{ maxWidth: '70%', height: 'auto' }} />
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={woman} alt="lot" style={{ maxWidth: '80%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} sm={6} sx={{mt:10}} >
                    <Typography
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Discover. Park. Relax.
                    </Typography>
                    <Typography variant="h5" color="text.grey">
                        Upgrade your parking routine with ParkSense. Simplify parking management, make easy payments, and stay updated on available spots in real-time. With an intuitive interface and personalized features, ParkSense ensures a seamless and convenient parking experience.
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.main }}
                    >
                        Register To Park Smartly
                    </Button>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} >
                        <Typography
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Maximize your parking lot's potential.
                        </Typography>
                        <Typography variant="h5" color="text.grey" >
                            Effortlessly manage capacity and enhance the customer parking experience using real-time data insights. ParkSense empowers parking lot owners with a seamless platform for efficient operations and customer satisfaction.
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.main }}
                        >
                            Register As A Lot Owner
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={img} alt="lot" style={{ maxWidth: '80%', height: 'auto' }} />
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={12} sm={9} sx={{ paddingBottom: '50px' }}>
                <Plans />
            </Grid>
            <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ marginTop: '50px' }}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={user} alt="feature" style={{ maxWidth: '40%', height: 'auto', borderRadius: '50%' }} />
                    <Typography variant="h4" color="text.primary" align="center" gutterBottom>
                        User-Friendly Interface
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={realtime} alt="feature" style={{ maxWidth: '40%', height: 'auto', borderRadius: '50%' }} />
                    <Typography variant="h4" color="text.primary" align="center" gutterBottom>
                        Real-time Updates
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={customersupport} alt="feature" style={{ maxWidth: '40%', height: 'auto', borderRadius: '50%' }} />
                    <Typography variant="h4" color="text.primary" align="center" gutterBottom>
                        24/7 Customer Support
                    </Typography>
                </Grid>
            </Grid>

        </Container >
    );
}