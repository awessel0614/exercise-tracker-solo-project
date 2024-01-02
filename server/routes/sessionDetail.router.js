const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('POST /api/sessionDetail')
  console.log(req.body);
  console.log(req.body[0].exercise_id);

  const queryText = `INSERT INTO "session_details"
    ("exercise_id", "set_number", "reps")
    VALUES ($1, $2, $3)
  `;

  const queryValues = [
    req.body[0].exercise_id,
    req.body[0].set_number,
    req.body[0].reps,
  ];
  console.log('these are the query values', queryValues)
  pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(201); })
    .catch((err) => {
        console.log('Error in completing SELECT session details query I think', err);
        res.sendStatus(500);
    });
});

module.exports = router;
  
