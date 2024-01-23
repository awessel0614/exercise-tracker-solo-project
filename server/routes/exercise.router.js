const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('GET /api/exercise');
    pool.query('SELECT * from "exercise";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/exercise', error)
        res.sendStatus(500);
    });
});



module.exports = router;
