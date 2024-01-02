const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
  // GET route code here
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
        //Create a new session
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
            //inserts three rows of details
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








module.exports = router;
  
