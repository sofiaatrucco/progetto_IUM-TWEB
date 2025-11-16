var express = require('express');
var router = express.Router();
var axios = require('axios');

var springBootBaseUrl = 'http://localhost:8080/postgres';

/* GET players data from Spring Boot server. */
router.get('/get_players', function(req, res) {
    const clubId = req.query.club_id;

    axios.get(`${springBootBaseUrl}/players`, {
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

/* GET clubs infos from Spring Boot server. */
router.get('/get_clubs_infos', function(req, res) {
    const clubId = req.query.club_id;

    axios.get(`${springBootBaseUrl}/clubs_infos`, {
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

module.exports = router;

