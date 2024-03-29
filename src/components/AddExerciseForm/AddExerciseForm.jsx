import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Grid } from "@mui/material";
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './AddExerciseForm.css';
import swal from 'sweetalert';




function AddExerciseForm() {
    let history = useHistory();
    const dispatch = useDispatch();
    const dayID = useSelector(store => store.dayID)
    const exercises = useSelector(store => store.exercises)
    const [highestWeight, setHighestWeight] = useState(0);


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

        const [selectedExercise, setSelectedExercise] = useState({
            session_id: dayID.id,
            exercise_id: 'test',           
        });

        const handleExerciseChange = (event) => { 
           setSelectedExercise({
                ...selectedExercise,
                exercise_id: event.target.value,
           }) 

           axios.get('/api/sessionDetail/highestWeight', {params: {id: event.target.value}})
                .then(response => {
                    setHighestWeight(response.data);
                    console.log("THIS IS HIGHEST WEIGHT", highestWeight);                    
                }).catch((error) => {
                    console.error(error);
                    alert('Something went wrong!');
                }); 
           console.log("this is the event.target.value for exercise ID", event.target.value);
        };


        const [formFields, setFormFields] = useState([
            {set_number: '', reps: '', weight: ''},
        ]);

        const handleFormChange = (event, index) => { 
            //uses spread operator to grab the state of the values
            const values = [...formFields];
            values[index][event.target.name] = event.target.value;
            setFormFields(values);
            console.log('these are the values:', formFields )
         };


        const addSetRepRow = () => {
            setFormFields([...formFields, { set_number: '', reps: '', weight: ''}])
        }

        const deleteSetRepRow = (index) => {
            const values = [...formFields];
            values.splice(index, 1);
            setFormFields(values);
            console.log('here are the values after row deletion:', formFields)
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            if (selectedExercise.exercise_id === 'test' || formFields[0].set_number === '' || formFields[0].reps === '' || formFields[0].weight === '') {
                swal({
                    title: 'Fill Out All Inputs',
                    text: 'Please fill out all inputs!',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
            } else {
            console.log("here are the form fields", selectedExercise)
            dispatch({ type: 'SEND_SESSION_DETAILS_TO_SERVER', payload: {selectedExercise, formFields} });
            setSelectedExercise([{exercise_id: '', set_number: '', reps: '', weight: ''}]);
            history.push('/day');            
            }
        }

        const goToDayPage = (event) => {
            event.preventDefault();
            console.log("going to day page");
            history.push('/day');
        }



    return (
        <>
        <Button 
            id="back-to-day-page-btn"
            variant="contained" 
            sx = {{float: "left", backgroundColor: "#567d78", marginLeft: '15px'}} 
            onClick = {goToDayPage}>Back</Button>

        <Grid container direction="column" justify="center" alignItems="center">
        
        <h1 id="enter-exercise">Enter Exercise:</h1>
        
        
        <Box sx={{ minWidth: 120 }}>
            <Card
                sx={{margin: '10px'}}
            >
            <CardContent>
            <FormControl required={true} onSubmit={handleSubmit}  fullWidth>
                <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="selectedExercise"
                        //name="selectedExercise.exercise_id"
                        onChange={handleExerciseChange}
                        sx = {{margin: 1}}
                        >
                        {exercises.map((exercise, i) =>
                            <MenuItem key={i} name={exercise.exercise_name} value={exercise.id}>{exercise.exercise_name}</MenuItem>
                        )}    
                    </Select>

                    {highestWeight.length > 0 ?     
                        <>
                        <p id="pr-line">Your PR for this exercise is: {highestWeight[0].weight} lbs</p>
                        </>
                        :
                        ""}
                    <br></br>
                <div>
               {formFields.map((form, index) => {
                    return (
                        <>
                        <div key={index}>
                        <Grid container margin={1} spacing={1} padding={1} >
                        {index !== 0 ?
                            <RemoveCircleIcon
                            sx={{ color: red[500], paddingTop: 3 }}
                            onClick={() => deleteSetRepRow(index)}
                        />
                        : 
                        <RemoveCircleIcon
                            sx={{ opacity: '0%', paddingTop: 3 }}                       
                        />
                        }
                            <TextField 
                                required
                                name="set_number"
                                placeholder="Set #"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.set_number}
                                sx = {{ width: '20%', 
                                        "& .MuiInputBase-root": 80,
                                        padding: .5,
                                        
                                    }}      
                            />
                            <TextField 
                                required
                                name="reps"
                                placeholder="Rep #"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.reps}
                                sx = {{ width: '25%', 
                                    "& .MuiInputBase-root": 80,
                                    padding: .5  
                                }}
                            />
                            <TextField 
                                required
                                name="weight"
                                placeholder="Weight ie 20"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.weight}
                                sx = {{ width: '25%', 
                                    "& .MuiInputBase-root": 80,
                                    padding: .5  
                                }}
                            />                         
                            <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/icon?family=Material+Icons"
                            />
                            <Icon 
                                sx={{ color: green[500], paddingTop: 3, paddingLeft: .1 }}
                                onClick={() => addSetRepRow()}>add_circle</Icon>
                            </Grid>
                        </div>
                        </>
                    )
               })}
               </div>
            </FormControl>          
            <br></br>
            </CardContent>
            </Card>
            </Box>
            <Button 
                id="looks-good-btn"
                onClick={handleSubmit}
                variant="contained"
                sx ={{alignItems: "center", backgroundColor: "#567d78"}}
            >Looks Good!</Button>
        <br></br>
        </Grid>
        </>
    )
}

export default AddExerciseForm;