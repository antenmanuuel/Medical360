import React, { createContext, useEffect, useState } from "react";
import doctorImageone from "../images/doctor2.jpeg";
import patientImage from "../images/PatientImage.png";
import api from "./auth-api";

const AuthContext = createContext();

export const doctorsData = [
  {
    name: "Dr. Olivia Turner, M.D.",
    department: "Dermato-Endocrinology",
    experience: "20 years",
    focus:
      "The impact of hormonal imbalances on skin conditions, specializing in acne, hirsutism, and other skin disorders.",
    schedule: "Mon - Sat / 9 AM - 4 PM",
    profile:
      "Dr. Doe completed her medical degree at Stony Brook University, renowned for its rigorous medical program and emphasis on patient-centered care. She further specialized in dermatology during her residency at Yale University, where she excelled in both medical and surgical dermatology, with a particular focus on pediatric dermatology, cosmetic procedures",
    image: doctorImageone,
  },
];
export const patientsData = [
  {
    name: "Patient One",
    age: "30",
    sex: "Male",
    files: "3 files",
    email: "patient.one@hospital.com",
    schedule: "Next appointment: 10th Oct, 10:00 AM",
    carenotes: ["Note 1", "Note 2", "Note 3"],
    image: patientImage,
  },
];

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    isAdmin: false,
    isDoctor: false,
    isNurse: false,
    department: null,
    doctors: doctorsData,
    patients: patientsData,
  });

  useEffect(() => {
    // get whether use is logged in or not
    auth.getLoggedIn();
  }, []);

  auth.getLoggedIn = async function () {
    try {
      const response = await api.loggedIn();
      if (response.status === 200) {
        setAuth({
          user: response.data.user,
          loggedIn: response.data.loggedIn,
          isAdmin: response.data.isAdmin,
          isDoctor: response.data.isDoctor,
          department: response.data.department,
        });
      } else {
        setAuth((prev) => ({ ...prev, loggedIn: false, user: null }));
      }
    } catch (err) {
      console.error("Failed to verify login status:", err.message);
      setAuth((prev) => ({ ...prev, loggedIn: false, user: null }));
    }
  };

  auth.login = async function (email, password) {
    try {
      const response = await api.login(email, password);
      if (response.status === 200) {
        auth.getLoggedIn(); // Refresh the auth state based on current session status
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  auth.logout = async function () {
    try {
      const response = await api.logout();
      if (response.status === 200) {
        setAuth({
          user: null,
          loggedIn: false,
          isAdmin: false,
          isDoctor: false,
          department: null,
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  auth.register = async function ({
    name,
    email,
    password,
    department,
    phone_number,
    isAdmin,
    isDoctor,
    isNurse,
  }) {
    try {
      const response = await api.register({
        name,
        email,
        password,
        department,
        phone_number,
        isAdmin,
        isDoctor,
        isNurse,
      });
      if (response.status === 200) {
        auth.login(email, password); // Optionally log in the user directly after registration
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
