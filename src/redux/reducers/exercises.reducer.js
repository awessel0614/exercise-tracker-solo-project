const exercisesReducer = (state = [], action) => {
    if (action.type === 'SET_EXERCISES') {
        console.log(action.payload);
        return action.payload;
    } 
    return state;
  };
  
  export default exercisesReducer;