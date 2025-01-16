import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    departments,
    getAllDepartments,
    createUser,
    createDoctor,
  } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
    pwConfirm: "",
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
      let docId = null;
      let dep = null;

      if (formData.department) {
        dep = formData.department;
        const doc = await createDoctor({
          name: formData.name,
          department: dep,
        });
        docId = doc._id;
      }

      await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        departmentName: dep,
        phone_number: formData.phoneNumber,
        doctor: docId,
      });
      navigate("/all-users");
    } catch (err) {
      console.error(err.message);
      setFormErrors({ submit: "Error submitting form. Please try again." });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email || !emailRegex.test(formData.email))
      errors.email = "Enter a valid email address.";
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be in the format (xxx) xxx-xxxx.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.";
    }
    if (!formData.pwConfirm) {
      errors.pwConfirm = "Confirm password is required.";
    } else if (formData.password !== formData.pwConfirm) {
      errors.pwConfirm = "Passwords must match.";
    }
    if (!formData.department)
      errors.department = "Department selection is required.";

    return errors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Banner */}
      <Banner goBackPath={"/all-users"} />

      {/* Form Container */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            New User Registration
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
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

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="pwConfirm"
                value={formData.pwConfirm}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.pwConfirm && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.pwConfirm}
                </p>
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
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="(xxx) xxx-xxxx"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>

            {/* Department Field */}
            {departments && (
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
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept.departmentName}>
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
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:ring focus:ring-blue-300"
              >
                Create User
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

export default RegistrationForm;
