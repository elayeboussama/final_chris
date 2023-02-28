
import ResponsiveAppBar from '../components/nav'
import React, {useState, useEffect} from 'react'
import axios from '../api/axios';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';
import jwt_decode from "jwt-decode";
import { Link, useNavigate , useParams} from 'react-router-dom';
import { FormControlLabel , Checkbox, Divider} from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';

const PROJECT_APPLY_URL = 'find-project/project-apply/';

function Apply() {

  const auth = useAuthContext();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id_consumer, setConsumer] = useState('')
  const [idProject, setProject] = useState('')  
  const handleSubmit = async (id , project_owner ) => {
    
    console.log("sexe ma7arem applicated")
    console.log(data)
   
    try {
        const response = await axios.post( PROJECT_APPLY_URL , 
            JSON.stringify({'id_consumer':project_owner, 'id_project': id }),
            { headers: { 
                'Content-Type': 'application/json' ,
                  "Authorization" : `Bearer ${auth?.user?.access}`} }
        ).then((response) => {
            console.log(response)

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('projects/project-list/');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);  
  return (
    <>
  {data ? <div style={{height: "100%" , width : "100%" }}>
        <div style={{marginBottom : "20px",display: "block" , position : "relative" , height: "20%" , width : "100%"}} >
        <h2 style={{ position : "absolute" , left : "0"}}>Project Title</h2>
        <h2 style={{ position : "absolute" , right : "10%"}} >Description</h2>
        </div>
        <br/>
    
    <br/>
    <div  style={{ display: "block" , position : "relative" , width : "100%"}} >
      {data.map((item ,i ) => (
        <>
          <p key={i} style={{ position : "absolute" , left : "0"}} >{item.title}</p> 
          <p key={item.id} style={{ position : "absolute" , right : "5%"}} >{item.description}</p> 
          
          <button style={{ position : "absolute" , right : "0"}} onClick={()=>handleSubmit(item.id,item.project_owner)}>Submit</button>
          <br/>
        </>
      ))}
    </div>
  </div> : null}
    
    </>
  )
}









export default Apply