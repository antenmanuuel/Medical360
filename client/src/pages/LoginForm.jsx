import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import FormField from "../components/FormField";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginForm = () => {
  const { user, login } = useAuthContext();
  const [wrong, setWrong] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/apppage");
      setWrong(false);
    }
  }, [user]);

  const fields = [
    { name: "Email", label: "Email", initialValue: "", editable: true, type: "text" },
    { name: "Password", label: "Password", initialValue: "", editable: true, type: "password" },
  ];

  const handleLogin = (formData) => {
    let email = formData.Email;
    let password = formData.Password;
    login(email, password).then(() => {
      if (!user) {
        setWrong(true);
      }
    });
  };

  return (
    <>
      <Banner goBackPath="/" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-600">Welcome Back</h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Sign in to your account
          </p>

          {wrong && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-medium text-center">Invalid email or password!</p>
            </div>
          )}

          <FormField fields={fields} submit={handleLogin} buttonName="Login" />

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginForm;
