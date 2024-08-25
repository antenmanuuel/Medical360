const mongoose = require("mongoose");

// Define the equipment schema
const equipmentSchema = new mongoose.Schema(
  {
    equipmentName: {
      type: String,
      required: [true, "Equipment name is required"],
      trim: true,
    },
    equipmentType: {
      type: String,
      required: [true, "Equipment type is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    location: {
      type: String,
      required: [true, "Storage location is required"],
      trim: true,
    },
    maintenanceStatus: {
      type: String,
      required: [true, "Maintenance status is required"],
      enum: ["Operational", "Maintenance Required"],
      default: "Operational",
    },
  },
  { collection: "equipments" }
);

// Create a model based on the schema
const Equipment = mongoose.model("Equipment", equipmentSchema);

// Export the model
module.exports = Equipment;
