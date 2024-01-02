import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Container } from "@mui/material";
import './DayPage.css';


function DayPage() {
    let history = useHistory();
    const sessionDetails = useSelector(store => store.sessionDetails)


    const goToExerciseForm = (event) => {
        event.preventDefault();
        console.log("going to add exercise form");
        history.push('/form');

    }
    return (
        <>
        <ul>
            {sessionDetails.map((session, i) =>
                <li key={i}>This is the set number:{session.set_number}</li>
            )}
        </ul>
            <p>Well hey there! I'm the daaaay page ^_^</p>
            <Button
                variant="contained"
                onClick={goToExerciseForm}
                >Add Exercise</Button>
        </>
    )
}

export default DayPage;