// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { TextField, Button, Grid, Container, Card, CardContent, Paper } from "@mui/material";
// import './DayPage.css';


// function DayPage() {
//     const dispatch = useDispatch();
//     let history = useHistory();
//     const sessionDetails = useSelector(store => store.sessionDetails)
//     const session = useSelector(store => store.session)


//     const getSession = () => {
//         axios.get('/api/session').then((response) => {
//             console.log("this is the response.data in getSession function", response.data)
//             const action = { type: 'FETCH_SESSION', payload: response.data};
//             dispatch(action);
//         }).catch((error) => {
//             console.log('Error in getting session', error);
//             alert('Something went wrong!');
//         })
//     }
    
    

//     const getSessionDetails = () => {
//         axios.get('/api/sessionDetail').then((response) => {
//             const action = { type: 'FETCH_SESSION_DETAILS', payload: response.data};
//             dispatch(action);
//         }).catch((error) => {
//             console.log('Error in getting session details', error);
//             alert('Something went wrong!');
//         })
//     }


//     useEffect(() => {
//         getSession();
//         getSessionDetails();
//     }, []);


//     const goToExerciseForm = (event) => {
//         event.preventDefault();
//         console.log("going to add exercise form");
//         history.push('/form');

//     }
//     return (
//         <>
//         <ul>
//             {sessionDetails.map((detail, i) =>
//                 <>
//                 <li key={i}>This is the set number:{detail.set_number}</li>
//                 <li>These are the reps{detail.reps}</li>
//                 </>
//             )}
//         </ul>

//         <ul>
//             {session.map((thing, i) =>
//                 <>
//                 <li key={i}>This is the session date:{thing.session_date}</li>
//                 {/* //<li>These are the reps{detail.reps}</li> */}
//                 </>
//             )}
//         </ul>
            
            
//             <Button
//                 variant="contained"
//                 onClick={goToExerciseForm}
//                 >Add Exercise</Button>
//         </>
//     )
// }

// export default DayPage;




// ^^ working so far





















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Container, Card, CardContent, Paper } from "@mui/material";
import './DayPage.css';


function DayPage() {
    var moment = require('moment');
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionDetails = useSelector(store => store.sessionDetails)
    const session = useSelector(store => store.session)


    const getSession = () => {
        axios.get('/api/session').then((response) => {
            console.log("this is the response.data in getSession function", response.data)
            const action = { type: 'FETCH_SESSION', payload: response.data};
            dispatch(action);
        }).catch((error) => {
            console.log('Error in getting session', error);
            alert('Something went wrong!');
        })
    }


    const getSessionDetails = () => {
            const action = { type: 'FETCH_SESSION_DETAILS'};
            dispatch(action);
    }

// ^^ i think i need to restructure this somehow... right now it's getting the session details for the entire day
// but i'm finding it difficult to map over that correctly
// maybe i need to do an async GET that gets the sets and reps for a particular exercise on that particular day?
// OR maybe i'll just create a "view details" button on each exercise that, when I click it, grabs the 
// exercise_ID of the


    useEffect(() => {
        getSession();
        getSessionDetails();
    }, []);


    const goToExerciseForm = (event) => {
        event.preventDefault();
        console.log("going to add exercise form");
        history.push('/form');

    }


    const formattedDate = moment(session[0].session_date).format("dddd, l"); 
    console.log(formattedDate);


    return (
        <>
            <h1> {formattedDate}</h1>
            <Button
                variant="contained"
                onClick={goToExerciseForm}
                >Add Exercise</Button>

                
            <Grid container sx={{justifyContent: "center"}}>
            {session.map(item => {
                return (
                    <>
                      <Grid margin = {'15px'}>
                        <Paper elevation={8}>
                          <Card 
                            style = 
                            {{ height: '350px', 
                            width: '225px', 
                            paddingBottom:'30px', 
                            backgroundColor: "lightblue"}} 
                              
                            key = {item.id}
                          >
                              <CardContent>
                                      <h2>Exercise: {item.exercise_name}</h2>
                                      {sessionDetails.map((detail, i) => {
                                            return (
                                                <>
                                                <p> Set Number: {detail.set_number} </p>
                                                </>
                                            )
                                      })}
                              </CardContent>
                          </Card>
                        </Paper>
                      </Grid> 
                    </>
                )
            })}
        </Grid>

        <ul>
            {sessionDetails.map((detail, i) =>
                <>
                <li key={i}>Set Number: {detail.set_number} Reps: {detail.reps} </li>
                </>
            )}
        </ul>

        
            
            
            
        </>
    )
}

export default DayPage;



