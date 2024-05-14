import axios from "axios";


 const BASE_URL = "https://medical360-d65d823d7d75.herokuapp.com";
 //const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable credentials
});

export const getPatient = (id) => {
  return api.get(`/patients/${id}`);
};

export const getAllPatients = () => api.get("/patients/");

export const updatePatient = (id, newData) =>
  api.put(`/patients/${id}`, newData);

export const createPatient = (patientData) =>
  api.post("/patients/", patientData);

export const deletePatient = (id) => api.delete(`/patients/${id}`);

export const getAllDoctors = () => api.get("/doctors/");

export const getDoctor = (id) => {
  return api.get(`/doctors/${id}`);
};
export const getDoctorByUser = (id) => {
  return api.get(`/doctors/${id}`);
};
export const createDepartment = (departmentData) => {
  console.log("Wait here I am in store.api", departmentData);
  api.post("/departments/", departmentData);
};
export const getAllDepartments = () => api.get("/departments/");

export const getAllEquipments = () => api.get("/equipments/");

export const updateEquipment = (id, newData) =>
  api.put(`/equipments/${id}`, newData);

export const getEquipment = (id) => api.get(`/equipments/${id}`);

export const deleteEquipment = (id) => api.delete(`/equipments/${id}`);

export const getAllRooms = () => api.get("/rooms/");

export const getAllFeedbacks = () => api.get("/feedbacks/");
export const createFeedback = (feedbackData) =>
  api.post("/feedbacks/", feedbackData);
export const getFeedback = (id) => api.get(`/feedbacks/${id}`);

export const getAllBugs = () => api.get("/bugs/");
export const createBug = (bugData) => api.post("/bugs/", bugData);
export const getBug = (id) => api.get(`/bugs/${id}`);

export const createRoom = (roomData) => api.post("/rooms/", roomData);

export const updateRoom = (id, newData) => api.put(`/rooms/${id}`, newData);

export const getRoom = (id) => api.get(`/rooms/${id}`);

export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

export const getDepartment = (id) => api.get(`/departments/${id}`);

//export const getChat = (id) = api.post(`/chat/${id}`);

export const getUser = (id) => api.get(`/users/${id}`);
export const updateDepartment = (id, newData) =>
  api.put(`/departments/${id}`, newData);

export const getEvents = (id) => {

    return api.get(`/events/user/${id}`);
  };
  export const getEvent = (id) => {
    return api.get(`/events/${id}`);
  };
  export const createEvent = (eventData) => {
    return api.post('/events/', eventData);
  };
  export const updateEvent = (eventId, eventData) => {
    return api.put(`/events/${eventId}`, eventData);
  };
  export const deleteEvent = (eventId) => {
    return api.delete(`/events/${eventId}`);
  };
  
  


export const resolveBug = (id) => {
  return api.post(`/bugs/${id}/resolve`);
};

export const markInProgress = (id) => {
  return api.post(`/bugs/${id}/progress`);
};


export default {
  getPatient,
  getAllPatients,
  updatePatient,
  createPatient,
  getAllDoctors,
  getDoctor,
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deletePatient,
  getAllEquipments,
  deleteEquipment,
  updateEquipment,
  getEquipment,
  getAllRooms,
  createRoom,
  deleteRoom,
  updateRoom,
  getRoom,
  getAllBugs,
  createBug,
  getBug,
  createFeedback,
  getFeedback,
  getAllFeedbacks,
  // getChat,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getDoctorByUser,
  getEvent,



  resolveBug,
  markInProgress,

};
