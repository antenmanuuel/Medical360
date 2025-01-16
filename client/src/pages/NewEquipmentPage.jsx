import React, { useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const NewEquipmentPage = () => {
  const navigate = useNavigate();
  const { BASE_URL } = useGlobalContext();
  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentType: "",
    quantity: "",
    location: "",
    maintenanceStatus: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    axios
      .post(`${BASE_URL}/equipments`, formData)
      .then((response) => {
        console.log("Equipment created:", response.data);
        navigate("/all-equipments");
      })
      .catch((error) => {
        console.error("There was an error creating the equipment:", error);
        setFormErrors({ submit: "Error submitting form. Please try again." });
      });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.equipmentName)
      errors.equipmentName = "Equipment name is required.";
    if (!formData.equipmentType)
      errors.equipmentType = "Equipment type is required.";
    if (
      !formData.quantity ||
      isNaN(formData.quantity) ||
      formData.quantity <= 0
    )
      errors.quantity = "Quantity must be a positive number greater than 0.";
    if (!formData.location) errors.location = "Location is required.";
    if (!formData.maintenanceStatus)
      errors.maintenanceStatus = "Maintenance status is required.";
    return errors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Banner */}
      <Banner goBackPath="/all-equipments" />

      {/* Form Container */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            New Equipment Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Equipment Name */}
            <div className="mb-6">
              <label
                htmlFor="equipmentName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Equipment Name
              </label>
              <input
                type="text"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.equipmentName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.equipmentName}
                </p>
              )}
            </div>

            {/* Equipment Type */}
            <div className="mb-6">
              <label
                htmlFor="equipmentType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Equipment Type
              </label>
              <input
                type="text"
                name="equipmentType"
                value={formData.equipmentType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.equipmentType && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.equipmentType}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
                min="1"
              />
              {formErrors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.quantity}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.location}
                </p>
              )}
            </div>

            {/* Maintenance Status */}
            <div className="mb-6">
              <label
                htmlFor="maintenanceStatus"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Maintenance Status
              </label>
              <select
                name="maintenanceStatus"
                value={formData.maintenanceStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="">Select Status</option>
                <option value="Operational">Operational</option>
                <option value="Maintenance Required">
                  Maintenance Required
                </option>
              </select>
              {formErrors.maintenanceStatus && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.maintenanceStatus}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:ring focus:ring-blue-300"
              >
                Create Equipment
              </button>
            </div>
            {formErrors.submit && (
              <p className="text-red-500 text-sm text-center mt-3">
                {formErrors.submit}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEquipmentPage;
