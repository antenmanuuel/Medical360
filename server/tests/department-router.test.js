const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const Department = require("../models/Department");
const multer = require("multer");

jest.mock("../models/Department");

const app = express();
app.use(bodyParser.json());

const departmentRouter = require("../routes/department-router");
app.use("/departments", departmentRouter);

describe("PUT /departments/:id", () => {
  it("should update a department and return 200 status", async () => {
    const departmentId = "somedepartmentid";  // Example department ID
    const updatedData = {
      departmentName: "Updated Cardiology"
    };

    Department.findOneAndUpdate = jest.fn().mockResolvedValue({
      ...updatedData,
      headModel: "Cardiology"
    });

    const response = await request(app)
      .put(`/departments/${departmentId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.department).toHaveProperty("departmentName", "Updated Cardiology");
    expect(response.body).toHaveProperty("message", "Updated department");
  });
});

// describe("GET /departments/:id", () => {
//   it("should retrieve a specific department and return 200 status", async () => {
//     const departmentId = "specificdepartmentid";  // Example department ID
//     Department.findById = jest.fn().mockResolvedValue({
//       departmentName: "Oncology",
//       headModel: "Oncology"
//     });

//     const response = await request(app)
//       .get(`/departments/${departmentId}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.departmment).toHaveProperty("departmentName", "Oncology");
//   });
// });

// describe("GET /departments/alldepartments", () => {
//   it("should retrieve all departments and return 200 status", async () => {
//     Department.find = jest.fn().mockResolvedValue([
//       {
//         departmentName: "Cardiology",
//         headModel: "Cardiology"
//       },
//       {
//         departmentName: "Spinal",
//         headModel: "Spinal"
//       }
//     ]);

//     const response = await request(app)
//       .get("/departments/alldepartments");

//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(2);
//     expect(response.body[0]).toHaveProperty("departmentName", "Cardiology");
//   });
// });

describe("DELETE /departments/:id", () => {
  it("should delete a department and return a success message", async () => {
    const departmentId = "deletedepartmentid";  // Example department ID
    Department.findOneAndDelete = jest.fn().mockResolvedValue({
      departmentName: "Spinal"
    });

    const response = await request(app)
      .delete(`/departments/${departmentId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Department deleted successfully!");
  });
});
