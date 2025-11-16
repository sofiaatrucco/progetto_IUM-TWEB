const mongoose = require('mongoose');

// Define a new schema for the ClubGame model with various fields and validation rules.
const ClubGame = new mongoose.Schema(
    {
        game_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        club_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        own_goals: {type: Number, required: false, max: 15, validate: value => Number.isInteger(value) && value > 0, message: 'Number of goals must be a positive integer'},
        own_position: {type: Number, required: false, max: 100, validate: value => Number.isInteger(value) && value > 0, message: 'Position must be a positive integer'},
        own_manager_name: {type: String, required: true, max: 200},
        opponent_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        opponent_goals: {type: Number, required: false, max: 15, validate: value => Number.isInteger(value) && value > 0, message: 'Number of goals must be a positive integer'},
        opponent_position: {type: Number, required: false, max: 100, validate: value => Number.isInteger(value) && value > 0, message: 'Position must be a positive integer'},
        opponent_manager_name: {type: String, required: true, max: 200},
        hosting: {type: String, required: true, max: 100},
        is_win: {type: Number, required: false, validate: [validateBinary, 'Invalid binary value'] }
    }
);

// Checks if the value is an integer and either 0 or 1.
function validateBinary(value) {
    return Number.isInteger(value) && value === 0 || value === 1;
}

// Setting the virtual property.
ClubGame.set('toObject', {getters: true, virtuals: true});

// Exporting the model.
module.exports = mongoose.model('ClubGame', ClubGame);
