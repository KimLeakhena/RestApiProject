require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
