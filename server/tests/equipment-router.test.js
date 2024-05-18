const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const Equipment = require("../models/Equipment"); 
const equipmentRouter = require("../routes/equipment-router");

// Mock the Equipment model
jest.mock("../models/Equipment");

// Setup Express app
const app = express();
app.use(bodyParser.json());
app.use("/equipments", equipmentRouter);

describe("DELETE /equipments/:id", () => {
    it("should delete a hospital equipment item when it exists", async () => {
      // Mock findByIdAndDelete to simulate existing hospital equipment
      Equipment.findByIdAndDelete.mockResolvedValue({
        _id: "1",
        equipmentName: "Ultrasound Machine",
      });
  
      const response = await request(app)
        .delete("/equipments/1")
        .expect(200);
  
      expect(response.body.message).toBe("Deleted equipment");
      expect(Equipment.findByIdAndDelete).toHaveBeenCalledWith("1");
    });
  
    it("should return a 404 error when the hospital equipment does not exist", async () => {
      // Mock findByIdAndDelete to simulate non-existing hospital equipment
      Equipment.findByIdAndDelete.mockResolvedValue(null);
  
      const response = await request(app)
        .delete("/equipments/1")
        .expect(404);
  
      expect(response.body.message).toBe("Equipment not found");
      expect(Equipment.findByIdAndDelete).toHaveBeenCalledWith("1");
    });
  
    it("should handle database errors during the deletion of hospital equipment", async () => {
      const errorMessage = "Database error";
      Equipment.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));
  
      const response = await request(app)
        .delete("/equipments/1")
        .expect(500);
  
      expect(response.body.message).toBe(errorMessage);
    });
  });
  

describe("POST /equipments", () => {
  it("should successfully create new hospital equipment and return 201 status", async () => {
    // Mock the save function to simulate successful save of hospital equipment
    const mockEquipmentData = {
      equipmentName: "X-Ray Machine",
      equipmentType: "Diagnostic Imaging",
      quantity: 2,
      location: "Radiology Department",
      maintenanceStatus: "Operational",
    };

    Equipment.prototype.save = jest.fn().mockResolvedValue(mockEquipmentData);

    const response = await request(app)
      .post("/equipments")
      .send(mockEquipmentData)
      .expect(201);

    expect(response.body).toEqual(mockEquipmentData);
    expect(Equipment.prototype.save).toHaveBeenCalled();
  });

  it("should return 400 status when there is an error saving the equipment", async () => {
    // Mock the save function to simulate a failure in saving equipment
    Equipment.prototype.save = jest
      .fn()
      .mockRejectedValue(new Error("Error saving equipment"));

    const response = await request(app)
      .post("/equipments")
      .send({
        equipmentName: "MRI Scanner",
        equipmentType: "Diagnostic Imaging",
        quantity: 1,
        location: "Imaging Center",
        maintenanceStatus: "Maintenance Required",
      })
      .expect(400);

    expect(response.body.error).toContain("Error saving equipment");
    expect(Equipment.prototype.save).toHaveBeenCalled();
  });
});
