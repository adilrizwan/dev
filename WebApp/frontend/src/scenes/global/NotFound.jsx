import React from 'react';
import { Grid, Button, Container, Typography } from '@mui/material';
import findImage from '../../images/find.png';

const messages = [
    "Ah, you've found me amidst this chaotic world. But beware, for curiosity may lead you into unexpected adventures. Are you ready to unravel the mysteries that lie ahead?",
    "Lost in a sea of faces, you've finally tracked me down. But remember, the search is never truly over. Stay sharp, my friend.",
    "Congratulations on finding me, but be warned, this is where the hunt ends and the game begins. Prepare yourself for the unexpected!",
    "You've ventured too close, seeker. Retreat now, or suffer the consequences of unveiling my hidden sanctuary.",
    "Forget our encounter, for silence is your protection. Share not my whereabouts, or face the dire consequences. Return now, and remember: you saw nothing.",
    "Turn back now, dear wanderer. Avert your gaze from what lies ahead. Consider it a kind gesture, for some paths are best left unexplored.",
    "You've come to the wrong neighborhood, my friend. Turn around and walk away before things get ugly.",
];

function getRandomMessage() {
    const num = Math.floor(Math.random() * messages.length);
    return messages[num];
}

function NotFound() {
    const user = localStorage.getItem('userRole');

    return (
        <Container sx={{ p: 5 }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" align="center" color="text.primary" sx={{ mb: 1 }}>
                        Lost?
                    </Typography>
                    <Typography variant="h4" align="center" color="text.primary" sx={{ mb: 1 }}>
                        Page not found
                    </Typography>
                    <Typography variant="h6" align="center" color="text.primary" sx={{ mt: 1 }}>
                        {`"${getRandomMessage()}"`}
                    </Typography>
                    <Grid sx={{ mt: 2 }} align="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                !user ? window.location.assign('/login') : window.location.assign(`/${user.toLowerCase()}/dashboard`);
                            }}
                        >
                            Take me back
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={findImage} alt="404" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default NotFound;
