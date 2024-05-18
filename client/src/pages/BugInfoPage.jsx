import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const BugInfoPage = () => {
  const [bug, setBug] = useState({
    name: "",
    phone: "",
    email: "",
    bug: "",
  });
  const { getBug } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const fetchedBug = await getBug(id);
        setBug(fetchedBug);
      } catch (error) {
        toast.error("Failed to fetch bug report. Please try again later.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    };
    fetchBug();
  }, [id, getBug]);

  return (
    <>
      <ToastContainer />
      <Banner goBackPath={"/all-bugs"} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">Bug Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Name</label>
            <div className="mt-1 block w-full p-2 text-gray-600 border rounded shadow appearance-none">
              {bug.name}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
            <div className="mt-1 block w-full p-2 text-gray-600 border rounded shadow appearance-none">
              {bug.phone}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <div className="mt-1 block w-full p-2 text-gray-600 border rounded shadow appearance-none">
              {bug.email}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Bug Encountered</label>
            <div className="mt-1 block w-full p-2 text-gray-600 h-28 border rounded shadow appearance-none">
              {bug.bug}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BugInfoPage;
