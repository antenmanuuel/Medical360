import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllUsersPage = () => {
  const { user } = useAuthContext();
  const { getAllDepartments, getAllUsers, users } = useGlobalContext();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      if (user && !users) {
        await getAllDepartments();
        await getAllUsers();
      }
    }
    fetchUsers();
  }, [user, users]);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercasedTerm) ||
          user.email.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <Banner goBackPath="/resource-management" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4 md:mb-0">
            All Users
          </h1>
          {user && user.isAdmin && (
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow-md transition"
            >
              + New User
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          {filteredUsers && filteredUsers.length > 0 ? (
            <Table
              cards={filteredUsers}
              isAdmin={user && user.isAdmin}
              context={"user"}
              showEditButton={false}
              showDeleteButton={true}
            />
          ) : (
            <div className="text-center text-gray-500 py-4">
              No users found. Try refining your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;
