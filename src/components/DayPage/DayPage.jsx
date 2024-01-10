import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Container, CardActions, Card, CardContent, Paper } from "@mui/material";
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

    
    // const getSessionDetails = () => {
    //     if(dayID && dayID.id){
    //         const action = { type: 'FETCH_SESSION_DETAILS', payload: dayID.id};
    //         dispatch(action);
    //     }
    // }
    //^^works, just commenting out for testing


    const getSessionDetails = (id) => {
        console.log("in getSessionDetails function on DayPage");
        dispatch({ type: 'FETCH_SESSION_DETAILS', payload: {id} });
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
        //getDayID();
        getSession();
        //getSessionDetails();
    }, [dayID]);



    // const formattedDate = moment(session[0].session_date).format("dddd, l"); 
    // console.log(formattedDate);


    return (
        <>
            <Button
                variant="contained"
                onClick={goToCalendarPage}
                >Back to Calendar</Button>
            <h2>Day ID: {dayID.id}</h2>
            {/* <h1> {formattedDate}</h1> */}
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
                          {/* <CardActions onClick = {() => getSessionDetails(item.exercise_id)} > */}
                            <Card 
                                style = 
                                {{ height: '600px', 
                                width: '225px', 
                                paddingBottom:'30px', 
                                backgroundColor: "lightblue"}} 
                                onClick = {() => getSessionDetails()}
                                key = {item.id}
                                >
                                <CardContent>
                                        <p>Exercise ID: {item.exercise_id}</p> 
                                        <h2>Exercise: {item.exercise_name}</h2>
                                        {/* {sessionDetails.map((detail, i) => {
                                                return (
                                                    <>
                                                    <p> Set Number: {detail.set_number} </p>
                                                    </>
                                                )
                                        })} */}
                                </CardContent>



                                {/* <CardContent>
                                        <h2>Exercise: {item.exercise_name}</h2>
                                        {sessionDetails.map((detail, i) => {
                                                return (
                                                    <>
                                                    <p> Set: {detail.set_number} </p>
                                                    <p> Reps: {detail.reps}</p>
                                                    </>
                                                )
                                        })}
                                </CardContent> */}
                            </Card>
                          {/* </CardActions> */}
                        </Paper>
                      </Grid> 
                    </>
                )
            })}
        </Grid>

        <ul>
            {/* {sessionDetails.map((detail, i) =>
                <>
                <li key={i}>Set Number: {detail.set_number} Reps: {detail.reps} </li>
                </>
            )} */}
        </ul>

        
            
            
            
        </>
    )
}

export default DayPage;



