import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';




function* fetchSession() {
    try{
        const response = yield axios.get('/api/session');
        const action = { type: 'SET_SESSION', payload: response.data }
        yield put(action);
    } catch (error) {
        console.log('Error in fetching session', error)
        alert('Something went wrong!');
    }
}


function* sendSessionToServer(action) {
    try{
        yield axios.post('/api/session', action.payload);
        yield put({ type: 'FETCH_SESSION'})
    } catch (error) {
        alert('Something went wront!');
        console.error('Error in adding session', error)
        throw error;
    }
}



function* sessionSaga() {
    yield takeLatest('SEND_SESSION_DETAILS_TO_SERVER', sendSessionToServer);
    yield takeLatest('FETCH_SESSION_DETAILS', fetchSession);
}

export default sessionSaga;