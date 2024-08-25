import React from "react";
import Banner from "../components/Banner";
import FormField from "../components/FormField";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { useGlobalContext } from "../hooks/useGlobalContext";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { BASE_URL } = useGlobalContext();

  
  // The fields for the ForgotPassword form
  const fields = [
    { name: 'Email', label:"Email",initialValue: '', editable: true },
    { name: 'New Password', label:"New Password", initialValue: '', editable: true }
  ];

  // This function will be called when the form is submitted
  const handleForgotPassword = (formData) => {
    console.log('Password reset request for:', formData);
    // navigate('/password-reset-sent');
    // Ensure formData has the expected structure
      if (!formData.Email || !formData['New Password']) {
        alert('Please fill all the fields.');
        return;
    }

    const dataToSend = {
        email: formData.Email,
        newPassword: formData['New Password'],
    };

    axios.post(`${BASE_URL}/auth/reset-password`, dataToSend)
        .then(response => {
            alert('If an account with that email exists, a password reset link has been sent.');
            navigate('/');
        })
        .catch(error => {
            console.error('Error resetting password:', error);
            alert('Error resetting password. Please try again.');
        });
  }

  return (
    <>
      <Banner goBackPath={"/"} />
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-3xl font-bold mb-6">Forgot Password?</h2>
        <FormField 
          fields={fields} 
          submit={handleForgotPassword} 
          buttonName={"Send Email"} 
        />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
