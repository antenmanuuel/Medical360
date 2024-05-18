
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const MyPatientsPage = () => {
  const { user } = useAuthContext();
  const { getDoctor, currentDoctor, getPatient, departments, getAllDepartments } = useGlobalContext();
  const [currentPageAdmitted, setCurrentPageAdmitted] = useState(1);
  const [currentPageDischarged, setCurrentPageDischarged] = useState(1);
  const[patients,setPatients]=useState(null);
  const patientsPerPage = 6;
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchDoctor() {
      try {
        if (!departments) await getAllDepartments();

        if (!currentDoctor && user.doctor) {
          let doctor = await getDoctor(user.doctor);

          const detailedPatients = await Promise.all(doctor.patientList.map(async (patient) => {
            const patientDetails = await getPatient(patient.patientId);
            return { ...patientDetails, assignedTime: patient.assignedTime, eventId: patient.eventId };
          }));

          console.log("Detailed Patients:", detailedPatients);
          setPatients(detailedPatients);
        }
      } catch (error) {
        console.error("Error fetching doctor or patients:", error);
      }
    }

    fetchDoctor();
  }, [currentDoctor, departments]);

  console.log("Patients:", patients);

  // Logic for displaying patients
  let patientsAdmitted, pagePatientsAdmitted, indexOfLastPatientAdmitted, indexOfFirstPatientAdmitted;
  if (patients) {
    patientsAdmitted = patients.filter(patient => patient.patientStatus !== "discharged");
    indexOfLastPatientAdmitted = currentPageAdmitted * patientsPerPage;
    indexOfFirstPatientAdmitted = indexOfLastPatientAdmitted - patientsPerPage;
    pagePatientsAdmitted = patientsAdmitted.slice(indexOfFirstPatientAdmitted, indexOfLastPatientAdmitted);
  }

  let patientsDischarged, pagePatientsDischarged, indexOfLastPatientDischarged, indexOfFirstPatientDischarged;
  if (patients) {
    patientsDischarged = patients.filter(patient => patient.patientStatus === "discharged");
    indexOfLastPatientDischarged = currentPageDischarged * patientsPerPage;
    indexOfFirstPatientDischarged = indexOfLastPatientDischarged - patientsPerPage;
    pagePatientsDischarged = patientsDischarged.slice(indexOfFirstPatientDischarged, indexOfLastPatientDischarged);
  }

  const handleClick = async patientId => {
    await getPatient(patientId);
    navigate(`/patient-info/${patientId}`);
  }

  return (
    <>
      <Banner goBackPath={"/"} />
      <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">My Patients</h1>

          <h2 className="text-xl font-bold text-blue-900 mb-4">Admitted</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pagePatientsAdmitted && pagePatientsAdmitted.map((patient) => (
              <div
                key={patient._id}
                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:bg-blue-200"
                onClick={() => handleClick(patient._id)}
              >
                <h2 className="text-lg font-semibold text-blue-900">{patient.patientName}</h2>
                <p className="text-sm text-gray-600 mt-1">Age: {patient.age}</p>
                <p className="text-sm text-gray-600">Sex: {patient.sex}</p>
                <p className="text-sm text-gray-600">Room: {patient.roomNo}</p>
                <p className="text-sm text-gray-600">Assigned Time: {patient.assignedTime}</p>
              </div>
            ))}
          </div>
          {pagePatientsAdmitted && <div className="mt-8 flex justify-center">
            <button
              onClick={() => setCurrentPageAdmitted(currentPageAdmitted - 1)}
              disabled={currentPageAdmitted === 1}
              className={currentPageAdmitted === 1 ? "bg-gray text-blue-500 border border-blue-500 px-4 py-2 mx-1 rounded-full" :
                "bg-white text-blue-500 hover:bg-blue-200 border border-blue-500 px-4 py-2 mx-1 rounded-full"}
            >
              {"<"}
            </button>
            <button
              onClick={() => setCurrentPageAdmitted(currentPageAdmitted + 1)}
              disabled={currentPageAdmitted >= (patientsAdmitted.length / patientsPerPage)}
              className={currentPageAdmitted >= patientsAdmitted.length / patientsPerPage ?
                "bg-gray text-blue-500 border border-blue-500 px-4 py-2 mx-1 rounded-full" :
                "bg-white text-blue-500 hover:bg-blue-200 border border-blue-500 px-4 py-2 mx-1 rounded-full"}
            >
              {">"}
            </button>
          </div>}

          <h2 className="text-xl font-bold text-red-500 mb-4 mt-8">Discharged</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pagePatientsDischarged && pagePatientsDischarged.map((patient) => (
              <div
                key={patient._id}
                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:bg-red-200"
                onClick={() => handleClick(patient._id)}
              >
                <h2 className="text-lg font-semibold text-blue-900">{patient.patientName}</h2>
                <p className="text-sm text-gray-600 mt-1">Age: {patient.age}</p>
                <p className="text-sm text-gray-600">Sex: {patient.sex}</p>
                <p className="text-sm text-gray-600">Room: {patient.roomNo}</p>
                <p className="text-sm text-gray-600">Assigned Time: {patient.assignedTime}</p>
              </div>
            ))}
          </div>
          {pagePatientsDischarged && <div className="mt-8 flex justify-center">
            <button
              onClick={() => setCurrentPageDischarged(currentPageDischarged - 1)}
              disabled={currentPageDischarged === 1}
              className={currentPageDischarged === 1 ? "bg-gray text-blue-500 border border-blue-500 px-4 py-2 mx-1 rounded-full" :
                "bg-white text-blue-500 hover:bg-blue-200 border border-blue-500 px-4 py-2 mx-1 rounded-full"}
            >
              {"<"}
            </button>
            <button
              onClick={() => setCurrentPageDischarged(currentPageDischarged + 1)}
              disabled={currentPageDischarged >= patientsDischarged.length / patientsPerPage}
              className={currentPageDischarged >= patientsDischarged.length / patientsPerPage ?
                "bg-gray text-blue-500 border border-blue-500 px-4 py-2 mx-1 rounded-full" :
                "bg-white text-blue-500 hover:bg-blue-200 border border-blue-500 px-4 py-2 mx-1 rounded-full"}
            >
              {">"}
            </button>
          </div>}
        </div>
      </div>
    </>
  );
};

export default MyPatientsPage;
