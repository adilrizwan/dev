import * as React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { List, ListItemButton, Box, Typography, IconButton, useTheme, ListItemIcon, ListItemText, Divider, Toolbar, styled, ThemeProvider, useMediaQuery } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'static',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function SideBar(props) {
    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down(700));
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Drawer variant="permanent" open={!isScreenSmall && open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Toolbar>
                <Divider />
                {open && (
                    <Box m="20px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                // src={psy_avatar}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                            >
                                {localStorage.getItem('userName')}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <List>
                    <LotDrawerList
                    //   onDashboardClick={props.onDashboardClick}
                    //   onUpdateProfileClick={props.onUpdateProfileClick}
                    //   onSearchClick={props.onSearchClick}
                    //   onCVClick={props.onCVClick}
                    />
                </List>
            </Drawer>
        </ThemeProvider>
    )
}

const LotDrawerList = () => (
    <React.Fragment>
        {/* <Divider /> */}
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <Divider sx={{ mx: 2 }} />

        {/* <Divider /> */}
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
        </ListItemButton>
        <Divider sx={{ mx: 2 }} />

        {/* <Divider /> */}
        <ListItemButton>
            <ListItemIcon>
                <PersonOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
        <Divider sx={{ mx: 2 }} />

        {/* <Divider /> */}
        <ListItemButton>
            <ListItemIcon>
                <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
        </ListItemButton>
        <Divider sx={{ mx: 2 }} />
    </React.Fragment>
);

export { LotDrawerList };