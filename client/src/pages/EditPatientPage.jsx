import FormField from '../components/FormField';
import Banner from '../components/Banner';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useEffect, useState } from 'react';

const EditPatientPage = () => {

    const { department_to_id, currentPatient, updatePatient, id_to_department, getAllDepartments, departments, getAllPatients } = useGlobalContext();
    const navigate = useNavigate();


    const fieldsToAvoid = ["_id", "medicalHistory", "__v"];

    console.log(departments);
    console.log(department_to_id);

    useEffect(() => {
        async function fetchDepartments() {
            if (!departments)
                getAllDepartments();
        }
        fetchDepartments();
    }, [departments])

    // Function to handle form submission
    const handleSubmit = async (formData) => {
        // Such as updating the patient data or sending it to a server
        if (formData["department"])
            formData["department"] = department_to_id[formData["department"]];
        await updatePatient(currentPatient._id, formData);
        getAllPatients();
        navigate("/all-patients");
    };

    return (
        <>
            <Banner goBackPath={"/all-patients"} />
            <div className="flex justify-center">
                <div className='mb-5'>
                <h1 className="text-3xl font-bold text-blue-500">Edit Patient</h1>
                </div>
            </div>
            {currentPatient && Object.keys(department_to_id).length === 0 && <FormField
                fields={Object.keys(currentPatient)
                    .filter(key => {
                        if (!fieldsToAvoid.includes(key))
                            return true;
                    })
                    .map(key => {
                        let obj = {
                            name: key,
                            initialValue: currentPatient[key],
                            editable: true,
                            showEditIcon: true
                        };
                        if (key == "department") {
                            obj["options"] = Object.keys(department_to_id);
                            obj["type"] = "select";
                            obj["initialValue"] = id_to_department[obj["initialValue"]]
                        }
                        return obj
                })}
                submit={handleSubmit}
                buttonName="Save"
            />}
        </>
    );
};

export default EditPatientPage;
