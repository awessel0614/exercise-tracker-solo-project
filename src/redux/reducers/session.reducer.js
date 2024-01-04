
const sessionReducer = ( state = [], action) => {
    if(action.type === 'SET_SESSION') {
        console.log('this is the action.payload for set session reducer:', action.payload)
        return action.payload;
    }
    return state;
};




export default sessionReducer;