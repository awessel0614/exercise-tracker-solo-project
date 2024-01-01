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

//         const [selectedExercise, setSelectedExercise] = useState({
//             //session_id: '',
//             exercise_id: 'test',
//             //set_number: '',
//             //reps: '',
//             //weight: '',
//             //isToggled: false
//         });

//         const handleExerciseChange = (event) => { 
//            setSelectedExercise({
//                 ...selectedExercise,
//                 exercise_id: event.target.value,
//            }) 
//            console.log("this is the event.target.value for exercise ID", event.target.value);
//         };




//         const [formFields, setFormFields] = useState([
//             {set_number: '', reps: ''},
//             {set_number: '', reps: ''},

//         ]);

//         const handleFormChange = (event, index) => { 
//             //uses spread operator to grab the state of the values
//             const values = [...formFields];
//             values[index][event.target.name] = event.target.value;
//             setFormFields(values);
//             console.log('these are the values:', formFields )
//          };


//         const addSetRepRow = () => {
//             setFormFields([...formFields, { set_number: '', reps: ''}])
//         }

//         const deleteSetRepRow = (index) => {
//             const values = [...formFields];
//             values.splice(index,1);
//             setFormFields(values);
//             console.log('here are the values after row deletion:', formFields)
//         }


//         const handleSubmit = () => {
//             event.preventDefault();
//             console.log("here are the form fields", formFields)
//         }


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
//                         //name="selectedExercise.exercise_id"
//                         onChange={handleExerciseChange}
//                         >
//                         {exercises.map((exercise, i) =>
//                             <MenuItem key={i} name={exercise.exercise_name} value={exercise.id}>{exercise.exercise_name}</MenuItem>
//                         )}    
//                     </Select>
//                     <br></br>
//                 <div>
//                {formFields.map((form, index) => {
//                     return (
//                         <>
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
//                         </>
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
//         <p>this is the id of the selected exercise: {selectedExercise.exercise_id}</p>
//         </>
//     )

// }

// export default AddExerciseForm;


// ^^ this works-- keeping the dynamic form inputs in their own separate variable











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


        const [selectedExercise, setSelectedExercise] = useState([{
            //session_id: '',
            exercise_id: 'test',
            set_number: 'testing',
            reps: 'still testing',
            //weight: '',
            //isToggled: false
        }]);

        const handleExerciseChange = (event) => { 
           event.preventDefault();
           setSelectedExercise([
                //...selectedExercise,
                {exercise_id: event.target.value},
           ]) 
           console.log("this is the event.target.value for exercise ID", event.target.value);
        };




        // const [formFields, setFormFields] = useState([
        //     {set_number: '', reps: ''},
        //     {set_number: '', reps: ''},

        // ]);

        const handleFormChange = (event, index) => { 
            //uses spread operator to grab the state of the values
            const values = [...selectedExercise];
            values[index][event.target.name] = event.target.value;
            setSelectedExercise(values);
            console.log('these are the values:', selectedExercise )
            
         };


        const addSetRepRow = () => {
            setSelectedExercise([...selectedExercise, {exercise_id: selectedExercise[0].exercise_id, set_number: '', reps: ''}])
        }

        const deleteSetRepRow = (index) => {
            const values = [...selectedExercise];
            values.splice(index,1);
            setSelectedExercise(values);
            console.log('here are the values after row deletion:', selectedExercise)
        }


        const handleSubmit = () => {
            event.preventDefault();
            console.log("here are the form fields", selectedExercise)
        }


    


    return (
        <>
        <h1>Enter Exercise Info:</h1>

        <Box sx={{ minWidth: 120 }}>
            <FormControl onSubmit={handleSubmit} fullWidth>
                <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="selectedExercise"
                        onChange={handleExerciseChange}
                        >
                        {exercises.map((exercise, i) =>
                            <MenuItem key={i} name={exercise.exercise_name} value={exercise.id}>{exercise.exercise_name}</MenuItem>
                        )}    
                    </Select>
                    <br></br>
                <div>
               {selectedExercise.map((form, index) => {
                    return (
                        <div key={index}>
                            <TextField 
                                name="set_number"
                                placeholder="Set #"
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
                            <br></br>
                            <Button 
                                onClick={() => deleteSetRepRow(index)}
                            >Delete Set/Rep</Button>
                        </div>
                    )
               })}
               </div>
            </FormControl>
            <Button 
                onClick={() => addSetRepRow()}
            >Add Set/Rep</Button>
            <br></br>
            <Button 
                onClick={handleSubmit}
            >Submit</Button>
        </Box>

        <br></br>
        <p>this is the id of the selected exercise: {selectedExercise.exercise_id}</p>
        </>
    )

}

export default AddExerciseForm;