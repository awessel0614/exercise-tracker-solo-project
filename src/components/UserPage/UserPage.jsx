

import React from 'react';
import { Button, Box } from "@mui/material";
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  let history = useHistory();
  const user = useSelector((store) => store.user);

  const goToCalendar = (event) => {
    event.preventDefault();
    console.log("going to calendar view");
    history.push('/calendar');
  }


  return (
    <div>
      <Box textAlign="center">
        <div className="container">
          
          <h2 id="welcome">Welcome, {user.username}!</h2>

          <Button 
            id="go-to-calendar-btn"
            variant="contained"
            onClick={goToCalendar}
          >Get Started!</Button>

        </div>
      </Box>   
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;