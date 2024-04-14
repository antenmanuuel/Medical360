const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth-manager");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");
require("dotenv").config();

async function loggedIn(req, res) {
  if (!req.session.userId) {
    return res.status(200).json({
      loggedIn: false,
      user: null,
      department: null,
      doctor: null,
      isAdmin: false,
    });
  }

  try {
    const user = await User.findById(req.session.userId).select(
      "-passwordHash"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let departmentDetails = null,
      doctorDetails = null;

    if (user.department) {
      departmentDetails = await Department.findById(user.department)
        .select("departmentName iconPath")
        .populate({
          path: "head",
          select: "name -_id",
          model: "Doctor", // Ensure this matches your schema
        });
    }

    if (user.doctor) {
      doctorDetails = await Doctor.findById(user.doctor)
        .select(
          "departmentName surgeryCount appointmentNo hours profileDetails"
        )
        .populate("departmentName", "departmentName -_id");
    }

    return res.status(200).json({
      loggedIn: true,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      department: departmentDetails,
      doctor: doctorDetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res
        .status(401)
        .json({ message: "Wrong email or password provided." });
    }

    // Setting the user ID in session
    req.session.userId = user._id;
    res.status(200).json({
      message: "Logged in successfully",
      user: {
        name: user.name,
        isAdmin: user.isAdmin,
        departmentName: user.department ? user.department.departmentName : null,
        isDoctor: Boolean(user.doctor),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Could not log out, please try again." });
    }
    res.status(200).send("Logged out successfully");
  });
}

async function register(req, res) {
  const { name, email, password, departmentName, phone_number } = req.body;

  try {
    // Check if the email already exists
    const emailExists = await User.findOne({ email }).exec();
    if (emailExists) {
      res.status(409).send("An account with that email already exists.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Initialize default values for isAdmin and doctor
    const isAdmin = false; // Always false unless specified otherwise
    const doctor = null; // Always null unless a specific doctor ObjectId is provided

    // Find the department's ObjectId using the departmentName
    let departmentId = null;
    if (departmentName) {
      const departmentDoc = await Department.findOne({ departmentName }).exec();
      if (!departmentDoc) {
        res.status(400).send("Invalid department name provided.");
        return;
      }
      departmentId = departmentDoc._id;
    }

    // Create a new user with the hashed password and other details
    const user = new User({
      name,
      email,
      passwordHash: hashedPassword,
      department: departmentId, // Set the ObjectId of the department or null
      phone_number,
      isAdmin, // Set to false by default
      doctor, // Set to null by default
    });

    // Save the user
    await user.save();
    res.status(200).send("User successfully registered.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error occurred. Please try again.");
  }
}

async function resetPassword(req, res) {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, the password has been reset.",
      });
    }

    const saltRounds = 10;
    user.passwordHash = await bcrypt.hash(newPassword, saltRounds);
    await user.save();

    res.status(200).json({ message: "Password has been successfully reset." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const AuthController = {
  loggedIn,
  login,
  register,
  logout,
  resetPassword,
};

module.exports = AuthController;
