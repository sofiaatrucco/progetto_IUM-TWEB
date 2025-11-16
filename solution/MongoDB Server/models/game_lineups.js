const mongoose = require('mongoose');

// Define a new schema for the GameLineups with various fields and validation rules.
const GameLineups = new mongoose.Schema(
    {
        game_lineups_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        game_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        club_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        type: {type: String, required: false, max: 100},
        number: {type: Number, required: false, max: 15, validate: value => Number.isInteger(value) && value > 0, message: 'Number must be a positive integer'},
        player_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        player_name: {type: String, required: false, max: 200},
        team_captain: {type: Number, required: false, validate: [validateBinary, 'Invalid binary value'] },
        position: {type: String, required: false, max: 100}
    }
);

// Checks if the value is an integer and either 0 or 1.
function validateBinary(value) {
    return Number.isInteger(value) && value === 0 || value === 1;
}

// Setting the virtual property.
GameLineups.set('toObject', {getters: true, virtuals: true});

// Exporting the model.
module.exports = mongoose.model('GameLineups', GameLineups);
