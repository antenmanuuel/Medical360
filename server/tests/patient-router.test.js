const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const Patient = require("../models/Patient");

jest.mock("../models/Patient");

const app = express();
app.use(bodyParser.json());

const patientRouter = require("../routes/patient-router");
app.use("/patients", patientRouter);

const cardiologyDepartmentId = "664126bfb3d01d8d875e2f11";  // Example ObjectId for Cardiology

// describe("POST /patients", () => {
//   it("should create a new patient and return 201 status", async () => {
//     Patient.mockImplementation(() => {
//       const save = jest.fn().mockResolvedValue({
//         patientName: "John Doe",
//         email: "johndoe@example.com",
//         phoneNumber: "1234567890",
//         healthInsurance: "HealthInsuranceProvider",
//         sex: "male",
//         age: "30",
//         patientStatus: "admitted",
//         roomNo: "101",
//         department: cardiologyDepartmentId
//       });
//       return { save };
//     });

//     const newPatientData = {
//       patientName: "John Doe",
//       email: "johndoe@example.com",
//       phoneNumber: "1234567890",
//       healthInsurance: "HealthInsuranceProvider",
//       sex: "male",
//       age: "30",
//       patientStatus: "admitted",
//       roomNo: "101",
//       department: cardiologyDepartmentId
//     };

//     const response = await request(app)
//       .post("/patients")
//       .send(newPatientData);

//     expect(response.statusCode).toBe(201);
//     expect(response.body.newPatient).toHaveProperty("patientName", "John Doe");
//     expect(response.body.newPatient).toHaveProperty("department", cardiologyDepartmentId);
//   });
// });

describe("PUT /patients/:id", () => {
  it("should update a patient and return 200 status", async () => {
    const patientId = "somepatientid";  // Example patient ID
    const updatedData = {
      phoneNumber: "9876543210"
    };


    Patient.findOneAndUpdate = jest.fn().mockResolvedValue({
      ...updatedData,
      patientName: "John Doe",
      email: "johndoe@example.com",
      healthInsurance: "HealthInsuranceProvider",
      sex: "male",
      age: "30",
      patientStatus: "admitted",
      roomNo: "101",
      department: cardiologyDepartmentId
    });

    const response = await request(app)
      .put(`/patients/${patientId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.patient).toHaveProperty("phoneNumber", "9876543210");
  });
});

describe("POST /patients/:id", () => {
    it("should retrieve a specific patient and return 200 status", async () => {
      const patientId = "specificpatientid";  // Example department ID
      Patient.findById = jest.fn().mockResolvedValue({
        patientName: "John Doe",
      email: "johndoe@example.com",
      healthInsurance: "HealthInsuranceProvider",
      sex: "male",
      age: "30",
      patientStatus: "admitted",
      roomNo: "101",
      });
  
      const response = await request(app)
        .post(`/patients/${patientId}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.patient).toHaveProperty("age", "30");
    });
  });

describe("DELETE /patients/:id", () => {
  it("should delete a patient and return 200 status", async () => {
    const patientId = "deletethispatientid";  // Example patient ID
    Patient.findByIdAndDelete = jest.fn().mockResolvedValue({
      patientName: "John Doe"
    });

    const response = await request(app)
      .delete(`/patients/${patientId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Deleted patient");
  });

});




