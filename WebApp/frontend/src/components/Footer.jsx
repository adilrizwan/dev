import {
    Grid,
    List,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import Link from '@mui/material/Link';
import { Box } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export function Copyright(props) {
    return (
        <Typography variant="body2" align="center" {...props} color="white.main">
            {'Copyright © '}
            <Link color="inherit" href="/">
                ParkSense
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                background: theme.palette.black.main,
                p: { xs: 4, md: 7 },
                pt: 12,
                pb: 12,
                fontSize: { xs: '12px', md: '14px' },
            }}
        >
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item md={6} lg={4}>
                    <Typography
                        sx={{ mb: 1 }}
                        variant="h3"
                        color="white.main">
                        About us</Typography>
                    <Typography
                        variant="caption2"
                        color="white.main">
                        ParkSense - Parking made easy.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                        }}
                    >
                        <FacebookIcon color='white' sx={{ mr: 1 }} />
                        <TwitterIcon color='white' sx={{ mr: 1 }} />
                        <InstagramIcon color='white' />
                    </Box>
                </Grid>
                <Grid
                    item md={6} lg={2}>
                    <Typography variant="body2" color="white.main">Information</Typography>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Contact Us
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Privacy &amp; Policy
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Terms &amp; Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={2}>
                    <Typography variant="body2" color="white.main">Usage</Typography>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Login
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Dashboard
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Profile
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 2 }} />
        </Box>
    );
}