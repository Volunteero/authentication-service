require('dotenv').config();
const User = require('../src/models/user');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB);
User.collection.remove();
User.find({}, (e, d) => {
    mongoose.disconnect();
});