import React from 'react'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/nav';
import axios from 'axios';
import { endpointsURL } from '../api/endpoints';
import { Button , Typography , CircularProgress, tableRowClasses} from '@mui/material';
import { replace } from 'formik';

export const ManageProject = () => {
    const [projects, setProjects] = React.useState({})
    const [projectsShared, setProjectsShared] = React.useState()
    const [user, setUser] = React.useState({})
    const [ready, setReady] = React.useState(false)
    const  auth  = useAuthContext();
    const navigate = useNavigate();
    async function fetchData() {
        const response = await axios.get('http://127.0.0.1:8000/projects/project-created/',
        { headers: { 
          'Content-Type': 'application/json' ,
            "Authorization" : `Bearer ${auth?.user?.access}`} });
            setProjects(response.data);
            setReady(true)
        console.log("azzz",response.data);
        const response2 = await axios.get('http://127.0.0.1:8000/projects/external-projects/',
        { headers: { 
          'Content-Type': 'application/json' ,
            "Authorization" : `Bearer ${auth?.user?.access}`} });
            setProjectsShared(JSON.parse(response2.data)); 
            setReady(true)
        console.log("azzz",response2.data);
      }
    React.useEffect(() => {
            
            fetchData();
          }, [auth]);

    console.log(projects);
    console.log(projectsShared);
        
    return (
        <>
      <ResponsiveAppBar/>
        <Grid style={{marginBlock:"15px", marginInline:"100px", width:"70%"}}
        padding={10}
        container
        direction="row"
            justifyContent="center"
            alignItems="center"
            >
            
         { !ready ? <CircularProgress /> :  projects?.map((project) => {
            if(project.status!=="2"){
             return (
                    <Grid style={{marginBlock:"15px", width:"100%"}}  item xs={12} sm={12} md={12} lg={12}  key={project.id}>
                            <Grid container columnGap={5} style={{justifyContent:"space-between"}} xs={12}>
                             
                                <Typography>
                                    {project.title} 
                                </Typography>
                                {/* <Typography>
                                    {project.description} 
                                </Typography> */}
                                <Button variant="contained" onClick={()=> navigate(`edit/${project.id}/${project.title}/${project.description}/${project.status}/admin` )}>
                                    manage
                                </Button >
                        </Grid>
                    </Grid>
                    )}
                    })
            
        }
        { !ready ? <CircularProgress /> :  projectsShared?.map((project) => {
             if(project[4]!=="2"){
                return (
                    <Grid style={{marginBlock:"15px", width:"100%"}} item xs={12} sm={12} md={12} lg={12} key={project[0]}>
                            <Grid container columnGap={5} style={{justifyContent:"space-between"}} xs={12}>
                                <Typography>
                                    {project[1]} 
                                </Typography>
                                {/* <Typography>
                                    {project[2]} 
                                </Typography> */}
                                <Button variant="contained" onClick={()=> navigate(`edit/${project[0]}/${project[1]}/${project[3]}/${project[4]}/${project[2]}` )}  >  
                                 
                                    manage
                                    
                                </Button >
                        </Grid>
                    </Grid>
                    )
             }
                    })


                    
                }

                    </Grid>

        <h2 style={{marginInline:80}}>finished Projects</h2>

        <Grid
        padding={10}
        container
        direction="row"
            justifyContent="center"
            alignItems="center"
            style={{marginBlock:"15px", marginInline:"100px", width:"70%"}}
            >
         { !ready ? <CircularProgress /> :  projects?.map((project) => {
            if(project.status==="2"){
             return (
                    <Grid style={{marginBlock:"15px", width:"100%"}}  item xs={12} sm={12} md={12} lg={12}  key={project.id}>
                            <Grid container columnGap={5} style={{justifyContent:"space-between"}} xs={12}>
                             
                                <Typography>
                                    {project.title} 
                                </Typography>
                                {/* <Typography>
                                    {project.description} 
                                </Typography> */}
                                <Button variant="contained" onClick={()=> navigate(`edit/${project.id}/${project.title}/${project.description}/${project.status}/admin` )}>
                                    manage
                                </Button >
                        </Grid>
                    </Grid>
                    )}
                    })
            
        }
        { !ready ? <CircularProgress /> :  projectsShared?.map((project) => {
            if(project[4]==="2"){

                return (
                       <Grid style={{marginBlock:"15px", width:"100%"}} item xs={12} sm={12} md={12} lg={12} key={project[0]}>
                               <Grid container columnGap={5} style={{justifyContent:"space-between"}} xs={12}>
                                   <Typography>
                                       {project[1]} 
                                   </Typography>
                                   {/* <Typography>
                                       {project[2]} 
                                   </Typography> */}
                                   <Button variant="contained" onClick={()=> navigate(`edit/${project[0]}/${project[1]}/${project[3]}/${project[4]}/${project[2]}` )}  >  
                                    
                                       manage
                                       
                                   </Button >
                           </Grid>
                       </Grid>
                       )
            }
                    })


                    
                }

        
                    </Grid>
                    </>


    )
}

            
