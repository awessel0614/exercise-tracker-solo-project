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


//GET for singular session details 
router.get('/:id', (req, res) => {
    console.log("in sessionDetailrouter GET", req.params.id)
    pool.query(
        `SELECT * FROM "session_details"
        JOIN "exercise" on "exercise"."id" = "session_details"."exercise_id"
        JOIN "session" on "session"."id" = "session_details"."session_id"
        WHERE "session_id" = $1;`,
        [req.params.id]
    ).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /api/sessionDetail', error);
      res.sendStatus(500);
    }); 
  });


   
//POST
router.post('/', async (req, res) => {
    console.log('in POST for session detail router,', req.body)
    const db = await pool.connect();
    try {
        await db.query('BEGIN');
        //Creates a new session
        // let queryText = `
        //     INSERT INTO "session" ("user_id")
        //     VALUES ($1) RETURNING "id";
        // `;
        // const result = await db.query(queryText, [req.user.id]);
        // const sessionId = result.rows[0].id;
        
        let queryText = `
            INSERT INTO "session_details" ("exercise_id", "session_id", "set_number", "reps")
            VALUES ($1, $2, $3, $4);
        `;
        for(let exercise of req.body.formFields) {
            //inserts X rows of these details (it's a dynamic amount, based on the user)
            await db.query(queryText, [req.body.selectedExercise.exercise_id, req.body.selectedExercise.session_id, exercise.set_number, exercise.reps]);
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