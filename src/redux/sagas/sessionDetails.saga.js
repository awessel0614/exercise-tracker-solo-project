import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchSessionDetails(action) {
    try{
        console.log("THIS IS THE ACTION.PAYLOAD", action.payload)
        const response = yield axios.get('/api/sessionDetail/details', {params: action.payload});
        yield put({ type: 'SET_SESSION_DETAILS', payload: response.data });

    } catch (error) {
        console.log('Error in fetching session details', error)
        alert('Something went wrong!');
    }
}


function* sendSessionDetailsToServer(action) {
    try{
        console.log("in sendSessionDetailsToServer saga, action.payload is:", action.payload)
        yield axios.post('/api/sessionDetail', action.payload);
        yield put({ type: 'FETCH_SESSION_DETAILS'})
    } catch (error) {
        alert('Something went wront!');
        console.error('Error in adding session details', error)
        throw error;
    }
}

// function* fetchRemainingSessionDetails(action) {
//     try{
//         console.log("THIS IS THE ACTION.PAYLOAD", action.payload)
//         const response = yield axios.get('/api/sessionDetail/remainingDetails', {params: action.payload});
//         yield put({ type: 'SET_SESSION_DETAILS', payload: response.data });

//     } catch (error) {
//         console.log('Error in fetching session details', error)
//         alert('Something went wrong!');
//     }
// }


function* deleteExercise(action) {
    try{
        console.log("in deleteExercise saga, action.payload is:", action.payload);
        yield axios.delete('/api/sessionDetail/deleteExercise', {params: action.payload});
        yield put({ type: 'FETCH_SESSION_DETAILS', payload: action.payload})
    } catch (error) {
        alert('Something went wront!');
        console.error('Error in deleting exercise', error)
        throw error;
    }
}

function* editSessionDetails(action) {
    try{
        console.log("in editSessionDetails saga, action.payload is:", action.payload);
        yield axios.put('/api/sessionDetail/updateExercise', action.payload);
        yield put({ type: 'FETCH_SESSION_DETAILS', payload: action.payload})
    } catch (error) {
        alert('Something went wront!');
        console.error('Error in deleting exercise', error)
        throw error;
    }
}


function* sessionDetailsSaga() {
    yield takeLatest('SEND_SESSION_DETAILS_TO_SERVER', sendSessionDetailsToServer);
    yield takeLatest('FETCH_SESSION_DETAILS', fetchSessionDetails);
    //yield takeLatest('FETCH_REMAINING_SESSION_DETAILS', fetchRemainingSessionDetails);
    yield takeLatest('DELETE_EXERCISE', deleteExercise);
    yield takeLatest('EDIT_SESSION_DETAILS', editSessionDetails);
}

export default sessionDetailsSaga;