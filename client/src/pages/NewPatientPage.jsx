import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const NewPatientPage = () => {
  const navigate = useNavigate();
  const { departments, getAllDepartments, createPatient } = useGlobalContext();
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phoneNumber: "",
    healthInsurance: "",
    sex: "",
    age: "",
    patientStatus: "",
    roomNo: "",
    department: "",
  });
  const [formErrors, setFormErrors] = useState(false);

  useEffect(() => {
    async function fetchDepartments() {
      if (!departments) {
        await getAllDepartments();
      }
    }
    fetchDepartments();
  }, [departments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors for a specific field when it is modified
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await createPatient(formData);
      console.log("Patient created!");
      navigate("/all-patients");
    } catch (error) {
      console.error("There was an error creating the patient:", error);
      setFormErrors({ submit: "Error submitting form. Please try again." });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    const ageRegex = /^\d+$/;
    const roomNumberRegex = /^\d{1,3}$/;

    if (!formData.patientName) errors.patientName = "Patient name is required.";
    if (!formData.email || !emailRegex.test(formData.email))
      errors.email = "Enter a valid email address.";
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber))
      errors.phoneNumber = "Phone number must be in the format (xxx) xxx-xxxx.";

    if (!formData.healthInsurance)
      errors.healthInsurance = "Health insurance is required.";
    if (!formData.sex) errors.sex = "Sex selection is required.";
    if (
      !formData.age ||
      !ageRegex.test(formData.age) ||
      formData.age < 0 ||
      formData.age > 120
    )
      errors.age = "Enter a valid age.";
    if (!formData.patientStatus)
      errors.patientStatus = "Patient status is required.";
    if (formData.roomNo && !roomNumberRegex.test(formData.roomNo))
      errors.roomNo = "Enter a valid room number (1 to 3 digits).";
    if (!formData.department)
      errors.department = "Department selection is required.";

    return errors;
  };

  return (
    <>
      <Banner goBackPath={"/all-patients"} />
      <div className="flex justify-center">
        <form className="w-full max-w-lg p-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-semibold mb-4">
            New Patient Form
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="patientName"
            >
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.patientName && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.patientName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.email && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="healthInsurance"
            >
              Health Insurance
            </label>
            <input
              type="text"
              name="healthInsurance"
              value={formData.healthInsurance}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.healthInsurance && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.healthInsurance}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sex"
            >
              Sex
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formErrors.sex && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.sex}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.age && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.age}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="patientStatus"
            >
              Patient Status
            </label>
            <select
              name="patientStatus"
              value={formData.patientStatus}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Status</option>
              <option value="admitted">Admitted</option>
              <option value="discharged">Discharged</option>
              <option value="under observation">Under Observation</option>
            </select>
            {formErrors.patientStatus && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.patientStatus}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="roomNo"
            >
              Room Number
            </label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.roomNo && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.roomNo}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Department</option>
              {departments &&
                departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </option>
                ))}
            </select>
            {formErrors.department && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.department}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create New Patient
            </button>
          </div>
          {formErrors && (
            <p className="text-red-500 text-s m italic mt-2">
              Error submitting form. Please try again.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default NewPatientPage;
