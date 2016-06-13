"use strict";
const mongoose  = require("mongoose");

mongoose.connect('mongodb://localhost:27017/testvirtuo', function(err) {
    if (err) throw err;
});

const vehicleSchema = new mongoose.Schema ({
  "plate": { type: String, required: true, trim: true },
  "mileage": Number,
  "fuel": Number,
  "gps": {
    "latitude": Number,
    "longitude": Number
  },
  "capture_at":  { type: Date, default: Date.now }
});
module.exports = mongoose.model('vehicle',vehicleSchema,'vehicle');