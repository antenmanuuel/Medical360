import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import FormField from "../components/FormField";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const NewRoomPage = () => {
  const [formError, setFormError] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { getAllEquipments, createRoom, equipments } = useGlobalContext();
  const [equipmentOptions, setEquipmentOptions] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      if (!equipments) await getAllEquipments();
    };
    fetchEquipments();
  }, [equipments]);

  useEffect(() => {
    if (equipments) {
      const operationalEquipments = equipments
        .filter(
          (equip) =>
            equip.quantity > 0 && equip.maintenanceStatus === "Operational"
        )
        .map((equip) => ({
          label: `${equip.equipmentName} (${equip.location})`,
          value: equip._id,
        }));
      setEquipmentOptions(operationalEquipments);
    }
  }, [equipments]);

  const fields = [
    {
      name: "roomNumber",
      label: "Room Number",
      initialValue: "",
      editable: true,
      error: errors.roomNumber,
    },
    {
      name: "roomType",
      label: "Room Type",
      initialValue: "",
      editable: true,
      error: errors.roomType,
    },
    {
      name: "equipment",
      label: "Equipment",
      initialValue: [],
      editable: true,
      type: "multi-select",
      options: equipmentOptions,
      error: errors.equipment,
    },
    {
      name: "availabilityStatus",
      label: "Availability Status",
      initialValue: "",
      editable: true,
      type: "select",
      options: ["Occupied", "Available"],
      error: errors.availabilityStatus,
    },
  ];

  const validateForm = (formData) => {
    let valid = true;
    let newErrors = {};

    if (!formData.roomNumber) {
      newErrors.roomNumber = "Room number is required.";
      valid = false;
    } else if (!/^\d+$/.test(formData.roomNumber)) {
      newErrors.roomNumber = "Room number must be numeric.";
      valid = false;
    }

    if (!formData.roomType) {
      newErrors.roomType = "Room type is required.";
      valid = false;
    }

    if (!formData.equipment || formData.equipment.length === 0) {
      newErrors.equipment = "At least one equipment must be selected.";
      valid = false;
    }

    if (!formData.availabilityStatus) {
      newErrors.availabilityStatus = "Availability status is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (formData) => {
    if (validateForm(formData)) {
      try {
        const response = await createRoom(formData);
        if (response.status === 201) {
          navigate("/all-rooms");
        } else {
          setFormError(true);
        }
      } catch (error) {
        console.error("Error submitting new room:", error);
        setFormError(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner goBackPath="/all-rooms" />
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Page Header */}
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-6">
          New Room Form
        </h1>

        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <FormField
            fields={fields}
            submit={handleSubmit}
            buttonName="Create Room"
          />
        </div>

        {/* Error Message */}
        {formError && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
            <strong>Error submitting form. Please try again.</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewRoomPage;
