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
            <SessionComponent key={item.exercise_id} sessionData={item}></SessionComponent>           
        )
        })}
    </Grid>
    </>
)
}

export default DayPage;