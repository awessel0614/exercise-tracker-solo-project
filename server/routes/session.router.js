// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();

// /**
//  * GET route template
//  */
// router.get('/', (req, res) => {
//   console.log("in sessionRouter GET")
//   pool.query('SELECT * FROM "session";').then((result) => {
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log('Error in GET /api/session', error);
//     res.sendStatus(500);
//   });
// });

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   console.log('in POST for session router')
//   console.log(req.body)

//   const insertSessionQuery = `
//         INSERT INTO "session"
//         ("session_date")
//         VALUES
//         ($1);
//   `;

//   const insertSessionValues = [req.body];
//   pool.query(insertSessionQuery, insertSessionValues)
//     .then(() => {res.sendStatus(201);})
//     .catch((err) => {
//         console.log('Error in POST session', err);
//         res.sendStatus(500);
//     });
// });

// module.exports = router;


// this works, i'm just going to try some stuff^^


















const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



/**GET route template for singular day*/  
router.get('/', (req, res) => {
  console.log("GET for session router, here's the req.params:", req.params);
  const queryText =
  `
  SELECT DISTINCT "exercise_id", "exercise_name", "session"."id", "session_date" FROM "session_details"
  JOIN "exercise" on "exercise"."id" = "session_details"."exercise_id"
  JOIN "session" on "session"."id" = "session_details"."session_id"
  WHERE "session_details"."session_id" = $1;
  `
    
    pool.query(queryText, [req.params]).then((result) => {
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
  console.log('POST for session router')
  console.log(req.body)

  const insertSessionQuery = `
        INSERT INTO "session"
        ("session_date", "user_id")
        VALUES
        ($1, $2);
  `;

  const insertSessionValues = [req.body, req.user.id];
  pool.query(insertSessionQuery, insertSessionValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
        console.log('Error in POST session', err);
        res.sendStatus(500);
    });
});

module.exports = router;

