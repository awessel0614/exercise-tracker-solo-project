const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



/**GET route for single day based on ID*/  
router.get('/:id', (req, res) => {
  console.log("GET for session router, here's the req.params:", req.params.id);
  const queryText =
  `
  SELECT DISTINCT "exercise_id", "exercise_name", "session"."id", "session_date" FROM "session_details"
  JOIN "exercise" on "exercise"."id" = "session_details"."exercise_id"
  JOIN "session" on "session"."id" = "session_details"."session_id"
  WHERE "session_details"."session_id" = $1;
  `
    
    pool.query(queryText, [req.params.id]).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in GET /api/session', error);
    res.sendStatus(500);
  });
});



/**POST route, sends back ID of already created or newly created day*/
router.post('/', async (req, res) => {
  console.log('POST for session router')
  console.log(req.body)

  //checks to see if the date selected already exists in DB,
  //if it does it grabs that ID and sends it back
  let checkSessionQuery = await pool.query(`
  
        SELECT "session"."id" 
        FROM "session" 
        WHERE "session_date" = $1;`
  
  , [req.body]);

  if (checkSessionQuery.rows.length > 0) {
    console.log('the value of checkSessionQuery.rows[0].id is:', checkSessionQuery.rows[0].id)
    //the ID that gets sent back if the date exists
    res.send({id: checkSessionQuery.rows[0].id})
  } else {
    //if date doesn't exist, creates it and sends that ID back instead
    const insertSessionQuery = `

        INSERT INTO "session"
        ("session_date", "user_id")
        VALUES
        ($1, $2)
        RETURNING
        "id";`;

    const insertSessionValues = [req.body, req.user.id];
    pool.query(insertSessionQuery, insertSessionValues)
    .then((result) => {
      console.log("SESSION ROUTER POST, the result.rows[0].id is:", result.rows[0].id)
      //newly created date ID being sent back
      res.send({id: result.rows[0].id});
    })
    .catch((err) => {
        console.log('Error in POST session', err);
        res.sendStatus(500);
    });
  }
});

module.exports = router;