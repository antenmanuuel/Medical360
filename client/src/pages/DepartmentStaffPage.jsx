import React, { useState, useEffect } from "react";
import StaffCard from "../components/StaffCard";
import { useParams } from 'react-router-dom';
import Banner from "../components/Banner";
import DepartmentHead from "../components/DepartmentHead";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DepartmentStaffPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const { getDepartment } = useGlobalContext(); 
  console.log("id here", id);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const doc = await getDepartment(id);
        if (doc) {
          setDepartment(doc);
        }
      } catch (error) {
        console.error('Failed to fetch department details', error);
      }
    };

    if (id) {
      fetchDepartmentDetails();
    }
  }, [id]);

  if (!department) {
    return <p>Loading...</p>;
  }

  // Mock goBackPath for the Banner component
  const goBackPath = '/departmentpage'; 
  const gradient = "linear-gradient(to right, #B3E3F8, #A5CDF6, #96B5F4, #849AF1, #6F79EE, #5552EB, #5552EB, #5552EB)";

  return (
    <div>
      <Banner goBackPath={goBackPath} />
      <div className="bg-white p-4 md:p-10" style={{ background: gradient, minHeight: '100vh', padding: '2rem' }}>

        {/* Center the department head */}
        <div className="flex justify-center mb-10">
          {department.head ? (
            <DepartmentHead head={department.head} headDoctor={true} origin={`/department-staff/${id}`} />
          ) : (
            <p>No department head to show.</p>
          )}
        </div>

        {/* Department Staff */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {department.doctorList.length === 0 ? (
            <p className="col-span-full text-center">No department staff to show.</p>
          ) : (
            department.doctorList.map((staff, index) => (
              <StaffCard key={index} staff={staff} origin={`/department-staff/${id}`} headDoctor={false} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentStaffPage;
