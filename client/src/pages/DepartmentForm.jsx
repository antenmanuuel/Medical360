import React, { useState } from "react";
import Banner from "../components/Banner";
import FormField from "../components/FormField";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DepartmentForm = () => {
  const [formError, setFormError] = useState("");
  const [iconPreview, setIconPreview] = useState(null); // For file preview
  const navigate = useNavigate();
  const { createDepartment } = useGlobalContext();

  // Define the fields for the department form
  const fields = [
    { name: "name", label: "Name", initialValue: "", editable: true },
    {
      name: "icon",
      label: "Icon",
      initialValue: "",
      editable: true,
      type: "file",
    },
  ];

  const validateForm = (formData) => {
    if (!formData.name) {
      setFormError("Name is required.");
      return false;
    }
    if (!formData.icon) {
      setFormError("Icon is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (formData) => {
    // Reset errors
    setFormError("");

    // Validate form
    if (!validateForm(formData)) return;

    // Create FormData object
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "icon") {
        data.append(key, formData[key]);
      }
    });

    // Append file field (icon)
    if (formData.icon) {
      data.append("icon", formData.icon);
    }

    // Check the FormData entries (for debugging)
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    // Submit the form
    createDepartment(data)
      .then(() => {
        navigate("/departmentpage");
      })
      .catch((error) => {
        console.error("There was an error creating the department:", error);
        setFormError("There was an error submitting the form. Please try again.");
      });
  };

  const handleFileChange = (file) => {
    if (file) {
      setIconPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Banner goBackPath={"/departmentpage"} />
      <div className="flex justify-center mt-6">
        <div className="text-blue-600 font-bold text-3xl">New Department Form</div>
      </div>
      <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
        <FormField
          fields={fields}
          onFileChange={handleFileChange} // Pass file change handler
          submit={handleSubmit}
          buttonName={"Create New Department"}
        />
        {iconPreview && (
          <div className="flex justify-center mt-4">
            <img
              src={iconPreview}
              alt="Icon Preview"
              className="w-24 h-24 object-cover border border-gray-300 rounded-full"
            />
          </div>
        )}
        {formError && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">{formError}</strong>
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentForm;
