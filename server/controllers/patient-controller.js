const User = require("../models/User");
const bcrypt = require("bcrypt");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
require("dotenv").config()

function createPatient(req, res) {
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

    newPatient.save()
        .then(patient => res.status(201).json(patient))
        .catch(error => res.status(400).json({ error: 'Error saving patient: ' + error }));
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