const Model = require('../models/appearances'); // Import the 'appearances' model for database operations.

// Function to insert appearance data into the database.
function insertAppearances(body) {
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

// Function to get all stats for a player based on their player ID.
function getAllStatsByPlayerId(playerId) {
    return new Promise((resolve, reject) => {
        const numericPlayerId = Number(playerId); // Convert the player ID to a numeric value.
        Model.aggregate([
            {
                $match: {
                    player_id: numericPlayerId // Match documents with the specified player ID.
                }
            },
            {
                $group: {
                    _id: '$player_id', // Group the results by player ID.
                    total_yellow_cards: { $sum: '$yellow_cards' }, // Calculate the total yellow cards.
                    total_red_cards: { $sum: '$red_cards' }, // Calculate the total red cards.
                    total_goals: { $sum: '$goals' }, // Calculate the total goals.
                    total_assists: { $sum: '$assists' }, // Calculate the total assists.
                    total_minutes_played: { $sum: '$minutes_played' } // Calculate the total minutes played.
                }
            }
        ])
            .then(results => {
                resolve(results); // Resolve the promise with the aggregated results.
            })
            .catch(error => {
                console.error('Query error:', error);
                reject(error); // Reject the promise with an error in case of failure.
            });
    });
}

module.exports = {
    insertAppearances,
    getAllStatsByPlayerId
};
