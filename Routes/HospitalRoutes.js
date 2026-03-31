const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Hospital = require("../Models/HospitalsModel");
// upload fields: logo (1), images (multiple)
router.post(
  "/add",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { name, address, description } = req.body;
      const logo = req.files["logo"]?.[0]?.path || "";
      const images = req.files["images"]?.map(file => file.path) || [];
      const hospital = new Hospital({
        name,
        address,
        description,
        logo,
        images,
      });

      await hospital.save();

      res.json({ success: true, hospital });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.get("/", async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
});
router.delete("/:id", async (req, res) => {
  await Hospital.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
module.exports = router;