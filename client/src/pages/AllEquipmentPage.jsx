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
      if (!equipments)
        await getAllEquipments();
    };

    fetchEquipments();
  }, [equipments]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <>
      <Banner goBackPath="/resource-management" />
      <div className="flex justify-center my-4">
        <div className="text-blue-500 p-4 rounded-lg text-3xl">
          All Equipment
        </div>
      </div>
      <div className="flex justify-between items-center mx-8 mb-4">
        <SearchBar onSearch={handleSearch} />
        {user && user.isAdmin && (
          <Link
            to={"/new-equipment"}
            className="bg-[#2260FF] text-white px-2 py-1 rounded-md font-medium text-xl"
          >
            New Equipment
          </Link>
        )}
      </div>
      <div className="p-8">
        {equipments && <Table
          cards={equipments.filter((equipment) =>
            equipment.equipmentName.toLowerCase().includes(searchTerm)
          )}
          isAdmin={user && user.isAdmin}
          context={"equipment"}
        />}
      </div>
    </>
  );
};

export default AllEquipmentPage;