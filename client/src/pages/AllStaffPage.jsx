import React from "react";
import StaffCard from "../components/StaffCard";
import doctorImageone from "../images/doctor2.jpeg";
import Banner from "../components/Banner";


const staffMembers = [

  
  {
    image: doctorImageone,
    name: "Dr. Alexander Bennett, Ph.D.",
    role: "Dermato-Genetics",
    bio: "Specialist in genetic skin conditions and dermatological research.",
  },
  {
    image: doctorImageone,
    name: "Dr. Olivia Turner, M.D.",
    role: "Dermato-Endocrinology",
    bio: "Expert in hormonal skin disorders and systemic treatment approaches.",
    status: "On Leave",
  },
  {
    image: doctorImageone,
    name: "Dr. Alexander Bennett, Ph.D.",
    role: "Dermato-Genetics",
    bio: "Specialist in genetic skin conditions and dermatological research.",
  },
  {
    image: doctorImageone,
    name: "Nurse Jane Doe",
    role: "On Duty",
    bio: "Dedicated nursing professional with a focus on patient care and support.",
  },
  {
    image: doctorImageone,
    name: "Dr. Olivia Turner, M.D.",
    role: "Dermato-Endocrinology",
    bio: "Expert in hormonal skin disorders and systemic treatment approaches.",
    status: "On Leave",
  },
];

const AllStaffPage = () => {
  const goBackPath = "/apppage";

  return (
    <div>
      <Banner goBackPath={goBackPath} />
      <div className="bg-white p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#2260FF]">
            All Staff
          </h1>
          <div className="flex space-x-2">
            <button className="bg-[#2260FF] text-white px-4 py-2 rounded-md font-medium">
              Sort By A-Z
            </button>
            <button className="bg-[#CAD6FF] p-2 rounded-full">
              {/* Replace with actual icons */}
              <span className="font-medium">★</span>
            </button>
          </div>
        </div>
        {/* Staff Table */}
        <div className="bg-[#EBF8FF] p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {staffMembers.map((staff, index) => (
              <StaffCard key={index} staff={staff} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllStaffPage;
