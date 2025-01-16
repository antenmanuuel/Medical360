import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllEquipmentPage = () => {
  const { user } = useAuthContext();
  const { equipments, getAllEquipments } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEquipments = async () => {
      if (!equipments) await getAllEquipments();
    };

    fetchEquipments();
  }, [equipments]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner goBackPath="/resource-management" />
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4 md:mb-0">
            All Equipment
          </h1>
          {user && user.isAdmin && (
            <Link
              to={"/new-equipment"}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              + New Equipment
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Equipment Table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          {equipments && equipments.length > 0 ? (
            <Table
              cards={equipments.filter((equipment) =>
                equipment.equipmentName.toLowerCase().includes(searchTerm)
              )}
              isAdmin={user && user.isAdmin}
              context={"equipment"}
            />
          ) : (
            <div className="text-center text-gray-500 py-4">
              No equipment found. Please check your search term or add new
              equipment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEquipmentPage;
