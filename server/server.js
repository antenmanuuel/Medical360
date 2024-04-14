const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// Permissions-Policy header setup
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "geolocation=(), fullscreen=()");
  next();
});

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://medical360-d65d823d7d75.herokuapp.com",
    credentials: true,
  })
);
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

// Static files
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../client/dist")));

// SPA catch-all handler
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// Routes
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const patientRouter = require("./routes/patient-router");
const departmentRouter = require("./routes/department-router");

app.use("/patients", patientRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/departments", departmentRouter);

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
