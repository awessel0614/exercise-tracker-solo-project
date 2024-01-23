

import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (   
    <div className="container">
      <h1 id="meet">Meet your Exercise Calendar!</h1>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p id="paragraph">
            Leave your notebook at home--
            here's an easy way to keep track of your exercises, so that you don't
            have to sweat the small stuff!
          </p>

        </div>

        <div className="grid-col grid-col_4">
         <br></br> 
          <center>            
            <button className="btn btn_sizeM" onClick={onLogin}>
              Register / Login
            </button>
          </center>
        </div>
      </div>

    </div>  
  );
}

export default LandingPage;