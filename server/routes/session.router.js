const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log("in sessionRouter GET")
  pool.query('SELECT * FROM "session";').then((result) => {
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
  console.log('in POST for session router')
  console.log(req.body)

  const insertSessionQuery = `
        INSERT INTO "session"
        ("session_date")
        VALUES
        ($1);
  `;

  const insertSessionValues = [req.body];
  pool.query(insertSessionQuery, insertSessionValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
        console.log('Error in POST session', err);
        res.sendStatus(500);
    });
});

module.exports = router;
