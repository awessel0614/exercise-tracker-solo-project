const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log("@@@@sessionID GET", req.session)
    const queryText =
    `
    SELECT DISTINCT "exercise_id", "exercise_name", "session"."id", "session_date" FROM "session_details"
    JOIN "exercise" on "exercise"."id" = "session_details"."exercise_id"
    JOIN "session" on "session"."id" = "session_details"."session_id"
    WHERE "session_details"."session_id" = 25;
    `
      
      pool.query(queryText).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /api/session', error);
      res.sendStatus(500);
    });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;