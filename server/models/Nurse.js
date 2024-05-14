const mongoose = require('mongoose');

const { Schema } = mongoose;

const nurseAssignedSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
  assignedTime: {
    type: String,
  },
  eventId: {
    type: Schema.Types.ObjectId
  }
}, { _id: false }); 

const nurseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departmentName: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  },
  shiftHours: {
    type: Number,
    default: 0
  },
  experience: {
    type: String,
  },
  profileDetails: {
    focusAreas: [String],
    specialization: [String],
    biography: String,
  },
  schedule: [{
    day: String,
    start: Date,
    end: Date,
  }],
  patientList: { type: [nurseAssignedSchema], default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;
