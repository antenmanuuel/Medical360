const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const registerSocketServer = require('./socket'); 
const http = require('http');

// config .env files
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(
  cors({

    //origin: "http://localhost:5173", // Ensure the client's address is correctly listed
    origin: "https://medical360-d65d823d7d75.herokuapp.com" ,
    credentials: true, // For sending cookies over CORS
  })
);
app.use(express.json());
app.use(cookieParser());


// app.use("/uploads", express.static("uploads"));

// app.use("/user_images", express.static("user_images"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user_images", express.static(path.join(__dirname, "user_images")));

app.use(express.static(path.join(__dirname, "../client/dist")));

// // // Catch-all handler for SPA (Make sure the path is correctly formatted)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// set up routers
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const patientRouter = require("./routes/patient-router");
const departmentRouter = require("./routes/department-router");
const roomRouter = require("./routes/room-router");
const equipmentRouter = require("./routes/equipment-router");
const doctorRouter = require("./routes/doctor-router");
const feedbackRouter = require("./routes/feedback-router");
const bugRouter = require("./routes/bug-router");
const chatRouter = require("./routes/chat-router");
const messageRouter = require("./routes/message-router");
const eventRouter=require("./routes/event-router");
const processRouter = require("./routes/process-router");



app.use("/patients", patientRouter);
app.use("/doctors", doctorRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/departments", departmentRouter);
app.use("/rooms", roomRouter);
app.use("/equipments", equipmentRouter);
app.use("/feedbacks", feedbackRouter);
app.use("/bugs", bugRouter);

app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/events", eventRouter);
app.use("/process", processRouter);




// Connect to the database
mongoose
  .connect(
    "mongodb+srv://medical360:admin123@medical360.wh0h2hw.mongodb.net/medical360",
    //  "mongodb://127.0.0.1/medical360",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Database"))
  .catch((e) => console.error("Connection error", e.message));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const server = http.createServer(app);
const io = registerSocketServer(server);
server.listen(PORT, () => console.log(`Server with sockets running on port ${PORT}`));