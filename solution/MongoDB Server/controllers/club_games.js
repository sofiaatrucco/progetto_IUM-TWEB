const Model = require('../models/club_games'); // Import the 'club_games' model for database operations.

// Function to insert club games data into the database.
function insertClubGames(body) {
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

// Function to get all club games based on a specified query.
function getAllClubGames(body, limit = 25) {
    return new Promise((resolve, reject) => {
        Model.find(body) // Find club games that match the specified query.
            .limit(limit) // Limit the number of results to the specified limit.
            .then(results => {
                results.forEach((clubGame) => {
                    clubGame._id = null; // Remove the _id field from each result.
                });
                resolve(results); // Resolve the promise with the results.
            })
            .catch(error => {
                reject(error); // Reject the promise with an error in case of failure.
            });

    });
}

module.exports = {
    insertClubGames,
    getAllClubGames
};
