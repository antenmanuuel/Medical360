import React from "react";
import FormField from "../components/FormField";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const EditEquipmentPage = () => {

  const { getAllEquipments, currentEquipment, updateEquipment } = useGlobalContext();
  const navigate = useNavigate();

  console.log(currentEquipment)


  const fieldsToAvoid = ["_id", "__v"];

  // useEffect(() => {
  //     async function fetchDepartments() {
  //         if (!departments)
  //             getAllDepartments();
  //     }
  //     fetchDepartments();
  // }, [departments])

  // Function to handle form submission
  const handleSubmit = async (formData) => {
      // Such as updating the patient data or sending it to a server
      // formData["department"] = department_to_id[formData["department"]];
      await updateEquipment(currentEquipment._id, formData);
      getAllEquipments();
      navigate("/all-equipments");
  };

  return (
      <>
          <Banner goBackPath={"/all-equipments"} />
          <div className="flex justify-center">
              <div className='mb-5'>
              <h1 className="text-3xl font-bold text-blue-500">Edit Equipment</h1>
              </div>
          </div>
          {currentEquipment && <FormField
              fields={Object.keys(currentEquipment)
                  .filter(key => {
                      if (!fieldsToAvoid.includes(key))
                          return true;
                  })
                  .map(key => {
                      let obj = {
                          name: key,
                          initialValue: currentEquipment[key],
                          label:key,
                          editable: true,
                          showEditIcon: true
                      };
                      return obj
              })}
              submit={handleSubmit}
              buttonName="Save"
          />}
      </>
  );
};

export default EditEquipmentPage;
