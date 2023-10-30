const mongoose = require('mongoose');

// Define a schema for the 'locations' collection
const locationSchema = new mongoose.Schema({
  lname: {
    type: String,
    required: true,
  },
  lreviews: {
    type: Number,
    required: true,
  },
  lphonenumber: {
    type: String,
    required: true,
  },
  llocated: {
    type: String,
    required: true,
  },
  limageurls: [
    {
      type: String,
      required: true,
    },
  ],
});

// Create a model for the 'locations' collection using the schema
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
