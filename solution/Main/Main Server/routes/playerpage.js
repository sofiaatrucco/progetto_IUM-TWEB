var express = require('express');
var router = express.Router();
var axios = require('axios');

var springBootBaseUrl = 'http://localhost:8080/postgres';
var mongodbServerBaseUrl = 'http://localhost:3001/mongo';

/* GET players infos from Spring Boot server. */
router.get('/get_players_infos', function(req, res) {
    const playerId = req.query.player_id;

    axios.get(`${springBootBaseUrl}/players_infos`, {
        params: { player_id: playerId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET players images from Spring Boot server. */
router.get('/get_players_images', function(req, res) {
    const playerId = req.query.player_id;

    axios.get(`${springBootBaseUrl}/players_images`, {
        params: { player_id: playerId }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET players stats from Express server. */
router.get('/get_players_stats', function(req, res) {
    const playerId = req.query.player_id;

    axios.get(`${mongodbServerBaseUrl}/players_stats`, {
        params: { player_id: playerId }
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


