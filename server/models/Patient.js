const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientSchema = new Schema({
    patientName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    healthInsurance: { type: String, required: true },
    visitNo: { type: Number },
    sex: { type: String, required: true, enum: ['male', 'female', 'other'] },
    age: { type: String, required: true },
    process: { type: Schema.Types.ObjectId, ref: "Process", default: null},
    department: {
                type: Schema.Types.ObjectId,
                ref: 'Department',
                default: null   
        },
    patientStatus: { type: String, required: true, enum: ['admitted', 'discharged', 'under observation'] },
    roomNo: {type: String},
    doctorAssigned: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        default: null
    },
    assignedTime: { type: String },
    eventId: { type: String },
    fileData: [{ type: String }]
})

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;