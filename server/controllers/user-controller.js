const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth-manager");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
require("dotenv").config()

// Function to get a user by their ID
async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.status(200).json({
        user
    });
  } catch (error) {
    res.status(500).json({
        message: error.message
    });
  }
}

// Function to get all users
async function getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
          users
      });
    } catch (error) {
      res.status(500).json({
          message: error.message
      });
    }
  }

// Function to update a user by their ID
async function updateUser(req, res) {

    try {
        // Construct the update object with $set operator
        let id = req.params.id;
        const updateObject = { $set: req.body };
    
        // Use findOneAndUpdate to update the user document
        const updatedUser = await User.findOneAndUpdate(
          { _id: id },
          updateObject,
          { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.status(200).json({
            user: updatedUser,
            message: "Updated user"
        })
      } catch (error) {
        res.status(500).json({message: error.message});
      }
  }
  
  // Function to delete a user by their ID
  async function deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
      }
      res.status(200).json({
        message: "Deleted User"
      });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  }

const UserController =  {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}

module.exports = UserController