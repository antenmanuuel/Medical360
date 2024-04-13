const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth-manager");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");
require("dotenv").config();

// is user logged in currently
async function loggedIn(req, res) {
  // method : GET
  // route : /auth/loggedIn
  try {
    // find user in database using JWT
    let userId = auth.userVerify(req);

    // if user DNE or token expired return null user
    if (!userId)
      return res.status(200).json({
        loggedIn: false,
        user: null,
        department: null,
        isDoctor: false,
        isAdmin: false,
      });

    // else find user and return it
    const user = await User.findById(userId);
    let departmentId = null;
    if (user.department)
      departmentId = await Department.findById(user.department);

    return res.status(200).json({
      loggedIn: true,
      user: user,
      department: departmentId ? departmentId.departmentName : null,
      isDoctor: user.doctor !== null,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function login(req, res) {
  // method : POST
  // route : /auth/register

  try {
    // check fields are provided
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "Please enter all required fields.",
      });

    // find user by email. If none exists send status of 401 with wrong fields provided
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({
        message: "Wrong email or password provided.",
      });

    let id = user._id;

    // check password matches
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect)
      return res.status(401).json({
        message: "Wrong email or password provided.",
      });

    // login the user by signing a token and sending it in a cookie
    // then send status of 200 with user info
    let token = auth.tokenSign(id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .status(200)
      .json({
        user: user,
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

function logout(req, res) {
  // method : GET
  // route : /auth/logout

  // send cookie with token = "" and expires as soon as it gets there
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
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
