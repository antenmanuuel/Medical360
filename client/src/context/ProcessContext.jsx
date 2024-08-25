import React, { createContext, useReducer } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ProcessContext = createContext();


export const processReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROCESS":
      return { ...state, currentProcess: action.payload }
    case "GET_ALL_PROCESSES":
      return { currentProcess: null, processes: action.payload }
    default:
      return state
  }
} 

function ProcessContextProvider({ children }) {
  const [processManager, setProcessManager] = useReducer(processReducer, {
    currentProcess: null,
    processes: null,
  });

  const { BASE_URL } = useGlobalContext();

  const createProcess = async function (process) {
    try {
      const response = await fetch(`${BASE_URL}/process/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(process)
      })
      if (response.ok)
        console.log(response.message ? response.message : "created process sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  // login the user with email and passwrod. Upon success, set user to logged in. upon false, print why and return false
  const getProcess = async function (processId) {
    try {
      const response = await fetch(`${BASE_URL}/process/${processId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({processId})
      })
      if (response.ok) {
        const process = await response.json();
        setProcessManager({ type: "GET_PROCESS", payload: process});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // logout the user
  const getAllProcesses = async function () {
    try {
        const response = await fetch(`${BASE_URL}/process/all`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: null,
        })
        if (response.ok) {
          const processes = (await response.json()).processes;
          setProcessManager({ type: "GET_ALL_PROCESSES", payload: processes});
        }
      } catch (error) {
        console.log(error);
      }
  };

  const updateProcess = async function (processId, newData) {
    try {
      const response = await fetch(`${BASE_URL}/process/${processId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      })
      if (response.ok)
        console.log(response.message ? response.message : "updated process sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProcess = async function (processId) {
    try {
      const response = await fetch(`${BASE_URL}/process/${processId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: null
      })
      if (response.ok)
        console.log(response.message ? response.message : "deleted process sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const addProcedure = async function (processId, procedure) {
    try {
      const response = await fetch(`${BASE_URL}/process/add-procedure/${processId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(procedure)
      })
      if (response.ok)
        console.log(response.message ? response.message : "added procedure sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProcedure = async function (processId, procedureId) {
    try {
      const response = await fetch(`${BASE_URL}/process/${processId}/${procedureId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: null
      })
      if (response.ok)
        console.log(response.message ? response.message : "deleted procedure sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProcedure = async function (processId, procedureId, update) {
    try {
      const response = await fetch(`${BASE_URL}/process/update-procedure/${processId}/${procedureId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update)
      })
      if (response.ok)
        console.log(response.message ? response.message : "updated procedure sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProcessContext.Provider
      value={{
        ...processManager, createProcess, getProcess, getAllProcesses, deleteProcess, updateProcess, addProcedure, deleteProcedure, updateProcedure
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export default ProcessContext;
export { ProcessContextProvider };