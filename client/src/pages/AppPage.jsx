import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AppPage = () => {
  const { user } = useAuthContext();
  const { reset } = useGlobalContext();

  useEffect(() => {
    reset();
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Include the Banner component at the top */}
      <Banner goBackPath="/" showGoBackButton={false} />

      {/* Main container for sidebar, welcome message, and content */}
      <div className="flex flex-grow">
        {/* Sidebar should stretch to the height of the container */}
        <div className="flex flex-col w-64 bg-[#409BEF] text-white mt-[-16px]">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-grow flex flex-col justify-center items-center p-5">
          {/* Welcome message */}
          <div className="text-3xl font-bold text-gray-800 mb-5">
            Welcome to Stony Brook Medical360
          </div>

          {/* Short message */}
          <p className="text-lg text-center text-gray-600 mb-3">
            Your one-stop solution for medical management.
          </p>

          {/* Buttons related to Medical360 with spacing */}
          <div className="flex justify-between">
            <Link
              to="/all-doctors"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
