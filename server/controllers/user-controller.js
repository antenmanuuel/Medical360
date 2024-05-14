const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth-manager");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
require("dotenv").config();

// Function to get a user by their ID
async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    //   .select("-passwordHash -_id -__v -isAdmin -doctor") // Exclude specified fields
    //   .populate("department", "departmentName -_id"); // Populate departmentName

    // // Transform users to use just the departmentName
    // const transformedUsers = users.map((user) => ({
    //   name: user.name,
    //   email: user.email,
    //   department: user.department ? user.department.departmentName : "No Department Assigned",
    //   phone_number: user.phone_number,
    // }));

    res.status(200).json({
      users
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
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
        message: "User not found",
      });
    }

    res.status(200).json({
      user: updatedUser,
      message: "Updated user",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to delete a user by their ID
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Deleted User",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function uploadUserImage(req, res) {
  if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      // Update the user profile with the URL/path of the new image
      const relativeImagePath = `user_images/${req.file.filename}`;
      user.image = relativeImagePath; 
      console.log('File path:', req.file.path); // Full path where the file is saved
    console.log('File name:', req.file.filename);
      await user.save();

      res.status(200).json({
          message: 'Image uploaded successfully',
          imagePath: relativeImagePath
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const UserController = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  uploadUserImage,
};

module.exports = UserController;
