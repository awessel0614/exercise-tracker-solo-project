import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";
import './CalendarPage.css';


function CalendarPage() {
    let history = useHistory();


    const goToDayPage = (event) => {
        event.preventDefault();
        console.log("going to day page");
        history.push('/day');
    }

    return (
        <>
            <p>Howdy! I'm the calendar page ^_^</p>
            <Button 
                variant="contained"
                onClick={goToDayPage}
                >Click to go to day page</Button>
        </>
    )
}

export default CalendarPage;