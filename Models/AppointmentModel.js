const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String },
  specialization: { type: String },
  treatment: { type: String },
  hospital: { type: String },

  patientName: { type: String },
  mobile: { type: String },
  email: { type: String },
  date: { type: String },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);