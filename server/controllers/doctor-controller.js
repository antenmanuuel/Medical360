const Department = require('../models/Department');
const Doctor = require('../models/Doctor')

async function updateDoctor(req, res) {
    try {
      // Construct the update object with $set operator
      let id = req.params.id;
      const updateObject = { $set: req.body };
  
      // Use findOneAndUpdate to update the user document
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { _id: id },
        updateObject,
        { new: true } // Return the updated document
      );
     console.log("Updated doctor",updateDoctor);
      if (!updatedDoctor) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      res.status(200).json({
        doctor: updatedDoctor,
        message: "Updated doctor",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Function to get a doctor by their ID
async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find()

    res.status(200).json({
      doctors
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
}

async function createDoctor(req, res) {
  const { name, department } = req.body;
  console.log(name, department);

  try {

    // Find the department's ObjectId using the departmentName
    let departmentId = null;
    if (department) {
      const departmentDoc = await Department.findOne({ departmentName: department });
      if (!departmentDoc) {
        res.status(400).send("Invalid department name provided.");
        return;
      }
      departmentId = departmentDoc._id;
    }

    // Create a new user with the hashed password and other details
    const doctor = new Doctor({
      name,
      departmentName: departmentId
    });

    // Save the user
    await doctor.save();
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}
async function getDoctorByUser(req, res) {
  try {
      console.log("me yahi par hu");
      const doctor = await Doctor.findById(req.params.id).populate('userId');
      console.log("Kysa doctor hu",doctor.userId);
      if (!doctor) {
          return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json({
         userId: doctor.userId 
      });
  } catch (error) {
      res.status(500).json({
          message: error.message,
      });
  }
}


  const DoctorController = {
    updateDoctor,
    getDoctor,
    getAllDoctors,
    createDoctor,
    getDoctorByUser,
  }

  module.exports = DoctorController;