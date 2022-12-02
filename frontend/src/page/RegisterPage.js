import React from 'react';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Select from 'react-select'
import { request } from '../request';
import axios from "axios";






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

  const options = [
    { value: 1, label: 'parents' },
    { value: 2, label: 'nanny' }
  ]

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const [userRole, setUserRole] = React.useState(1);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState(0);
  const [msgColor, setMsgColor] = React.useState("success");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getCaptcha = (event) => {
    event.preventDefault();
    const params = {
      phone:phone
    };

    axios.get('http://localhost:8888/user/getCaptcha', {params})
        .then((res) => {
          console.log("res",res)
          if(res.data.code===0){
            setMsgColor("error")
            setMsg(res.data.msg);
            setOpen(true);
          }
          //todo set button un click


        })
        .catch((error) => {
          console.log(error)
        })

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event);
    const data = new FormData(event.currentTarget);
    console.log(data);
    const register = {
      username: data.get('username'),
      password: data.get('password'),
     role: userRole,
      phone:phone,
      code:code

    }

    console.log(register);


    request({
      url: '/user/register',
      method: 'POST',
      data: register
    }).then(res => {
      console.log("res",res);
      // good handle
      if (res.data instanceof Object) {
        setMsg(res.data["msg"]);
        if (res.data.code === 200) {
          setMsgColor("success")
        }
        if (res.data.code === 0) {
          setMsgColor("error")
        }
        // setOpen(false);
        setOpen(true);
      } else {
        setMsgColor("error")
        setMsg("unknown error");
        setOpen(true);
      }
    }).catch(error => {
      setMsg(error.message);
      setOpen(true);
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
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={8} md={8}>
                <TextField
                    required
                    fullWidth
                    name="phone"
                    label="phone"
                    type="phone"
                    id="phone"
                    onChange={(event) => {
                      setPhone(event.target.value)
                      // console.log()
                    }}
                />


              </Grid>

              <Grid item xs={6} md={4}>
                <Button
                    // type="submit"
                    onClick={getCaptcha}
                    fullWidth
                    variant="contained"
                >
                  get verify  sms
                </Button>

              </Grid>

              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="captcha"
                    label="Enter Code"
                    type="captcha"
                    id="captcha"

                    onChange={(event) => {
                      setCode(event.target.value)
                      // console.log()
                    }}
                />
              </Grid>



              <Grid item xs={12}>
                <Select
                    options={options}
                    onChange={(option) => setUserRole(option.value)}
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
                  <Alert onClose={handleClose} severity={msgColor} sx={{ width: '100%' }}>
                    {msg}
                  </Alert>
                  {/*<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>*/}
                  {/*  {msg}*/}
                  {/*</Alert>*/}
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