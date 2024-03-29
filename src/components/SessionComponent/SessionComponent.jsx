import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { TextField, Button, Grid, Container, Card, CardContent, Paper, Box } from "@mui/material";
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



function SessionComponent(props) {
    const dispatch = useDispatch();
    const dayID = useSelector(store => store.dayID)
    const [activateEditMode, setActivateEditMode] = useState(false);
    const [sessionDetails, setSessionDetails] = useState([]);


    const getSessionDetails = (id) => {
        console.log("in getSessionDetails function on DayPage, session details are:", sessionDetails)
        console.log("id is:", id);
        console.log("dayID.id is:", dayID.id);
        fetchSessionDetails({ id: id, theDayID: dayID.id })
            .then((response) => { setSessionDetails(response.data) })
    }

    async function fetchSessionDetails(payload) {
        try {
            console.log("THIS IS THE ACTION.PAYLOAD", payload)
            const response = await axios.get('/api/sessionDetail/details', { params: payload });
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
        console.log('Edited SESSIONDETAILS values:', sessionDetails)
    }

    const sendNewSessionDetailsToServer = (id) => {
        console.log('in sendNewSessionDetailsToServer');
        console.log("id is:", id);
        console.log("dayID.id is:", dayID.id);
        console.log("THESE ARE THE NEW SESSION DETAILS:", sessionDetails);
        dispatch({ type: 'EDIT_SESSION_DETAILS', payload: { id: id, theDayID: dayID.id, sessionDetails: sessionDetails } })
        setActivateEditMode(!activateEditMode);
    }

    const deleteExercise = (id) => {  
        swal({
            title: 'Are you sure?',
            text: 'Do you want to delete this exercise?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(willDelete => {
            console.log(willDelete);
            if (willDelete) {
                console.log(willDelete);
                dispatch({ type: 'DELETE_EXERCISE', payload: { id: id, theDayID: dayID.id } });
                swal({
                    title: 'Deleted!',
                    text: 'Your exercise has been deleted',
                    icon: 'success',
                    buttons: false,
                    timer: 1000,
                });
            } else {
                swal('Cancelled', 'Your exercise was not deleted', 'error');
            }
        });
    }

    useEffect(() => {
        getSessionDetails(props.sessionData.exercise_id);
    }, []);




    return (
        <>
            <body className="session-component">
                <Grid margin={'15px'}>
                    <Paper elevation={8}>
                        <Grid container>
                            <Card
                                style=
                                {{
                                    height: 'auto',
                                    width: '285px',
                                    paddingBottom: '30px',
                                    backgroundColor: "#cec0b4",
                                }}
                                key={props.sessionData.id}
                            >
                                <CardContent>
                                    {activateEditMode === false ?
                                        <div>
                                            <Button
                                                variant="contained"
                                                id="delete-button"
                                                onClick={() => deleteExercise(props.sessionData.exercise_id)} >DELETE</Button>
                                            <EditIcon
                                                onClick={() => editMode()}
                                                sx={{ float: "right" }}></EditIcon>
                                        </div>
                                        :
                                        <div>
                                            <Container direction="column" justify="center" alignItems="center">
                                                <Button variant='contained' id='edit-cancel-button' sx={{ float: "right" }} onClick={() => editMode(props.sessionData.exercise_id)}>Cancel</Button>
                                                <Button variant='contained' id='edit-save-button' sx={{ float: "left" }} onClick={() => sendNewSessionDetailsToServer(props.sessionData.exercise_id)}>Save</Button>
                                            </Container>
                                        </div>
                                    }
                                </CardContent>

                              <Grid container direction="column" justify="center" alignItems="center">
                                    <Box >
                                        <CardContent align="center">
                                            <h2>Exercise: {props.sessionData.exercise_name}</h2>
                                        </CardContent>
                                    </Box>

                                    <Box sx={{ width: '100%' }}>
                                        {activateEditMode === false ?
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
                                                            {sessionDetails.map((detail) => (
                                                                <TableRow
                                                                    key={detail.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >                                                                    
                                                                    <TableCell component="th" scope="row">{detail.set_number}</TableCell>
                                                                    <TableCell align="right">{detail.reps}</TableCell>
                                                                    <TableCell align="right">{detail.weight}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>

                                            :

                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <FormControl container onSubmit={sendNewSessionDetailsToServer} fullWidth>
                                                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Set</TableCell>
                                                                    <TableCell align="right">Reps</TableCell>
                                                                    <TableCell align="right">Weight</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            
                                                            <TableBody >
                                                                <>
                                                                    {sessionDetails.map((detail, index) => (
                                                                        <TableRow
                                                                            key={detail.id}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell component="th" scope="row">
                                                                                <TextField
                                                                                    required
                                                                                    name="set_number"
                                                                                    placeholder={detail.set_number}
                                                                                    variant="filled"
                                                                                    onChange={event => handleFormChange(event, index)}
                                                                                    defaultValue={sessionDetails.set_number}
                                                                                    sx={{
                                                                                        width: '120%',
                                                                                        // "& .MuiInputBase-root": 80,
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
                                                                                    sx={{
                                                                                        width: '120%',
                                                                                        //  "& .MuiInputBase-root": 80,
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
                                                                                    sx={{
                                                                                        width: '100%',
                                                                                        // "& .MuiInputBase-root": 80,
                                                                                        padding: .5,
                                                                                    }}
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </>
                                                            </TableBody>
                                                        </Table>
                                                    </FormControl>
                                                </TableContainer>
                                            </CardContent>
                                        }
                                    </Box>
                                </Grid>
                            </Card>
                        </Grid>
                    </Paper>
                </Grid>
            </body>
        </>
    )
}


export default SessionComponent;