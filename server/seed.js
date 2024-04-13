const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Chance = require("chance");
const chance = new Chance();
const User = require("./models/User");
const Doctor = require("./models/Doctor");
const Department = require("./models/Department");
const Patient = require("./models/Patient");

require("dotenv").config();

const mongoURI = "mongodb+srv://medical360:admin123@medical360.wh0h2hw.mongodb.net/medical360";

mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    const departments = ["Cardiology", "Spinal", "Plastic", "Oncology"];
    // Create admin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      passwordHash: await bcrypt.hash("admin123", 10),
      isAdmin: true,
    });
    await adminUser.save();

    // create doctor for head of departments
    let department_ids = [];
    for (let i = 0; i < departments.length; i++) {
      // create user that is head doctor
      const doctor = new Doctor({
        surgeryCount: chance.integer(),
        appointmentNo: chance.integer(),
        hours: chance.integer(),
        profileDetails: {
          focusAreas: [chance.word(), chance.word()],
          specialization: [chance.word(), chance.word()],
        },
        schedule: [
          { day: "Monday", start: chance.date(), end: chance.date() },
          { day: "Tuesday", start: chance.date(), end: chance.date() },
        ],
        patientList: [],
      });

      await doctor.save();

      const name = chance.name();
      const email = chance.email();
      const passwordHash = await bcrypt.hash("password123", 10);
      const isAdmin = true;

      const user = new User({
        name,
        email,
        passwordHash,
        isAdmin,
        doctor: doctor._id,
      });

      await user.save();

      const dep = new Department({
        departmentName: departments[i],
        head: doctor._id, // Head can be added later
        headModel: departments[i],
      });

      await dep.save();

      department_ids.push(dep._id);

      // update user and doctor with department
      await User.findOneAndUpdate({ _id: user._id }, { department: dep._id });

      await Doctor.findOneAndUpdate(
        { _id: doctor._id },
        { departmentName: dep._id }
      );
    }

    // Populate users that are doctors and not heads
    const users = [];
    const doctors = [];
    for (let i = 0; i < 5; i++) {
      const doctor = new Doctor({
        departmentName: chance.pickone(department_ids),
        surgeryCount: chance.integer(),
        appointmentNo: chance.integer(),
        hours: chance.integer(),
        profileDetails: {
          focusAreas: [chance.word(), chance.word()],
          specialization: [chance.word(), chance.word()],
        },
        schedule: [
          { day: "Monday", start: chance.date(), end: chance.date() },
          { day: "Tuesday", start: chance.date(), end: chance.date() },
        ],
        patientList: [],
      });

      const name = chance.name();
      const email = chance.email();
      const passwordHash = await bcrypt.hash("password123", 10);
      const isAdmin = false;
      const department = chance.pickone(department_ids); // assign to doctor

      const user = new User({
        name,
        email,
        passwordHash,
        isAdmin,
        department, // Set department reference
        doctor: doctor._id,
      });
      doctors.push(doctor);
      users.push(user);
    }

    await User.insertMany(users);
    await Doctor.insertMany(doctors);

    // populate users that are nurses
    const nurses = [];
    for (let i = 0; i < 5; i++) {
      const name = chance.name();
      const email = chance.email();
      const passwordHash = await bcrypt.hash("password123", 10);
      const isAdmin = false;

      const nurse = new User({
        name,
        email,
        passwordHash,
        isAdmin,
      });
      nurses.push(nurse);
    }

    await User.insertMany(nurses);

    // Populate patients
    const patients = [];
    let allDoctors = await Doctor.find();
    for (let i = 0; i < 10; i++) {
      let doctor = chance.pickone(allDoctors);

      const patient = new Patient({
        patientName: chance.name(),
        email: chance.email(),
        phoneNumber: chance.phone(),
        healthInsurance: chance.word(),
        visitNo: chance.integer(),
        sex: chance.pickone(["male", "female", "other"]),
        age: chance.integer({ min: 18, max: 100 }),
        department: chance.pickone(department_ids),
        patientStatus: chance.pickone([
          "admitted",
          "discharged",
          "under observation",
        ]),
        roomNo: chance.integer({ min: 100, max: 200 }),
      });
      patients.push(patient);

      // add patient to doctors patients
      doctor.patientList.push(patient._id);
      await doctor.save();
    }
    await Patient.insertMany(patients);

    console.log("Seeding completed");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    // Close connection
    db.close();
  }
});
