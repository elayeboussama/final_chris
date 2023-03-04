 
 
 
import Avatar from '@mui/material/Avatar';
import { endpointsURL } from '../api/endpoints';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResponsiveAppBar from '../components/nav';
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import ListDividers from '../components/list';
import { useAuthContext } from '../hooks/useAuthContext';
 import axios from '../api/axios';
import { jaHira } from 'date-fns/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';




export const SignUpEmployee = () => {
  const navigate = useNavigate();
  

  const auth = useAuthContext();
  console.log(auth)
  const [user,setUser] = useState({companyName:"zriguibaw",username:"",firstname:"",lastname:"",email:"oussama@gmail.com"})
  const [dataIsReady, setDataIsReady] = React.useState(true)
  const [data, setData] = React.useState(null)
  // const fetchUserProfile = async () => await axios.get("http://127.0.0.1:8000/users/profile/fetch/", {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     "Authorization": `Bearer ${auth?.user?.access}`
  //   }
    
  // }).then((response) => {
  //   console.log(response)
  //   if (response?.status === 200) {
  //     setData(response.data)
  //     setUser({...user,email:response.data.email,companyName:response.data.companyName})
  //     setDataIsReady(true)
  //   }
    
  // });
  // useEffect(() => {
  //   fetchUserProfile()
  // }, [auth])



  const handleChange=(e)=>{
    setUser({...user, [e.target.name]:e.target.value})
  }

  const theme = createTheme();
  
  
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
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}> 
                {/* onSubmit={handleSubmit} */}
                <TextField
                    defaultValue={user.companyName} 
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                    id="companyName"
                    label="companyName"
                    name="companyName"
                    autoComplete="companyName"
                    focused={true}
                    
                    />
                <TextField
                    value={user.username}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />
                <TextField
                    value={user.firstname}
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="firstname"
                    name="firstname"
                    autoComplete="firstname"
                    onChange={(e) => handleChange(e)}
                    />
                    <TextField
                    value={user.lastname}
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="lastname"
                    name="lastname"
                    autoComplete="lastname"
                    onChange={(e) => handleChange(e)}
                    />
                    <TextField
                    defaultValue={user.email}

                    margin="normal"
                    disabled={true}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >Register</Button>
                    
                </Box>
                </Box>
        
      </Container>
      
    </ThemeProvider>
  );
}