const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Leader = mongoose.model('Leader', leaderSchema);

module.exports = Leader;
