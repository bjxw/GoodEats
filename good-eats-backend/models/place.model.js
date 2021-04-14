const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name:{type: String, required: true},
    addr:{type: String, required: true},
    hours:{type: Map, required: false},
    phone:{type: String, required: false},
    website:{type: String, required: false},
    isVeggie:{type: Boolean, required: false}
});

const Exercise = mongoose.model('Place', placeSchema);

module.exports = Exercise;