
const sessionDetailsReducer = ( state = [], action) => {
    if(action.type === 'SET_SESSION_DETAILS') {
        console.log('this is the action.payload for set session details reducer:', action.payload)
        return action.payload;
    }
    return state;
};




export default sessionDetailsReducer;