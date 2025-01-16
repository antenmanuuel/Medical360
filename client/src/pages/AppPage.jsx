import React, { useEffect } from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AppPage = () => {
  const { user } = useAuthContext();
  const { reset } = useGlobalContext();

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Banner */}
      <Banner goBackPath="/" showGoBackButton={false} />

      {/* Main content */}
      <div className="flex-grow p-8 space-y-10">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome, {user?.name || "Admin"}!
          </h1>
          <p className="text-gray-600 text-lg">
            Manage hospital operations efficiently with Stony Brook Medical360.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(user.name !== "Admin") && (
            <div className="bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                My Patients
              </h2>
              <Link
                to="/my-patients"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                View Patients
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                View and manage your assigned patients.
              </p>
            </div>
          )}
          {user && (
            <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-green-600 mb-4">
                Processes
              </h2>
              <Link
                to="/all-processes"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                View Processes
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                Manage hospital workflows and processes.
              </p>
            </div>
          )}
          {user && (
            <div className="bg-purple-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-purple-600 mb-4">
                Departments
              </h2>
              <Link
                to="/departmentpage"
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                View Departments
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                View and manage hospital departments.
              </p>
            </div>
          )}
          {(user.name === "Admin") && (
            <div className="bg-yellow-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-yellow-600 mb-4">
                Feedbacks
              </h2>
              <Link
                to="/all-feedbacks"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                View Feedbacks
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                Review and respond to feedback from staff and patients.
              </p>
            </div>
          )}
          {(user.name === "Admin") && (
            <div className="bg-red-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Bugs</h2>
              <Link
                to="/all-bugs"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                View Bugs
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                View and manage reported bugs or issues in the system.
              </p>
            </div>
          )}
          {user.isAdmin && (
            <div className="bg-indigo-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                Resource Management
              </h2>
              <Link
                to="/resource-management"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Manage Resources
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                Allocate and monitor hospital resources.
              </p>
            </div>
          )}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">Chat</h2>
            <Link
              to="/chat"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Open Chat
            </Link>
            <p className="text-gray-600 text-sm mt-2">
              Communicate with other hospital staff in real-time.
            </p>
          </div>
          {(user.name !== "Admin") && (
            <div className="bg-orange-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">
                Report Bug
              </h2>
              <Link
                to="/bugs"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Report a Bug
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                Report a system bug or issue for resolution.
              </p>
            </div>
          )}
          {(user.name !== "Admin") && (
            <div className="bg-teal-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">
                Give Feedback
              </h2>
              <Link
                to="/feedback"
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Submit Feedback
              </Link>
              <p className="text-gray-600 text-sm mt-2">
                Share your feedback about the system or services.
              </p>
            </div>
          )}
        </div>

        {/* Who We Are Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-gray-600">
            Stony Brook Medical360 is dedicated to providing top-notch healthcare services. 
            We aim to simplify hospital operations, ensuring better patient care and seamless 
            management for healthcare professionals.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-2">Have questions or need assistance?</p>
          <ul className="text-gray-600">
            <li>Email: <a href="mailto:info@stonybrookmedical360.com" className="text-blue-500 hover:underline">info@stonybrookmedical360.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 234-567-890</a></li>
            <li>Address: 123 Main Street, Stony Brook, NY</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Stony Brook Medical360
        </p>
      </footer>
    </div>
  );
};

export default AppPage;
