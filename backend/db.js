const mongoose = require('mongoose');

// Update the MongoDB connection URL for your local setup tM5qGL*@Ur46vU%
// const mongoURL = 'mongodb://localhost:27017/jayesh'; 
var mongoURL = "mongodb+srv://kanno:kanno@cluster0.73pm4lw.mongodb.net/jayesh?retryWrites=true&w=majority"
// var mongoURL = "mongodb+srv://manoj:kumar@cluster0.ih09tiq.mongodb.net/travels";
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Mongo DB connection failed');
});

connection.on('connected', () => {
    console.log('Mongo DB connection successful!');
});

module.exports = mongoose;
