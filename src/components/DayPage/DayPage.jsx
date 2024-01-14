
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import EditIcon from '@mui/icons-material/Edit'; 

// import { TextField, Button, Grid, Container, CardActions, Card, CardContent, Paper, Box } from "@mui/material";
// import './DayPage.css';



// function DayPage() {
//     //var moment = require('moment');
//     const dispatch = useDispatch();
//     let history = useHistory();
//     const sessionDetails = useSelector(store => store.sessionDetails)
//     const session = useSelector(store => store.session)
//     const dayID = useSelector(store => store.dayID)

//     const [activateEditMode, setActivateEditMode] = useState(false);
//     const [newSessionDetails, setNewSessionDetails] = useState([{}]);


    
//     const getSession = () => {
//         console.log("theID VALUE:", dayID.id)
//         console.log("in getSession function on DayPage")
//         dispatch({ type: 'FETCH_SESSION', payload: dayID.id });
//     }

//     const getSessionDetails = (id) => {
//         console.log("in getSessionDetails function on DayPage");
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         dispatch({ type: 'FETCH_SESSION_DETAILS', payload: {id: id, theDayID: dayID.id} });
//     }

//     const editMode = (id) => {
//         console.log("in editMode function on DayPage");
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         setActivateEditMode(!activateEditMode);
//         //dispatch({ type: 'FETCH_SESSION_DETAILS' })
//         //i think the part below might not work, i might need to provide an index number after sessionDetails?? not sure
        
//         // setNewSessionDetails({
//         //     set_number: sessionDetails.set_number,
//         //     reps: sessionDetails.reps,
//         //     weight: sessionDetails.weight
//         // });

//         //dispatch({ type: 'EDIT_EXERCISE', payload: {id: id, theDayID: dayID.id} })
//     }

//     const sendNewSessionDetailsToServer = (id) => {
//         console.log('in sendNewSessionDetailsToServer');
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         console.log("THESE ARE THE NEW SESSION DETAILS:", newSessionDetails);
//         //dispatch({ type: EDIT_SESSION_DETAILS, payload: newSessionDetails})
//     }

//     const handleSetChange = (event, index) => {
        
//             const values = [...newSessionDetails];
//             values[index][event.target.name] = event.target.value;
//             setNewSessionDetails(values);
//             console.log('!!!!!! NEWSESSIONDETAILS values:', newSessionDetails )



//     //     setNewSessionDetails({
//     //         ...newSessionDetails,
//     //         set_number: event.target.value,
//     //    }) 
//     //    console.log("NEW SET NUMBER event.target.value is:", event.target.value);
//     // ^^ what i originally had
//     }

//     const handleRepChange = (event, index) => {
        
//         const values = [...newSessionDetails];
//         values[index][event.target.name] = event.target.value;
//         setNewSessionDetails(values);
//         console.log('!!!!!! NEWSESSIONDETAILS values:', newSessionDetails )
        
        
//         // setNewSessionDetails({
//         //     ...newSessionDetails,
//         //     reps: event.target.value,
//         // })
//         // console.log("NEW REP NUMBER event.target.value is:", event.target.value);
//     }

//     const handleWeightChange = (event, index) => {

//         const values = [...newSessionDetails];
//         values[index][event.target.name] = event.target.value;
//         setNewSessionDetails(values);
//         console.log('!!!!!! NEWSESSIONDETAILS values:', newSessionDetails )
       
       
//         // setNewSessionDetails({
//         //     ...newSessionDetails,
//         //     weight: event.target.value,
//         // })
//         // console.log("NEW WEIGHT NUMBER event.target.value is:", event.target.value);
//     }


//     const deleteExercise = (id) => {
//         console.log("in deleteExercise function on DayPage");
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         dispatch({ type: 'DELETE_EXERCISE', payload: {id: id, theDayID: dayID.id} })
//     }

//     const goToExerciseForm = (event) => {
//         event.preventDefault();
//         console.log("going to add exercise form");
//         history.push('/form');
//     }

//     const goToCalendarPage = (event) => {
//         event.preventDefault();
//         console.log("going to calendar page");
//         history.push('/calendar');
//     }
    
//     useEffect(() => {
//         //getDayID();
//         getSession();
//         //getSessionDetails();
//     }, [dayID]);


//     // const formattedDate = moment(session[0].session_date).format("dddd, l"); 
//     // console.log(formattedDate);


// return (
//     <>
//     <Button
//         variant="contained"
//         onClick={goToCalendarPage}
//         >Go to Calendar</Button>

  
//     <h2>Day ID: {dayID.id}</h2>
    
//     <Grid container sx={{justifyContent: "center"}}> 
//     {/* <h1> {formattedDate}</h1> */}
//     <Button
//         variant="contained"
//         onClick={goToExerciseForm}
//         >Add Exercise</Button>

        
    
//     {session.map(item => {
        
//         return (
//             <>
//             <Grid margin = {'15px'}>
//             <Paper elevation={8}>
//                 {/* <CardActions onClick = {() => getSessionDetails(item.exercise_id)} > */}
//                 <Grid container>
//                 <Card 
//                     style = 
//                     {{ height: 'auto', 
//                     width: '285px', 
//                     paddingBottom:'30px', 
//                     backgroundColor: "lightblue"}} 
//                     onClick = {() => getSessionDetails(item.exercise_id)}
//                     key = {item.id}
//                     >
//                     <CardContent>
//                         <Button 
//                         variant="contained" 
//                         id="delete-button"
//                         onClick = {() => deleteExercise(item.exercise_id)} >DELETE</Button> 

//                         {activateEditMode === false ? 
//                         <EditIcon 
//                             onClick={() => editMode()}
//                             sx = {{float: "right"}}></EditIcon>
//                         : 
//                         // <div>
//                             <Container>
//                             <Button variant='contained' id='edit-cancel-button' sx = {{float: "right"}} onClick={() => editMode(item.exercise_id)}>Cancel</Button>
//                             <Button variant='contained' id='edit-save-button' sx = {{float: "right"}} onClick = {() => sendNewSessionDetailsToServer(item.exercise_id)}>Save</Button>
//                             </Container>
//                         // </div>
//                         }
//                     </CardContent> 

//                     <Grid container direction="column" justify="center" alignItems="center">   
//                     <CardContent>
//                             <p>Exercise ID: {item.exercise_id}</p> 
//                             <h2>Exercise: {item.exercise_name}</h2>
//                     </CardContent>
//                     <CardContent>
//                         <TableContainer component={Paper}>
//                             <Table sx={{ minWidth: 250 }} aria-label="simple table">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Set</TableCell>
//                                         <TableCell align="right">Reps</TableCell>
//                                         <TableCell align="right">Weight</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                   {sessionDetails.map((detail, index) => (
//                                         <TableRow
//                                             key={detail.id}
//                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                         >                                          
//                                             {activateEditMode === false ? 
//                                             <div>                                                  
//                                             <TableCell component="th" scope="row">{detail.set_number}</TableCell>
//                                             <TableCell align="right">{detail.reps}</TableCell>
//                                             <TableCell align="right">{detail.weight}</TableCell>                                           
//                                             </div>

//                                             : 

//                                             <div>
//                                             <TableCell component="th" scope="row">
//                                             <TextField
//                                                 name="set_number"
//                                                 placeholder={detail.set_number}
//                                                 variant="filled"
//                                                 onChange={event => handleSetChange(event, index)}
//                                                 defaultValue={newSessionDetails.set_number}
//                                                 sx = {{ width: 40, 
//                                                         "& .MuiInputBase-root": 80,
//                                                         padding: .5,
//                                                     }}     
//                                             />
//                                             </TableCell>

//                                             <TableCell component="th" scope="row">
//                                                 <TextField
//                                                     name="reps"
//                                                     placeholder={detail.reps}
//                                                     variant="filled"
//                                                     onChange={event => handleRepChange(event, index)}
//                                                     defaultValue={newSessionDetails.reps}
//                                                     sx = {{ width: 50, 
//                                                             "& .MuiInputBase-root": 80,
//                                                             padding: .5,
//                                                         }}     
//                                                 />
//                                             </TableCell>

//                                             <TableCell component="th" scope="row">
//                                                 <TextField
//                                                     name="weight"
//                                                     placeholder={detail.weight}
//                                                     variant="filled"
//                                                     onChange={event => handleWeightChange(event, index)}
//                                                     defaultValue={newSessionDetails.weight}
//                                                     sx = {{ width: 50, 
//                                                             "& .MuiInputBase-root": 80,
//                                                             padding: .5,
//                                                         }}     
//                                                 />
//                                             </TableCell>
//                                             </div>
//                                             }
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </CardContent>
//                     </Grid>
//                 </Card>
//                 </Grid>
//                 {/* </CardActions> */}
//             </Paper>
//             </Grid> 
//             </>
//         )
//     })}
// </Grid>

// <ul>
//     {sessionDetails.map((detail, i) =>
//         <>
//         <li key={i}>Set Number: {detail.set_number} Reps: {detail.reps} </li>
//         </>
//     )}
// </ul>
//     </>
// )
// }

// export default DayPage;


// ^^ very buggy -- is only capturing the first row of edited inputs. going to try and
//wrap the inputs in a Form and do it like I did it over on the AddExerciseForm














































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Container, CardActions, Card, CardContent, Paper, Box } from "@mui/material";
import SessionComponent from '../SessionComponent/SessionComponent';
import './DayPage.css';



function DayPage() {
    //var moment = require('moment');
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionDetails = useSelector(store => store.sessionDetails)
    const session = useSelector(store => store.session)
    const dayID = useSelector(store => store.dayID)


    
    
    const getSession = () => {
        console.log("theID VALUE:", dayID.id)
        console.log("in getSession function on DayPage")
        dispatch({ type: 'FETCH_SESSION', payload: dayID.id });
    }

    const goToExerciseForm = (event) => {
        event.preventDefault();
        console.log("going to add exercise form");
        history.push('/form');
    }

    const goToCalendarPage = (event) => {
        event.preventDefault();
        console.log("going to calendar page");
        history.push('/calendar');
    }
    
    useEffect(() => {
        getSession();
    }, [dayID]);


    // const formattedDate = moment(session[0].session_date).format("dddd, l"); 
    // console.log(formattedDate);


return (
    <>
    <Button
        variant="contained"
        onClick={goToCalendarPage}
        >Go to Calendar</Button>

  
    <h2>Day ID: {dayID.id}</h2>
    
    <Grid container sx={{justifyContent: "center"}}> 
    {/* <h1> {formattedDate}</h1> */}
    <Button
        variant="contained"
        onClick={goToExerciseForm}
        >Add Exercise</Button>

    {session.map(item => {
        
        return(
            <>
            <SessionComponent sessionData={item}></SessionComponent>
            </>
        )
        })}
    </Grid>
    </>
)
}

export default DayPage;

// wrapped the inputs in a form but that messed with the spacing entirely, it's also
// still only capturing the first row of inputs... going to try to change the conditional
// rendering a bit to see if that changes things

