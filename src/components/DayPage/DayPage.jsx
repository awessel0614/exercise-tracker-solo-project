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



    // narrow down the exercise_id in the session_details table so there are no duplicates,
    // then get the associated exercise_name from "exercise" (via the exercise_id), and the session_date
    //from "session" via session_id

    // getSession is taking care of getting my sets and reps
    // i need another


    useEffect(() => {
        getSession();
        getSessionDetails();
    }, []);


    const goToExerciseForm = (event) => {
        event.preventDefault();
        console.log("going to add exercise form");
        history.push('/form');

    }
    return (
        <>

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
                                      <h1>Exercise Name: {item.exercise_name}</h1>
                                      {sessionDetails.map((detail, i) => {
                                            return (
                                                <>
                                                <TextField > Set Number: {detail.set_number}</TextField>
                                                    
                                                </>
                                            )
                                      })}


                                      {/* <h2>Set Number:</h2>
                                      <h3>Reps:</h3> */}
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
                <li key={i}>This is the set number:{detail.set_number}</li>
                <li>These are the reps{detail.reps}</li>
                </>
            )}
        </ul>

        
            
            
            
        </>
    )
}

export default DayPage;



