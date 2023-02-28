import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from '../api/axios';


function Created() {
  const [data, setData] = useState(null);
  const auth = useAuthContext();
  console.log("sexe ma7arem Created")


  const handleDelete = async (id  ) => {
    
    console.log("applicated");
    console.log(data)
    
     try {
         const response = await axios.delete('http://127.0.0.1:8000/projects/project-delete/'+id+'/' , 
             
             {headers: { 
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
      const response = await axios.get('http://127.0.0.1:8000/projects/project-created/',
      { headers: { 
        'Content-Type': 'application/json' ,
          "Authorization" : `Bearer ${auth?.accessToken}`} });
      setData(response.data);
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
          
          <button style={{ position : "absolute" , right : "0"}} onClick={()=>handleDelete(item.id)}>Delete</button>
          <br/>
        </>
      ))}
    </div>
  </div> : null}

    
    </>
  )
}




export default Created