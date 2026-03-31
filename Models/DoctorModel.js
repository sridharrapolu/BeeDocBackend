const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: {
      type: String,
      enum: [
        'Cardiologist', 'Dermatologist', 'Neurologist',
        'Orthopedic', 'Pediatrician', 'Psychiatrist',
        'General Physician', 'ENT', 'Oncologist', 'Other'
      ],
      required: true
    },

    qualification: { type: String, required: true },

    availability: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Weekends Only', 'On-Call', 'Flexible'],
      required: true
    },

    currentHospital: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);