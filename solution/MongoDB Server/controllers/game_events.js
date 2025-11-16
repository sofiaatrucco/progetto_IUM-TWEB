const Model = require('../models/game_events'); // Import the 'game_events' model for database operations.

// Function to insert game events data into the database.
function insertGameEvents(body) {
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

// Function to get all game events for a specific game ID.
function getAllGameEventsByGameId(gameId) {
    return new Promise((resolve, reject) => {
        Model.find({ game_id: gameId }, 'club_id player_id type description minute') // Find game events that match the specified game ID.
            .then(results => {
                const sortedEvents = results.sort((a, b) => {
                    return a.minute - b.minute; // Sort events by minute in ascending order.
                });
                resolve(sortedEvents); // Resolve the promise with the sorted events.
            })
            .catch(error => {
                reject(error); // Reject the promise with an error in case of failure.
            });
    });
}

module.exports = {
    insertGameEvents,
    getAllGameEventsByGameId
};
