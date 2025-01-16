import React, { useState, useEffect } from "react";
import StaffCard from "../components/StaffCard";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import DepartmentHead from "../components/DepartmentHead";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DepartmentStaffPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const { getDepartment } = useGlobalContext();

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const doc = await getDepartment(id);
        if (doc) {
          setDepartment(doc);
        }
      } catch (error) {
        console.error("Failed to fetch department details", error);
      }
    };

    if (id) {
      fetchDepartmentDetails();
    }
  }, [id]);

  if (!department) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  const goBackPath = "/departmentpage";

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner goBackPath={goBackPath} />
      <div className="max-w-7xl mx-auto py-10 px-6">
        {/* Department Head Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Department Head</h2>
          {department.head ? (
            <div className="flex justify-center">
              <DepartmentHead
                head={department.head}
                headDoctor={true}
                origin={`/department-staff/${id}`}
              />
            </div>
          ) : (
            <p className="text-gray-600">No department head assigned.</p>
          )}
        </div>

        {/* Department Staff Section */}
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Staff Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {department.doctorList.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No staff members found.
              </p>
            ) : (
              department.doctorList.map((staff, index) => (
                <StaffCard
                  key={index}
                  staff={staff}
                  origin={`/department-staff/${id}`}
                  headDoctor={false}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStaffPage;
