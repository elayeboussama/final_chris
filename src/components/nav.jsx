import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import jwt_decode from "jwt-decode";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

function ResponsiveAppBar() {
    const  auth  = useAuthContext();
    const navigate = useNavigate();
    const { logout : loginOut } = useLogout()
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        loginOut();
        navigate('/');
    }


    const pages = jwt_decode(auth?.user?.access).user_type === "customer" ? [
      {name :'Profile' , Link : "/"}, 
      {name :'create project' , Link : "/project"} , 
      {name :'active projects' , Link : "/activeProjects"},
      {name :'Add employe' , Link : "/addEmployee"}
    ] : [
      {name :'Profile' , Link : "/"}, 
      {name :'apply for project' , Link : "/project"}
    ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={()=>navigate(page.Link, {replace : true})}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            <Button
                key={"logout"}
                onClick={logout}
                sx={{ my: 2, color: 'red', display: 'block' }}
              >
                logout
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;