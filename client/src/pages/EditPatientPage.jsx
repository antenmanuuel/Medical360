import FormField from "../components/FormField";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useEffect } from "react";

const EditPatientPage = () => {
  const {
    department_to_id,
    currentPatient,
    updatePatient,
    id_to_department,
    getAllDepartments,
    departments,
  } = useGlobalContext();
  const navigate = useNavigate();

  const fieldsToAvoid = [
    "_id",
    "medicalHistory",
    "__v",
    "procedures",
    "doctorAssigned",
    "process",
    "eventId",
    "visitNo",
    "fileData",
  ];

  useEffect(() => {
    async function fetchDepartments() {
      if (!departments) await getAllDepartments();
    }
    fetchDepartments();
  }, [departments]);

  const handleSubmit = async (formData) => {
    // Update the department ID in the form data if it's selected
    if (formData["department"]) {
      formData["department"] = department_to_id[formData["department"]];
    }
    await updatePatient(currentPatient._id, formData);
    navigate("/all-patients");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner goBackPath={"/all-patients"} />
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">Edit Patient</h1>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {currentPatient && departments && (
            <FormField
              fields={Object.keys(currentPatient)
                .filter((key) => !fieldsToAvoid.includes(key))
                .map((key) => {
                  const fieldConfig = {
                    name: key,
                    label: key,
                    initialValue: currentPatient[key],
                    editable: true,
                    showEditIcon: true,
                  };

                  if (key === "department") {
                    fieldConfig["options"] = Object.keys(department_to_id);
                    fieldConfig["type"] = "select";
                    fieldConfig["initialValue"] =
                      id_to_department[fieldConfig["initialValue"]];
                  }

                  return fieldConfig;
                })}
              submit={handleSubmit}
              buttonName="Save"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;
