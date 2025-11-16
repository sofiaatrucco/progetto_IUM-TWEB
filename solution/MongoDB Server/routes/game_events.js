var express = require('express');
var router = express.Router();
const controller= require("../controllers/game_events")

/* Define the route for inserting game events */
router.post('/insert_gameEvents', async (req, res) => {
    try {
        const results = await controller.insertGameEvents(req.body);
        res.json(results);
    } catch (error) {
        res.status(504).json({ error: error.errors });
    }
});

/* Define the route to get game events for a specific game */
router.get('/games_events', async (req, res) => {
    try {
        const gameId = req.query.game_id
        const events = await controller.getAllGameEventsByGameId(gameId);
        res.json(events);
    } catch (error) {
        console.error('game events data error:', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

module.exports = router;
