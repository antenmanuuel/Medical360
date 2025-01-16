import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import AccountCircle from "./AccountCircle";

const Banner = ({ goBackPath, showGoBackButton = true }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Available links with restrictions applied
  const availableLinks = [
    ...(user?.name !== "Admin"
      ? [{ name: "My Patients", path: "/my-patients" }]
      : []),
    ...(user
      ? [
          { name: "Processes", path: "/all-processes" },
          { name: "Departments", path: "/departmentpage" },
        ]
      : []),
    ...(user?.name === "Admin"
      ? [
          { name: "Feedbacks", path: "/all-feedbacks" },
          { name: "Bugs", path: "/all-bugs" },
        ]
      : []),
    ...(user?.isAdmin
      ? [{ name: "Resource Management", path: "/resource-management" }]
      : []),
    { name: "Chat", path: "/chat" },
    ...(user?.name !== "Admin"
      ? [
          { name: "Report Bug", path: "/bugs" },
          { name: "Submit Feedback", path: "/feedback" },
        ]
      : []),
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setFilteredLinks(
        availableLinks.filter((link) =>
          link.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredLinks([]);
    }
  };

  const handleSelectLink = (path) => {
    navigate(path);
    setSearchQuery("");
    setFilteredLinks([]);
  };

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 py-4 px-8 shadow-lg">
      {/* Logo and App Title */}
      <div className="flex items-center space-x-3">
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M12 20.88c-4.004-1.111-8-5.059-8-9.88a8 8 0 1116 0c0 4.82-3.996 8.768-8 9.88z"
          ></path>
        </svg>
        <Link
          to="/apppage"
          className="text-2xl font-bold text-white tracking-wide hover:text-gray-200 transition duration-300"
        >
          Stony Brook Medical 360
        </Link>
      </div>

      {/* Modern Search Bar */}
      <div className="relative flex-grow max-w-lg mx-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="w-full py-2 pl-4 pr-12 text-gray-700 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <svg
            className="absolute top-2 right-3 h-6 w-6 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 16l4-4m0 0l-4-4m4 4H3"
            />
          </svg>
        </div>
        {filteredLinks.length > 0 && (
          <ul className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-lg z-10">
            {filteredLinks.map((link) => (
              <li
                key={link.path}
                onClick={() => handleSelectLink(link.path)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition"
              >
                {link.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex items-center space-x-6">
        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-white hidden sm:block">{user.name}</span>
          </div>
        )}

        {/* Go Back Button */}
        {showGoBackButton && goBackPath && (
          <button
            onClick={() => navigate(goBackPath)}
            className="bg-white text-blue-600 py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition hidden sm:block"
          >
            Go Back
          </button>
        )}

        {/* Account Menu */}
        <AccountCircle />
      </div>
    </div>
  );
};

export default Banner;
