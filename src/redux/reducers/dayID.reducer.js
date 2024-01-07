


const dayIDReducer = (state = [], action) => {
    if (action.type === 'SET_DAYID') {
        console.log("dayIDReducer action.payload is:", action.payload);
        return action.payload;
    } 
    return state;
  };
  
  export default dayIDReducer;