

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function LogOutButton(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector((store) => store.user);


  const handleClick = () => {
    dispatch({type: 'LOGOUT'})
    history.push('/home');
  }


  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleClick}     
    >
      Log Out
    </button>
  );
}


export default LogOutButton;