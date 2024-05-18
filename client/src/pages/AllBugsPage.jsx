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

  return (
    <>
      <Banner goBackPath="/apppage" />
      <div className="flex justify-center my-4">
        <div className="text-blue-500 p-4 rounded-lg text-3xl">
          All Bugs
        </div>
      </div>
      <div className="flex justify-between items-center mx-8 mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="p-8">
        {bugs && <BugTable
          cards={bugs.filter((bug) =>
            `${bug.name} ${bug.email} ${bug.status}`.toLowerCase().includes(searchTerm)
          )}
        />}
      </div>
    </>
  );
};

export default AllBugsPage;