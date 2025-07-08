const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
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

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
