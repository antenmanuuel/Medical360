import React, { useState, useEffect } from "react";

const TextField = ({
  name,
  label,
  onChange,
  editable,
  initialValue,
  type = "text",
  showEditIcon = false,
  error,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (event) => {
    const newValue = type === "file" ? event.target.files[0] : event.target.value;
    setValue(newValue);
    onChange(name, newValue);
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={`Enter ${label}`}
        value={type !== "file" ? value : undefined}
        onChange={handleChange}
        readOnly={!editable}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
      />
      {showEditIcon && !editable && (
        <button
          type="button"
          className="absolute inset-y-0 right-4 text-gray-500 hover:text-blue-500"
          onClick={() => onChange(name, "")}
        >
          ✏️
        </button>
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
