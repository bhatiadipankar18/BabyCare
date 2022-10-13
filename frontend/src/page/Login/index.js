import React from 'react';
import { useNavigate } from 'react-router-dom';

import {Snackbar} from '@mui/material';
import  { Alert } from '@mui/material';
import {Stack} from '@mui/material'
import {Avatar} from '@mui/material';
import {Button} from '@mui/material';
import {CssBaseline} from '@mui/material';
import {TextField} from '@mui/material';
import {Link} from '@mui/material';
import {Grid} from '@mui/material';
import {Box} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Typography} from '@mui/material';
import {Container} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material'
import { request } from '../../request';




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

const AlertDom = React.forwardRef(function getAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function SignUp() {

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const navigate = useNavigate();

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
      username: data.get('username'),
      password: data.get('password')
    }


    request({
      url: '/user/login',
      method: 'POST',
      data: register
    }).then(res => {
      if (res instanceof Object) {
        //if got token from backend, store it in localstorage
        setOpen(false);
        localStorage.setItem("token", res.data);
        navigate('/feeding');
        setOpen(true);
      } else {
        setMsg(res);
        setOpen(true);
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
            login
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
             login
            </Button>

             {/* msg */}
             <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <AlertDom onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {msg}
                  </AlertDom>
                </Snackbar>
              </Stack>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  register
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