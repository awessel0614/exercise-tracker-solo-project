import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchDayID(action) {
    try{
        console.log("here's the action in the fetchDayID", action);
        const response = yield axios.get('/api/day');
        yield put({ type: 'SET_DAYID', payload: response.data });
    } catch (error) {
        console.log('Error in fetching dayID', error)
        alert('Something went wrong!');
    }
}



function* dayIDSaga() {
    
    yield takeLatest('FETCH_DAYID', fetchDayID);
}

export default dayIDSaga;