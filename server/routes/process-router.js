const express = require('express');
const router = express.Router();
const ProcessController = require('../controllers/process-controller'); 

// POST route to create a new process
router.post('/', ProcessController.createProcess);


// PUT to add procedure to specific process id
router.put('/add-procedure/:id', ProcessController.addProcedure);

// PUT to update procedure in process data by id
router.put('/update-procedure/:processId/:procedureId', ProcessController.updateProcedure);

// PUT to update process data by id
router.put('/:id', ProcessController.updateProcess);

// GET route to get all processs
router.post('/all', ProcessController.getAllProcesses);

// GET route to get single process by id
router.post('/:id', ProcessController.getProcess);

// DELETE route to delete a specific process by ID
router.delete('/:id', ProcessController.deleteProcess);

// DELETE route to delete a specific procedure by ID from process by Id
router.delete('/:processId/:procedureId', ProcessController.deleteProcedure);

module.exports = router;