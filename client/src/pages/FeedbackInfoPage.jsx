import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StarIcon } from "@heroicons/react/solid";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const FeedbackInfoPage = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    comments: "",
    rating: 0,
  });
  const { getFeedback } = useGlobalContext(); 
  const { id } = useParams(); 
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const fetchedFeedback = await getFeedback(id);
        setFeedback(fetchedFeedback);
      } catch (error) {
        toast.error("Failed to fetch feedback details. Please try again later.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    };
    fetchFeedback();
  }, [id, getFeedback]);

  return (
    <>
      <ToastContainer />
      <Banner goBackPath={"/all-feedbacks"} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">
            Feedback Details
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Name</label>
            <div className="mt-1 block w-full p-2 text-gray-600 bg-gray-100 rounded">
              {feedback.name}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Email Address</label>
            <div className="mt-1 block w-full p-2 text-gray-600 bg-gray-100 rounded">
              {feedback.email}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              Rating
            </label>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <StarIcon
                    key={ratingValue}
                    className={`h-7 w-7 ${feedback.rating >= ratingValue ? "text-yellow-400" : "text-gray-300"}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              Comments
            </label>
            <div className="mt-1 block w-full p-2 text-gray-600 bg-gray-100 rounded h-28">
              {feedback.comments}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackInfoPage;
