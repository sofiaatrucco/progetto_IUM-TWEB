const Model = require('../models/games'); // Import the 'games' model for database operations.

// Function to insert games data into the database.
function insertGames(body) {
    return new Promise((resolve, reject) => {
        const mongoObj = new Model(body); // Create a new document with the provided data.
        mongoObj.save() // Save the document to the database.
            .then(results => {
                resolve(results); // Resolve the promise with the saved results.
            })
            .catch(error => {
                reject(error); // Reject the promise with an error in case of failure.
            });
    });
}

// Function to get all distinct seasons for a specific competition.
function getAllSeasonsByCompetitionId(competitionId) {
    return new Promise((resolve, reject) => {
        Model.distinct('season', { competition_id: competitionId }) // Find distinct seasons for the specified competition.
            .then(results => {
                resolve(results); // Resolve the promise with the retrieved seasons.
            })
            .catch(error => {
                reject(error); // Reject the promise with an error in case of failure.
            });
    });
}

// Function to get all distinct dates for a specific competition and season.
function getAllDatesByCompetitionIdAndSeason(competitionId, season) {
    return new Promise((resolve, reject) => {
        Model.distinct('date', { competition_id: competitionId, season: season }) // Find distinct dates for the specified competition and season.
            .then(results => {
                resolve(results); // Resolve the promise with the retrieved dates.
            })
            .catch(error => {
                reject(error); // Reject the promise with an error in case of failure.
            });
    });
}

// Function to get all games for a specific competition, season, and date.
function getAllGamesByCompetitionIdSeasonAndDate(competitionId, season, date) {
    return new Promise((resolve, reject) => {
        Model.find({ competition_id: competitionId, season: season, date: date }, 'game_id home_club_name home_club_id aggregate away_club_name away_club_id') // Find games that match the specified criteria.
            .then(results => {
                resolve(results); // Resolve the promise with the retrieved games.
            })
            .catch(error => {
                console.error('Query error:', error); // Log an error message in case of a query error.
                reject(error); // Reject the promise with an error in case of failure.
            });
    });
}

// Function to get final positions of all clubs for a specific competition and season.
async function getFinalPositionsOfAllClubs(competitionId, season, limit) {
    let dates = await getAllDatesByCompetitionIdAndSeason(competitionId, season); // Get all distinct dates for the competition and season.
    let clubStats = {};

    for (let date of dates) {
        let games = await getAllGamesByCompetitionIdSeasonAndDate(competitionId, season, date); // Get games for each date.

        games.forEach(game => {
            // Extract goals scored by each team from the 'aggregate' field.
            const [homeGoals, awayGoals] = game.aggregate.split(':').map(Number);
            let homePoints = 0, awayPoints = 0;

            if (homeGoals > awayGoals) {
                homePoints = 3;
            } else if (homeGoals < awayGoals) {
                awayPoints = 3;
            } else {
                homePoints = 1;
                awayPoints = 1;
            }

            // Update points and statistics for the home club.
            if (!clubStats[game.home_club_id]) {
                clubStats[game.home_club_id] = { points: 0, clubName: game.home_club_name, goalsScored: 0, goalsConceded: 0 };
            }
            clubStats[game.home_club_id].points += homePoints;
            clubStats[game.home_club_id].goalsScored += homeGoals;
            clubStats[game.home_club_id].goalsConceded += awayGoals;

            // Update points and statistics for the away club.
            if (!clubStats[game.away_club_id]) {
                clubStats[game.away_club_id] = { points: 0, clubName: game.away_club_name, goalsScored: 0, goalsConceded: 0 };
            }
            clubStats[game.away_club_id].points += awayPoints;
            clubStats[game.away_club_id].goalsScored += awayGoals;
            clubStats[game.away_club_id].goalsConceded += homeGoals
        });
    }

    // Transform the club statistics into an array and sort by points.
    let sortedClubs = Object.entries(clubStats)
        .map(([clubId, data]) => {
            return {
                clubId,
                clubName: data.clubName,
                points: data.points,
                goalsScored: data.goalsScored,
                goalsConceded: data.goalsConceded,
            };
        })
        .sort((a, b) => b.points - a.points);

    // Assign positions based on points.
    sortedClubs.forEach((club, index) => {
        club.position = index + 1;
    });

    sortedClubs = sortedClubs.slice(0, limit); // Limit the number of clubs based on the provided limit.

    return sortedClubs; // Return the final positions of clubs.
}

module.exports = {
    insertGames,
    getAllSeasonsByCompetitionId,
    getAllDatesByCompetitionIdAndSeason,
    getAllGamesByCompetitionIdSeasonAndDate,
    getFinalPositionsOfAllClubs
};
