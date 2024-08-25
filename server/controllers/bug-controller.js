const Bug = require("../models/Bug");

function createBug(req, res) {
  const newBug = new Bug({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    bug: req.body.bug,
  });

  newBug
    .save()
    .then((bug) => res.status(201).json(bug))
    .catch((error) =>
      res.status(400).json({ error: "Error reporting bug: " + error })
    );
}

async function getAllBugs(req, res) {
  try {
    const bugList = await Bug.find();
    res.status(200).json({ bugList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBug(req, res) {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res.status(200).json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function resolveBug(req, res) {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id,
      {
        status: "Resolved",
        resolvedDate: new Date(),
      },
      { new: true }
    );
    if (!updatedBug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function markInProgress(req, res) {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id,
      {
        status: "In Progress",
      },
      { new: true }
    );
    if (!updatedBug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const BugController = {
  createBug,
  getAllBugs,
  getBug,
  resolveBug,
  markInProgress,
};

module.exports = BugController;
