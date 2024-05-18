import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StarIcon } from "@heroicons/react/solid";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    comments: "",
    rating: 0,
  });
  const { createFeedback } = useGlobalContext();
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleRating = (ratingValue) => {
    setFeedback({ ...feedback, rating: ratingValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!feedback.name) errors.name = "Name is required.";
    if (!feedback.email || !emailRegex.test(feedback.email))
      errors.email = "Enter a valid email address.";
    if (!feedback.comments) errors.comments = "Please add your comments.";
    if (feedback.rating === 0) errors.rating = "Please provide a rating.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await createFeedback(feedback);
      toast.success("Feedback has been submitted successfully!", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => navigate("/apppage"),
      });
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again later.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Banner goBackPath={"/apppage"} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">
            Feedback Form
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={feedback.name}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />

              {formErrors.name && (
                <p className="text-red-500 text-s mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={feedback.email}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
              {formErrors.email && (
                <p className="text-red-500 text-s mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Share your experience in patient assignments
              </label>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <StarIcon
                      key={ratingValue}
                      className={`h-7 w-7 cursor-pointer ${feedback.rating >= ratingValue ? "text-yellow-400" : "text-gray-400"}`}
                      onClick={() => handleRating(ratingValue)}
                    />
                  );
                })}
              </div>
              {formErrors.rating && (
                <p className="text-red-500 text-s mt-1">{formErrors.rating}</p>
              )}
            </div>

            <div className="mb-4">
              <textarea
                name="comments"
                onChange={handleChange}
                value={feedback.comments}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2 h-28"
                placeholder="Add your comments..."
              ></textarea>
              {formErrors.comments && (
                <p className="text-red-500 text-s mt-1">{formErrors.comments}</p>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate("/apppage")}
                className="px-4 py-2 rounded text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
