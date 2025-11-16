var express = require('express');
var router = express.Router();
var axios = require('axios');

var springBootBaseUrl = 'http://localhost:8080/postgres';
var mongodbServerBaseUrl = 'http://localhost:3001/mongo';

/* GET clubs from Spring Boot server. */
router.get('/get_clubs', function(req, res) {
    const competitionId = req.query.competition_id;

    axios.get(`${springBootBaseUrl}/clubs`, {
        params: { competition_id : competitionId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET games' seasons from Express Server */
router.get('/get_seasons', function(req, res) {
    const competitionId = req.query.competition_id;

    axios.get(`${mongodbServerBaseUrl}/seasons`, {
        params: {competition_id: competitionId}
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET games' dates from Express Server */
router.get('/get_dates', function(req, res) {
    const season = req.query.season;
    const competitionId = req.query.competition_id

    axios.get(`${mongodbServerBaseUrl}/dates`, {
        params: { competition_id: competitionId, season: season }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET games from Express Server */
router.get('/get_games', function(req, res) {
    const competitionId = req.query.competition_id;
    const season = req.query.season;
    const date = req.query.date;

    axios.get(`${mongodbServerBaseUrl}/games`, {
        params: { competition_id: competitionId, season: season, date: date }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET games events from Express Server */
router.get('/get_games_events', function(req, res) {
    const gameId = req.query.game_id;

    axios.get(`${mongodbServerBaseUrl}/games_events`, {
        params: { game_id: gameId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET clubs images from Spring Boot server. */
router.get('/get_clubs_images', function(req, res) {
    const clubId = req.query.club_id;

    axios.get(`${springBootBaseUrl}/clubs_images`, {
        params: { club_id: clubId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET competitions infos from Spring Boot server. */
router.get('/get_competitions_infos', function(req, res) {
    const competitionId = req.query.competition_id;

    axios.get(`${springBootBaseUrl}/competitions_infos`, {
        params: { competition_id: competitionId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET number of clubs in a competition from Spring Boot server. */
router.get('/count_clubs', function(req, res) {
    const competitionId = req.query.competition_id;

    axios.get(`${springBootBaseUrl}/count_clubs`, {
        params: { competition_id: competitionId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET club's final positions from Express Server */
router.get('/get_final_clubs_positions', function(req, res) {
    const competitionId = req.query.competition_id;
    const season = req.query.season;
    //const clubIds = req.query.club_ids;

    axios.get(`${mongodbServerBaseUrl}/final_positions`, {
        params: { competition_id: competitionId, season: season }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

module.exports = router;
