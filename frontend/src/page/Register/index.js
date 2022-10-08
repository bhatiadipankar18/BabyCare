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

// import { request } from '../../request';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
      暴龙战士小组
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
      account: data.get('account'),
      password: data.get('password'),
      nickName: data.get('nickName')
    }
    
    //发起注册请求
    // request({
    //   url: '/user/register',
    //   method: 'POST',
    //   data: register
    // }).then(res => {
    //   if (res instanceof Object) {
    //     //如果后端返回了Token,将其保存到sessionStorage中
    //     setOpen(false);
    //     sessionStorage.setItem("token", res.data);
    //     history.replace('/login');
    //   } else {
    //     setMsg(res);
    //     setOpen(true);
    //   }
    // })

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
                  autoComplete="fname"
                  name="nickName"
                  required
                  fullWidth
                  id="nickName"
                  label="昵称"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="account"
                  label="账号"
                  name="account"
                  autoComplete="account"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="密码"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="注册成为Daily Life的用户😀"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              注册
            </Button>

             {/* 消息提醒 */}
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
                <Link href="#" variant="body2">
                  已经有账号了？请登录
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