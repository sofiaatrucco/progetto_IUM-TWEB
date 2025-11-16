var express = require('express');
var router = express.Router();
const controller= require("../controllers/game_lineups")

/* Define the route for inserting game lineups */
router.post('/insert_gameLineups', async (req, res) => {
    try {
        const results = await controller.insertGameLineups(req.body);
        res.json(results);
    } catch (error) {
        res.status(504).json({ error: error.errors });
    }
});

/* Define the route to get game lineups */
router.get('/game_lineups', async (req, res) => {
    try {
        const games = await controller.getAllGameLineups();
        res.json(games);
    } catch (error) {
        console.error('game lineups data error:', error);
        res.status(500).json({error: 'Server internal error'});
    }
});

module.exports = router;
