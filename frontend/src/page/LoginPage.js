import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { Stack } from '@mui/material'
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import { Link } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material'
import { request } from '../request';
import { useAuth } from "../hooks/useAuth";


function Msg(props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={props.open}
            autoHideDuration={1000}
            onClose={props.onClose}
        >
            <Alert onClose={props.onClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {props.msg}
            </Alert>
        </Snackbar>
    )
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                BabyCare
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}



const theme = createTheme();

export default function SignUp() {

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const navigate = useNavigate();
    const { user,setUser } = useAuth();

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
            console.log("res33",res);
            if (res.data instanceof Object) {
                console.log(res.data);
                setMsg(res.data["msg"]);
                if(res.data["code"]===200){
                    console.log(res.data);
                    setUser(res.data["data"]);
                    setOpen(true);
                    navigate("/dashboard/poemList", { replace: true });
                }else{
                    setOpen(true);
                }
            } else {
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
                        marginTop: 8,
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />



                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            login
                        </Button>
                        <Msg open={open} onClose={handleClose} msg={msg} />
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    register
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}