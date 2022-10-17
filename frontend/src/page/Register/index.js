import React from 'react';
import { useHistory } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import Stack from '@material-ui/core/Stack'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import Select from 'react-select'
import { request } from '../../request';

const options = [
  { value: 'parents', label: 'Parents' },
  { value: 'nanny', label: 'Nanny' }
]
const RoleSelectComponent = () => (
  <Select options={options}
          id="usertype"
          label="usertype"
          name="usertype" />
)



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
      BabyCare
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function SignUp() {

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const register = {
      userName: data.get('username'),
      firstName: data.get('firstname'),
      lastName: data.get('lastname'),
      password: data.get('password'),
      userType: data.get('usertype')
    }
    
    
    request({
      url: '/user/register',
      method: 'POST',
      data: register
    }).then(res => {
      if (res instanceof Object) {
        if (res.code === 1) {
          setMsg(res.msg);
          setOpen(true);
        } else {
          history.replace('/login');
        }
      }
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
    
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="firstname"
                  name="firstname"
                  autoComplete="firstname"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="lastname"
                  name="lastname"
                  autoComplete="lastname"
                />
              </Grid>

              <Grid item xs={12}>
              <RoleSelectComponent></RoleSelectComponent>
              </Grid>
           
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
         
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              sign up
            </Button>

             {/* msg */}
             <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {msg}
                  </Alert>
                </Snackbar>
              </Stack>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}