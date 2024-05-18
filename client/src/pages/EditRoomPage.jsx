import React from "react";
import FormField from "../components/FormField";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const EditRoomPage = () => {

  const { currentRoom, getAllRooms, updateRoom, id_to_equipment, equipment_to_id } = useGlobalContext();
  const navigate = useNavigate();

  console.log(currentRoom)

  const fieldsToAvoid = ["_id", "__v"];

  // Function to handle form submission
  const handleSubmit = async (formData) => {
      // Such as updating the patient data or sending it to a server
      if (formData["equipment"])
        formData["equipment"] = formData["equipment"].split(";").map(equip => {
          return equipment_to_id[equip];
        })
      await updateRoom(currentRoom._id, formData);
      getAllRooms();
      navigate("/all-rooms");
  };

  return (
      <>
          <Banner goBackPath={"/all-rooms"} />
          <div className="flex justify-center">
              <div className='mb-5'>
              <h1 className="text-3xl font-bold text-blue-500">Edit Room</h1>
              </div>
          </div>
          {currentRoom && <FormField
              fields={Object.keys(currentRoom)
                  .filter(key => {
                      if (!fieldsToAvoid.includes(key))
                          return true;
                  })
                  .map(key => {
                      let obj = {
                          name: key,
                          initialValue: currentRoom[key],
                          editable: true,
                          showEditIcon: true
                      };
                      if (key == "equipment") {
                        obj.initialValue = Object.values(obj.initialValue).map(equip => {
                          return id_to_equipment[equip._id]
                        }).join(";")
                      }
                      return obj
              })}
              submit={handleSubmit}
              buttonName="Save"
          />}
      </>
  );
};

export default EditRoomPage;
