import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const BugReport = () => {
  const [bug, setBug] = useState({
    name: "",
    phone: "",
    email: "",
    bug: "",
  });
  const { createBug } = useGlobalContext();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBug({ ...bug, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (!bug.name) errors.name = "Name is required.";
    if (!bug.phone || !phoneRegex.test(bug.phone))
      errors.phone = "Phone number must be in the format (xxx) xxx-xxxx.";
    if (!bug.email || !emailRegex.test(bug.email))
      errors.email = "Enter a valid email address.";
    if (!bug.bug) errors.bug = "Please describe the bug encountered.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await createBug(bug);
      toast.success("Bug report submitted successfully!", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => navigate("/apppage"),
      });
    } catch (error) {
      toast.error("Failed to submit bug report. Please try again later.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Banner goBackPath={"/apppage"} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">Bug Report</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Contact Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={bug.name}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
              {formErrors.name && (
                <p className="text-red-500 text-s italic mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={bug.phone}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-s italic mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={bug.email}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
              {formErrors.email && (
                <p className="text-red-500 text-s italic mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Bug Encountered</label>
              <textarea
                name="bug"
                onChange={handleChange}
                value={bug.bug}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2 h-28"
                placeholder="Describe the bug..."
              ></textarea>
              {formErrors.bug && (
                <p className="text-red-500 text-s italic mt-1">{formErrors.bug}</p>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate("/apppage")}
                className="px-4 py-2 rounded text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BugReport;
