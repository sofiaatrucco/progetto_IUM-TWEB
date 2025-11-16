var express = require('express');
var router = express.Router();
var axios = require('axios');
const {join} = require("path");

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(join(__dirname, '../public/html', 'homepage.html'));
});

var springBootBaseUrl = 'http://localhost:8080/postgres';

/* GET countries data from Spring Boot server. */
router.get('/get_countries', function(req, res) {
    axios.get(`${springBootBaseUrl}/countries`)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET competitions data from Spring Boot server. */
router.get('/get_competitions', function(req, res) {
    const country = req.query.country;

    axios.get(`${springBootBaseUrl}/competitions`, {
        params: { country: country }
    })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Server error');
        });
});

/* GET competitions images from Spring Boot server */
router.get('/get_competitions_images', function(req, res) {
    const competitionId = req.query.competition_id;

    axios.get(`${springBootBaseUrl}/competitions_images`, {
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

module.exports = router;

