import React from "react";
import FormField from "../components/FormField";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const EditEquipmentPage = () => {
  const { getAllEquipments, currentEquipment, updateEquipment } = useGlobalContext();
  const navigate = useNavigate();

  const fieldsToAvoid = ["_id", "__v"];

  // Function to handle form submission
  const handleSubmit = async (formData) => {
    await updateEquipment(currentEquipment._id, formData);
    getAllEquipments();
    navigate("/all-equipments");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Banner */}
      <Banner goBackPath="/all-equipments" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Edit Equipment
          </h1>

          {currentEquipment && (
            <FormField
              fields={Object.keys(currentEquipment)
                .filter((key) => !fieldsToAvoid.includes(key))
                .map((key) => ({
                  name: key,
                  initialValue: currentEquipment[key],
                  label: key.replace(/_/g, " ").toUpperCase(), // Format label
                  editable: true,
                  showEditIcon: true,
                }))}
              submit={handleSubmit}
              buttonName="Save Changes"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEquipmentPage;
