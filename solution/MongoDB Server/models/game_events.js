const mongoose = require('mongoose');

// Define a new schema for the GameEvent model with various fields and validation rules.
const GameEvent = new mongoose.Schema(
    {
        game_event_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        date: {type: String, required: true},
        game_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        minute: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'Minute must be a positive integer'},
        type: {type: String, required: true, max:100 },
        club_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'Squad size must be a positive integer'},
        player_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'Average age must be a positive integer'},
        description: {type: String, required: true, max: 500},
        player_in_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'Squad size must be a positive integer'},
        player_assist_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'Average age must be a positive integer'}
    }
);

// Setting the virtual property.
GameEvent.set('toObject', {getters: true, virtuals: true});

// Exporting the model.
module.exports = mongoose.model('GameEvent', GameEvent);
