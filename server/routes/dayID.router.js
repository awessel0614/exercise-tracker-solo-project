const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log("DAYID router GET");
    const queryText =
    `
        SELECT * FROM "session"
        ORDER BY "id" DESC
        LIMIT 1;
    `
      
      pool.query(queryText).then((result) => {
        console.log("this is result.rows:", result.rows)

        //add a funtion to check rows
        res.send(result.rows.length > 0 ? result.rows[0] : {});
    }).catch((error) => {
      console.log('Error in GET /api/session', error);
      res.sendStatus(500);
    });
  });




module.exports = router;
