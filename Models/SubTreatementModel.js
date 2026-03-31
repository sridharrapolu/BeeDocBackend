const mongoose = require('mongoose');

const subtreatmentSchema = new mongoose.Schema(
  {
    // 🔗 Reference to Treatment (RELATION)
    treatmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "treatements", // must match your Treatment model name
      required: true
    },

    // 🏷 SubTreatment Name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // 📝 Description
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true // ✅ adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("subtreatements", subtreatmentSchema);