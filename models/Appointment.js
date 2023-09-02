const mongoose = require("mongoose");


const Appointment = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {collection: "Appointment"});

module.exports = mongoose.model("Appointment", Appointment);
