import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const DepartmentList = ({ departments, onDelete, isAdmin }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { BASE_URL } = useGlobalContext();
  const { user } = useAuthContext();

  const handleDelete = () => {
    onDelete(itemToDelete);
    setShowDeleteModal(false);
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  if (departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-100">
        <p className="text-2xl text-gray-800">No departments found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {departments.map((department, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden p-6 transition-transform transform hover:-translate-y-1 duration-300 flex flex-col items-center"
          >
            {/* Department Icon */}
            <img
              src={`${BASE_URL}/${department.iconPath}`}
              alt={department.departmentName}
              className="rounded-full w-24 h-24 object-cover border-4 border-gray-200"
            />
            {/* Department Name */}
            <p className="mt-4 text-lg font-semibold text-gray-800 text-center">
              {department.departmentName}
            </p>
            {/* Action Buttons */}
            <div className="mt-4 flex space-x-4">
              {user.name === "Admin" && (
                <button
                  onClick={() => openDeleteModal(department._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow-md transition-transform transform hover:scale-105"
                >
                  🗑 Delete
                </button>
              )}
              <Link
                to={`/department-staff/${department._id}`}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                ℹ️ Info
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this department? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
