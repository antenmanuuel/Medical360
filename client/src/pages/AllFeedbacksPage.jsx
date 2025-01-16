import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import FeedbackTable from "../components/FeedbackTable";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllFeedbacksPage = () => {
  const { feedbacks, getAllFeedback } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!feedbacks) {
        await getAllFeedback();
      }
    };

    fetchFeedbacks();
  }, [feedbacks]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredFeedbacks = feedbacks?.filter((feedback) =>
    `${feedback.name} ${feedback.email}`.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <Banner goBackPath="/apppage" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4 md:mb-0">
            All Feedbacks
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Feedback Table Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          {filteredFeedbacks && filteredFeedbacks.length > 0 ? (
            <FeedbackTable cards={filteredFeedbacks} />
          ) : (
            <div className="text-center text-gray-500 py-4">
              No feedbacks found. Try refining your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFeedbacksPage;
