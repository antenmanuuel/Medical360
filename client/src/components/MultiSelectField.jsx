import React from "react";
import Select from "react-select";

const MultiSelectField = ({ name, label, options, onChange, value, error }) => {
  const handleChange = (selectedOptions) => {
    onChange(
      name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const valueInSelectFormat = options.filter((option) =>
    value.includes(option.value)
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      boxShadow: "none",
      padding: "2px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#eff6ff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#3b82f6",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#3b82f6",
      ":hover": {
        backgroundColor: "#dbeafe",
        color: "#1d4ed8",
      },
    }),
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <Select
        isMulti
        name={name}
        value={valueInSelectFormat}
        onChange={handleChange}
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={customStyles}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelectField;
