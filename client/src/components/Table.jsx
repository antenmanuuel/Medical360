import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";


const Table = ({ cards, isAdmin, context, showEditButton = true, showDeleteButton=true}) => {
  let newCards = cards

  const { id_to_department, id_to_equipment, deleteEquipment, deletePatient, deleteRoom, deleteUser, getPatient, getEquipment, getRoom, getDoctor} = useGlobalContext();
    if (context === "patient") {
      newCards = cards.map((patient) => {
        return {
          name: patient.patientName,
          email: patient.email,
          sex: patient.sex,
          age: patient.age,
          status: patient.patientStatus,
          room: patient.roomNo,
          department: patient.department? id_to_department[patient.department]: "N/A",
        };
      });
    }

  if (context === "user") {
    newCards = cards.map((user) => {
      return {
        name: user.name,
        email: user.email,
        department: id_to_department[user.department],
      };
    });
  }

  if (context === "room") {
    newCards = cards.map((room) => {

      const equipmentNames = room.equipment.map(
        (equipmentId) => id_to_equipment[equipmentId] || 'Unknown Equipment'
      ).join(', ');
      return {
        number:`Room ${room.roomNumber}`, 
        type: room.roomType,
        equipments: equipmentNames,
        'Availability Status': room.availabilityStatus,
      };
    });
  }
  if (context === "equipment") {
    newCards = cards.map((equipment) => {
      return {
        name: equipment.equipmentName,
        type: equipment.equipmentType,
        quantity: equipment.quantity,
        location: equipment.location,
        'Maintenance Status': equipment.maintenanceStatus,
      };
    });
  }

  let fields = newCards && newCards.length > 0 ? Object.keys(newCards[0]) : [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  // Placeholder function for handling item deletion
  const handleDelete = () => {
    console.log(`Deleting ${context}:`, itemToDelete);
    // Here you would typically call a function to delete the item,
    // e.g., deleteItem(itemToDelete).then(() => setShowDeleteModal(false));
    if (context === "patient") deletePatient(itemToDelete._id);
    else if (context === "user") deleteUser(itemToDelete._id);
    else if (context === "equipment") deleteEquipment(itemToDelete._id);
    else if (context === "room") deleteRoom(itemToDelete._id);
    setShowDeleteModal(false); // Close modal after deletion
  };

  // Function to dynamically determine the edit route based on the context
  const getEditRoute = (context) => {
    const routeMap = {
      patient: "/edit-patient",
      room: "/edit-room",
      equipment: "/edit-equipment",
      user: "/edit-user",
    };
    return routeMap[context] || "/";
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Handle the edit action
  const handleEdit = (itemId) => {
    if (context === "patient") getPatient(itemId); // marks this patient as the current patient to edit
    if (context === "equipment") getEquipment(itemId);
    if (context == "room") getRoom(itemId);
    const editRoute = getEditRoute(context);
    navigate(`${editRoute}`);
  };
  const getRowDataCy = (context, card, index) => {
    switch(context) {
      case "room":
        return `room-${card.roomNumber}`;  // Assuming each room has a unique roomNumber field
      case "equipment":
        return `equipment-${card.equipmentName}`;  // Adjust according to your equipment identifier
      default:
        return `item-${index}`;  // Fallback to index if no unique identifier available
    }
  };

  const handleClick = (itemId) => {
    switch (context) {
      case "patient":
        getPatient(itemId);
        // navigate("/patient-info");
        navigate(`/patient-info/${itemId}`);

        break;
      case "doctor":
        getDoctor(itemId);
        navigate(`/doctor-info/${itemId}`);
        break;
      case "user":
        console.log("tried");
        navigate(`/user-info/${itemId}`);
    }
  }
  return (
    <div className="overflow-x-auto relative">
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="min-w-full">
          <thead>
            <tr>
              {fields.map((field, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {field}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, index) => (
              <tr
                key={index}
                data-cy={getRowDataCy(context, card,index)}
                // style={{
                //   backgroundColor: index % 2 === 0 ? "#EDF2FB" : "#ABC4FF",
                // }}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-300'}`}
                onClick={() => handleClick(card._id)}
              >
                {fields.map((field, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                  >
                    {newCards[index][field]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-right">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    {/* <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-l"
                    onClick={() => console.log("Info for:", card)}
                  >
                    Info
                  </button> */}
                    {isAdmin && showEditButton && (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEdit(card._id);
                          }}
                        >
                          Edit
                        </button>
                        {/* <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-r"
                          onClick={(event) => {
                            event.stopPropagation();
                            openDeleteModal(card);
                          }}
                        >
                          Delete
                        </button> */}
                      </>
                    )}
                    {isAdmin && showDeleteButton && (
                      <>
                        
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-r"
                          onClick={(event) => {
                            event.stopPropagation();
                            openDeleteModal(card);
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deletion Confirmation Modal */}
      {showDeleteModal && (
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
                      Confirm Deletion
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
