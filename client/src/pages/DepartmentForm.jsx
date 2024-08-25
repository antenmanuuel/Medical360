import React, { useState } from "react";
import Banner from "../components/Banner";
import FormField from "../components/FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DepartmentForm = () => {
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  const { BASE_URL, getAllDepartments,createDepartment } = useGlobalContext();

    // Define the fields for the department form
    const fields = [
        { name: 'Name', label:'Name', initialValue: '', editable: true },
        { name: 'Icon', label:'Icon',initialValue: '', editable: true, type: 'file' },
        
    ];

    
    const handleSubmit = (formData) => {
      console.log("Form data",formData);
      const data = new FormData();
      // Object.keys(formData).forEach(key => {
      //   data.append(key, formData[key]);
      // });
      Object.keys(formData).forEach(key => {
        if (key !== 'icon') {
          data.append(key, formData[key]);
        }
      });
    
      // Append file field (icon)
      if (formData.icon) {
        data.append('icon', formData.icon);
      }
    
      // Check the FormData entries
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
    
      createDepartment(data).then(() => {
        navigate('/departmentpage');
      }).catch(error => {
        console.error('There was an error creating the department:', error);
        setFormError(true);
      });
    };

  return (
    <>
      <Banner goBackPath={"/departmentpage"} />
      <div className="flex justify-center">
        <div className="text-blue-500 p-4 m-4 rounded-lg text-3xl">
          New Department Form
        </div>
      </div>
      <FormField
        fields={fields}
        submit={handleSubmit}
        buttonName={"Create New Department"}
      />
      {formError && (
        <div className="flex justify-center items-center">
          <div
            className="m-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">
              Error submitting form. Please try again.
            </strong>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentForm;
