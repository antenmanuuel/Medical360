const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  bug: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open",
  },
  resolvedDate: {
    type: Date,
    default: null,
  },
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
