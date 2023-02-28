import React ,{   useContext, useEffect  } from "react";
import "../App.css" ;
import {   useNavigate } from 'react-router-dom' 
import {AuthContext} from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import BasicTabs from "../components/Tab";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";



const MainLayout = () => {

    const  auth  = useAuthContext();
    const navigate = useNavigate();
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        useEffect(()=>{
         auth?.user?.access && navigate('/profile');
        },[])
        
    
  
    return (
        <div className="main">
      <Button variant="contained"><Link to="/login">login</Link></Button>
      <Button variant="contained"><Link to="/register">register</Link></Button>   
        </div>
    )
}

export default MainLayout


/* <div className="nav" ref={main}>
      <div className="menu-links">
        <ul>
          <Link to="/"><li>Home</li></Link>  
          <Link to="courses"><li>courses</li></Link>  
          <Link to="/courses"><li>blogs</li></Link> 
          <Link to="/courses"><li>forum</li></Link> 
          <Link to="/courses"><li>resources</li></Link> 
          {auth.user && <li id="logout" onClick={logout} >Logout</li>}
        </ul>
      </div>
    </div> */