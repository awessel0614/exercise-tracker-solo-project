// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { TextField, Button, Grid, Container } from "@mui/material";
// import './AddExerciseForm.css';


// function AddExerciseForm() {

//     const dispatch = useDispatch();
//     const exercises = useSelector(store => store.exercises)


//     const getExercises = () => {
//         axios.get('/api/exercise').then((response) => {
//             const action = {type: 'SET_EXERCISES', payload: response.data};
//             dispatch(action);
//         }).catch((error) => {
//             console.log('Error getting exercise list.', error);
//             alert('Something went wrong!')
//         })
//     }

//     useEffect(() => {
//         getExercises();
//     }, []);


//     return (
//         <>
//         <h1>Enter Exercise Info:</h1>

//         <h2>For test purposes, here's a list of exercises in the database:</h2>
//         <ul>
//             {exercises.map((exercise, i) => 
//                 <li key={i}>
//                     {exercise.exercise_name}
//                 </li>
//                 )}
//         </ul>
//         </>
//     )

// }

// export default AddExerciseForm;


// ^^ this is working as of 12/28 11 pm














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


        
        const [selectedExercise, setSelectedExercise] = React.useState('');
      
        const handleChange = (event) => {
          setSelectedExercise(event.target.value);
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

        <h2>For test purposes, here's a list of exercises in the database:</h2>
        <ul>
            {exercises.map((exercise, i) => 
                <li key={i}>
                    {exercise.exercise_name}
                </li>
                )}
        </ul>

    
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedExercise}
                label="selectedExercise"
                name="selectedExercise"
                onChange={handleChange}
                >
                {exercises.map((exercise, i) =>
                    <MenuItem key={i}>{exercise.exercise_name}</MenuItem>
                )}    
                </Select>
            </FormControl>
        </Box>





        </>
    )

}

export default AddExerciseForm;