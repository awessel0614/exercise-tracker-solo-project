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

        const [selectedExerciseName, setSelectedExerciseName] = useState ('testing')
        
        const [selectedExercise, setSelectedExercise] = useState({
            //session_id: '',
            exercise_id: 'test',
            set_number: '',
            reps: '',
            //weight: '',
            //isToggled: false
        });
      
        const handleExerciseChange = (event) => { 
           setSelectedExercise({
                ...selectedExercise,
                exercise_id: event.target.value,
           }) 
           console.log("this is the event.target.value for exercise ID", event.target.value);
        };

        const handleSetChange = (event) => { 
            setSelectedExercise({
                 ...selectedExercise,
                 set_number: event.target.value,
            }) 
            console.log("this is the event.target.value for set number", event.target.value);
         };

         const handleRepChange = (event) => { 
            setSelectedExercise({
                 ...selectedExercise,
                 reps: event.target.value,
            }) 
            console.log("this is the event.target.value for rep number", event.target.value);
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
                    //name="selectedExercise.exercise_id"
                    onChange={handleExerciseChange}
                    >
                    {exercises.map((exercise, i) =>
                        <MenuItem key={i} name={exercise.exercise_name} value={exercise.id}>{exercise.exercise_name}</MenuItem>
                    )}    
                    </Select>
                    <br></br>
                <Grid alignItems="center">
                    <TextField 
                    id="outlined-basic" 
                    label="Set1" 
                    variant="outlined" 
                    style={{maxWidth: '50px', maxHeight: '30px', minWidth: '60px', minHeight: '30px'}}
                    onChange={handleSetChange}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <TextField 
                    id="outlined-basic" 
                    label="Set2" 
                    variant="outlined" 
                    style={{maxWidth: '50px', maxHeight: '30px', minWidth: '60px', minHeight: '30px'}}
                    onChange={handleSetChange}
                    />
                
                
                    <Button 
                    variant="contained"
                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    >+</Button>
                    <Button 
                    variant="contained"
                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    >-</Button>
                </Grid>
                <br></br>
                <br></br>
                <TextField 
                    id="outlined-basic" 
                    label="Rep1" 
                    variant="outlined" 
                    style={{maxWidth: '50px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}}
                    onChange={handleRepChange}
                    />
                <br></br>
                <br></br>
                <TextField 
                    id="outlined-basic" 
                    label="Rep2" 
                    variant="outlined" 
                    style={{maxWidth: '50px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}}
                    onChange={handleRepChange}
                    />

            </FormControl>
        </Box>

        <br></br>
        <p>this is the id of the selected exercise: {selectedExercise.exercise_id}</p>
        </>
    )

}

export default AddExerciseForm;