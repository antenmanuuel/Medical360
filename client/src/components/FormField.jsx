import React, { useState } from "react";
import TextField from "./TextField";
import MultiSelectField from "./MultiSelectField";

const FormField = ({ fields, submit, buttonName }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-100 to-white shadow-lg rounded-lg p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Form Details</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="mb-6">
            {field.type === "multi-select" ? (
              <MultiSelectField
                name={field.name}
                label={field.label}
                value={formData[field.name] || []}
                options={field.options}
                onChange={handleInputChange}
                error={field.error}
              />
            ) : (
              <TextField
                name={field.name}
                label={field.label}
                initialValue={formData[field.name] || field.initialValue}
                editable={field.editable}
                showEditIcon={field.showEditIcon}
                type={field.type}
                onChange={handleInputChange}
                error={field.error}
              />
            )}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-3 px-6 text-lg font-medium rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              buttonName.toLowerCase() === "delete user"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {buttonName}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormField;
