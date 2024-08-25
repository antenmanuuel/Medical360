import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    { name: 'Email', label:'Email',initialValue: '', editable: true },
    { name: 'Password', label:'Password', initialValue: '', editable: true }
  ];

  const handleLogin = (formData) => {
    let email = formData.Email;
    let password = formData.Password;
    login(email, password).then(() => {
      if (!user) {
        setWrong(true);
      }
    })
  };

  return (
    <>
      <Banner goBackPath="/" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Login to account
            </p>
          </div>
          {wrong && (
            <div className="flex justify-center items-center">
              <div className="m-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Wrong email and password!</strong>
              </div>
            </div>
          )}
          <FormField fields={fields} submit={handleLogin} buttonName="Login" />
          <div className="text-center mt-2">
            <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
