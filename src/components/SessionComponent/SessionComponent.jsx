import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { TextField, Button, Grid, Container, CardActions, Card, CardContent, Paper, Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit'; 
import swal from 'sweetalert';
import './SessionComponent.css';



function SessionComponent (props) {
    const dispatch = useDispatch();
    const dayID = useSelector(store => store.dayID)
    const [activateEditMode, setActivateEditMode] = useState(false);


    const [sessionDetails, setSessionDetails] = useState([]);




    // const getSession = () => {
    //     console.log("theID VALUE:", dayID.id)
    //     console.log("in getSession function on DayPage")
    //     dispatch({ type: 'FETCH_SESSION', payload: dayID.id });
    // }


    const getSessionDetails = (id) => {
        console.log("!!!!!!!!!!!!", sessionDetails)
        console.log("in getSessionDetails function on DayPage");
        console.log("id is:", id);
        console.log("dayID.id is:", dayID.id);
        fetchSessionDetails({id: id, theDayID: dayID.id})
        .then((response) => {setSessionDetails(response.data)})
    }


    // const getRemainingSessionDetails = () => {
    //     console.log("in getRemainingSessionDetails function on DayPage");
    //     dispatch({ type: 'FETCH_REMAINING_SESSION_DETAILS', payload: dayID.id });
    // }
    // ^^ tried this to get remaining details to populate after deletion of card

    async function fetchSessionDetails(payload) {
        try{
            console.log("THIS IS THE ACTION.PAYLOAD", payload)
            const response = await axios.get('/api/sessionDetail/details', {params: payload});
            return response;
    
        } catch (error) {
            console.log('Error in fetching session details', error)
            alert('Something went wrong!');
        }
    }


    const editMode = (id) => {
        console.log("in editMode function on DayPage");
        console.log("id is:", id);
        console.log("dayID.id is:", dayID.id);
        setActivateEditMode(!activateEditMode);
    }


    const handleFormChange = (event, index) => {
        const values = [...sessionDetails];
        values[index][event.target.name] = event.target.value;
        setSessionDetails(values);
        console.log('!!!!!! edited SESSIONDETAILS values:', sessionDetails )
    }


    const sendNewSessionDetailsToServer = (id) => {
        console.log('in sendNewSessionDetailsToServer');
        console.log("id is:", id);
        console.log("dayID.id is:", dayID.id);
        console.log("THESE ARE THE NEW SESSION DETAILS:", sessionDetails);
        dispatch({ type: 'EDIT_SESSION_DETAILS', payload: {id: id, theDayID: dayID.id, sessionDetails: sessionDetails }})
        setActivateEditMode(!activateEditMode);
    }


    const deleteExercise = (id) => {

        swal({
            title: 'Are you sure?',
            text: 'Do you want to delete this exercise?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }) .then (deleteIt => {
            if(deleteIt) {
                dispatch({ type: 'DELETE_EXERCISE', payload: {id: id, theDayID: dayID.id} });
                swal({
                    title: 'Deleted!',
                    text: 'Your exercise has been deleted',
                    icon: 'success',
                    buttons: false,
                    timer: 1000,
                });
            }
        });




        console.log("in deleteExercise function on DayPage");
        console.log("id is:", id);
        console.log("dayID.id is:", dayID.id);
        dispatch({ type: 'DELETE_EXERCISE', payload: {id: id, theDayID: dayID.id} })
        //getSessionDetails();
    }

    useEffect(() => {
        getSessionDetails(props.sessionData.exercise_id);
    }, []);





    return (
        <>
        
        <Grid margin = {'15px'}>
        <Paper elevation={8}>
            {/* <CardActions onClick = {() => getSessionDetails(props.sessionData.exercise_id)} > */}
            <Grid container>
            <Card 
                style = 
                {{ height: 'auto', 
                width: '285px', 
                paddingBottom:'30px', 
                backgroundColor: "lightblue"}} 
                key = {props.sessionData.id}
                >


                <CardContent>
                    {activateEditMode === false ? 
                    <div>
                        <Button 
                        variant="contained" 
                        id="delete-button"
                        onClick = {() => deleteExercise(props.sessionData.exercise_id)} >DELETE</Button> 


                        <EditIcon 
                            onClick={() => editMode()}
                            sx = {{float: "right"}}></EditIcon>
                    </div>
                    : 
                     <div>
                        <Container direction="column" justify="center" alignItems="center">
                        <Button variant='contained' id='edit-cancel-button' sx = {{float: "right"}} onClick={() => editMode(props.sessionData.exercise_id)}>Cancel</Button>
                        <Button variant='contained' id='edit-save-button' sx = {{float: "left"}} onClick = {() => sendNewSessionDetailsToServer(props.sessionData.exercise_id)}>Save</Button>
                        </Container>
                     </div>
                    }
                </CardContent> 


                <Grid container direction="column" justify="center" alignItems="center">   
                
                <Box >    
                <CardContent align="center">
                        
                        {/* <p>Exercise ID: {props.sessionData.exercise_id}</p>  */}
                        {/* ^^ commenting out just for the solo project demo */}
                        <h2>Exercise: {props.sessionData.exercise_name}</h2>
                </CardContent>
                </Box>
                

                <Box sx={{width: '100%'}}>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Set</TableCell>
                                    <TableCell align="right">Reps</TableCell>
                                    <TableCell align="right">Weight</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {sessionDetails.map((detail, index) => (
                                    <TableRow
                                        key={detail.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >                                          
                                        {activateEditMode === false ? 
                                        

                                        //move conditional rendering up above the row
                                        <div> 
                                                {/* <p>{detail.id}</p>   << uncomment this to see the row ID again */} 
                                        <TableCell component="th" scope="row">{detail.set_number}</TableCell>
                                        <TableCell align="right">{detail.reps}</TableCell>
                                        <TableCell align="right">{detail.weight}</TableCell>                                           
                                        </div>

                                        : 
                                        
                                        
                                        <FormControl container onSubmit={sendNewSessionDetailsToServer} fullWidth>
                                        <Box sx={{ display: 'flex' }}>
                                        
                                        
                                        <TableCell component="th" scope="row">
                                        <TextField
                                            required
                                            name="set_number"
                                            placeholder={detail.set_number}
                                            variant="filled"
                                            onChange={event => handleFormChange(event, index)}
                                            defaultValue={sessionDetails.set_number}
                                            sx = {{ width: '180%', 
                                                    "& .MuiInputBase-root": 80,
                                                    padding: .5,                                           
                                                }}     
                                        />
                                        </TableCell>
                                        

                                        
                                        <TableCell component="th" scope="row">
                                            <TextField
                                                required
                                                name="reps"
                                                placeholder={detail.reps}
                                                variant="filled"
                                                onChange={event => handleFormChange(event, index)}
                                                defaultValue={sessionDetails.reps}
                                                sx = {{ width: '180%', 
                                                        // "& .MuiInputBase-root": 80,
                                                        padding: .5,
                                                    }}     
                                            />
                                        </TableCell>
                                       

                                        
                                        <TableCell component="th" scope="row">
                                            <TextField
                                                required
                                                name="weight"
                                                placeholder={detail.weight}
                                                variant="filled"
                                                onChange={event => handleFormChange(event, index)}
                                                defaultValue={sessionDetails.weight}
                                                sx = {{ width: '180%', 
                                                        "& .MuiInputBase-root": 80,
                                                        padding: .5,
                                                    }}     
                                            />
                                        </TableCell>
                                        

                                        </Box>
                                        </FormControl>
                                        // </Box>                                                                           
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                </Box>
                
                </Grid>


            </Card>
            </Grid>
            {/* </CardActions> */}
        </Paper>
        </Grid> 
        </>
    )
}



export default SessionComponent;





























































































// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { StaticDatePicker } from '@mui/x-date-pickers';
// import { TextField, Button, Grid, Container, CardActions, Card, CardContent, Paper, Box } from "@mui/material";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import FormControl from '@mui/material/FormControl';
// import EditIcon from '@mui/icons-material/Edit'; 
// import './SessionComponent.css';



// function SessionComponent (props) {
//     const dispatch = useDispatch();
//     const dayID = useSelector(store => store.dayID)
//     const [activateEditMode, setActivateEditMode] = useState(false);
    


//     const [sessionDetails, setSessionDetails] = useState([]);
    



//     // const getSession = () => {
//     //     console.log("theID VALUE:", dayID.id)
//     //     console.log("in getSession function on DayPage")
//     //     dispatch({ type: 'FETCH_SESSION', payload: dayID.id });
//     // }


//     const getSessionDetails = (id) => {
//         console.log("in getSessionDetails function on DayPage");
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         fetchSessionDetails({id: id, theDayID: dayID.id})
//         .then((response) => {setSessionDetails(response.data)})
//     }


//     // const getRemainingSessionDetails = () => {
//     //     console.log("in getRemainingSessionDetails function on DayPage");
//     //     dispatch({ type: 'FETCH_REMAINING_SESSION_DETAILS', payload: dayID.id });
//     // }
//     // ^^ tried this to get remaining details to populate after deletion of card

//     async function fetchSessionDetails(payload) {
//         try{
//             console.log("THIS IS THE ACTION.PAYLOAD", payload)
//             const response = await axios.get('/api/sessionDetail/details', {params: payload});
//             return response;
    
//         } catch (error) {
//             console.log('Error in fetching session details', error)
//             alert('Something went wrong!');
//         }
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


//     const handleFormChange = (event, index) => {
//         const values = [...sessionDetails];
//         values[index][event.target.name] = event.target.value;
//         setSessionDetails(values);
//         console.log('!!!!!! NEWSESSIONDETAILS values:', sessionDetails )
//     }


//     const sendNewSessionDetailsToServer = (id) => {
//         console.log('in sendNewSessionDetailsToServer');
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         console.log("THESE ARE THE NEW SESSION DETAILS:", sessionDetails);
//         //dispatch({ type: EDIT_SESSION_DETAILS, payload: newSessionDetails})
//     }


//     const deleteExercise = (id) => {
//         console.log("in deleteExercise function on DayPage");
//         console.log("id is:", id);
//         console.log("dayID.id is:", dayID.id);
//         dispatch({ type: 'DELETE_EXERCISE', payload: {id: id, theDayID: dayID.id} })
//         //getRemainingSessionDetails();  << tried this to get remaining cards to render on page after delete
//     }


//     useEffect(() => {
//         getSessionDetails(props.sessionData.exercise_id);
//     }, []);





//     return (
//         <>
//         <Grid margin = {'15px'}>
//         <Paper elevation={8}>
            
//             <Grid container>
//             <Card 
//                 style = 
//                 {{ height: 'auto', 
//                 width: '285px', 
//                 paddingBottom:'30px', 
//                 backgroundColor: "lightblue"}} 
//                 key = {props.sessionData.id}
//                 >


//                 <CardContent>
//                     {activateEditMode === false ? 
//                     <div>
//                         <Button 
//                         variant="contained" 
//                         id="delete-button"
//                         onClick = {() => deleteExercise(props.sessionData.exercise_id)} >DELETE</Button> 


//                         <EditIcon 
//                             onClick={() => editMode()}
//                             sx = {{float: "right"}}></EditIcon>
//                     </div>
//                     : 
//                      <div>
//                         <Container direction="column" justify="center" alignItems="center">
//                         <Button variant='contained' id='edit-cancel-button' sx = {{float: "right"}} onClick={() => editMode(props.sessionData.exercise_id)}>Cancel</Button>
//                         <Button variant='contained' id='edit-save-button' sx = {{float: "right"}} onClick = {() => sendNewSessionDetailsToServer(props.sessionData.exercise_id)}>Save</Button>
//                         </Container>
//                      </div>
//                     }
//                 </CardContent>


//                 <Grid container direction="column" justify="center" alignItems="center">   
                
//                     <Box >    
//                     <CardContent align="center">
//                             <p>Exercise ID: {props.sessionData.exercise_id}</p> 
//                             <h2>Exercise: {props.sessionData.exercise_name}</h2>
//                     </CardContent>
//                     </Box>

//                     <Box>
//                     <CardContent>
//                     <TableContainer component={Paper}>
//                         <Table sx={{ minWidth: 250 }} aria-label="simple table">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Set</TableCell>
//                                     <TableCell align="right">Reps</TableCell>
//                                     <TableCell align="right">Weight</TableCell>
//                                 </TableRow>
//                             </TableHead>

//                             <FormControl container onSubmit={sendNewSessionDetailsToServer} fullWidth>
                            
//                               {sessionDetails.map((detail, index) => {
//                                 return (
//                                 <>
//                                 <div key={index}>
//                                 <TableBody>
//                                     <TableRow
                                       
//                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                     >                                                                                 
                                                                                                                                                                                            
//                                         <Box sx={{ display: 'flex' }}>
                                        
                                        
//                                                 <TableCell component="th" scope="row">
//                                                 <TextField
//                                                     type="number"
//                                                     name="set_number"
//                                                     placeholder={detail.set_number}
//                                                     variant="filled"
//                                                     onChange={event => handleFormChange(event, index)}
//                                                     defaultValue={sessionDetails.set_number}
//                                                     sx = {{ width: '180%', 
//                                                             "& .MuiInputBase-root": 80,
//                                                             padding: .5,                                           
//                                                         }}     
//                                                 />
//                                                 </TableCell>
                                                
                                              
//                                                 <TableCell component="th" scope="row">
//                                                     <TextField
//                                                         type="number"
//                                                         name="reps"
//                                                         placeholder={detail.reps}
//                                                         variant="filled"
//                                                         onChange={event => handleFormChange(event, index)}
//                                                         defaultValue={sessionDetails.reps}
//                                                         sx = {{ width: '180%', 
//                                                                 // "& .MuiInputBase-root": 80,
//                                                                 padding: .5,
//                                                             }}     
//                                                     />
//                                                 </TableCell>
                                            
                                              
//                                                 <TableCell component="th" scope="row">
//                                                     <TextField
//                                                         type="number"
//                                                         name="weight"
//                                                         placeholder={detail.weight}
//                                                         variant="filled"
//                                                         onChange={event => handleFormChange(event, index)}
//                                                         defaultValue={sessionDetails.weight}
//                                                         sx = {{ width: '180%', 
//                                                                 "& .MuiInputBase-root": 80,
//                                                                 padding: .5,
//                                                             }}     
//                                                     />
//                                                 </TableCell>
                                        
//                                         </Box>
                                        
                                                                                                                 
                                        
//                                     </TableRow>
                                
//                             </TableBody>
//                             </div>
//                             </>
//                             )
//                             })}
//                             </FormControl>
//                         </Table>
//                     </TableContainer>
                        
//                     </CardContent>
//                     </Box>
                
//                 </Grid>


//             </Card>
//             </Grid>

//         </Paper>
//         </Grid> 