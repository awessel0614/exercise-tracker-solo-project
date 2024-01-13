// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { TextField, Button, Grid, Container } from "@mui/material";


// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import './AddExerciseForm.css';




// function AddExerciseForm() {

//     let history = useHistory();
//     const dispatch = useDispatch();
//     const exercises = useSelector(store => store.exercises)


//     const getExercises = () => {
//         axios.get('/api/exercise').then((response) => {
//             const action = {type: 'SET_EXERCISES', payload: response.data};
//             console.log("this is the payload", response.data )
//             dispatch(action);
//         }).catch((error) => {
//             console.log('Error getting exercise list.', error);
//             alert('Something went wrong!')
//         })
//     }

//     useEffect(() => {
//         getExercises();
//     }, []);

//         const [selectedExerciseId, setSelectedExerciseId] = useState('');
//         const [selectedExercise, setSelectedExercise] = useState([{
//             //session_id: '',
//             exercise_id: '',
//             set_number: '',
//             reps: '',
//             //weight: '',
//             //isToggled: false
//         }]);

//         const handleExerciseChange = (event) => { 
//            event.preventDefault();
//            setSelectedExercise([
//                 //...selectedExercise,
//                 {exercise_id: event.target.value},
//            ]) 
//            console.log("this is the event.target.value for exercise ID", event.target.value);
//         };


//         const handleFormChange = (event, index) => { 
//             //uses spread operator to grab the state of the values
//             const values = [...selectedExercise];
//             values[index][event.target.name] = event.target.value;
//             setSelectedExercise(values);
//             console.log('these are the values:', selectedExercise )  
//          };


//         const addSetRepRow = () => {
//             setSelectedExercise([...selectedExercise, {exercise_id: selectedExercise[0].exercise_id, set_number: '', reps: ''}])
//         }

//         const deleteSetRepRow = (index) => {
//             const values = [...selectedExercise];
//             values.splice(index,1);
//             setSelectedExercise(values);
//             console.log('here are the values after row deletion:', selectedExercise)
//         }

//         const handleSubmit = (event) => {
//             event.preventDefault();
//             console.log("here are the form fields", selectedExercise)
//             dispatch({ type: 'SEND_SESSION_DETAILS_TO_SERVER', payload: selectedExercise });
//             setSelectedExercise([{exercise_id: '', set_number: '', reps: ''}]);

//             history.push('/day');
//         }




//     return (
//         <>
//         <h1>Enter Exercise Info:</h1> 

//         <Box sx={{ minWidth: 120 }}>
//             <FormControl onSubmit={handleSubmit} fullWidth>
//                 <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         label="selectedExercise"
//                         onChange={handleExerciseChange}
//                         >
//                         {exercises.map((exercise, i) =>
//                             <MenuItem key={i} name={exercise.exercise_name} value={exercise.id}>{exercise.exercise_name}</MenuItem>
//                         )}    
//                     </Select>
//                     <br></br>
//                 <div>
//                {selectedExercise.map((form, index) => {
//                     return (
//                         <div key={index}>
//                             <TextField 
//                                 name="set_number"
//                                 placeholder="Set #"
//                                 variant="filled"
//                                 onChange={event => handleFormChange(event, index)}
//                                 value={form.set_number}
//                             />
//                             <TextField 
//                                 name="reps"
//                                 placeholder="Number of Reps i.e. 10"
//                                 variant="filled"
//                                 onChange={event => handleFormChange(event, index)}
//                                 value={form.reps}
//                             />
//                             <br></br>
//                             <Button 
//                                 onClick={() => deleteSetRepRow(index)}
//                             >Delete Set/Rep</Button>
//                         </div>
//                     )
//                })}
//                </div>
//             </FormControl>
//             <Button 
//                 onClick={() => addSetRepRow()}
//             >Add Set/Rep</Button>
//             <br></br>
//             <Button 
//                 onClick={handleSubmit}
//             >Submit</Button>
//         </Box>

//         <br></br>
//         <p>this is the id of the selected exercise: {selectedExercise[0].exercise_id}</p>
//         </>
//     )

// }

// export default AddExerciseForm;


// ^^ this works


























import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";
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




function AddExerciseForm() {
    const session = useSelector(store => store.session)
    const dayID = useSelector(store => store.dayID)



        let history = useHistory();


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
            console.log("here are the form fields", selectedExercise)
            dispatch({ type: 'SEND_SESSION_DETAILS_TO_SERVER', payload: {selectedExercise, formFields} });
            setSelectedExercise([{exercise_id: '', set_number: '', reps: '', weight: ''}]);

            history.push('/day');
        }

        const goToDayPage = (event) => {
            event.preventDefault();
            console.log("going to day page");
            history.push('/day');
        }


    const dispatch = useDispatch();
    const exercises = useSelector(store => store.exercises)


    


    return (
        <>
        <Grid container direction="column" justify="center" alignItems="center">
        <Button variant="contained" onClick = {goToDayPage}>Back To Day Page</Button>
        <h2>Here's the day id:{dayID.id}</h2>
        <h1>Enter Exercise:</h1>

        <Box sx={{ minWidth: 120 }}>
            <FormControl onSubmit={handleSubmit} fullWidth>
                <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                    <Select
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
                    <br></br>
                <div>
               {formFields.map((form, index) => {
                    return (
                        <>
                        <div key={index}>
                        <Grid container margin={1} spacing={1} padding={1}>
                        <RemoveCircleIcon
                            sx={{ color: red[500], paddingTop: 3 }}
                            onClick={() => deleteSetRepRow()}
                        />
                            <TextField 
                                name="set_number"
                                placeholder="Set#"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.set_number}
                                sx = {{ width: 60, 
                                        "& .MuiInputBase-root": 80,
                                        padding: .5,
                                        
                                    }}      
                            />
                            <TextField 
                                name="reps"
                                placeholder="Rep# ie 10"
                                variant="filled"
                                onChange={event => handleFormChange(event, index)}
                                value={form.reps}
                                sx = {{ width: 105, 
                                    "& .MuiInputBase-root": 80,
                                    padding: .5  
                                }}
                            />
                            <TextField 
                                name="weight"
                                placeholder="Weight ie 20"
                                variant="filled"
                                required
                                onChange={event => handleFormChange(event, index)}
                                value={form.weight}
                                sx = {{ width: 115, 
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
            </Box>
            <Button 
                onClick={handleSubmit}
                variant="contained"
                sx ={{alignItems: "center"}}
            >Looks Good!</Button>
        

        <br></br>
        <p>this is the id of the selected exercise: {selectedExercise.exercise_id}</p>
        </Grid>
        </>
    )

}

export default AddExerciseForm;