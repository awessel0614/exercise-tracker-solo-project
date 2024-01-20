import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, Grid, Container } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers';
import './CalendarPage.css';


function CalendarPage() {
    let history = useHistory();
    const dispatch = useDispatch();

    const [chosenDate, setChosenDate] = useState('');


    const handleDateChange = (date) => {
        setChosenDate(date.toString());
    }


    const goToDayPage = (event) => {
        event.preventDefault();
        console.log("going to day page");
        
        dispatch({ type: 'SEND_SESSION_TO_SERVER', payload: chosenDate})
        setChosenDate('');
        
        history.push('/day');
       
    }

    return (
        <>
            
            <h1 id="pick-a-date-text">Pick a date to add exercises to!</h1>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker 
                    value={chosenDate}
                    selected={chosenDate}
                    onChange={handleDateChange}
                    dateFormat={'YYYY/mm/dd'}
                    sx= {{}}
                />
            </LocalizationProvider>

            {/* <p>here's the day : {chosenDate}</p> */}
            <Box sx ={{justify: 'center'}}>
            <Button 
                
                variant="contained"
                onClick={goToDayPage}
                >Let's Go!</Button>
                </Box>
        </>
    )
}

export default CalendarPage;