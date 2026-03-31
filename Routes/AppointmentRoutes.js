const express = require("express");
const appointmentrouting = express.Router();
const Appointment = require("../Models/AppointmentModel");

// GET all appointments
appointmentrouting.get("/appointments", async (req, res) => {
  try {
    const data = await Appointment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
appointmentrouting.post("/appointments", async (req, res) => {
  try {
    const newData = new Appointment(req.body);
    await newData.save();
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
appointmentrouting.put("/appointments/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
appointmentrouting.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = appointmentrouting;