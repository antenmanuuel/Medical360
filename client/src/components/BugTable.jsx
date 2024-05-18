import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const BugTable = ({ cards }) => {
  const navigate = useNavigate();
  const { markBugResolved, markBugInProgress } = useGlobalContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentBugId, setCurrentBugId] = useState(null);
  const [actionType, setActionType] = useState("");

  const fields = ["Name", "Phone", "Email", "Status"];

  const handleAction = (action, bugId) => {
    setCurrentBugId(bugId);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    if (actionType === "resolve") {
      markBugResolved(currentBugId);
      toast.success("Bug resolved successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else if (actionType === "progress") {
      markBugInProgress(currentBugId);
      toast.info("Bug marked as in progress.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
    setShowConfirmModal(false);
  };

  const viewBugDetails = (bugId) => {
    navigate(`/view-bug/${bugId}`);
  };

  return (
    <>
      <ToastContainer />
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
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 flex justify-end items-center space-x-2">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    onClick={() => viewBugDetails(card._id)}
                  >
                    View Details
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 mr-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={(e) => handleAction("resolve", card._id, e)}
                  >
                    Resolve
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    onClick={(e) => handleAction("progress", card._id, e)}
                  >
                    In Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirmModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Warning Icon */}
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Confirm Action
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to proceed with this action? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmAction}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BugTable;
