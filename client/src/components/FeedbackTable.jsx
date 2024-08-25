import React from "react";
import { useNavigate } from "react-router-dom";

const FeedbackTable = ({ cards }) => {
  const navigate = useNavigate();
  const fields = ["Name", "Email"];

  const viewFeedbackDetails = (feedbackId) => {
    navigate(`/view-feedback/${feedbackId}`);
  };

  return (
    <div
      className="overflow-x-auto relative"
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      <table className="min-w-full">
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                {field}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-blue-300"}`}
            >
              {fields.map((field, i) => (
                <td
                  key={i}
                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {card[field.toLowerCase()]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5">
                <button
                  onClick={() => viewFeedbackDetails(card._id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
