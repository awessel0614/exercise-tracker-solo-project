import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './AddExerciseForm.css';




function AddExerciseForm() {

        const [selectedExercise, setSelectedExercise] = useState({
            //session_id: '',
            exercise_id: 'test',
            //set_number: '',
            //reps: '',
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




        const [formFields, setFormFields] = useState([
            {set_number: '', reps: ''},
            {set_number: '', reps: ''},

        ]);

        const handleFormChange = (event, index) => { 
            //uses spread operator to grab the state of the values
            const values = [...formFields];
            values[index][event.target.name] = event.target.value;
            setFormFields(values);
            console.log('these are the values:', formFields )
         };


        const addSetRepRow = () => {

        }


        const handleSubmit = () => {

        }


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
                <div>
               {formFields.map((form, index) => {
                    return (
                        <>
                        <div key={index}>
                            <TextField 
                                name="set_number"
                                placeholder="Set 1"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.set_number}
                            />
                            <TextField 
                                name="reps"
                                placeholder="Number of Reps i.e. 10"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.reps}
                            />
                        </div>
                        </>
                    )
               })}
               </div>
            </FormControl>
            <Button onClick={addSetRepRow}>Add Set/Rep</Button>
            <br></br>
            <Button onClick={handleSubmit}>Submit</Button>
        </Box>

        <br></br>
        <p>this is the id of the selected exercise: {selectedExercise.exercise_id}</p>
        <p>this is set number: {formFields.set_number}</p>
        </>
    )

}

export default AddExerciseForm;


















{/* <Grid alignItems="center">
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
<br></br> */}