
import React, { useState } from 'react';
import TextField from './TextField';
import MultiSelectField from './MultiSelectField';

const FormField = ({ fields, submit, buttonName }) => {
    console.log(fields);
    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data:', formData);
        submit(formData);
    };

    return (
        <div className="max-w-md mx-auto">
            {fields.map((field, index) => {
                if (field.type === 'multi-select') {
                    return (
                        <MultiSelectField
                            key={index}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name] || []}
                            options={field.options}
                            onChange={handleInputChange}
                            error={field.error}
                        />
                    );
                } else {
                    return (
                        <TextField
                            key={index}
                            name={field.name}
                            label={field.label}
                            initialValue={formData[field.name] || field.initialValue}
                            editable={field.editable}
                            showEditIcon={field.showEditIcon}
                            type={field.type}
                            onChange={handleInputChange}
                            options={field.options}
                            error={field.error}
                        />
                    );
                }
            })}
            <div className="flex justify-center">
                <button
                    className={`font-bold py-2 px-4 rounded mt-4 m-4 ${
                        buttonName.toLowerCase() === 'delete user' ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
                    } text-white`}
                    onClick={handleSubmit}
                >
                    {buttonName}
                </button>
            </div>
        </div>
    );
};


export default FormField;
