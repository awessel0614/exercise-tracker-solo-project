import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";
import './AddExerciseForm.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function AddExerciseForm() {


        
        const [selectedExercise, setSelectedExercise] = useState({
            //session_id: '',
            exercise_id: 'test',
            set_number: '',
            reps: '',
            weight: '',
            //isToggled: false
        });
      
        const handleExerciseChange = (event) => {
            
           setSelectedExercise({
                ...selectedExercise,
                exercise_id: event.target.value,
           }) 
           console.log("this is the event.target.value", event.target.value);
        };






    const dispatch = useDispatch();
    const exercises = useSelector(store => store.exercises)


    const getExercises = () => {
        axios.get('/api/exercise').then((response) => {
            const action = {type: 'SET_EXERCISES', payload: response.data};
            console.log("this is the payload", response.data )
            dispatch(action);
        }).catch((error) => {
            console.log('Error getting exercise list.', error);
            alert('Something went wrong!')
        })
    }

    useEffect(() => {
        getExercises();
    }, []);


    return (
        <>
        <h1>Enter Exercise Info:</h1>

        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="selectedExercise"
                    name="selectedExercise"
                    onChange={handleExerciseChange}
                    >
                    {exercises.map((exercise, i) =>
                        <MenuItem key={i} value={exercise.id}>{exercise.exercise_name}</MenuItem>
                    )}    
                    </Select>
            </FormControl>
        </Box>

        <p>this is the id of the selected exercise: {selectedExercise.exercise_id}</p>

        </>
    )

}

export default AddExerciseForm;