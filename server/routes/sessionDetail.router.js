const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




//GET for highest weight amount based on exercise selection
router.get('/highestWeight', (req, res) => {
  console.log("in sessionDetailrouter GET for highest weight, req.query.id is:", req.query.id)
  pool.query(
    
       ` SELECT "weight" from "session_details"
        JOIN "session" on "session"."id" = "session_details"."session_id"
        WHERE "exercise_id" = $1
        ORDER BY "weight" DESC
        LIMIT 1;`,

        [req.query.id]
    
  ).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in GET /api/highestWeight', error);
    res.sendStatus(500);
  }); 
});



//GET for session details of particular exercise on particular day
  router.get('/details', (req, res) => {
    console.log("in sessionDetailrouter GET, req.query is:", req.query)
    pool.query(
        
        `SELECT "id", "exercise_id", "set_number", "reps", "weight" FROM "session_details"
        WHERE "exercise_id" = $1 AND "session_id" = $2;`,

        [req.query.id, req.query.theDayID]
    ).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /api/sessionDetail', error);
      res.sendStatus(500);
    }); 
  });



//DELETE
router.delete('/deleteExercise', (req, res) => {
    console.log("in sessionDetailrouter DELETE, req.query is:", req.query)
    pool.query(
        
        `DELETE FROM "session_details"
        WHERE "exercise_id" = $1 AND "session_id" = $2;`,

        [req.query.id, req.query.theDayID])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing DELETE exercise', err);
        res.sendStatus(500);
      });
  });


   
//POST
router.post('/', async (req, res) => {
    console.log('in POST for session detail router,', req.body)
    const db = await pool.connect();
    try {
        await db.query('BEGIN');   
        
        let queryText = `
            INSERT INTO "session_details" ("exercise_id", "session_id", "set_number", "reps", "weight")
            VALUES ($1, $2, $3, $4, $5);
        `;
        for(let exercise of req.body.formFields) {
            //inserts X rows of these details (it's a dynamic amount, based on the user)
            await db.query(queryText, [req.body.selectedExercise.exercise_id, req.body.selectedExercise.session_id, exercise.set_number, exercise.reps, exercise.weight]);
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



//PUT
router.put('/updateExercise', async (req, res) => {
    console.log('in PUT for session detail router, req.body is', req.body)
    const db = await pool.connect();
    try {
        await db.query('BEGIN');
        
        let queryText = `
            UPDATE "session_details" SET "set_number" = $1, "reps" = $2, "weight" = $3
            WHERE "exercise_id" = $4 AND "session_id" = $5 AND "id" = $6;
            `;
        for(let row of req.body.sessionDetails) {
            
            await db.query(queryText, [row.set_number, row.reps, row.weight, req.body.id, req.body.theDayID, row.id]);
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