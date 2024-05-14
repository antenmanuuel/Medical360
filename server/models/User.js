const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
  phone_number: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    default: null,
  },
  // approvalStatus: {
  //   type: String,
  //   default: "pending",
  // },
  notifications: {
    type: [{
        title: {type: String, required: true},
        message: {type: String, required: true},
        date: {type: Date, required: true, default: Date.now()},
        read: {type: Boolean, required: true, default: false},
        patient: {type: Schema.Types.ObjectId, ref: "Patient", default: null}
    }],
    default: []
  },
  image: { 
    type: String,
    default: '' 
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
