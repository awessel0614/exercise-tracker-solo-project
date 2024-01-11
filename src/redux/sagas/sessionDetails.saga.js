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
        yield axios.post('/api/sessionDetail', action.payload);
        yield put({ type: 'FETCH_SESSION_DETAILS'})
    } catch (error) {
        alert('Something went wront!');
        console.error('Error in adding session details', error)
        throw error;
    }
}


function* sessionDetailsSaga() {
    yield takeLatest('SEND_SESSION_DETAILS_TO_SERVER', sendSessionDetailsToServer);
    yield takeLatest('FETCH_SESSION_DETAILS', fetchSessionDetails);
}

export default sessionDetailsSaga;