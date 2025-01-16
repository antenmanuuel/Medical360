import React, { useEffect } from "react";
import DepartmentList from "../components/DepartmentList";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DepartmentPage = () => {
  const { user } = useAuthContext();
  const { BASE_URL, departments, getAllDepartments } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("lastRoute", "/departmentpage");
    async function fetchDepartments() {
      await getAllDepartments();
    }
    fetchDepartments();
  }, []);

  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/departments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the department.");
      }
      getAllDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const gradientBackground =
    "linear-gradient(to right, #E0F7FA, #B3E5FC, #81D4FA, #4FC3F7)";

  return (
    <>
      <Banner goBackPath="/apppage" />
      <div
        className="min-h-screen"
        style={{ background: gradientBackground, paddingBottom: "2rem" }}
      >
        {/* Header Section */}
        <div className="bg-white shadow-md py-8 px-6 mb-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Departments List
            </h2>
            {user.name === "Admin" && (
              <button
                onClick={() => navigate("/department-form")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                + Create Department
              </button>
            )}
          </div>
        </div>

        {/* Department List or Loading State */}
        <div className="container mx-auto px-4">
          {departments ? (
            departments.length > 0 ? (
              <DepartmentList
                departments={departments}
                onDelete={deleteDepartment}
                isAdmin={user.name === "Admin"}
              />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <img
                  src="/no-data.svg"
                  alt="No departments"
                  className="w-48 h-48 mb-4"
                />
                <p className="text-lg font-medium text-gray-600">
                  No departments available. Create one to get started!
                </p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="loader border-t-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
              <p className="ml-4 text-lg font-medium text-gray-600">
                Loading departments...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;
