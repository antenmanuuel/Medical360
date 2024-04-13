import React, { useState } from 'react';
import Banner from '../components/Banner';
import FormField from '../components/FormField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DepartmentForm = () => {
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate();

    // Define the fields for the department form
    const fields = [
        { name: 'Name', initialValue: '', editable: true },
        { name: 'Icon', initialValue: '', editable: true, type: 'file' },
        
    ];

    // Function to handle form submission
    // const handleSubmit = (formData) => {
    //     // such as sending the new department data to a server
    //     console.log('New Department Data:', formData);
        
    //     axios.post('http://localhost:3000/department/department', formData)
    //     .then(response => {
    //         console.log('Department created:', response.data);
    //         navigate('/departmentpage');
            
    //     })
    //     .catch(error => {
    //         console.error('There was an error creating the department:', error);
    //         setFormError(true); 
    //     });
       
       
    // };
    const handleSubmit = (formData) => {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        console.log("I am creating the department data");
    
        axios.post('https://medical360-d65d823d7d75.herokuapp.com/departments/department', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log('Department created:', response.data);
            navigate('/departmentpage');
        })
        .catch(error => {
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
            <FormField fields={fields} submit={handleSubmit} buttonName={"Create New Department"} />
            {formError && (
                <div className="flex justify-center items-center">
                    <div className="m-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error submitting form. Please try again.</strong>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentForm;