const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moodSchema = new Schema ({
    moodss: {
        type: Number,
        required: true
    },
    sleep : {
        type: Number,
        required: true
    },
    stress : {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood;
