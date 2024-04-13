import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';

const NewPatientPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: '',
        email: '',
        phoneNumber: '',
        healthInsurance: '',
        sex: '',
        age: '',
        patientStatus: '',
        roomNo: '',
        department: ''
    });
    const [departments, setDepartments] = useState([]);
    const [formError, setFormError] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/departments/alldepartments')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Failed to load departments', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation example
        if (!formData.patientName || !formData.email || !formData.phoneNumber) {
            alert('Please fill in all required fields.');
            return;
        }
    
        axios.post('https://medical360-d65d823d7d75.herokuapp.com/patients', formData)
            .then(response => {
                console.log('Patient created:', response.data);
                navigate("/all-patients");
            })
            .catch(error => {
                console.error('There was an error creating the patient:', error);
                setFormError(true);
            });
    };

    return (
        <>
            <Banner goBackPath={"/all-patients"} />
            <div className="flex justify-center">
                <form className="w-full max-w-lg p-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-center font-semibold mb-4">New Patient Form</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                            Patient Name
                        </label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthInsurance">
                            Health Insurance
                        </label>
                        <input
                            type="text"
                            name="healthInsurance"
                            value={formData.healthInsurance}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
                            Sex
                        </label>
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                            Age
                        </label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientStatus">
                            Patient Status
                        </label>
                        <select
                            name="patientStatus"
                            value={formData.patientStatus}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="admitted">Admitted</option>
                            <option value="discharged">Discharged</option>
                            <option value="under observation">Under Observation</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNo">
                            Room Number
                        </label>
                        <input
                            type="text"
                            name="roomNo"
                            value={formData.roomNo}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                            Department
                        </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept._id} value={dept._id}>{dept.departmentName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create New Patient
                        </button>
                    </div>
                    {formError && (
                        <p className="text-red-500 text-xs italic">Error submitting form. Please try again.</p>
                    )}
                </form>
            </div>
        </>
    );
};

export default NewPatientPage;


