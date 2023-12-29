import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";
import './DayPage.css';


function DayPage() {
    let history = useHistory();

    const goToExerciseForm = (event) => {
        event.preventDefault();
        console.log("going to add exercise form");
        history.push('/form');

    }
    return (
        <>
            <p>Well hey there! I'm the daaaay page ^_^</p>
            <Button
                variant="contained"
                onClick={goToExerciseForm}
                >Add Exercise</Button>
        </>
    )
}

export default DayPage;