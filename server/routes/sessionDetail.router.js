const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', (req, res) => {
  console.log("in sessionDetailrouter GET")
  pool.query('SELECT * FROM "session_details";').then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in GET /api/sessionDetail', error);
    res.sendStatus(500);
  }); 
});



// //make this an async function
// router.post('/', (req, res) => {
//   console.log('POST /api/sessionDetail')
//   console.log(req.body);
//   console.log(req.body[0].exercise_id);


//   // req.body.map
//   const queryText = `INSERT INTO "session_details"
//     ("exercise_id", "set_number", "reps")
//     VALUES ($1, $2, $3)
//   `;

//   const queryValues = [
//     req.body[0].exercise_id,
//     req.body[0].set_number,
//     req.body[0].reps,
//   ];
//   console.log('these are the query values', queryValues)
//   pool.query(queryText, queryValues)
//     .then(() => {res.sendStatus(201); })
//     .catch((err) => {
//         console.log('Error in completing SELECT session details query I think', err);
//         res.sendStatus(500);
//     });
// });


router.post('/', async (req, res) => {
    console.log('in POST,', req.body)
    const db = await pool.connect();
    try {
        await db.query('BEGIN');
        //Creates a new session
        let queryText = `
            INSERT INTO "session" ("user_id")
            VALUES ($1) RETURNING "id";
        `;
        const result = await db.query(queryText, [req.user.id]);
        const sessionId = result.rows[0].id;
        
        queryText = `
            INSERT INTO "session_details" ("exercise_id", "session_id", "set_number", "reps")
            VALUES ($1, $2, $3, $4);
        `;
        for(let exercise of req.body.formFields) {
            //inserts X rows of these details (it's a dynamic amount, based on the user)
            await db.query(queryText, [req.body.selectedExercise.exercise_id, sessionId, exercise.set_number, exercise.reps]);
        }
        await db.query('COMMIT');
        res.sendStatus(201);
    } catch (e) {
        console.log('ROLLBACK', e);
        await db.query('ROLLBACK');
        res.sendStatus(500);
    } finally {
        db.release();
    }
});







// NOTE TO SELF: I think i need to move the "INSERT INTO "session" part (line 50) into my session router
//once I create that... because right now it's creating a session each time i enter an exercise,
// which isn't what I'm going for... I want to create ONE session with MULTIPLE exercises.
//If I'm not mistaken, i will create the session on the calendar page when a date is selected,
// and do a dispatch on the calendar page





module.exports = router;
  
