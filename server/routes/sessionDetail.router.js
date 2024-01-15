const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();






//   router.get('/:id', (req, res) => {
//     console.log("in sessionDetailrouter GET, params is:", req.params + "req.body is:", req.body)
//     pool.query(
        
//         `SELECT "set_number", "reps", "weight" FROM "session_details"
//         WHERE "exercise_id" = $1 AND "session_id" = $2;`,

//         [req.params.id]
//     ).then((result) => {
//       res.send(result.rows);
//     }).catch((error) => {
//       console.log('Error in GET /api/sessionDetail', error);
//       res.sendStatus(500);
//     }); 
//   });
// changing the /:id to something different for testing purposes


//GET for all session details
router.get('/remainingDetails', (req, res) => {
  console.log("in sessionDetailrouter GET, req.query is:", req.query)
  pool.query(
    
    `SELECT "exercise_id", "set_number", "reps", "weight" FROM "session_details"
        WHERE "session_id" = $1;`,

        [req.query.theDayID]
    
  
  ).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in GET /api/remainingDetails', error);
    res.sendStatus(500);
  }); 
});


  router.get('/details', (req, res) => {
    console.log("in sessionDetailrouter GET, req.query is:", req.query)
    pool.query(
        
        `SELECT "exercise_id", "set_number", "reps", "weight" FROM "session_details"
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
        //Creates a new session
        // let queryText = `
        //     INSERT INTO "session" ("user_id")
        //     VALUES ($1) RETURNING "id";
        // `;
        // const result = await db.query(queryText, [req.user.id]);
        // const sessionId = result.rows[0].id;
        
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









module.exports = router;