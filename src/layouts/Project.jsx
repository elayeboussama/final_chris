import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt_decode from "jwt-decode";
import { FormControlLabel, Checkbox } from '@mui/material';


const APPLICATION_URL = 'projects/project-create/';
const theme = createTheme();
function Project() {
  console.log("ya33333333");

  const auth = useAuthContext();
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [delievery_service, setDelieveryService] = useState("no");
  const [data, setData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = jwt_decode(auth?.user?.access).user_type === 'customer' ? { title, description, delievery_service } : null
    console.log({ body });
    try {
      await axios.post(APPLICATION_URL,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${auth?.user?.access}`
          }
        }
      ).then((response) => {
        console.log(response)
        //navigate("/", {replace : true})
});
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
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://127.0.0.1:8000/find-project/project-done/',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${auth?.accessToken}`
          }
        });
      setData(JSON.parse(response.data));
    }

    fetchData();
  }, []);


  return (
    <>
      <div style={{ marginLeft: "50%" }}></div>
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
              create project
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                value={title}
                margin="normal"
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                value={description}
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="description"
                onChange={(e) => setDescription(e.target.value)}
                multiline
              />
              {jwt_decode(auth?.user?.access).user_type === 'customer' ? <FormControlLabel control={<Checkbox checked={delievery_service === "no" ? false : true} onChange={(e) => { e.target.checked ? setDelieveryService("yes") : setDelieveryService("no") }} />} label="delivery service" /> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >create project</Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      

      {data ? <div style={{ height: "100%", width: "100%" }}>
        <div style={{ marginBottom: "20px", display: "block", position: "relative", height: "20%", width: "100%" }} >
          <h2 style={{ position: "absolute", left: "0" }}>Project Title</h2>
          <h2 style={{ position: "absolute", right: "10%" }} >Description</h2>
        </div>
        <br />

        <br />
        <div style={{ display: "block", position: "relative", width: "100%" }} >
          {data.map(element => {
            return (
              <>
                {element.map((item, i) => {

                  return (
                    <>
                      <p key={i} style={{ position: "absolute", left: "0" }} >{element[0].title}</p>
                      <p key={item.id} style={{ position: "absolute", right: "5%" }} >{item.description}</p>


                      <br />
                    </>
                  )
                }

                )
                }
              </>
            )
          })
          }
        </div>
      </div> : null}


    </>


  )
}

export default Project