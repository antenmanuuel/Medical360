import React from 'react';
import FormField from '../components/FormField';
import Banner from '../components/Banner';
import FileUpload from '../components/UploadFile';
import { useLocation } from 'react-router-dom';

const EditPatientInfoPage = () => {
    const fields = [
        { name: 'Care Notes', label:"Care Notes", initialValue: 'allergies', editable:true ,showEditIcon: true},
        { name: 'Age', label:"Age", initialValue: '21', editable:true ,  showEditIcon: true },
        { name: 'Sex', label:"Sex", initialValue: 'M', editable:true, showEditIcon: true },
        
      ];

  // Function to handle form submission
  const handleSubmit = (formData) => {
    // such as updating the profile data or sending it to a server
    console.log('Updated Profile Data:', formData);
  };

  return (
    <>
     <Banner goBackPath={"/"}></Banner>
     <h1 className="text-2xl font-semibold text-blue-600 text-center">Edit Patient Info</h1>
     <FileUpload/>
    <FormField 
      fields={fields} 
      submit={handleSubmit} 
      buttonName="Save"
    />
    

    </>
  );
};

export default EditPatientInfoPage;