// import React from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import { TextField, Button, Grid, Container } from "@mui/material";
// import { useHistory } from 'react-router-dom';
// import {useSelector} from 'react-redux';

// function UserPage() {
//   // this component doesn't do much to start, just renders some user reducer info to the DOM
  
//   const user = useSelector((store) => store.user);
//   return (
//     <div className="container">
//       <h2>Welcome, {user.username}!</h2>
//       <p>Your ID is: {user.id}</p>
//       <Button variant="contained">Get Started!</Button>
//       <LogOutButton className="btn" />
//     </div>
//   );
// }

// // this allows us to use <App /> in index.js
// export default UserPage;


// ^^ version 1 
























import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { TextField, Button, Grid, Container } from "@mui/material";
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';

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
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Button 
        variant="contained"
        onClick={goToCalendar}
      >Get Started!</Button>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;

