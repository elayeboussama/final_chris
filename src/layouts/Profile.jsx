import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResponsiveAppBar from '../components/nav';
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import ListDividers from '../components/list';
import { useAuthContext } from '../hooks/useAuthContext';
 import axios from '../api/axios';
import { jaHira } from 'date-fns/locale';

function Profile() {
  const auth = useAuthContext();
  console.log(auth)
  const [dataIsReady, setDataIsReady] = React.useState(false)
  const [data, setData] = React.useState(null)
  const fetchUserProfile = async () => await axios.get("http://127.0.0.1:8000/users/profile/fetch/", {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${auth?.user?.access}`
    }
    
  }).then((response) => {
    console.log(response)
    if (response?.status === 200) {
      setData(response.data)
      setDataIsReady(true)
    }
    
  });
  useEffect(() => {
    fetchUserProfile()
  }, [auth])
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ marginLeft: "50%" }}></div>
      {dataIsReady ? <ListDividers allData={data} /> : null}

    </>

  )
}

export default Profile