import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const ScheduleModal = ({
  isScheduleOpen,
  onClose,
  doctor,
  patientId,
  patientName,
  onSelectEvent,
}) => {
  const [availableEvents, setAvailableEvents] = useState([]);
  const { getEvents, getDoctorByUser, updateEvent, updatePatient, updateDoctor, BASE_URL, currentPatient } =
    useGlobalContext();

  console.log("Doctor coming", doctor, patientName);

  useEffect(() => {
    if (isScheduleOpen && doctor) {
      const fetchDoctorEvents = async () => {
        try {
          const userData = await getDoctorByUser(doctor._id);
          const events = await getEvents(userData._id);
          const availableEvents = events.filter(
            (event) => event.status === "available"
          );
          setAvailableEvents(availableEvents);
        } catch (error) {
          console.error("Error fetching doctor events:", error);
        }
      };
      fetchDoctorEvents();
    }
  }, [isScheduleOpen, doctor]);

  const formatDateAndTime = (startDate, endDate) => {
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    const formattedDate = new Date(startDate).toLocaleDateString('en-US', dateOptions);
    const startTime = new Date(startDate).toLocaleTimeString('en-US', timeOptions);
    const endTime = new Date(endDate).toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate}, ${startTime}-${endTime}`;
  };

  const handleAssign = async (event) => {
    try {
      const assignedTime = formatDateAndTime(event.start, event.end);

      const updatedEvent = {
        ...event,
        title: patientName,
        status: "patient_assigned",
      };

      await updateEvent(updatedEvent);

      const patientUpdate = {
        doctorAssigned: doctor._id,
        assignedTime: assignedTime,
        eventId: event._id,
      };

      await updatePatient(patientId, patientUpdate);

      try {
        const response = await fetch(`${BASE_URL}/doctors/${doctor._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doctorId: doctor._id }),
        });

        if (response.ok) {
          const doctorData = await response.json();
          const doctor = doctorData.doctor;

          const newPatientEntry = {
            patientId: patientId,
            assignedTime: assignedTime,
            eventId: event._id,
          };

          await updateDoctor(doctor._id, {
            patientList: [...doctor.patientList, newPatientEntry]
          });

          console.log("Doctor id", doctor._id, newPatientEntry);
        }
      } catch (err) {
        console.log(err.message);
      }

      onClose();
      onSelectEvent(event);
    } catch (error) {
      console.error("Error assigning event:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return isScheduleOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-2/4 h-2/4 overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl mb-4">
          Available Events for Dr. {doctor?.name}
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Date</th>
              <th className="border border-gray-200 px-4 py-2">Start Time</th>
              <th className="border border-gray-200 px-4 py-2">End Time</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {availableEvents.map((event) => (
              <tr key={event._id}>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(event.start).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(event.start).toLocaleTimeString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(event.end).toLocaleTimeString()}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
                    onClick={() => handleAssign(event)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ScheduleModal;
