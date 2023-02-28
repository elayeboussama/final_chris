import React ,{    useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, Navigate, useNavigate , useParams} from 'react-router-dom';
import axios from '../api/axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MaterialUIPickers from './datePicker';
import dayjs from 'dayjs';
import { useAuthContext } from '../hooks/useAuthContext';




const APPLICATION_URL = 'api/profile/';
const theme = createTheme();
export  default function  ApplicationField({type}) {
    const  auth  = useAuthContext()
    const navigate = useNavigate(); 
    const [adress, setAdress] = useState('');
    const [delievery_service , setDelieveryService] = useState("no") ;
    const [birthDay, setBirthDay] = useState(dayjs('2019-01-25').toDate());
    const handleChange = (newValue) => {
       setBirthDay(newValue);
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const body = type === 'producer' ? {  user_type : type  , adress , delievery_service } : {  user_type : type  , adress , birthDay : birthDay.$d }
 
      try {
          const response = await axios.post(APPLICATION_URL , 
              JSON.stringify(body),
              { headers: { 
                  'Content-Type': 'application/json' ,
                    "Authorization" : `Bearer ${auth?.user?.access}`} }
).then((response) => {
  console.log(response)
 navigate(`/`, {replace : true})
}) ;      
      } catch (err) {
          if (!err?.response) {
              console.log('No Server Response');
          } else if (err.response?.status === 409) {
              console.log('Username Taken');
          } else {
              console.log('Registration Failed')
          }

          console.log(err);
          
      }
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
          <Typography component="h1" variant="h5">
            Complete Profile 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              value={adress}
              margin="normal"
              required
              fullWidth
              id="adress"
              label="adress"
              name="adress"
              autoComplete="adress"
              autoFocus
              onChange={(e) => setAdress(e.target.value)}
            />
         {type=== 'producer' ? <FormControlLabel control={<Checkbox checked={ delievery_service==="no" ? false : true } onChange={(e)=>{e.target.checked ? setDelieveryService("yes") : setDelieveryService("no") }} />} label="delivery service" /> : <MaterialUIPickers birthDay={birthDay} setBirthday={setBirthDay} handleChange={handleChange} />}

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
    
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
