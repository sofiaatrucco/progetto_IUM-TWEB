var express = require('express');
var router = express.Router();
const controller= require("../controllers/appearances")

/* Define the route for inserting player appearances */
router.post('/insert_appearances', async (req, res) => {
    try {
        const results = await controller.insertAppearances(req.body);
        res.json(results);
    } catch (error) {
        res.status(504).json({ error: error.errors });
    }
});

/* Define the route to get player statistics */
router.get('/players_stats', async (req, res) => {
    try {
        const playerId = req.query.player_id;
        const stats = await controller.getAllStatsByPlayerId(playerId);
        res.json(stats);
    }
    catch(error) {
        console.error('player stats data error');
        res.status(500).json({error: error});
    }
});

module.exports = router;
