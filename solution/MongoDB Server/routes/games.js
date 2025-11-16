var express = require('express');
var router = express.Router();
const controller = require("../controllers/games");

/* Define the route for inserting game data */
router.post('/insert_games', async (req, res) => {
    try {
        const results = await controller.insertGames(req.body);
        res.json(results);
    } catch (error) {
        res.status(504).json({ error: error.errors });
    }
});

/* Define the route to get seasons for a specific competition */
router.get('/seasons', async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Extracting the competition ID from the request.
        const seasons = await controller.getAllSeasonsByCompetitionId(competitionId); // Calling the controller to get seasons for the specified competition.
        res.json(seasons); // Sending the seasons as a JSON response.
    } catch (error) {
        console.error('seasons data error', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

/* Define the route to get dates for a specific competition and season */
router.get('/dates', async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Extracting the competition ID from the request.
        const season = req.query.season; // Extracting the season from the request.
        const dates = await controller.getAllDatesByCompetitionIdAndSeason(competitionId, season); // Calling the controller to get dates for the specified competition and season.
        res.json(dates); // Sending the dates as a JSON response.
    } catch (error) {
        console.error('dates data error', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

/* Define the route to get games for a specific competition, season, and date */
router.get('/games', async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Extracting the competition ID from the request
        const season = req.query.season; // Extracting the season from the request
        const date = req.query.date; // Extracting the date from the request
        const games = await controller.getAllGamesByCompetitionIdSeasonAndDate(competitionId, season, date); // Calling the controller to get games for the specified competition, season, and date
        res.json(games); // Sending the games as a JSON response.
    } catch (error) {
        console.error('games data error', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

/* Define the route to get final positions of all clubs for a specific competition and season */
router.get('/final_positions', async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Extracting the competition ID from the request
        const season = req.query.season; // Extracting the season from the request
        const limit = req.query.limit || 10; // Extracting the limit (default value: 10) from the request
        const positions = await controller.getFinalPositionsOfAllClubs(competitionId, season, limit); // Calling the controller to get final positions of all clubs for the specified competition and season
        res.json({ positions }); // Sending the positions as a JSON response.
    } catch (error) {
        console.error('Final positions error', error);
        res.status(500).json({ error: 'Server internal error' });
    }
});

module.exports = router;
