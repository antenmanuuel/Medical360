// Create a new file named ChangePasswordPage.js

import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';

const ChangePasswordPage = () => {

    const { id } = useParams();
    const location = useLocation();
    const { email } = location.state;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { BASE_URL } = useGlobalContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if newPassword matches confirmPassword
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({email, newPassword}),
            });
            if (response.ok) {
                let json = await response.json();
                console.log(json)
            }
        } catch (err) {
            console.log(err);
        }
        // Reset form fields and error state after successful password change
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        navigate(`/user-info/${id}`);
    };

    return (
        <>
            <Banner goBackPath={`/user-info/${id}`}/>
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg max-w-5xl w-full min-h-[600px]">
                    <h2 className="text-xl font-semibold text-center text-[#2260FF] mb-4">Change Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="old-password" className="font-semibold mb-2">Old Password</label>
                        <input type="password" id="old-password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="new-password" className="font-semibold mb-2">New Password</label>
                        <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirm-password" className="font-semibold mb-2">Confirm Password</label>
                        <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordPage;