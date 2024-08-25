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
    getDoctor,
  } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
    pwConfirm: "",
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

    // create user and doctor if department is not null
    try {
      let docId = null;
      let dep = null;
      if (formData.department) {
        dep = formData.department;
        console.log("department found here: " + dep);
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
      console.log("user created!!!");
    } catch (err) {
      console.log(err.message);
      setFormErrors({ submit: "Error submitting form. Please try again." });
    }
    navigate("/all-users");
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
    <>
      <Banner goBackPath={"/all-users"} />
      <div className="flex justify-center">
        <form className="w-full max-w-lg p-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-semibold mb-4">
            New User Form
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.name && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.name}
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
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.password && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.password}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pwConfirm"
            >
              Confirm Password
            </label>
            <input
              type="text"
              name="pwConfirm"
              value={formData.pwConfirm}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.pwConfirm && (
              <p className="text-red-500 text-s italic mt-1">
                {formErrors.pwConfirm}
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
          {departments && (
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
                    <option key={dept._id} value={dept.departmentName}>
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
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create New User
            </button>
          </div>
          {formErrors && (
            <p className="text-red-500 text-s italic mt-2">
              Error submitting form. Please try again.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
