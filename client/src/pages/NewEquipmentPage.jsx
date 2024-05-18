import React, { useState, useContext } from "react";
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
  const [formErrors, setFormErrors] = useState(false);

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
    <>
      <Banner goBackPath={"/all-equipments"} />
      <div className="flex justify-center">
        <form className="w-full max-w-lg p-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-semibold mb-4">
            New Equipment Form
          </h2>

          {/* Equipment Name Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="equipmentName"
            >
              Equipment Name
            </label>
            <input
              type="text"
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.equipmentName && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.equipmentName}
              </p>
            )}
          </div>

          {/* Equipment Type Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="equipmentType"
            >
              Equipment Type
            </label>
            <input
              type="text"
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.equipmentType && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.equipmentType}
              </p>
            )}
          </div>

          {/* Quantity Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
            />
            {formErrors.quantity && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.quantity}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.location && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.location}
              </p>
            )}
          </div>

          {/* Maintenance Status Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="maintenanceStatus"
            >
              Maintenance Status
            </label>
            <select
              name="maintenanceStatus"
              value={formData.maintenanceStatus}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Status</option>
              <option value="Operational">Operational</option>
              <option value="Maintenance Required">Maintenance Required</option>
            </select>
            {formErrors.maintenanceStatus && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.maintenanceStatus}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Equipment
            </button>
          </div>
          {formErrors && (
            <p className="text-red-500 text-s italic mt-3">
              Error submitting form. Please try again.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default NewEquipmentPage;
