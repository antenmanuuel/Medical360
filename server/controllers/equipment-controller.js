const Equipment = require("../models/Equipment");
function createEquipment(req, res) {
  const newEquipment = new Equipment({
    equipmentName: req.body.equipmentName,
    equipmentType: req.body.equipmentType,
    quantity: req.body.quantity,
    location: req.body.location,
    maintenanceStatus: req.body.maintenanceStatus,
  });

  newEquipment
    .save()
    .then((equipment) => res.status(201).json(equipment))
    .catch((error) =>
      res.status(400).json({ error: "Error saving equipment: " + error })
    );
}

async function updateEquipment(req, res) {
  try {
    let id = req.params.id;
    const updateObject = { $set: req.body };

    const updatedEquipment = await Equipment.findOneAndUpdate(
      { _id: id },
      updateObject,
      { new: true }
    );
    if (!updatedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res
      .status(200)
      .json({ equipment: updatedEquipment, message: "Updated equipment" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllEquipment(req, res) {
  try {
    const equipmentList = await Equipment.find();
    res.status(200).json({equipmentList});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEquipment(req, res) {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json({equipment});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteEquipment(req, res) {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json({ message: "Deleted equipment" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const EquipmentController = {
  createEquipment,
  updateEquipment,
  getAllEquipment,
  getEquipment,
  deleteEquipment,
};

module.exports = EquipmentController;
