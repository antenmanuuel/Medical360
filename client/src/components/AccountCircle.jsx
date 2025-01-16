import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AccountCircle = () => {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAccountInfo = () => {
    if (user) navigate(`/user-info/${user.id}`);
  };

  const handleNotifications = () => {
    navigate(`/notifications`);
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full hover:from-gray-500 hover:to-gray-600 shadow-lg transition focus:outline-none"
        onClick={() => setOpen(!isOpen)}
        aria-label="Account Menu"
      >
        <svg
          className="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm5-8h-2v-1c0-2.76-2.24-5-5-5s-5 2.24-5 5v1H7c-1.1 0-2 .9-2 2v7h14v-7c0-1.1-.9-2-2-2zm-7-4c1.66 0 3 1.34 3 3v1H9v-1c0-1.66 1.34-3 3-3z"></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 transform transition duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-2">
            <button
              onClick={handleAccountInfo}
              className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md transition"
              role="menuitem"
            >
              Account Info
            </button>
            <button
              onClick={handleNotifications}
              className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md transition"
              role="menuitem"
            >
              Notifications
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-3 text-sm text-red-600 hover:bg-red-100 hover:text-red-800 rounded-md transition"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCircle;
