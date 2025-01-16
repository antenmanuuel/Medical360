import React from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

const ResourceManagementPage = () => {
  const goBackPath = "/apppage";

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Banner */}
      <Banner goBackPath={goBackPath} />

      {/* Main Content Section */}
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Information */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Resource and User Management
            </h2>
            <p className="text-gray-600 text-lg">
              Manage hospital resources and user data efficiently. Access
              information about patients, staff, equipment, and rooms in a
              centralized interface to streamline hospital operations.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Patients */}
            <Link
              to="/all-patients"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-4 rounded-lg shadow-lg hover:scale-105 transition transform hover:from-blue-600 hover:to-blue-700 flex flex-col items-center space-y-3"
            >
              <div className="p-4 bg-white text-blue-600 rounded-full shadow-lg">
                👤
              </div>
              <span className="text-xl font-semibold">Patients</span>
              <p className="text-sm font-light text-center">
                View and manage patient information efficiently.
              </p>
            </Link>

            {/* Users */}
            <Link
              to="/all-users"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-6 px-4 rounded-lg shadow-lg hover:scale-105 transition transform hover:from-green-600 hover:to-green-700 flex flex-col items-center space-y-3"
            >
              <div className="p-4 bg-white text-green-600 rounded-full shadow-lg">
                👤
              </div>
              <span className="text-xl font-semibold">Users</span>
              <p className="text-sm font-light text-center">
                Manage hospital staff and their access permissions.
              </p>
            </Link>

            {/* Equipment */}
            <Link
              to="/all-equipments"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-6 px-4 rounded-lg shadow-lg hover:scale-105 transition transform hover:from-purple-600 hover:to-purple-700 flex flex-col items-center space-y-3"
            >
              <div className="p-4 bg-white text-purple-600 rounded-full shadow-lg">
                🩺
              </div>
              <span className="text-xl font-semibold">Equipment</span>
              <p className="text-sm font-light text-center">
                Track hospital equipment and ensure proper maintenance.
              </p>
            </Link>

            {/* Rooms */}
            <Link
              to="/all-rooms"
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-6 px-4 rounded-lg shadow-lg hover:scale-105 transition transform hover:from-pink-600 hover:to-pink-700 flex flex-col items-center space-y-3"
            >
              <div className="p-4 bg-white text-pink-600 rounded-full shadow-lg">
                🏠
              </div>
              <span className="text-xl font-semibold">Rooms</span>
              <p className="text-sm font-light text-center">
                Monitor room availability and assignments in real time.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-sm">
              <p className="mb-1">Stony Brook Medical360</p>
              <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            <div className="text-sm">
              <p>Contact: support@medical360.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourceManagementPage;
