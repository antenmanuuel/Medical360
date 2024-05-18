const mongoose = require('mongoose');

const { Schema } = mongoose;

const processSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    patientName: {type: String, required: true},
    startDate: {type: Date, required: true, default: Date.now()},
    endDate: Date,
    procedures: {
        type: [{
            department: {type: Schema.Types.ObjectId, ref: "Department", required: true},
            doctor: {type: Schema.Types.ObjectId, ref: "Doctor", required: true},
            roomNo: {type: String, required: true},
            equipment: {type: [Schema.Types.ObjectId], ref: "Equipment", required: true, default: []},
            start: {type: Date, required: true, default: Date.now()},
            end: {type: Date, required: true, default: Date.now()},
            operation: String,
            notes: {type: String, required: true},
            completed: {type: Boolean, default: false}
        }],
        default: []
    },
    completed: {type: Boolean, default: false}

})

const Process = mongoose.model('Process', processSchema);
module.exports = Process;