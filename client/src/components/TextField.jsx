import React, { useState, useEffect } from "react";
import axios from "axios";
const TextField = ({
  name,
  label,
  onChange,
  editable,
  initialValue,
  type = "text",
  showEditIcon = false,
  options = [],
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = async (event) => {
    if (event.target.type === "file") {
      const file = event.target.files[0];
      if (file && !file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dgyi1ycer/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Use the URL from Cloudinary in your application
        console.log(response.data.secure_url);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed");
      }
    }
  };

  const handleEditClick = () => {
    if (editable && showEditIcon) {
      setValue(editable);
    }
  };

  return (
    <>
      {type === "select" ? (
        <div className="relative">
          <div className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4 relative z-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={name}
            >
              {label}
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={name}
              value={value}
              onChange={handleChange}
            >
              <option value="">{initialValue}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {showEditIcon && !editable && (
              <span
                onClick={handleEditClick}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                ✏️
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto relative">
          <div className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4 relative z-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={name}
            >
              {label}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={name}
              type={type}
              placeholder={`Enter ${name}`}
              onChange={handleChange}
              value={type === "file" ? undefined : value}
              readOnly={type !== "file" && !editable}
            />
            {showEditIcon && !editable && (
              <span
                onClick={handleEditClick}
                className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
              >
                ✏️
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TextField;
