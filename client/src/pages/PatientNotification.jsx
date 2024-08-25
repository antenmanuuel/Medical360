import React from 'react';
import Banner from '../components/Banner';
import FormField from '../components/FormField';
const PatientNotification = () => {
    const fields = [
        { name: 'Name', initialValue: 'Doe', editable: false, showEditIcon: false },
        { name: 'Age', initialValue: '20', editable: false, showEditIcon: false },
        { name: 'Date', initialValue: '20 March, 2024', editable: false, showEditIcon: false },
        { name: 'Place', initialValue: 'Room 201', editable: false, showEditIcon: false },
        { name: 'Consultant', initialValue: 'Caty', editable: false, showEditIcon: false },
        { name: 'Department', initialValue: 'Dermatology', editable: false, showEditIcon: false },
        { name: 'Reason of Visit', initialValue: 'Fever', editable: false, showEditIcon: false },
        { name: 'Status', initialValue: 'Consultation', editable: false, showEditIcon: false }
      ];

  const handleSubmit = (formData) => {
    // Implement submission logic here
    console.log('Form data:', formData);
  };

  const handleReject = () => {
    // Implement rejection logic here
    console.log('Form rejected');
  };

  return (
    <>
      <Banner goBackPath={"/apppage"}/>
      <div className="max-w-md mx-auto">
        <FormField
          fields={fields}
          submit={handleSubmit}
          buttonName="Confirm"
        />
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientNotification;
