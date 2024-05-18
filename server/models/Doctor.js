const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientAssignedSchema = new Schema({
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

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departmentName: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  },
  surgeryCount: {
    type: Number,
    default: 0
  },
  appointmentNo: {
    type: Number,
    default: 0
  },
  hours: {
    type: Number,
    default: 0
  },
  experience: {
    type: String,
  },
  profileDetails: {
    focusAreas: [String],
    specialization: [String],
    biography:String,
  },
  schedule: [{
    day: String,
    start: Date,
    end: Date,
  }],
  // patientList: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Patient',
  // }],
  patientList: {type: [patientAssignedSchema], default: []},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;