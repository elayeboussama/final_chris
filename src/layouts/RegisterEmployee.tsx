 
 
 
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
  let {permession:paramPermession , companyName : paramCompanyName, email:paramEmail, companyNameId: paramCompanyNameId, companyType:paramCompanyType } = useParams()
  const auth = useAuthContext();
  console.log(auth)
  const [user,setUser] = useState({company_id:paramCompanyNameId, company_name:paramCompanyName, user_permission:paramPermession,company_type:paramCompanyType ,is_active:true,username:"",first_name:"",last_name:"",email:paramEmail,password:""})
  const [dataIsReady, setDataIsReady] = React.useState(true)
  const [data, setData] = React.useState(null)





  const registerEmployee  = async () => await axios.post("http://127.0.0.1:8000/employees/registerinvitedemployee/",{user}, {
    headers: {
      'Content-Type': 'application/json',
      
    }
    
  }).then((response) => {
    console.log(response)
    if (response?.status === 200) {
      console.log("success")
      navigate('/login', { replace: true });
    }
    
  });



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
                <Box component="form" onSubmit={registerEmployee} noValidate sx={{ mt: 1 }}> 
                {/*  */}
                <TextField
                    defaultValue={user.company_name} 
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
                    defaultValue={user.permession} 
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                    id="permession"
                    label="permession"
                    name="permession"
                    autoComplete="permession"
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
                    <TextField
                      value={user.password}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => handleChange(e)}
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