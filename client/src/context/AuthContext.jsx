import React, { createContext, useEffect, useReducer } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const AuthContext = createContext();

const BASE_URL = "https://medical360-d65d823d7d75.herokuapp.com" ;
// const BASE_URL = "http://localhost:3000";


export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    default:
      return state
  }
} 

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useReducer(authReducer, {
    user: null
  });
  const { reset } = useGlobalContext();

  useEffect(() => {
    // get whether use is logged in or not
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setAuth({ type: "LOGIN", payload: user });
    }
  }, []);

  // login the user with email and passwrod. Upon success, set user to logged in. upon false, print why and return false
  const login = async function (email, password) {
    console.log("pinging " + BASE_URL + "/auth/login");
    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      console.log(response);
      const json = await response.json();
      console.log(json)

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json))

        setAuth({ type: "LOGIN", payload: json})
      }
    } catch (error) {
      console.log(error);
    }
  };

  // logout the user
  const logout = async function () {
    localStorage.removeItem("user");

    // dispatch logout action
    setAuth({ type: "LOGOUT" })
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth, login, logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
