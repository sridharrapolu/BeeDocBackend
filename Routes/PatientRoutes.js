const express = require("express");
const patientRouting = express.Router();
const bcrypt = require("bcrypt");
const Patient = require("../Models/PatientModel");
// REGISTER PATIENT
patientRouting.post("/register", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    // check existing
    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Patient already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const patient = new Patient({
      name,
      mobile,
      email,
      password: hashedPassword,
    });

    await patient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = patientRouting;