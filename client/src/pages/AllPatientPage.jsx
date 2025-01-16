import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AllPatientPage = () => {
  const { user } = useAuthContext();
  const { patients, getAllDepartments, getAllPatients } = useGlobalContext();
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      await getAllDepartments();
      await getAllPatients();
    }
    fetchPatients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = patients.filter(
        (patient) =>
          patient.patientName.toLowerCase().includes(lowercasedTerm) ||
          patient.email.toLowerCase().includes(lowercasedTerm) ||
          patient.roomNo.toLowerCase().includes(lowercasedTerm) ||
          patient.patientStatus.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <Banner goBackPath="/resource-management" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4 md:mb-0">
            All Patients
          </h1>
          {user && user.isAdmin && (
            <Link
              to="/new-patient"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
            >
              + New Patient
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {/* Table Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          {filteredPatients && filteredPatients.length > 0 ? (
            <Table
              cards={filteredPatients}
              isAdmin={user && user.isAdmin}
              context={"patient"}
            />
          ) : (
            <div className="text-center text-gray-500 py-4">
              No patients found. Try refining your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPatientPage;
