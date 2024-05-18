import React from "react";
import Select from "react-select";

const MultiSelectField = ({ name, label, options, onChange, value, error }) => {
  const handleChange = (selectedOptions) => {
    // Map selected options to an array of values
    onChange(
      name,
      selectedOptions.map((option) => option.value)
    );
  };

  // Convert value back to react-select format
  const valueInSelectFormat = options.filter((option) =>
    value.includes(option.value)
  );

  return (
    <div className="form-field relative z-50">
      <div className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4 relative z-10">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
        <Select
          isMulti
          name={name}
          closeMenuOnSelect={false}
          value={valueInSelectFormat}
          onChange={handleChange}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {error && <p className="text-red-500 text-s mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default MultiSelectField;
