import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import BugTable from "../components/BugTable";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllBugsPage = () => {
  const { bugs, getAllBugs } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBugs = async () => {
      if (!bugs) {
        await getAllBugs();
      }
    };

    fetchBugs();
  }, [bugs]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredBugs =
    bugs?.filter((bug) =>
      `${bug.name} ${bug.email} ${bug.status}`
        .toLowerCase()
        .includes(searchTerm)
    ) || [];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <Banner goBackPath="/apppage" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4 md:mb-0">
            All Bugs
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Bugs Table Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          {filteredBugs.length > 0 ? (
            <BugTable cards={filteredBugs} />
          ) : (
            <div className="text-center text-gray-500 py-4">
              No bugs found. Try refining your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBugsPage;
