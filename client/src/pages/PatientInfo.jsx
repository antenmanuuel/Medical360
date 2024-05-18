import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ScheduleModal from "./ScheduleModal";
import RemoveDoctorModal from "./RemoveDoctorModal";
import { useProcessContext } from "../hooks/useProcessContext";
import { Button } from '@mui/material';
import FileUpload from "../components/UploadFile";

const PatientInfo = ({}) => {
  const {
    id_to_department,
    updatePatient,
    removeCurrentDoctor,
    doctors,
    departments,
    getAllDoctors,
    updateDoctor,
    currentDoctor,
    getDoctor,
    BASE_URL,
    getPatient,
    updateEvent,
    getEvent,
    getDepartment,
    getAllDepartments
  } = useGlobalContext();
  const { currentProcess, getProcess, updateProcess } = useProcessContext();
  const { user } = useAuthContext();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  const [currentPatient, setCurrentPatient] = useState(null);
  const [events, setEvents] = useState(null);
  const [viewedDoctors, setViewedDoctors] = useState([]);
  const [doctorToRemove, setDoctorToRemove] = useState(null);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(false);

  const { id } = useParams();
  

  useEffect(() => {
    async function fetchDoctor(doctorId) {
      await getDoctor(doctorId);
    }
    async function fetchDepartments() {
      await getAllDepartments();
    }
    async function fetchProcess() {
      await getProcess(currentPatient.process);
    }
    async function fetchDoctors() {
      await getAllDoctors();
    }
    
    if (!departments) fetchDepartments();
    if (!doctors) fetchDoctors();
    if (currentPatient && !currentProcess && currentPatient.process) fetchProcess();
    if (currentPatient && currentPatient.doctorAssigned)
      fetchDoctor(currentPatient.doctorAssigned);
    else removeCurrentDoctor();
  }, [doctors, currentPatient, departments]);
  useEffect(() => {
    const fetchPatientEvents = async () => {
      try {
        const patient = await getPatient(id);
        setCurrentPatient(patient);

        if (patient.department) {
          const department = await getDepartment(patient.department);
          setCurrentDepartment(department);
        }
      } catch (error) {
        console.error("Error fetching doctor events:", error);
      }
    };
    fetchPatientEvents();
  }, [currentPatient]);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsScheduleOpen(true);
    if (!viewedDoctors.includes(doctor._id)) {
      setViewedDoctors([...viewedDoctors, doctor._id]);
    }
  };
  const removeDoctor = (doctorId) => {
    setDoctorToRemove(doctorId);
    setRemoveModalOpen(true);
  };
  const discharge = async () => {
    if (!currentProcess || !currentProcess.completed) {
      alert("You must complete this patients process first");
      setModal(false);
      setIsOpen(false);
      return;
    }

    if (currentPatient)
      await updatePatient(currentPatient._id, {
        patientStatus: "discharged",
        roomNo: "N/A",
        department: null,
      });
    setModal(false);
    setIsOpen(false);

    // update doctor by deleting patient to list
    if (currentDoctor) {
      let id = currentDoctor._id;
      try {
        const response = await fetch(`${BASE_URL}/doctors/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          const doctor = (await response.json()).doctor;
          const updatedPatientList = currentDoctor.patientList.filter(
            (p) => p.patientId !== currentPatient._id
          );
          await updateDoctor(doctor._id, { patientList: updatedPatientList });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleRemoveDoctorConfirm = async (isDoctorSeen) => {
    if (!currentPatient) return;

    try {
      const eventId = currentPatient.eventId;
      if (!eventId) return;

      const event = await getEvent(eventId);

      if (!isDoctorSeen) {
        const updatedEvent = {
          ...event,
          title: "Available",
          status: "available",
        };
        await updateEvent(updatedEvent);

        if (currentDoctor) {
          const updatedPatientList = currentDoctor.patientList.filter(
            (p) => p.patientId !== currentPatient._id
          );
          await updateDoctor(currentDoctor._id, {
            patientList: updatedPatientList,
          });
        }
      };
        await updatePatient(currentPatient._id, {
          doctorAssigned: null,
          eventId: null,
          assignedTime: null,
        });
      
      setRemoveModalOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to remove doctor assignment:", error);
    }
  };

  
  

  const filteredDoctors =
    doctors && currentPatient && currentPatient.department
      ? doctors.filter(
          (doctor) => doctor.departmentName === currentPatient.department
        )
      : [];

  if (!currentPatient) {
    return <div>No patient data available.</div>;
  }

  return (
    <>
      <Banner goBackPath={"/all-patients"} />
      <RemoveDoctorModal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onConfirm={handleRemoveDoctorConfirm}
      />
      {currentPatient && (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg max-w-5xl w-full min-h-[600px]">
            {/* Row 2: Name and Department */}
            <div className="flex justify-center items-center bg-white p-4 rounded-lg mb-4">
              <div>
                <h2 className="text-xl font-semibold text-center text-[#2260FF]">
                  {currentPatient.patientName}
                </h2>
                <p className="text-center ">{currentPatient.email}</p>
              </div>
            </div>
            {/* Row 1: Image and Details */}
            <div className="flex -mx-4 items-start">
              <div className="flex-1 px-4 space-y-4">
                <div className="flex">
                  <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                    <h3 className="font-semibold text-md">Age</h3>
                    <p>{currentPatient.age}</p>
                  </div>
                  <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                    <h3 className="font-semibold text-md">Sex</h3>
                    <p>{currentPatient.sex}</p>
                  </div>
                  <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg">
                    <h3 className="font-semibold text-md">Phone Number</h3>
                    <p>{currentPatient.phoneNumber}</p>
                  </div>
                </div>
              
                <div className="flex">
                  <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                    <h3 className="font-semibold text-md">Room</h3>
                    <p>{currentPatient.roomNo}</p>
                  </div>
                  <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                    <h3 className="font-semibold text-md">Status</h3>
                    <p>{currentPatient.patientStatus}</p>
                  </div>
                  <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg">
                    <h3 className="font-semibold text-md">Department</h3>
                    <p>
                      {currentDepartment.departmentName
                        ? currentDepartment.departmentName
                        : "N/A"}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            <FileUpload patientId={currentPatient._id}></FileUpload>
            {/* Row 3: Schedule */}
            <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg mt-4">
              <div className="flex items-center space-x-5">
                {currentDoctor ? (
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-blue-600 mr-4">
                      <span className="text-gray-700">Doctor(s) Assigned:</span>{" "}
                      {currentDoctor.name}
                      <span className="text-lg text-gray-500 ml-2 font-bold">
                        ({currentPatient.assignedTime})
                      </span>
                    </h3>
                    {user.isAdmin && (
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-700"
                        onClick={() => removeDoctor(currentDoctor._id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="bg-violet-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-900"
                      disabled={currentPatient.patientStatus === "discharged"}
                    >
                      Assign Doctor
                    </button>
                    {isOpen && filteredDoctors.length > 0 && (
                      <div className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg">
                        <div className="py-1">
                          <ul className="overflow-auto max-h-48 space-y-3">
                            {filteredDoctors.map((doctor) => (
                              <li
                                key={doctor._id}
                                className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                              >
                                <div>
                                  <span
                                    className={
                                      viewedDoctors.includes(doctor._id)
                                        ? "text-gray-400"
                                        : "text-black"
                                    }
                                  >
                                    {doctor.name}
                                  </span>
                                  {viewedDoctors.includes(doctor._id) && (
                                    <span className="ml-2 badge">Viewed</span>
                                  )}
                                </div>
                                <button
                                  className={`px-4 py-2 rounded-lg ${
                                    viewedDoctors.includes(doctor._id)
                                      ? "bg-gray-400 text-white"
                                      : "bg-blue-500 text-white"
                                  }`}
                                  onClick={() => handleDoctorClick(doctor)}
                                >
                                  {viewedDoctors.includes(doctor._id)
                                    ? "View Again"
                                    : "View"}
                                </button>
                              </li>
                            ))}
                          </ul>
                          <div className="flex justify-end mt-4">
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 mr-2"
                              onClick={() => setIsOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {isOpen && filteredDoctors.length === 0 && (
                      <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg p-4">
                        <p>No doctors available in this department.</p>
                      </div>
                    )}
                    {isScheduleOpen && (
                      <ScheduleModal
                        isScheduleOpen={isScheduleOpen}
                        onClose={() => setIsScheduleOpen(false)}
                        doctor={selectedDoctor}
                        patientId={id}
                        patientName={currentPatient.patientName}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: Profile */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-lg flex flex-col items-center">
              <Button
                component={Link}
                to="/process-details"
                variant="contained"
                color="primary"
                className="text-white font-semibold text-xl mt-4"
                sx={{ '&:hover': { backgroundColor: '#0E5A8A' } }}
              >
                View Process
              </Button>
            </div>
              {/* <div className="space-y-4">
                {currentProcess && currentProcess.procedures.map((procedure, index) => (
                  <div
                    key={procedure._id}
                    className="border-b border-gray-200 pb-4 relative"
                  >
                    <p className="text-gray-600 font-medium mb-2">
                      Start: {dayjs(procedure.start).format('YYYY-MM-DD HH:mm:ss')}
                    </p>
                    <p className="text-gray-600 font-medium mb-2">
                      End: {dayjs(procedure.end).format('YYYY-MM-DD HH:mm:ss')}
                    </p>
                    <ul className="list-disc pl-5">
                      {Object.keys(procedure).map((field, index) => {
                        if (field === "department") {
                          return (
                            <li
                              key={index}
                              className={
                                procedure[field] === "Patient Discharged"
                                  ? "text-red-500"
                                  : "text-gray-600"
                              }
                            >
                              <span className="font-medium">{field}:</span>{" "}
                              {id_to_department[procedure[field]]}
                            </li>
                          );
                        } else if (field !== "_id" && field !== "date" && field !== "doctor" && field !== "completed" && field !== "start" && field !== "end") {
                          return (
                            <li
                              key={index}
                              className={
                                procedure[field] === "Patient Discharged"
                                  ? "text-red-500"
                                  : "text-gray-600"
                              }
                            >
                              <span className="font-medium">{field}:</span>{" "}
                              {procedure[field] ? procedure[field] : "N/A"}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                    {!procedure.completed ? <button
                      className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleProcedureComplete(procedure._id)} >
                      Complete
                    </button> : <><div
                    className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md mr-20"
                    >Procedure Completed</div> <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleProcedureNotComplete(procedure._id)}
                    >Undo</button> </> }
                  </div>
                ))}
                {currentProcess && !currentProcess.completed ? <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleProcessComplete(currentProcess._id)}
                >
                  Complete Process
                </button> : <> <button
                  disabled={true}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Process Completed
                </button> <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleProcessNotComplete(currentProcess._id)}
                >
                  Undo
                </button> </>}
                </div> */}

            {/* Row 5: Schedule Button */}
            <div className="flex justify-center mt-4">
              {currentPatient.patientStatus !== "discharged" ? (
                <>
                  {/* <button
                    className="bg-[#2260FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 mr-4"
                    onClick={() => navigate("/add-procedure")}
                  >
                    Add Procedure
                  </button> */}
                  <button
                    className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800"
                    onClick={() => setModal(true)}
                  >
                    Discharge Patient
                  </button>
                </>
              ) : (
                <div className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold">
                  This Patient has Been Discharged
                </div>
              )}
            </div>
            {modal && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          {/* Warning Icon */}
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Confirm Discharge
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to discharge this patient?
                              This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => discharge()}
                      >
                        Discharge
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PatientInfo;