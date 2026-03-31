const express = require("express");
const treatemetrouitng = express.Router();
const TreatementModel = require("../Models/TreatementModel");
const upload = require("../Middleware/upload");
const cloudinary = require("../config/cloudinary");

// GET
treatemetrouitng.get("/treatement", async (req, res) => {
  try {
    const data = await TreatementModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE (WITH IMAGE)
treatemetrouitng.post(
  "/treatement",
  upload.single("image"),
  async (req, res) => {
    try {
      let imageData = {};

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "treatments"
        });

        imageData = {
          url: result.secure_url,
          public_id: result.public_id
        };
      }

      const treatements = new TreatementModel({
        ...req.body,
        image: imageData
      });

      const saved = await treatements.save();

      res.send({
        message: "treatement added successfully",
        data: saved
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// DELETE (WITH IMAGE DELETE)
treatemetrouitng.delete("/treatement/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const treatment = await TreatementModel.findById(id);

    if (treatment?.image?.public_id) {
      await cloudinary.uploader.destroy(treatment.image.public_id);
    }

    await TreatementModel.findByIdAndDelete(id);

    res.send({ message: "treatement deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// UPDATE (WITH IMAGE REPLACE)
treatemetrouitng.put(
  "/treatement/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      let updatedData = { ...req.body };

      const existing = await TreatementModel.findById(id);

      // If new image uploaded
      if (req.file) {
        // delete old image
        if (existing?.image?.public_id) {
          await cloudinary.uploader.destroy(existing.image.public_id);
        }

        // upload new image
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "treatments"
        });

        updatedData.image = {
          url: result.secure_url,
          public_id: result.public_id
        };
      }

      const updated = await TreatementModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      res.send({
        message: "treatement updated successfully",
        data: updated
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

module.exports = treatemetrouitng;