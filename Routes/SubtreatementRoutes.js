const express = require('express');
const subtreatementrouting = express.Router();
const SubModel = require('../Models/SubtreatementModel');

// ================= CREATE =================
subtreatementrouting.post('/subtreatments', async (req, res) => {
  try {
    const data = new SubModel(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// ================= GET (by treatmentId) =================
subtreatementrouting.get('/subtreatments/:treatmentId', async (req, res) => {
  try {
    const data = await SubModel.find({
      treatmentId: req.params.treatmentId
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================= UPDATE =================
subtreatementrouting.put('/subtreatments/:id', async (req, res) => {
  try {
    const data = await SubModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Subtreatment not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================= DELETE =================
subtreatementrouting.delete('/subtreatments/:id', async (req, res) => {
  try {
    const data = await SubModel.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Subtreatment not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = subtreatementrouting;