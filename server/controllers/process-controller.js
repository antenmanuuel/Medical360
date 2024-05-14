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
            patient: patientId,
            startDate
        });
        const patient = await Patient.findById(patientId);
        newProcess.patientName = patient.patientName;
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

        console.log(procedure);

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

async function updateProcedure(req, res) {
  try {
      // Find the process by its ID
      const { processId, procedureId } = req.params;
      const update = req.body;
      const process = await Process.findById(processId);

      // Find the index of the procedure in the procedures array
      const procedureIndex = process.procedures.findIndex(procedure => procedure._id.toString() === procedureId);

      if (procedureIndex === -1) {
          throw new Error('Procedure not found');
      }

      // Update the procedure with the provided update object
      process.procedures[procedureIndex] = { ...process.procedures[procedureIndex], ...update };

      // Save the updated process
      await process.save();

      res.status(200).json({ process, message: "Updated room" });
  } catch (error) {
      console.error('Error updating procedure:', error);
      throw error; // Re-throw the error for handling by the caller
  }
}


async function deleteProcedure(req, res) {
  try {
      const { processId, procedureId } = req.params;
      const process = await Process.findById(processId);

      if (!process)
          return res.status(404).json({ message: "Process not found"});

      // delete procedure from process
      process.procedures = process.procedures.filter(procedure => {
        return !procedure._id.equals(procedureId);
      });

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
    res.status(200).json(process);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Deletes process object, and then removes reference from patient
async function deleteProcess(req, res) {
  try {
    const processId = req.params.id;
    // Delete the room after updating equipment quantities
    const deletedProcess = await Process.findByIdAndDelete(processId);

    if (!deletedProcess) {
      return res.status(404).json({ message: "process not found" });
    }
    
    // update the patient
    const patient = await Patient.findById(deletedProcess.patient);

    if (!patient) {
      return res.status(404).json({ message: "patient connected to process not found" });
    }

    patient.process = null;

    await patient.save();

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
  addProcedure,
  deleteProcedure,
  updateProcedure
};

module.exports = ProcessController;