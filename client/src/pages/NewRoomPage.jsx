import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import FormField from '../components/FormField';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';

const NewRoomPage = () => {
    const [formError, setFormError] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { getAllEquipments, createRoom, equipments } = useGlobalContext();
    const [equipmentOptions, setEquipmentOptions] = useState([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            if (!equipments) await getAllEquipments();
        };
    
        fetchEquipments();
    }, [equipments]);

    useEffect(() => {
        if (equipments) {
            const operationalEquipments = equipments
                .filter(equip => equip.quantity > 0 && equip.maintenanceStatus === "Operational")
                .map(equip => ({
                    label: `${equip.equipmentName} (${equip.location})`,
                    value: equip._id
                }));
            setEquipmentOptions(operationalEquipments);
        }
    }, [equipments]);

    const fields = [
        { name: 'roomNumber', label: 'Room Number', initialValue: '', editable: true, error: errors.roomNumber },
        { name: 'roomType', label: 'Room Type', initialValue: '', editable: true, error: errors.roomType },
        { 
            name: 'equipment', 
            label: 'Equipment', 
            initialValue: [], 
            editable: true, 
            type: 'multi-select',
            options: equipmentOptions,
            error: errors.equipment
        },
        { 
            name: 'availabilityStatus', 
            label: 'Availability Status', 
            initialValue: '', 
            editable: true, 
            type: 'select', 
            options: ['Occupied', 'Available'],
            error: errors.availabilityStatus
        }
    ];

    const validateForm = (formData) => {
        let valid = true;
        let newErrors = {};
        
        if (!formData.roomNumber) {
            newErrors.roomNumber = "Room number is required.";
            valid = false;
        } else if (!/^\d+$/.test(formData.roomNumber)) {
            newErrors.roomNumber = "Room number must be numeric.";
            valid = false;
        }
        
        if (!formData.roomType) {
            newErrors.roomType = "Room type is required.";
            valid = false;
        }
        
        if (!formData.equipment) {
            newErrors.equipment = "At least one equipment must be selected.";
            valid = false;
        }
        
        if (!formData.availabilityStatus) {
            newErrors.availabilityStatus = "Availability status is required.";
            valid = false;
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (formData) => {
        if (validateForm(formData)) {
            try {
                const response = await createRoom(formData);
                if (response.status === 201) {
                    navigate('/all-rooms');
                } else {
                    setFormError(true);
                }
            } catch (error) {
                console.error('Error submitting new room:', error);
                setFormError(true);
            }
        }
    };

    return (
        <>
            <Banner goBackPath="/all-rooms" />
            <div className="flex justify-center">
                <div className="text-blue-500 p-4 m-4 rounded-lg text-3xl">
                    New Room Form
                </div>
            </div>
            <FormField fields={fields} submit={handleSubmit} buttonName="Create Room" />
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

export default NewRoomPage;
