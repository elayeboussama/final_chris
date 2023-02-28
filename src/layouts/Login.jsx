import React ,{    useRef, useState, useEffect } from 'react';
import {useAuthContext}  from '../hooks/useAuthContext';

import { Link, useNavigate , useParams} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from '../api/axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { endpointsURL } from '../api/endpoints';

const LOGIN_URL = endpointsURL.login;
const theme = createTheme();
export  default function  SignIn() {
  const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");

        console.log(username);
        console.log(pwd);
            await axios.post(LOGIN_URL,
                JSON.stringify({'username':username, 'password':pwd}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then((response)=> {
                console.log(response);
                console.log(response.data.access);
                console.log(JSON.stringify(response?.data));
                const accessToken = response.data.access ;                
                localStorage.setItem('user', JSON.stringify(response?.data))

                // update the auth context
                dispatch({type: 'LOGIN', payload: response?.data})
                setUsername('');
                setPwd('');
                jwt_decode(response.data.access).user_type ? navigate("/", { replace: true }) :  navigate("/application", { replace: true });


            }).catch((err)=>{
            if (err?.response) {
                console.log('No Server Response');
            } else if (err.response?.status === 400) {
                console.log('Missing Username or Password');
            } else if (err.response?.status === 401) {
                console.log('Unauthorized');
            } else {
                console.log('Login Failed');
            }
        });
    }

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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={username}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
             value={pwd}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPwd(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
              {
                   <Link to="/register" >
                  Don't have an acount Sign Up ?
                  </Link>
                } 
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

