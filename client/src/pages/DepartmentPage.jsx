import React, { useContext, useState ,useEffect } from "react";
import DepartmentList from "../components/DepartmentList";
import AuthContext from "../auth/AuthContext";
import DepartmentHead from "../components/DepartmentHead";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";

const DepartmentPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const response = await fetch('https://medical360-d65d823d7d75.herokuapp.com/departments/alldepartments');
    const data = await response.json();
    setDepartments(data);
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(`https://medical360-d65d823d7d75.herokuapp.com/departments/${id}`, {
            method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the department.');
      }
      fetchDepartments();  
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };
  return (
    <>
      <Banner goBackPath="/apppage" />
      <div className="my-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold text-center flex-1">
            Departments List
          </h2>
          {auth.isAdmin && (
            <button onClick={() => navigate("/department-form")} className="p-2 bg-blue-500 text-white rounded-md">
              Create Department
            </button>
          )}
        </div>
        <DepartmentList departments={departments} onDelete={deleteDepartment} isAdmin={auth.isAdmin} />
      </div>
      <DepartmentHead />
    </>
  );
};
export default DepartmentPage;
