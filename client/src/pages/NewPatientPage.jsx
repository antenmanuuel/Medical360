import React, { useState, useEffect } from "react";
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
  const [formErrors, setFormErrors] = useState({});

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
      navigate("/all-patients");
    } catch (error) {
      console.error("Error creating patient:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Banner */}
      <Banner goBackPath={"/all-patients"} />

      {/* Form Container */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            New Patient Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Patient Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.patientName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.patientName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="(xxx) xxx-xxxx"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>

            {/* Health Insurance Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Insurance
              </label>
              <input
                type="text"
                name="healthInsurance"
                value={formData.healthInsurance}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.healthInsurance && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.healthInsurance}
                </p>
              )}
            </div>

            {/* Sex Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.sex && (
                <p className="text-red-500 text-sm mt-1">{formErrors.sex}</p>
              )}
            </div>

            {/* Age Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.age && (
                <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>
              )}
            </div>

            {/* Patient Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Status
              </label>
              <select
                name="patientStatus"
                value={formData.patientStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="">Select Status</option>
                <option value="admitted">Admitted</option>
                <option value="discharged">Discharged</option>
                <option value="under observation">Under Observation</option>
              </select>
              {formErrors.patientStatus && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.patientStatus}
                </p>
              )}
            </div>

            {/* Room Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.roomNo && (
                <p className="text-red-500 text-sm mt-1">{formErrors.roomNo}</p>
              )}
            </div>

            {/* Department */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
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
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.department}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
              >
                Create New Patient
              </button>
            </div>
            {formErrors.submit && (
              <p className="text-red-500 text-sm text-center mt-4">
                {formErrors.submit}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPatientPage;
