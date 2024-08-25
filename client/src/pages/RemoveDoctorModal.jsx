
import React from 'react';

const RemoveDoctorModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Remove Doctor</h2>
        <p>Has the doctor already seen this patient?</p>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => onConfirm(true)}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => onConfirm(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveDoctorModal;
