import React, { useEffect,useState } from 'react';
import StaffCard from "../components/StaffCard";
import doctorImageone from "../images/doctor2.jpeg";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllDoctorsPage = () => {

  
  const { user } = useAuthContext();
  const { BASE_URL } = useGlobalContext();
  const navigate = useNavigate();
  const { doctors, getAllDoctors } = useGlobalContext(); 
  const [sorted, setSorted] = useState(false);


useEffect(() => {
  localStorage.setItem("lastRoute", "/all-doctors");
  async function getDoctors() {
      if (!doctors) {
          await getAllDoctors();
      }
  }
  getDoctors();
  return () => {
      localStorage.removeItem("lastRoute");
  }
}, [doctors]);

const sortedDoctors = sorted ? [...doctors].sort((a, b) => a.name.localeCompare(b.name)) : doctors;

  const handleSortClick = () => {
    setSorted(!sorted); 
  };

  return (
    <div>
      <Banner goBackPath={'/apppage'} />
      <div className="bg-white p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#2260FF]">
            Doctors
          </h1>
          <div className="flex space-x-2">
            <button className="bg-[#2260FF] text-white px-4 py-2 rounded-md font-medium" onClick={handleSortClick}>
              Sort By A-Z
            </button>
            <button className="bg-[#CAD6FF] p-2 rounded-full">
              {/* Replace with actual icons */}
              <span className="font-medium">★</span>
            </button>
          </div>
        </div>
        {/* Doctors Table */}
        <div className="bg-[#EBF8FF] p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-1 xl:gap-3">
            {sortedDoctors && sortedDoctors.length > 0 ? (
              sortedDoctors.map((doctor, index) => (
                <StaffCard key={index} staff={doctor} origin="/all-doctors" />
              ))
            ) : (
              <p>No doctors available or data is loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  };
export default AllDoctorsPage;
