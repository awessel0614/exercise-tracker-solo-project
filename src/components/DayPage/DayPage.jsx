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
    
    

    // const getSessionDetails = () => {
    //     axios.get('/api/sessionDetail').then((response) => {
    //         const action = { type: 'FETCH_SESSION_DETAILS', payload: response.data};
    //         dispatch(action);
    //     }).catch((error) => {
    //         console.log('Error in getting session details', error);
    //         alert('Something went wrong!');
    //     })
    // }
    
    // ^^ this was the original one i had but the one below is doing the same thing so
    // i don't think i need it

    const getSessionDetails = () => {
        
            const action = { type: 'FETCH_SESSION_DETAILS'};
            dispatch(action);
    
    }


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
            <Grid container sx={{justifyContent: "center"}}>
            {sessionDetails.map(detail => {
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
                              
                            key = {detail.id}
                          >
                              <CardContent>
                                      <h3>Set Number:{detail.set_number}</h3>
                                      <h2>Reps:{detail.reps}</h2>
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

        <ul>
            {session.map((thing, i) =>
                <>
                <li key={i}>This is the session date:{thing.session_date}</li>
                {/* //<li>These are the reps{detail.reps}</li> */}
                </>
            )}
        </ul>
            
            
            <Button
                variant="contained"
                onClick={goToExerciseForm}
                >Add Exercise</Button>
        </>
    )
}

export default DayPage;



