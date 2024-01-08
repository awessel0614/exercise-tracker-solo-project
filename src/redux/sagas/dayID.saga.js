import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchDayID() {
    try{
        const response = yield axios.get('/api/day');
        const action = { type: 'SET_DAYID', payload: response.data }
        yield put(action);
    } catch (error) {
        console.log('Error in fetching dayID', error)
        alert('Something went wrong!');
    }
}



function* dayIDSaga() {
    
    yield takeLatest('FETCH_DAYID', fetchDayID);
}

export default dayIDSaga;