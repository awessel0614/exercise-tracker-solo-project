import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Container } from "@mui/material";
import './AddExerciseForm.css';


function AddExerciseForm() {

    const dispatch = useDispatch();
    const exercises = useSelector(store => store.exercises)


    const getExercises = () => {
        axios.get('/api/exercise').then((response) => {
            const action = {type: 'SET_EXERCISES', payload: response.data};
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
        </>
    )

}

export default AddExerciseForm;