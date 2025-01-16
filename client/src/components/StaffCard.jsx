import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const StaffCard = ({ staff, headDoctor, origin }) => {
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { getDoctorByUser, getUser, BASE_URL } = useGlobalContext();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const userData = await getDoctorByUser(staff._id);
        const userDataWithImage = await getUser(userData._id);
        setUser(userDataWithImage);
        setImagePreview(`${BASE_URL}/${userDataWithImage.image}`);
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    if (staff._id) {
      fetchDoctorDetails();
    }
  }, [staff._id]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300">
      {/* Image */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
          <img
            src={imagePreview || "https://via.placeholder.com/120"}
            alt={staff.name || "Doctor"}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h3 className="mt-4 text-xl font-bold text-blue-800">
          {staff.name || "Unknown Name"}
        </h3>
        <p className="text-md text-blue-600 font-semibold">
          {headDoctor ? "Department Head" : "Doctor"}
        </p>
      </div>

      {/* Specialization */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center shadow-sm">
        <p className="text-md text-blue-800 font-medium">
          {staff.profileDetails?.specialization?.join(", ") || "No specialization"}
        </p>
      </div>

      {/* Info Button */}
      <div className="mt-6 flex justify-center">
        <Link
          to={`/doctorinfo/${staff._id}`}
          state={{ doctorName: staff.name, origin }}
          className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 shadow-lg transition-transform transform hover:scale-105 duration-300"
        >
          View Info
        </Link>
      </div>
    </div>
  );
};

export default StaffCard;
