const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth-manager");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Process = require("../models/Process");
require("dotenv").config()

async function createPatient(req, res) {
  try {
    const newPatient = new Patient({
        patientName: req.body.patientName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        healthInsurance: req.body.healthInsurance,
        
        sex: req.body.sex,
        age: req.body.age,
      
        department: req.body.department, 
        patientStatus: req.body.patientStatus,
        roomNo: req.body.roomNo,
    });
    const savedPatient = await newPatient.save();
    const process = new Process({
      patient: savedPatient._id,
      patientName: savedPatient.patientName,
      startDate: Date.now()
    });
    const savedProcess = await process.save();
    savedPatient.process = savedProcess._id;
    await savedPatient.save();
    res.status(201).json({ newPatient: savedPatient });
  } catch (error) {
    res.status(400).json({ error: 'Error saving patient: ' + error });
  }
}

async function updatePatient(req, res) {
    try {
        // Construct the update object with $set operator
        let id = req.params.id;
        const updateObject = { $set: req.body };
    
        // Use findOneAndUpdate to update the patient document
        const updatedPatient = await Patient.findOneAndUpdate(
          { _id: id },
          updateObject,
          { new: true } // Return the updated document
        );
       console.log("Updated patient",updatedPatient)
        if (!updatedPatient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }
        res.status(200).json({
            patient: updatedPatient,
            message: "Updated patient"
        })
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

// Function to get a patient by their ID
async function getPatient(req, res) {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
          return res.status(404).json({
              message: "patient not found"
          });
      }
      res.status(200).json({
          patient
      });
    } catch (error) {
      res.status(500).json({
          message: error.message
      });
    }
  }
  
// Function to get all patients
async function getAllPatients(req, res) {
    try {
        const patients = await Patient.find();
            res.status(200).json({
                patients
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Function to delete a Patient by their ID
async function deletePatient(req, res) {
    try {
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) {
        return res.status(404).json({
          message: "patient not found",
        });
      }
      // now check if patient has doctor, get that doctor, and then delete reference
      // to patient inside the doctors patient list
      if (patient.doctorAssigned) {
        await Doctor.findByIdAndUpdate(patient.doctorAssigned, 
        {
          $pull: { patientList: patient._id }
        });
      }
      res.status(200).json({
        message: "Deleted patient",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



const PatientController = {
    createPatient,
    updatePatient,
    getAllPatients,
    getPatient,
    deletePatient
}

module.exports = PatientController