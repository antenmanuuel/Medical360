import React, { useState, useEffect } from 'react';
import { DocumentIcon, UploadIcon } from '@heroicons/react/outline';
import { useGlobalContext } from "../hooks/useGlobalContext";

const FileUpload = ({ patientId }) => {
  const [files, setFiles] = useState([]);
  const { updatePatient, currentPatient } = useGlobalContext();

  useEffect(() => {
    const fetchPatientFiles = async () => {
      setFiles(currentPatient.fileData.map((data, index) => ({
        name: `File ${index + 1}`,
        data: data,
      })));
    };
    if (currentPatient && currentPatient.fileData) 
      fetchPatientFiles();
  }, [currentPatient]);


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      const newFile = { name: file.name, data: base64 };
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      await updatePatient(patientId, { fileData: updatedFiles.map(f => f.data) });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      const newFile = { name: file.name, data: base64 };
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      await updatePatient(patientId, { fileData: updatedFiles.map(f => f.data) });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileClick = (file) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="p-6 bg-blue-500 rounded-lg max-w-md mx-auto my-8">
      <div
  className="relative border-dashed rounded border-2 border-blue-300 p-6 text-center cursor-pointer"
  onDragOver={handleDragOver}
  onDrop={handleDrop}
>
  <UploadIcon className="h-8 w-8 text-blue-700 mx-auto" />
  <p className="mt-1 text-sm text-blue-700">Click or drag file to this area to upload</p>
  <input
    type="file"
    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
    onChange={handleFileChange}
    multiple // if you want to allow multiple files
  />
</div>

      <div className="flex flex-col mt-4">
        <span className="text-sm font-semibold text-blue-700 mb-2">Files:</span>
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-2 rounded bg-blue-200 mb-2">
              <DocumentIcon className="h-6 w-6 text-blue-700" />
              <span className="text-sm text-blue-700 truncate">{file.name}</span>
              <button
                className="text-sm text-blue-700 underline"
                onClick={() => handleFileClick(file)}
              >
                View/Download
              </button>
            </div>
          ))}
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        {/* <button className="px-4 py-2 rounded text-sm font-semibold bg-white text-blue-700 hover:bg-blue-100">
          Cancel
        </button> */}
        {/* <button
          className="px-4 py-2 rounded text-sm font-semibold bg-blue-700 text-white hover:bg-blue-600"
          // onClick={fetchPatientFiles}
        >
          Refresh
        </button> */}
      </div>
    </div>
  );
};

export default FileUpload;





