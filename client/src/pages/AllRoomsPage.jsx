import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllRoomsPage = () => {
  const { user } = useAuthContext();
  const { rooms, getAllRooms, lastUpdated } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllRooms();
  }, [lastUpdated]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner goBackPath="/resource-management" />

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">All Rooms</h1>
          {user && user.isAdmin && (
            <Link
              to="/new-room"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-medium"
            >
              New Room
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Search by room number..." />
        </div>

        {/* Rooms Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {rooms && (
            <Table
              cards={Object.values(rooms)
                .sort((a, b) => {
                  const roomNumberA = parseInt(a.roomNumber.match(/\d+/), 10);
                  const roomNumberB = parseInt(b.roomNumber.match(/\d+/), 10);
                  return roomNumberA - roomNumberB;
                })
                .filter((room) =>
                  room.roomNumber.toLowerCase().includes(searchTerm)
                )}
              isAdmin={user && user.isAdmin}
              context={"room"}
            />
          )}
          {!rooms && (
            <div className="text-center py-10">
              <p className="text-gray-500">No rooms available to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
