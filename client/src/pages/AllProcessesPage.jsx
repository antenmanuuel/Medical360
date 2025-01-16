import React, { useEffect, useState } from "react";
import ProcessCard from "../components/ProcessCard";
import Banner from "../components/Banner";
import { useProcessContext } from "../hooks/useProcessContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllProcessesPage = () => {
  const { processes, getAllProcesses } = useProcessContext();
  const { getPatient } = useGlobalContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(8); // Number of items per page
  const [maxVisiblePages] = useState(5); // Max number of page buttons to display at once

  useEffect(() => {
    const fetchProcesses = async () => {
      await getAllProcesses();
    };
    fetchProcesses();
  }, []);

  const handleClick = async (patientId) => {
    await getPatient(patientId);
    navigate(`/process-details/`);
  };

  const filteredProcesses =
    processes &&
    processes.filter((process) =>
      process.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(
    (filteredProcesses && filteredProcesses.length) / perPage
  );

  // Calculate items for the current page
  const currentProcesses =
    filteredProcesses &&
    filteredProcesses.slice((page - 1) * perPage, page * perPage);

  // Dynamic Pagination Buttons
  const getPageNumbers = () => {
    const pageNumbers = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const startPage = Math.max(1, page - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Banner goBackPath={"/apppage"} />
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
          All Processes
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Patient Name"
            className="w-full max-w-md px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Processes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProcesses && currentProcesses.length > 0 ? (
            currentProcesses.map((process) => (
              <div
                key={process._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer"
                onClick={() => handleClick(process.patient)}
              >
                <ProcessCard process={process} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No processes found. Try refining your search.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(page - 1)}
                className={`px-4 py-2 rounded-full ${
                  page === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                } transition`}
                disabled={page === 1}
              >
                Previous
              </button>

              {/* Dynamic Page Numbers */}
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-full ${
                    page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
                  } transition`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 rounded-full ${
                  page === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                } transition`}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProcessesPage;
