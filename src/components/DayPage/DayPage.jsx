import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Container, CardActions, Card, CardContent, Paper, Box } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SessionComponent from '../SessionComponent/SessionComponent';
import './DayPage.css';



function DayPage() {
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionDetails = useSelector(store => store.sessionDetails)
    const session = useSelector(store => store.session)
    const dayID = useSelector(store => store.dayID)


    
    const getSession = () => {
        // this avoids dispatching an empty id
        if(dayID && dayID.id ) {
            console.log("theID VALUE:", dayID.id)
            console.log("in getSession function on DayPage")
            dispatch({ type: 'FETCH_SESSION', payload: dayID.id });
        }
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


return (
    <>
    <Button
        id="back-btn"
        variant="contained"
        onClick={goToCalendarPage}
        sx={{marginLeft: '15px'}}
        >Back</Button>
    <br></br>
    <br></br>
    
    <Box textAlign="center">    
    <Button
        id="add-exercise-btn"
        variant="contained"
        onClick={goToExerciseForm}
        >Add Exercise +</Button>
    </Box>
    

    {session.length > 0 ? 
        <div>
            <Grid container sx={{justifyContent: "center"}}>
                               
                {session.map(item => {                  
                    return(           
                        <SessionComponent key={item.exercise_id} sessionData={item}></SessionComponent>           
                    )
                    })}
            </Grid>
        </div>
    
        : 

        <div>
            <h1 id="no-exercises">No exercises to display!</h1>
        </div>
        }       
    </>
)
}

export default DayPage;