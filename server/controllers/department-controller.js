const Department = require("../models/Department");
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const path=require('path');
async function createDepartment(req, res) {
  const newDepartment = new Department({
      departmentName: req.body.Name,
      iconPath: req.file ? `uploads/${req.file.filename}` : null
      
      
  });
  try {
    const savedDepartment = await newDepartment.save();
    console.log("saved department",savedDepartment);
    res.status(201).json({ newDepartment: savedDepartment });
  } catch (error) {
    res.status(400).json({ error: 'Error saving department: ' + error });
  }
}
async function updateDepartment(req, res) {
    try {
        // Construct the update object with $set operator
        let id = req.params.id;
        const updateObject = { $set: req.body };
    
        // Use findOneAndUpdate to update the department document
        const updatedDepartment = await Department.findOneAndUpdate(
          { _id: id },
          updateObject,
          { new: true } // Return the updated document
        );

        if (!updatedDepartment) {
            return res.status(404).json({
                message: "department not found"
            });
        }
        
        res.status(200).json({
            department: updatedDepartment,
            message: "Updated department"
        })
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

// Function to get a department by their ID
async function getDepartment(req, res) {
    try {
      const department = await Department.findById(req.params.id).populate('head')
      .populate('doctorList');
      if (!department) {
          return res.status(404).json({
              message: "departmment not found"
          });
      }
      res.status(200).json({
          department
      });
    } catch (error) {
      res.status(500).json({
          message: error.message
      });
    }
  }
  
  // Function to get all departmments
  async function getAllDepartments(req, res) {
      try {
        const departments = await Department.find();
        res.status(200).json({
            departments: departments
        });
      } catch (error) {
        res.status(500).json({
            message: error.message
        });
      }
    }

const DepartmentController = {
    getDepartment,
    createDepartment,
    getAllDepartments,
    updateDepartment
}

module.exports = DepartmentController