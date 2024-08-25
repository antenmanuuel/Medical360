import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from 'react-router-dom';
const formatForDatetimeLocal = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditEventModel = ({ event, onSave, onDelete, onClose, userId, currentOwner, userAdmin,patientName,doctorId ,patientId}) => {
  const [title, setTitle] = useState(event.title || "");
  const [status, setStatus] = useState(event.status || "available");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [isEditing, setIsEditing] = useState(false);
 const {updatePatient,updateDoctor, BASE_URL}=useGlobalContext();
  useEffect(() => {
    if(patientName)
     {
      setTitle(patientName|| "");
     }
     else
     {
      setTitle(event.title|| "");
     }
    setStatus(event.status || "available");
    setStart(event.start ? formatForDatetimeLocal(new Date(event.start)) : "");
    setEnd(event.end ? formatForDatetimeLocal(new Date(event.end)) : "");
  }, [event]);

  const handleSave = async() => {
    const updatedEvent = {
      ...event,
      title,
      status,
      start: userAdmin && userId !== currentOwner ? event.start : new Date(start),
      end: userAdmin && userId !== currentOwner ? event.end : new Date(end),
    };
    onSave(updatedEvent);
    
  };

  const startEditing = () => {
    if(userAdmin && userId !== currentOwner)
      {setIsEditing(false);}
    else
    {
      setIsEditing(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Event" : "Event Options"}</h2>
        {isEditing ? (
          <>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            {/* Only render time inputs if not an admin editing another user's calendar */}
            {!(userAdmin && userId !== currentOwner) && (
              <>
                <label className="block mb-2">
                  Start Time:
                  <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="block w-full mt-1 p-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  End Time:
                  <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="block w-full mt-1 p-2 border rounded"
                  />
                </label>
              </>
            )}
            {/* Status selection */}
            {(userAdmin && userId !== currentOwner) ? (
              <label className="block mb-4">
                Status:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full mt-1 p-2 border rounded"
                >
                  <option value="patient_assigned">Patient Assigned</option>
                </select>
              </label>
            ) : (userId === currentOwner) && (
              <label className="block mb-4">
                Status:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full mt-1 p-2 border rounded"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            )}
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button
              onClick={startEditing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Edit
            </button>
            {((userId === currentOwner) || (userAdmin && event.status === "patient_assigned" && userId !== currentOwner)) && (
              <button
                onClick={() => onDelete(event)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
            
          </>
        )}
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditEventModel;
