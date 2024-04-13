const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

// config .env files
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true, // For sending cookies over CORS
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'interest-cohort=()');
  next();
});


// Serve static files (Make sure this is before your catch-all route if you are using React Router)
app.use(express.static(path.join(__dirname, "../client/dist")));

// // Catch-all handler for SPA (Make sure the path is correctly formatted)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// set up routers
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const patientRouter = require("./routes/patient-router");
const departmentRouter = require("./routes/department-router");

app.use("/patients", patientRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/departments", departmentRouter);

const mongoURI = process.env.MONGODB_URI;

// Connect to the database
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((e) => console.error("Connection error", e.message));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Run the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
