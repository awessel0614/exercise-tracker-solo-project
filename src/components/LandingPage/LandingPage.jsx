// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import './LandingPage.css';

// // CUSTOM COMPONENTS
// import RegisterForm from '../RegisterForm/RegisterForm';

// function LandingPage() {
//   const [heading, setHeading] = useState('Welcome');
//   const history = useHistory();

//   const onLogin = (event) => {
//     history.push('/login');
//   };

//   return (
//     <div className="container">
//       <h2>{heading}</h2>

//       <div className="grid">
//         <div className="grid-col grid-col_8">
//           <p>
//             Welcome to your Exercise Tracker App!
//           </p>

//         </div>
//         <div className="grid-col grid-col_4">
//           <RegisterForm />

//           <center>
//             <h4>Already a Member?</h4>
//             <button className="btn btn_sizeSm" onClick={onLogin}>
//               Login
//             </button>
//           </center>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

// ^^ what was there originally

























import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
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
          {/* <RegisterForm sx ={{float: "left"}}/> */}
         {/* <br></br>  */}
         <br></br> 
          <center>
            {/* <h2 >Let's Go!</h2> */}
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
