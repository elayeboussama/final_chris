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
import { FormControl, MenuItem, Select } from '@mui/material';

export const AddEmployee = () => {
  const auth = useAuthContext();
  console.log(auth)
  const [user,setUser] = useState({permession:"",email:""})
  const [dataIsReady, setDataIsReady] = React.useState(true)
  const [data, setData] = React.useState(null)
  const fetchUserProfile = async () => await axios.post("http://127.0.0.1:8000/employees/invite/", {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${auth?.user?.access}`
    }
    
  }).then((response) => {
    console.log(response)
    if (response?.status === 200) {
      setData(response.data)
      setUser({...user,email:response.data.email,companyName:response.data.companyName})
      setDataIsReady(true)
    }
    
  });
  useEffect(() => {
    fetchUserProfile()
  }, [auth])



  const handleChange=(e)=>{
    console.log(e)
    setUser({...user, [e.target.name]:e.target.value})
  }

  const theme = createTheme();
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ marginLeft: "50%" }}></div>
      {dataIsReady ? 
      
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
                    Add employee
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}> 
                {/* onSubmit={handleSubmit} */}
                
                
                    <TextField
                    value={user.email}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e)=>handleChange(e)}
                    />


                    
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label="permission"
                            name='permession'
                            defaultValue="viewer"
                            helperText="Please select employee's permession"
                            autoFocus
                            value={user.permession}
                            onChange={(e)=>handleChange(e)}
                        >
                          <MenuItem value={"admin"}>
                                admin
                            </MenuItem>
                            <MenuItem value={"viewer"}>
                                viewer
                            </MenuItem>
                        </TextField>
                    
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >Add Employee</Button>
                    
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
      
      
      
      : null}

    </>

  )
}

