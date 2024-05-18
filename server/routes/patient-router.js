const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const PatientController = require('../controllers/patient-controller');

// POST route to create a new patient
router.post('/', PatientController.createPatient);

// PUT to update patient data by id
router.put('/:id', PatientController.updatePatient);

// GET route to get all patients
router.post("/all", PatientController.getAllPatients);

// GET route to get single patient by id
router.post("/:id", PatientController.getPatient);

// GET route to retrieve a specific patient by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Patient.findById(id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(patient);
        })
        .catch(error => res.status(500).json({ error: 'Error fetching patient: ' + error }));
});

router.delete("/:id", PatientController.deletePatient);

module.exports = router;