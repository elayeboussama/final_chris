import React from "react";
// import "./App.css" ;
import Profile from "./layouts/Profile";
import MainLayout from "./layouts/Main";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Application from "./layouts/Application";
import { Route, Routes} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Project from "./layouts/Project";
import UnrequiredAuth from "./components/UnrequiredAuth";
import Apply from "./layouts/Apply";
import ProjectTabs from "./components/projectTabs";
import { useAuthContext } from "./hooks/useAuthContext";
import { ManageDialog } from "./components/dialogue";
import { ManageProject } from "./layouts/ManageProject";
import { AddEmployee } from "./layouts/AddEmployee";
import { SignUpEmployee } from "./layouts/RegisterEmployee";
import {EditProject} from "./layouts/EditProject";

export default function App() {
  const  auth  = useAuthContext();
  return <>
  <Routes>
  <Route path="/">
  <Route element={<UnrequiredAuth/>}>
    <Route path="login" element={ <Login />}/> 
   </Route>
   <Route element={<UnrequiredAuth />}>
     <Route path="register" element={<Register />}/> 
   </Route>
   <Route element={<UnrequiredAuth />}>
     <Route path="registerEmployee" element={<SignUpEmployee />}/> 
   </Route>
   <Route element={<RequireAuth />}>
       <Route path="/" element={<Profile/>} /> 
   </Route>
   <Route element={<RequireAuth />}>
      <Route path="/project" element={<ProjectTabs/>} /> 
   </Route>
   <Route element={<RequireAuth />}>
        <Route path="/activeProjects" element={<ManageProject/>} /> 
   </Route>
   <Route element={<RequireAuth />}>
        <Route path="/addEmployee" element={<AddEmployee/>} /> 
   </Route>
   <Route element={<RequireAuth />}>
      <Route exact path="/activeProjects/edit/:id/:title/:description/:status/:role" element={<EditProject/>} />
   </Route>
   <Route element={<RequireAuth />}>
   <Route path="/application" element={<Application/>} /> 
   </Route>
   <Route path="/unauthorized" element={<Unauthorized />} />
  </Route>
  </Routes>
  </>
    
  
};
       
       
      
      




          