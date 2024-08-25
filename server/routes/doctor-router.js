const DoctorController = require("../controllers/doctor-controller");
const express = require("express");

const router = express.Router();


// update user by id
router.put("/:id", DoctorController.updateDoctor);

// create doctor
router.post("/create", DoctorController.createDoctor);

// get all doctors route
router.post('/all', DoctorController.getAllDoctors)

//get doctor by id
router.post("/:id", DoctorController.getDoctor);

router.post("/users/:id", DoctorController.getDoctorByUser);




module.exports = router