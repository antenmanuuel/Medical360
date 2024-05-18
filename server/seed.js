const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Chance = require("chance");
const chance = new Chance();
const User = require("./models/User");
const Doctor = require("./models/Doctor");
const Department = require("./models/Department");
const Patient = require("./models/Patient");
const Room = require("./models/Room");
const Equipment = require("./models/Equipment");
const Process = require("./models/Process");
const Event=require("./models/Event")
require("dotenv").config();

mongoose.connect(
   "mongodb+srv://medical360:admin123@medical360.wh0h2hw.mongodb.net/medical360",
  // "mongodb://127.0.0.1/medical360",
  {
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    const departments = ["Cardiology", "Spinal", "Plastic", "Oncology"];
    const focusAreas = [
      "Cardiovascular Health",
      "Pediatric Care",
      "Neurology",
      "Orthopedics",
      "Dermatology",
      "Emergency Medicine",
      "Oncology",
      "Geriatric Care"
  ];
  const specializations = [
    "Heart Surgery",
    "Childhood Vaccination",
    "Brain Surgery",
    "Joint Replacement",
    "Skin Care",
    "Trauma Handling",
    "Cancer Treatment",
    "Elderly Health Management"
];
const departmentImages = [
  'uploads/1713501063308.jpeg',
  'uploads/0f15da26e3350ed5a80c14aad307ee0b1714706553010.png',
  'uploads/c2214eed351287c24fed511db04b25ca1714705389299.jpeg'
];

const userImages = [
  'user_images/6e9a2ccf771b1453b865754dbe8934241715645972218.jpeg',
  'user_images/a9ecfdf770031305021ac7c442d320121715645773645.jpeg',
  'user_images/PatientImage.png'
];
    // Create admin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      phone_number: chance.phone(),
      passwordHash: await bcrypt.hash("admin@123", 10),
      isAdmin: true,
      image: chance.pickone(userImages)
    });
    await adminUser.save();

    // create doctor for head of departments
    let department_ids = [];
    for (let i = 0; i < departments.length; i++) {
      // create user that is head doctor
      const name = chance.name();
      const email = chance.email();
      const passwordHash = await bcrypt.hash("password@123", 10);
      const isAdmin = true;
      const user = new User({
        name,
        email,
        phone_number: chance.phone(),
        passwordHash,
        isAdmin,
        image: chance.pickone(userImages)
        ,
      });
      await user.save();
      const doctor = new Doctor({
        name: name,
        surgeryCount: chance.integer({min: 0, max: 1000}),
        appointmentNo: chance.integer({min: 1000, max: 9999}),
        hours: chance.integer({min: 20, max: 60}),
        experience: `${chance.integer({min: 1, max: 40})} years`,
        name: name,
        surgeryCount: chance.integer(),
        appointmentNo: chance.integer(),
        hours: chance.integer(),
        profileDetails: {
          focusAreas: [chance.pickone(focusAreas), 
            chance.pickone(focusAreas)],
          specialization: [chance.pickone(specializations), 
            chance.pickone(specializations)],
            biography: "Completed medical degree at a renowned university, further specialized during residency with emphasis on patient-centered care.",
        },
        schedule: [
          { day: "Monday", start: chance.date(), end: chance.date() },
          { day: "Tuesday", start: chance.date(), end: chance.date() },
        ],
        patientList: [],
        userId: user._id
        
      });
      
      await doctor.save();
      user.doctor = doctor._id;
      await user.save();

      const dep = new Department({
        departmentName: departments[i],
        head: doctor._id, // Head can be added later
        headModel: departments[i],
        doctorList:[],
        iconPath:chance.pickone(departmentImages),
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
    const events = [];
    for (let i = 0; i < 30; i++) {
      const name = chance.name();
      const departmentId = chance.pickone(department_ids); 
      const email = chance.email();
      const passwordHash = await bcrypt.hash("password@123", 10);
      const isAdmin = false;
      const user = new User({
        name,
        email,
        phone_number: chance.phone(),
        passwordHash,
        isAdmin,
        department:departmentId, // Set department reference
        image: chance.pickone(userImages)
      });
      const doctor = new Doctor({
        name: name,
        departmentName: departmentId,
        surgeryCount: chance.integer({min: 0, max: 1000}),
        appointmentNo: chance.integer({min: 1000, max: 9999}),
        hours: chance.integer({min: 20, max: 60}),
        experience: `${chance.integer({min: 1, max: 40})} years`,
        profileDetails: {
          focusAreas: [chance.pickone(focusAreas), 
            chance.pickone(focusAreas)],
          specialization: [chance.pickone(specializations), 
            chance.pickone(specializations)],
            biography: "Completed medical degree at a renowned university, further specialized during residency with emphasis on patient-centered care.",
        },
        schedule: [
          { day: "Monday", start: chance.date(), end: chance.date() },
          { day: "Tuesday", start: chance.date(), end: chance.date() },
        ],
        patientList: [],
        userId: null,
      });
      doctor.userId = user._id;

  // Assign the doctor to the user
  user.doctor = doctor._id;

  // Push the instances into their respective arrays
  users.push(user);
  doctors.push(doctor);
      const departmentDoc = await Department.findById(departmentId);
  if (departmentDoc) {
    departmentDoc.doctorList.push(doctor._id);
    await departmentDoc.save();
  }
  for (let j = 0; j < 25; j++) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + chance.integer({ min: 1, max: 30 }));
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + chance.integer({ min: 1, max: 4 }));

   
    const isAvailable = chance.bool(); 
    const title = isAvailable ? "Available" : "Unavailable";
    const status = isAvailable ? "available" : "unavailable";

    const event = new Event({
      title: title,
      start: startDate,
      end: endDate,
      status: status,
      user: user._id,
    });

    events.push(event);
}

  

    }
    
    await User.insertMany(users);
    await Doctor.insertMany(doctors);
    await Event.insertMany(events);

    const allEvents = await Event.find({ status: "available" });


    // populate users that are nurses
    const nurses = [];
    for (let i = 0; i < 5; i++) {
      const name = chance.name();
      const email = chance.email();
      const phone_number = chance.phone();

      const passwordHash = await bcrypt.hash("password@123", 10);
      const isAdmin = false;

      const nurse = new User({
        name,
        email,
        phone_number,
        passwordHash,
        isAdmin,
      });
      nurses.push(nurse);
    }

    await User.insertMany(nurses);

    // Populate patients
    const patients = [];
    let allDoctors = await Doctor.find();
    console.log(department_ids)
    for (let i = 0; i < 300; i++) {
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
          "under observation",
        ]),
        roomNo: chance.integer({ min: 100, max: 200 }),  
      });
  
      // add doctor to patients assigned doctor
      // let departmentDoctors = allDoctors.filter(doc => {
      //   return doc.departmentName.equals(patient.department);

      // });
      // if (departmentDoctors.length !== 0) {
      //   let doctor = chance.pickone(departmentDoctors);
      //   patient.doctorAssigned = doctor._id;
      //   doctor.patientList.push(patient._id);
      //   await doctor.save();
      // }

      // add process to patient
      const process = new Process({
        patient: patient._id,
        patientName: patient.patientName,
      });
      const savedProcess = await process.save();
      patient.process = savedProcess._id;

      const departmentEvents = allEvents.filter((event) => {
        const doctor = allDoctors.find((doc) => doc.userId.equals(event.user));
        return doctor && doctor.departmentName.equals(patient.department);
      });
      
      
      

      patients.push(patient);

      // add patient to doctors patients
    }
    await Patient.insertMany(patients);

    // Define room-equipment mapping
    const roomEquipmentMapping = {
      ICU: ["ECG Machine", "Ventilator", "Defibrillator"],
      General: ["Ultrasound", "X-Ray", "Blood Pressure Monitor"],
      Surgical: ["Anesthesia Machine", "Surgical Table", "Surgical Lights"],
      Maternity: ["Fetal Doppler", "Ultrasound", "Incubator"],
    };

    // Generate equipment
    const equipmentList = [];
    Object.entries(roomEquipmentMapping).forEach(
      ([roomType, equipmentTypes]) => {
        equipmentTypes.forEach((type) => {
          for (let i = 1; i < 5; i++) {
            // Create two of each type for diversity
            const equipment = new Equipment({
              equipmentName: `${type} ${i}`,
              equipmentType: type,
              quantity: chance.integer({ min: 1, max: 5 }),
              location: `${roomType} Storage`,
              maintenanceStatus: chance.pickone([
                "Operational",
                "Maintenance Required",
              ]),
            });
            equipmentList.push(equipment);
          }
        });
      }
    );

    await Equipment.insertMany(equipmentList);

    // Map typed equipment for room assignment
    const typedEquipment = {};
    Object.keys(roomEquipmentMapping).forEach((roomType) => {
      typedEquipment[roomType] = equipmentList
        .filter((eq) =>
          roomEquipmentMapping[roomType].includes(eq.equipmentType)
        )
        .map((eq) => eq._id);
    });

    // Create rooms, assigning equipment based on room type
    const roomNumbers = [...Array(20).keys()].map((i) => 100 + i);
    const rooms = roomNumbers.map((roomNumber) => {
      const roomType = chance.pickone([
        "ICU",
        "General",
        "Surgical",
        "Maternity",
      ]);
      return new Room({
        roomNumber,
        roomType,
        equipment: chance.pickset(
          typedEquipment[roomType],
          chance.integer({ min: 1, max: typedEquipment[roomType].length })
        ),
        availabilityStatus: chance.pickone(["Occupied", "Available"]),
      });
    });

    await Room.insertMany(rooms);

    console.log("Seeding completed");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    // Close connection
    db.close();
  }
});