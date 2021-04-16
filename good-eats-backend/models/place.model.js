const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    lat:{type: Number, required: true},
    lng:{type: Number, required: true},
    name:{type: String, required: true},
    addr:{type: String, required: true},
    hours:{type: Object, required: false},
    phone:{type: String, required: false},
    website:{type: String, required: false},
    isVeggie:{type: Boolean, required: false},
    description:{type: String, required: false}
});

const Exercise = mongoose.model('Place', placeSchema);

module.exports = Exercise;