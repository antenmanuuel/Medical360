const Process = require("../models/Process"); 
const mongoose = require('mongoose');
const Equipment=require("../models/Equipment");
const Patient = require("../models/Patient");

// initializeds a process with a given patient and start data
// sends back process with no procedures
async function createProcess(req, res) {
    const { patientId, startDate } = req.body;

    try {
        // Create and save the new process
        const newProcess = new Process({
            patientId,
            startDate
        });
        const patient = await Patient.findById(patientId);
        const process = await newProcess.save();

        // add process to patient object and save
        patient.process = process;
        await patient.save();

        // add the process to patient
        res.status(201).json(process);
    } catch (error) {
        res.status(400).json({ error: "Error: " + error.message });
    }
}

// updates process information
// NOTE: DO NOT USE THIS TO ADD PROCEDURES
async function updateProcess(req, res) {
  try {
    let id = req.params.id;
    const updateObject = { $set: req.body };

    const updatedProcess = await Process.findOneAndUpdate({ _id: id }, updateObject, {
      new: true,
    });
    if (!updatedProcess) {
      return res.status(404).json({ message: "process not found" });
    }
    res.status(200).json({ process: updatedProcess, message: "Updated room" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// adds procedure to the process ID provided in route
async function addProcedure(req, res) {
    try {
        const procedure = req.body;
        const process = await Process.findById(req.params.id)

        if (!process)
            return res.status(404).json({ message: "Process not found"});

        // add procedure to process
        process.procedures.push(procedure);

        // save process
        await process.save();
        res.status(200).json(process);
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAllProcesses(req, res) {
  try {
    const processes = await Process.find();
    res.status(200).json({processes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProcess(req, res) {
  try {
    const process = await Process.findById(req.params.id);
    if (!process) {
      return res.status(404).json({ message: "process not found" });
    }
    res.status(200).json({process});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Deletes process object, and then removes reference from patient
async function deleteProcess(req, res) {
  try {
    const processId = req.params.id;
    // Delete the room after updating equipment quantities
    await Process.findByIdAndDelete(processId);
    
    // update the patient

    res.status(200).json({ message: "Deleted process" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const ProcessController = {
  createProcess,
  updateProcess,
  getAllProcesses,
  getProcess,
  deleteProcess,
  addProcedure
};

module.exports = ProcessController;