const mongoose = require('mongoose');

// Define a new schema for the Game model with various fields and validation rules.
const Game = new mongoose.Schema(
    {
        game_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        competition_id: {type: String, required: true},
        season: {type: Number, required: true,validate: [validateSeason, 'Invalid season value'] },
        round: {type: String, required: true, max: 100},
        date: {type: String, required: true},
        home_club_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        away_club_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        home_club_goals: {type: Number, required: false, max: 15, validate: value => Number.isInteger(value) && value > 0, message: 'Number of goals must be a positive integer'},
        away_club_goals: {type: Number, required: false, max: 15, validate: value => Number.isInteger(value) && value > 0, message: 'Number of goals must be a positive integer'},
        home_club_position: {type: Number, required: false, max: 100, validate: value => Number.isInteger(value) && value > 0, message: 'Position must be a positive integer'},
        away_club_position: {type: Number, required: false, max: 100, validate: value => Number.isInteger(value) && value > 0, message: 'Position must be a positive integer'},
        home_club_manager_name: {type: String, required: true, max: 200},
        away_club_manager_name: {type: String, required: true, max: 200},
        stadium: {type: String, required: true, max: 100},
        attendance: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'Attendance must be a positive integer'},
        referee: {type: String, required: true, max: 200},
        url: {type: String, required: true, max: 700},
        home_club_formation: {type: String, required: false, max: 200},
        away_club_formation: {type: String, required: false, max: 200},
        home_club_name: {type: String, required: true, max: 200},
        away_club_name: {type: String, required: true, max: 200},
        aggregate: {type: String, required: true, max: 200},
        competition_type: {type: String, required: true, max: 200},
    }
);

// Custom validator for the 'season' field to ensure the value is a valid year.
function validateSeason(value) {
    const currentYear = new Date().getFullYear();
    return value > 0 && value < currentYear;
}

// Setting the virtual property.
Game.set('toObject', {getters: true, virtuals: true});

// Exporting the model.
module.exports = mongoose.model('Game', Game);
