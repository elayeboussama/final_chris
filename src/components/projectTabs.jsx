import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ApplicationField from './ApplicationField';
import Box from '@mui/material/Box';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Project from '../layouts/Project';
import Apply from '../layouts/Apply';
import Applied from './Applied';
import Created from './Created';
import ResponsiveAppBar from './nav';
import { useAuthContext } from '../hooks/useAuthContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
 

  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProjectTabs() {
  const [value, setValue] = React.useState(0);
  const auth = useAuthContext() ;
  console.log(jwt_decode(auth?.user?.access).user_type) ;



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <ResponsiveAppBar/>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={jwt_decode(auth?.user?.access).user_type === "customer" ?  "creat a project" : "apply for a project" } {...a11yProps(0)} />
         {jwt_decode(auth?.user?.access).user_type !== "customer" &&<Tab label={ "applied project" } {...a11yProps(1)} />}
        </Tabs>
      </Box>
      <TabPanel  value={value} index={0}>
      { jwt_decode(auth?.user?.access).user_type === "customer" ? <Project/> : <Apply/> }
      </TabPanel>
      <TabPanel  value={value} index={1}>
      { jwt_decode(auth?.user?.access).user_type === "customer" ? null :  <Applied/>}
      </TabPanel>
    </Box>
    </>
  );
}




