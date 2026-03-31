const express = require("express");
const DoctorRoutes = express.Router();
const bcrypt = require("bcrypt"); // ✅ correct import
const Doctor = require("../Models/DoctorModel");

// ==========================
// 🔷 REGISTER DOCTOR
// ==========================
DoctorRoutes.post("/doctorregister", async (req, res) => {
  try {
    const data = req.body;
    // 🔍 check existing email
    const existing = await Doctor.findOne({ email: data.email });
    if (existing) {
      return res.status(400).json({ message: "Doctor already exists" });
    }
    // 🔐 hash password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const doctor = new Doctor(data);
    await doctor.save();

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// 🔷 GET ALL DOCTORS
// ==========================
DoctorRoutes.get("/doctors", async (req, res) => {
  try {
    // 🔥 hide password
    const doctors = await Doctor.find().select("-password");

    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE doctor
DoctorRoutes.put("/doctors/:id", async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE doctor
DoctorRoutes.delete("/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//  DOCTOR LOGIN
DoctorRoutes.post("/doctorlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.json({
      message: "Login successful",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = DoctorRoutes;    