import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Container } from "@mui/material";
import './DayPage.css';


function DayPage() {
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionDetails = useSelector(store => store.sessionDetails)


    const getSessionDetails = () => {
        axios.get('/api/sessionDetail').then((response) => {
            const action = { type: 'FETCH_SESSION_DETAILS', payload: response.data};
            dispatch(action);
        }).catch((error) => {
            console.log('Error in getting session details', error);
            alert('Something went wrong!');
        })
    }

    useEffect(() => {
        getSessionDetails();
    }, []);


    const goToExerciseForm = (event) => {
        event.preventDefault();
        console.log("going to add exercise form");
        history.push('/form');

    }
    return (
        <>
        <ul>
            {sessionDetails.map((session, i) =>
                <>
                <li key={i}>This is the set number:{session.set_number}</li>
                <li>These are the reps{session.reps}</li>
                </>
            )}
        </ul>
            <p>I'm the day page!</p>
            <Button
                variant="contained"
                onClick={goToExerciseForm}
                >Add Exercise</Button>
        </>
    )
}

export default DayPage;