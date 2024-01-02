import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers';
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
            <h1>Select a date to add exercises to!</h1>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker />
            </LocalizationProvider>

            <Button 
                variant="contained"
                onClick={goToDayPage}
                >Click to go to day page</Button>
        </>
    )
}

export default CalendarPage;