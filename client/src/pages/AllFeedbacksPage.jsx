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

  return (
    <>
      <Banner goBackPath="/apppage" />
      <div className="flex justify-center my-4">
        <div className="text-blue-500 p-4 rounded-lg text-3xl">
          All Feedbacks
        </div>
      </div>
      <div className="flex justify-between items-center mx-8 mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="p-8">
        {feedbacks && (
          <FeedbackTable
            cards={feedbacks.filter((feedback) =>
              `${feedback.name} ${feedback.email}`
                .toLowerCase()
                .includes(searchTerm)
            )}
          />
        )}
      </div>
    </>
  );
};

export default AllFeedbacksPage;
