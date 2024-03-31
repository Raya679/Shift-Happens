const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema ({
    grateful: {
        type: String,
        required: true
    },
    feelings : {
        type: String,
        required: true
    },
    memorableMoments : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id:  {
        type: String,
        required: true
    }
}, { timestamps: true })

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;
