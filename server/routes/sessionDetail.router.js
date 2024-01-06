const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET for all session details
// router.get('/', (req, res) => {
//   console.log("in sessionDetailrouter GET")
//   pool.query('SELECT * FROM "session_details";').then((result) => {
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log('Error in GET /api/sessionDetail', error);
//     res.sendStatus(500);
//   }); 
// });


//GET for singular session details -- HARDCODED, need to fix that... session ID will need
//to be variable
router.get('/', (req, res) => {
    console.log("in sessionDetailrouter GET")
    pool.query(
        `SELECT * FROM "session_details"
        JOIN "exercise" on "exercise"."id" = "session_details"."exercise_id"
        JOIN "session" on "session"."id" = "session_details"."session_id"
        WHERE "session_id" = 25;`
        ).then((result) => {
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

// ^^ this isn't necessary anymore, it was my original post that i wanted to keep
// so i could learn from it









// router.post('/', async (req, res) => {
//     console.log('in POST for session detail router,', req.body)
//     const db = await pool.connect();
//     try {
//         await db.query('BEGIN');
//         //Creates a new session
//         let queryText = `
//             INSERT INTO "session" ("user_id")
//             VALUES ($1) RETURNING "id";
//         `;
//         const result = await db.query(queryText, [req.user.id]);
//         const sessionId = result.rows[0].id;
        
//         queryText = `
//             INSERT INTO "session_details" ("exercise_id", "session_id", "set_number", "reps")
//             VALUES ($1, $2, $3, $4);
//         `;
//         for(let exercise of req.body.formFields) {
//             //inserts X rows of these details (it's a dynamic amount, based on the user)
//             await db.query(queryText, [req.body.selectedExercise.exercise_id, sessionId, exercise.set_number, exercise.reps]);
//         }
//         await db.query('COMMIT');
//         res.sendStatus(201);
//     } catch (e) {
//         console.log('ROLLBACK', e);
//         await db.query('ROLLBACK');
//         res.sendStatus(500);
//     } finally {
//         db.release();
//     }
// });

//this one works! but it's creating the session id for each exercise instead of for each day





router.post('/', async (req, res) => {
    console.log('in POST for session detail router,', req.body)
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






module.exports = router;
  
