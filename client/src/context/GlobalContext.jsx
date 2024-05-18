import React, { createContext, useReducer, useState } from "react";
import storeApi from "../store/store-api";
import userApi from "../auth/user-api";

const GlobalContext = createContext();

export const storeReducer = (state, action) => {
  switch (action.type) {
    case "GET_RESOURCE":
      switch (action.context) {
        case "patient":
          return { ...state, currentPatient: action.payload };
        case "department":
          return { ...state, currentDepartment: action.payload };
        case "equipment":
          return { ...state, currentEquipment: action.payload };
        case "room":
          return { ...state, currentRoom: action.payload };
        case "bug":
          return { ...state, currentBug: action.payload };
        case "feedback":
          return {
            ...state,
            currentFeedback: action.payload,
          };
        case "doctor":
          return { ...state, currentDoctor: action.payload };
        case "patients":
          return { ...state, currentPatient: null, patients: action.payload };
        case "chat":
          return { ...state, currentChat: action.payload };
        default:
          return state;
      }
    case "REMOVE_DOCTOR":
      return { ...state, currentDoctor: null };
    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_ALL_PENDINGUSERS":
      return {
        ...state,
        users: action.payload,
      };

    case "GET_ALL_PATIENTS":
      return {
        ...state,
        currentPatient: null,
        patients: action.payload,
      };
    case "GET_ALL_DOCTORS":
      return {
        ...state,
        currentDoctor: null,
        doctors: action.payload,
      };
    case "GET_ALL_EQUIPMENT":
      return {
        ...state,
        equipments: action.payload.equipments,
        id_to_equipment: action.payload.equipmentMapping,
        equipment_to_id: action.payload.swappedMap,
      };
    case "GET_ALL_DEPARTMENTS":
      return {
        ...state,
        departments: action.payload.departments,
        id_to_department: action.payload.id_to_department,
        department_to_id: action.payload.department_to_id,
      };
    case "GET_ALL_ROOMS":
      return {
        ...state,
        rooms: action.payload,
        currentRoom: null,
      };
    case "GET_ALL_BUG":
      return {
        ...state,
        currentBug: null,
        bugs: action.payload,
      };
    case "GET_ALL_FEEDBACK":
      return {
        ...state,
        currentFeedback: null,
        feedbacks: action.payload,
      };

    case "ASSIGN_DOCTOR":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.eventId
            ? { ...event, assignedTo: action.payload.doctorId }
            : event
        ),
        patients: state.patients.map((patient) =>
          patient.id === action.payload.patientId
            ? { ...patient, doctorAssigned: action.payload.doctorId }
            : patient
        ),
      };

    case "MARK_BUG_RESOLVED":
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
          bug._id === action.payload ? { ...bug, status: "Resolved" } : bug
        ),
      };

    case "MARK_BUG_IN_PROGRESS":
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
          bug._id === action.payload ? { ...bug, status: "In Progress" } : bug
        ),
      };

    case "DELETE":
      // delete based on value passes as context
      switch (action.context) {
        case "patient":
          return {
            ...state,
            currentPatient: null,
            patients: state.patients.filter(
              (patient) => patient._id !== action.payload
            ),
          };
        case "equipment":
          return {
            ...state,
            currentEquipment: null,
            equipments: state.equipments.filter(
              (equipment) => equipment._id !== action.payload
            ),
          };
        case "room":
          return {
            ...state,
            currentRoom: null,
            rooms: state.rooms.filter((room) => room._id !== action.payload),
          };
        case "user":
          return {
            ...state,
            users: state.users.filter((user) => user._id !== action.payload),
          };

        default:
          return state;
      }

    case "GET_USER_EVENTS":
      return {
        ...state,
        currentEvent: null,
        events: action.payload,
        };

    default:
      return {
        doctors: null,
        users: null,
        patients: null,
        departments: null,
        rooms: null,
        equipments: null,
        feedbacks: null,
        bugs: null,
        events: null,
        id_to_department: {},
        department_to_id: {},
        id_to_equipment: {},
        equipment_to_id: {},
        currentPatient: null,
        currentDepartment: null,
        currentEquipment: null,
        currentRoom: null,
        currentDoctor: null,
        currentBug: null,
        currentChat: null,
        currentFeedback: null,
        currentEvent:null,
        BASE_URL: "https://medical360-d65d823d7d75.herokuapp.com",
        // BASE_URL: "http://localhost:3000",
      };
  }
};

function GlobalContextProvider({ children }) {
  const [store, setStore] = useReducer(storeReducer, {
    doctors: null,
    users: null,
    patients: null,
    departments: null,
    rooms: null,
    equipments: null,
    feedbacks: null,
    bugs: null,
    events: null,
    id_to_department: {},
    department_to_id: {},
    id_to_equipment: {},
    equipment_to_id: {},
    currentPatient: null,
    currentDepartment: null,
    currentEquipment: null,
    currentRoom: null,
    currentDoctor: null,
    currentBug: null,
    currentChat: null,
    currentFeedback: null,
    currentEvent: null,
    BASE_URL: "https://medical360-d65d823d7d75.herokuapp.com",

     // BASE_URL: "http://localhost:3000",
    // BASE_URL: "https://medical360-d65d823d7d75.herokuapp.com",
  });
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Get all the bugs
  const getAllBugs = async function () {
    try {
      const response = await fetch(`${store.BASE_URL}/bugs/all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Why: "god" }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const bugs = data.bugList;

        setStore({ type: "GET_ALL_BUG", payload: bugs });
      } else {
        console.error("Failed to fetch bugs:", response.status);
      }
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };

  const getBug = async function (bugId) {
    try {
      const response = await fetch(`${store.BASE_URL}/bugs/${bugId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bugId }),
      });

      if (response.ok) {
        const bugData = await response.json();
        setStore({
          type: "GET_RESOURCE",
          context: "bug",
          payload: bugData,
        });
        return bugData;
      }
    } catch (error) {
      console.error("Error fetching bug:", error);
      throw error;
    }
  };

  const getAllFeedback = async function () {
    try {
      const response = await fetch(`${store.BASE_URL}/feedbacks/all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Why: "god" }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const feedbacks = data.feedbackList;

        setStore({ type: "GET_ALL_FEEDBACK", payload: feedbacks });
      } else {
        console.error("Failed to fetch feedbacks:", response.status);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const getFeedback = async function (feedbackId) {
    try {
      const response = await fetch(
        `${store.BASE_URL}/feedbacks/${feedbackId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: feedbackId }),
        }
      );

      if (response.ok) {
        const feedbackData = await response.json();
        setStore({
          type: "GET_RESOURCE",
          context: "feedback",
          payload: feedbackData,
        });
        return feedbackData;
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  };

  // get all users to the application
  const getAllUsers = async function () {
    console.log(`Pinging ${store.BASE_URL}/users`);
    try {
      const response = await fetch(`${store.BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Why: "God" }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      let json = await response.json(); // This should be the array directly
      console.log(json);
      let users = json.users;
      console.log(users);
      if (!Array.isArray(users)) {
        // Check if the data is an array
        console.error("Expected an array of users, received:", users);
        throw new Error("Data format error: Expected an array of users");
      }

      console.log("setting store");
      setStore({ type: "GET_ALL_USERS", payload: users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const reset = () => {
    setStore({ type: "RESET" });
  };

  //get all events
  const getEvents = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/events/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const events = (await response.json()).events;
        setStore({
          type: "GET_USER_EVENTS",
          payload: events,
        });
        return events;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //create events
  const createEvent = async function (event) {
    try {
      const id = event.userId;
      const response = await fetch(`${store.BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("event created:", responseData);
        getEvents(id);
        return responseData;
      }
    } catch (error) {
      console.error("Error saving event:", error.message);
    }
  };
  const getEvent = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/events/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("id in getEvent", id, response);
      if (response.ok) {
        const eventData = await response.json();
        const { title, start, end, status, user } = eventData.event;
        return eventData.event;
      } else {
        throw new Error("Failed to fetch event");
      }
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  const updateEvent = async function (event) {
    try {
      const response = await fetch(`${store.BASE_URL}/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        const updatedEvent = await response.json();
        setLastUpdated(Date.now());
        console.log("Event updated:", updatedEvent);
        return updatedEvent;
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Delete event by id
  const deleteEvent = async function (eventId) {
    try {
      const response = await fetch(`${store.BASE_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Event deleted");
        return eventId;
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // create patient with given data
  const createPatient = async function (data) {
    // get whether user is logged in or not
    try {
      const response = await fetch(`${store.BASE_URL}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("patient created");
        getAllPatients();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // update patient by id with data
  const updatePatient = async function (id, data) {
    try {
      const response = await fetch(`${store.BASE_URL}/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const new_patient = (await response.json()).patient;
        setStore({
          type: "GET_RESOURCE",
          context: "patient",
          payload: new_patient,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get patient by id
  const getPatient = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/patients/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const patient = (await response.json()).patient;
        setStore({
          type: "GET_RESOURCE",
          context: "patient",
          payload: patient,
        });
        return patient;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get all the patients
  const getAllPatients = async function () {
    const response = await fetch(`${store.BASE_URL}/patients/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Why: "god" }),
    });
    if (response.status === 200) {
      const patients = (await response.json()).patients;
      setStore({ type: "GET_ALL_PATIENTS", payload: patients });
    }
  };

  const setPatients = async function (listOfPatientIds) {
    const response = await fetch(`${store.BASE_URL}/patients/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Why: "god" }),
    });
    if (response.ok) {
      let patients = (await response.json()).patients;
      patients = patients.filter((patient) =>
        listOfPatientIds.includes(patient._id)
      );
      setStore({
        type: "GET_RESOURCE",
        context: "patients",
        payload: patients,
      });
    }
  };

  // get room by id
  const getRoom = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/rooms/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const room = (await response.json()).room;
        setStore({ type: "GET_RESOURCE", context: "room", payload: room });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getUser = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/users/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const user = (await response.json()).user;
        setStore({ type: "GET_RESOURCE", context: "user", payload: user });
        return user;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getChat = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/chat/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const chat = (await response.json()).chat;
        setStore({ type: "GET_RESOURCE", context: "chat", payload: chat });
        return chat;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getUserChats = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/chat/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        console.log(response, "chatststtst");
        const chats = await response.json();
        setStore({ type: "GET_RESOURCE", context: "chats", payload: chats });
        return chats;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //gets all messages from a given chat
  const getMessages = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/message/chat/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const message = await response.json();
        setStore({
          type: "GET_RESOURCE",
          context: "message",
          payload: message,
        });
        return message;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get all the rooms
  const getAllRooms = async function () {
    try {
      const response = await fetch(`${store.BASE_URL}/rooms/all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Why: "god" }),
      });
      if (response.status === 200) {
        let rooms = (await response.json()).rooms;
        if (
          !store.id_to_equipment ||
          Object.keys(store.id_to_equipment).length === 0
        ) {
          await getAllEquipments();
        }

        // Add equipment names to each room
        const roomsWithEquipmentNames = Object.values(rooms).map((room) => ({
          ...room,
          equipmentNames: room.equipment.map(
            (equipId) => store.id_to_equipment[equipId] || "Unknown Equipment"
          ),
        }));

        setStore({ type: "GET_ALL_ROOMS", payload: roomsWithEquipmentNames });
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // create room with given data
  const createRoom = async function (data) {
    // get whether user is logged in or not
    try {
      const response = await storeApi.createRoom(data);
      if (response.status === 201) {
        setStore({
          type: "CREATE_ROOM",
          payload: response.data,
        });

        // Update last updated time or handle other side effects
        setLastUpdated(Date.now());

        console.log("room created");
        return response;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // update room by id with data
  const updateRoom = async function (id, data) {
    try {
      const response = await fetch(`${store.BASE_URL}/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log((await response.json()).room);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get all the equipments
  const getAllEquipments = async function () {
    const response = await fetch(`${store.BASE_URL}/equipments/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Why: "god" }),
    });

    if (response.status === 200) {
      let equipments = (await response.json()).equipmentList;
      const equipmentMapping = equipments.reduce((acc, equipment) => {
        acc[equipment._id] = equipment.equipmentName; // Store only the equipment name
        return acc;
      }, {});
      console.log(equipmentMapping);
      const swappedMap = Object.entries(equipmentMapping).reduce(
        (acc, [id, name]) => {
          acc[name] = id;
          return acc;
        },
        {}
      );
      setStore({
        type: "GET_ALL_EQUIPMENT",
        payload: { equipments, equipmentMapping, swappedMap },
      });
    }
    return response;
  };

  // get equipment by id
  const getEquipment = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/equipments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const equipment = (await response.json()).equipment;
        setStore({
          type: "GET_RESOURCE",
          context: "equipment",
          payload: equipment,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // update equipment by id with data
  const updateEquipment = async function (id, data) {
    try {
      const response = await fetch(`${store.BASE_URL}/equipments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log((await response.json()).equipment);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // delete a equipment
  const deleteEquipment = async function (id) {
    try {
      const response = await storeApi.deleteEquipment(id);
      if (response.status === 200) {
        console.log("deleted equipment");
        setStore({ type: "DELETE", context: "equipment", payload: id });
        setLastUpdated(Date.now());
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  //delete a room
  const deleteRoom = async function (id) {
    try {
      const response = await storeApi.deleteRoom(id);
      if (response.status === 200) {
        console.log("deleted room");
        setStore({ type: "DELETE", context: "room", payload: id });
        setLastUpdated(Date.now());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //create department
  const createDepartment = async function (data) {
    // get whether user is logged in or not
    try {
      const response = await fetch(`${store.BASE_URL}/departments`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(data)
        body: data,
      });
      if (response.ok) {
        console.log("department created");
        getAllDepartments();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // update department by id with data
  const updateDepartment = async function (id, data) {
    try {
      const response = await storeApi.updateDepartment(id, data);
      if (response.status === 200) {
        console.log(response.data.department);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get department by id
  const getDepartment = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/departments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const department = (await response.json()).department;
        setStore({
          type: "GET_RESOURCE",
          context: "department",
          payload: department,
        });
        return department;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get all the patients
  const getAllDepartments = async function () {
    try {
      const response = await fetch(store.BASE_URL + "/departments/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "hello there" }),
      });
      const json = await response.json();
      if (response.status === 200) {
        let departments = json.departments;
        let id_to_department = departments.reduce((result, obj) => {
          result[obj._id] = obj.departmentName;
          return result;
        }, {});
        let department_to_id = Object.fromEntries(
          Object.entries(store.id_to_department).map(([key, value]) => [
            value,
            key,
          ])
        );
        setStore({
          type: "GET_ALL_DEPARTMENTS",
          payload: { departments, id_to_department, department_to_id },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePatient = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/patients/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("deleted Patient");
        setStore({ type: "DELETE", context: "patient", payload: id });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteUser = async function (id) {
    try {
      const response = await userApi.deleteUser(id);
      if (response.status === 200) {
        console.log("deleted user");
        setStore({ type: "DELETE", context: "user", payload: id });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllDoctors = async function () {
    try {
      const response = await fetch(`${store.BASE_URL}/doctors/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Why: "God" }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const doctors = (await response.json()).doctors;
      setStore({ type: "GET_ALL_DOCTORS", payload: doctors });
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateDoctor = async function (id, data) {
    try {
      console.log("Updated or not", id, data);

      await fetch(`${store.BASE_URL}/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // get patient by id
  const getDoctor = async function (id) {
    try {
      const response = await fetch(`${store.BASE_URL}/doctors/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const doctor = (await response.json()).doctor;
        setStore({ type: "GET_RESOURCE", context: "doctor", payload: doctor });
        return doctor;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getDoctorByUser = async (id) => {
    try {
      console.log("Here get doctors by user", id);
      const response = await fetch(`${store.BASE_URL}/doctors/users/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const { userId } = await response.json();
        console.log("response coming", userId);
        return userId;
      } else {
        console.error("Failed to fetch doctor:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
      return null;
    }
  };

  // Create a new bug report
  const createBug = async function (bugData) {
    try {
      const response = await fetch(`${store.BASE_URL}/bugs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bugData),
      });
      if (response.ok) {
        console.log("Bug report created successfully");
        getAllBugs();
      } else {
        const errorData = await response.json();
        console.error("Failed to create bug report:", errorData.message);
      }
    } catch (err) {
      console.error("Error creating bug report:", err.message);
    }
  };
  // Mark bug as resolved
  const markBugResolved = async (bugId) => {
    try {
      const response = await fetch(`${store.BASE_URL}/bugs/${bugId}/resolve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setStore({ type: "MARK_BUG_RESOLVED", payload: bugId });
      } else {
        console.error("Failed to mark bug as resolved");
      }
    } catch (error) {
      console.error("Error marking bug as resolved:", error);
    }
  };
  // mark bug as in progress
  const markBugInProgress = async (bugId) => {
    try {
      const response = await fetch(`${store.BASE_URL}/bugs/${bugId}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setStore({ type: "MARK_BUG_IN_PROGRESS", payload: bugId });
      } else {
        console.error("Failed to mark bug as in progress");
      }
    } catch (error) {
      console.error("Error marking bug as in progress:", error);
    }
  };

  // Create a new bug report
  const createFeedback = async function (bugData) {
    try {
      const response = await fetch(`${store.BASE_URL}/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bugData),
      });
      if (response.ok) {
        console.log("feedback created successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to create feedback:", errorData.message);
      }
    } catch (err) {
      console.error("Error creating feedback:", err.message);
    }
  };

  const createDoctor = async function (doctorData) {
    try {
      console.log(doctorData);
      const response = await fetch(`${store.BASE_URL}/doctors/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });
      if (response.ok) {
        console.log("doctor created successfully");
        return await response.json();
      } else {
        const errorData = await response.json();
        console.error("Failed to create doctor:", errorData.message);
      }
    } catch (err) {
      console.error("Error creating doctor:", err.message);
    }
  };

  const createUser = async function (userData) {
    try {
      const response = await fetch(`${store.BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log("user created successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to create user:", errorData.message);
      }
    } catch (err) {
      console.error("Error creating user:", err.message);
    }
  };

  // Get all the bugs
  const getAllFeedbacks = async function () {
    try {
      const response = await fetch(`${store.BASE_URL}/bugs/all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Why: "god" }),
      });
      if (response.status === 200) {
        let bugs = (await response.json()).feedbacks;

        setStore({ type: "GET_ALL_FEEDBACKS", payload: feedbacks });
      } else {
        console.error("Failed to fetch feedbacks:", response.status);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const removeCurrentDoctor = () => {
    setStore({ type: "REMOVE_DOCTOR" });
  };
  const assignDoctor = (eventId, doctorId, patientId) => {
    setStore({
      type: "ASSIGN_DOCTOR",
      payload: { eventId, doctorId, patientId },
    });
  };

  const sendNotifications = (userIds, notification) => {
    console.log(userIds);
    userIds.forEach(id => {
      try {
        fetch(`${store.BASE_URL}/users/notification/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      });
    } catch (err) {
      console.log("error sending to user " + id);
    }
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        ...store,
        removeCurrentDoctor,
        lastUpdated,
        createPatient,
        updatePatient,
        getPatient,
        getAllPatients,
        getAllRooms,
        createRoom,
        getAllEquipments,
        deleteEquipment,
        deleteUser,
        deleteRoom,
        createDepartment,
        updateDepartment,
        getDepartment,
        getAllDepartments,
        deletePatient,
        getAllUsers,
        getEvents,
        getEquipment,
        updateEquipment,
        getRoom,
        updateRoom,
        getAllDoctors,
        updateDoctor,
        getDoctor,
        getUser,
        setPatients,
        reset,
        getAllBugs,
        createBug,
        getAllFeedback,
        createFeedback,
        createDoctor,
        createUser,
        getChat,
        getMessages,
        getUserChats,
        createEvent,
        getAllFeedbacks,
        updateEvent,
        deleteEvent,
        getDoctorByUser,
        getEvent,
        getBug,
        getFeedback,
        assignDoctor,

        markBugResolved,
        markBugInProgress,
        sendNotifications
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
export { GlobalContextProvider };
