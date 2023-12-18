import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  useTheme,
  Paper,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import login_l from '../../images/login2d.png';
import login_d from '../../images/login2e.png';
import axios from 'axios';

export default function SignInSide() {
  const theme = useTheme();
  const [details, setDetails] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('');

  const { email, password } = details;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));

    if (name === 'email' && value) {
      setEmailError(!isValidEmailFormat(value));
    }
  };

  const isValidEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (emailError) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', details);
      console.log(details)
      localStorage.setItem('token', response.data.token);
      const userName =
        response.data.role.toUpperCase() === 'CAROWNER'
          ? response.data.Details.FirstName
          : response.data.Details.Name;

      localStorage.setItem('userName', userName);
      localStorage.setItem('userRole', response.data.role.toUpperCase());

      window.location.assign(`/`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setSnackbarSeverity('error')
        setError(error.response.data.message || 'Invalid Credentials.');
      } else {
        setSnackbarSeverity('error')
        setError('An error occurred during login.');
        console.error(error);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${theme.palette.mode === 'dark' ? login_d : login_l})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
              <LockOutlinedIcon />
            </Avatar>


            <Typography variant="h4" color="text.primary">
              Log in to your account
            </Typography>
          </Grid>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              size="small"
              error={emailError}
              helperText={emailError ? 'Incorrect email format.' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={handleChange}
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <Grid container justifyContent="space-between">
              <Grid item>
                <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
              </Grid>
              <Grid item>
                <Typography
                  sx={{ textDecoration: 'underline', cursor: 'pointer', mt: 1 }}
                  variant="subtitle2"
                  color="text.primary"
                  onClick={() => {
                    setSnackbarSeverity('info');
                    // setSnackbarMessage('A recovery email has been sent to your email');
                    setError('A recovery email has been sent to your email');
                  }}
                >
                  Forgot Password?
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="medium"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.main }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Typography
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="subtitle2"
                  color="text.primary"
                  onClick={() => {
                    window.location.assign('/register');
                  }}
                >
                  Don't have an account? Register
                </Typography>
              </Grid>
            </Grid>
            {error && (
              <MuiAlert severity={snackbarSeverity} sx={{ mt: 2 }}>
                {error}
              </MuiAlert>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
