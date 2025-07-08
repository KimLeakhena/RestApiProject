const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); // Add currency type
const Currency = mongoose.Types.Currency;


// Subdocument: Comment schema
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Main Document: Dish schema
const dishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    category: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    comments: [commentSchema] // embed array of comments
}, {
    timestamps: true // adds createdAt & updatedAt to dishes
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
