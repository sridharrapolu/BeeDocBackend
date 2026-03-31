const express = require("express");
const RegisteredadminRouting = express.Router();
const Admin = require("../Models/RegisteredAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../Middleware/AuthMiddleware");
//  CREATE ADMIN
RegisteredadminRouting.post("/admin", async (req, res) => {
  try {
    const { fullName, email, password, role, status } = req.body;

    // check existing
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      role,
      status,
    });
    await admin.save();
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//  LOGIN ADMIN
RegisteredadminRouting.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// gET ALL (PROTECTED)
// ==========================
RegisteredadminRouting.get("/admin", authMiddleware, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  UPDATE ADMIN
RegisteredadminRouting.put("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await Admin.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//  DELETE ADMIN
RegisteredadminRouting.delete(
  "/admin/:id",
  authMiddleware,
  async (req, res) => {
    try {
      await Admin.findByIdAndDelete(req.params.id);
      res.json({ message: "Admin deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = RegisteredadminRouting;