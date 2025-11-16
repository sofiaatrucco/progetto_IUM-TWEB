var express = require('express');
var router = express.Router();
const controller= require("../controllers/club_games")

/* Define the route for inserting club games */
router.post('/insert_clubGames', async (req, res) => {
    try {
        const results = await controller.insertClubGames(req.body);
        res.json(results);
    } catch (error) {
        res.status(504).json({ error: error.errors });
    }
});

/* Define the route to get club games */
router.get('/club_games', async (req, res) => {
    try {
        const games = await controller.getAllClubGames();
        res.json(games);
    } catch (error) {
        console.error('club games data error', error);
        res.status(500).json({error: 'Server internal error'});
    }
});

module.exports = router;
