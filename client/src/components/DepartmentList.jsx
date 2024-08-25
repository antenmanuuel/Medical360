import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const DepartmentList = ({ departments, onDelete, isAdmin }) => {
  const gradient =
    "linear-gradient(to right, #B3E3F8, #A5CDF6, #96B5F4, #849AF1, #6F79EE, #5552EB, #5552EB, #5552EB)";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { BASE_URL } = useGlobalContext();
  const { user } = useAuthContext();

  const handleDelete = () => {
    console.log("Deleting department with ID:", itemToDelete);
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
      <div
        className="flex flex-col items-center justify-center"
        style={{ background: gradient, height: "300px" }}
      >
        <p className="text-2xl text-gray-800">No departments found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        style={{ height: "250px" }}
      >
        {departments.map((department, index) => (
          <div
            key={index}
            className="flex-none w-48 h-50 rounded-lg shadow bg-white p-4 flex flex-col items-center justify-center"
          >
            <img
              src={`${BASE_URL}/${department.iconPath}`}
              alt={department.departmentName}
              className="rounded-full w-25 h-21"
            />
            <p className="mt-2 text-center">{department.departmentName}</p>
              <div>
                {(user.name == "Admin") && (
                <button
                  onClick={() => openDeleteModal(department._id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
                )}
                {((user.name == "Admin") || (user.name != "Admin")) && (
                <Link
                  to={`/department-staff/${department._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-center"
                >
                  Info
                </Link>
                )}
              </div>
            
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          {/* Modal content */}
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* Modal Panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Warning Icon */}
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Confirm Deletion
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this department? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
