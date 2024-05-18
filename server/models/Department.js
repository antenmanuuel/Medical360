const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true
     },
     head: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required: false,
    },
    headModel: {
        type: String,
        required: false,
        enum: ['Cardiology', 'Spinal', "Plastic", "Oncology"] // Add other possible departments here if needed
    },

    doctorList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
    iconPath: {
        type: String,  // Path to the stored image file
        required: false
    },

})

const Department = mongoose.model('Department',departmentSchema)
module.exports = Department;