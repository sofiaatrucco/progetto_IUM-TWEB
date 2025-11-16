const mongoose = require('mongoose');

// Define a new schema for the Appearance model with various fields and validation rules.
const Appearance = new mongoose.Schema(
    {
        appearance_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        game_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        player_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        date: {type: String, required: true},
        player_name: {type: String, required: true, max: 200},
        competition_id: {type: Number, required: true, validate: value => Number.isInteger(value) && value > 0, message: 'ID must be a positive integer'},
        yellow_cards: {type: Number, required: false, validate: value => Number.isInteger(value) && value > 0, message: 'Number of yellow cards must be a positive integer'},
        red_cards: {type: Number, required: false, validate: value => Number.isInteger(value) && value > 0, message: 'Number of red cards must be a positive integer'},
        goals: {type: Number, required: false, validate: value => Number.isInteger(value) && value > 0, message: 'Number of goals must be a positive integer'},
        assists: {type: Number, required: false, validate: value => Number.isInteger(value) && value > 0, message: 'Number of assists must be a positive integer'},
        minutes_played: {type: Number, required: false, validate: value => Number.isInteger(value) && value > 0, message: 'Number of minutes played must be a positive integer'}
    }
);

// Setting the virtual property.
Appearance.set('toObject', {getters: true, virtuals: true});

// Exporting the model.
module.exports = mongoose.model('Appearance', Appearance);
