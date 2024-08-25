import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import EditEquipmentPage from "./pages/EditEquipmentPage";
import AllStaffPage from "./pages/AllStaffPage";
import EditRoomPage from "./pages/EditRoomPage";
import DepartmentPage from "./pages/DepartmentPage";
import DepartmentStaffPage from "./pages/DepartmentStaffPage";
import AllDoctorsPage from "./pages/AllDoctorsPage";
import AppPage from "./pages/AppPage";
import NewEquipmentPage from "./pages/NewEquipmentPage";
import NewRoomPage from "./pages/NewRoomPage";
import NewPatientPage from "./pages/NewPatientPage";
import ResourceManagementPage from "./pages/ResourceManagementPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import BugReport from "./pages/BugReportForm";
import FeedbackForm from "./pages/FeedbackForm";
import CancelAppointmentForm from "./pages/CancelAppointmentForm";
import AllEquipmentPage from "./pages/AllEquipmentPage";
import EditPatientInfoPage from "./pages/EditPatientInfoPage";
import PatientInfo from "./pages/PatientInfo";
import DoctorInfo from "./pages/DoctorInfo";
import AllRoomsPage from "./pages/AllRoomsPage";
import AllPatientPage from "./pages/AllPatientPage";
import EditPatientPage from "./pages/EditPatientPage";
import PatientNotification from "./pages/PatientNotification";
import AllUsersPage from "./pages/AllUsersPage";
import EditUserPage from "./pages/EditUserPage";

import DepartmentForm from "./pages/DepartmentForm";
import { useAuthContext } from "./hooks/useAuthContext";
import AddProcedurePage from "./pages/AddProcedurePage";
import UserInfoPage from "./pages/UserInfo";
import MyPatientsPage from "./pages/MyPatientsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AllFeedbacksPage from "./pages/AllFeedbacksPage";
import AllBugsPage from "./pages/AllBugsPage";
import MyCalendar from "./pages/MyCalendar";
import BugInfoPage from "./pages/BugInfoPage";
import FeedbackInfoPage from "./pages/FeedbackInfoPage";
import AllProcessesPage from "./pages/AllProcessesPage";
import ProcessDetailsPage from "./pages/ProcessDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {

  const { user } = useAuthContext();
  let lastRoute = localStorage.getItem("lastRoute");
  if (!lastRoute)
    lastRoute = "/apppage"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <HomePage /> : <Navigate to={lastRoute}/>} />
        <Route path="/apppage" element={user ? <AppPage /> : <Navigate to="/" />} />
        <Route path="/register" element={user ? <RegistrationForm /> : <Navigate to="/" /> } />
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to={lastRoute}/>} />
        <Route path="/all-processes" element={user ? <AllProcessesPage /> : <Navigate to="/" />} />
        <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/" /> } />
        <Route path="/chat/:id" element={user ? <ChatPage /> : <Navigate to="/" /> } />
        <Route path="/all-staff" element={user ? <AllStaffPage /> :  <Navigate to="/" />} />
        <Route path="/all-equipments" element={user ? <AllEquipmentPage  /> : <Navigate to="/" />} />
        <Route path="/all-rooms" element={user ? <AllRoomsPage /> : <Navigate to="/" />} />
        <Route path="/all-patients" element={user ? <AllPatientPage /> : <Navigate to="/" />} />
        <Route path="/all-users" element={user ? <AllUsersPage /> : <Navigate to="/" />} />
        <Route path="/all-doctors" element={user ? <AllDoctorsPage /> : <Navigate to="/" />} />
        <Route path="/edit-equipment/" element={user ? <EditEquipmentPage /> : <Navigate to="/" /> } />
        <Route path="/edit-room/" element={user ? <EditRoomPage /> : <Navigate to="/" /> } />
        <Route path="/edit-patient" element={user ? <EditPatientPage /> : <Navigate to="/" /> } />
        <Route path="/edit-user" element={user ? <EditUserPage /> : <Navigate to="/" /> } />
        <Route path="/department-staff/:id" element={user ? <DepartmentStaffPage /> : <Navigate to="/" /> } />
        <Route path="/departmentpage" element={user ? <DepartmentPage /> : <Navigate to="/" />} />
        <Route path="/new-equipment" element={user ? <NewEquipmentPage /> : <Navigate to="/" /> } />
        <Route path="/new-room" element={user ? <NewRoomPage /> : <Navigate to="/" /> } />
        <Route path="/new-patient" element={user ? <NewPatientPage /> : <Navigate to="/" /> } />
        <Route path="/notifications" element={user ? <NotificationsPage /> : <Navigate to="/" /> } />
        <Route
          path="/resource-management"
          element={user ? <ResourceManagementPage /> : <Navigate to="/" /> }
        />
        <Route path="/process-details" element={user ? <ProcessDetailsPage /> : <Navigate to="/" />} />
        <Route path="/doctor-schedule/:userId" element={user ? <MyCalendar /> : <Navigate to="/" /> } />
        <Route path="/user-schedule/:userId" element={user ? <MyCalendar /> : <Navigate to="/" /> } />
        <Route path="/bugs" element={user ? <BugReport /> : <Navigate to="/" /> } />
        <Route path="/view-bug/:id" element={user ? <BugInfoPage /> : <Navigate to="/" /> } />
        <Route path="/view-feedback/:id" element={user ? <FeedbackInfoPage /> : <Navigate to="/" /> } />

        <Route path="/feedback" element={user ? <FeedbackForm /> : <Navigate to="/" /> } />
        <Route
          path="/cancel-appointment"
          element={<CancelAppointmentForm />}
        />
        <Route
          path="/resource-management"
          element={user ? <ResourceManagementPage /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/edit-patient-user-info"
          element={user ? <EditPatientInfoPage /> : <Navigate to="/" />}
        />
        <Route path="/add-procedure" element={user ? <AddProcedurePage /> : <Navigate to="/" />} />
        <Route path="/doctorinfo/:doctorId" element={ user ? <DoctorInfo /> : <Navigate to="/" />} />
        <Route path="/patient-info/:id" element={user ? <PatientInfo /> : <Navigate to="/" />} />
        <Route path="/user-info/:id" element={user ? <UserInfoPage /> : <Navigate to="/" />} />
        <Route path="/admin-notification" element={<PatientNotification />} />
        <Route path="/department-form" element={user ? < DepartmentForm/> : <Navigate to="/" />} />
        <Route path="/change-password/:id" element={<ChangePasswordPage />} />
        <Route path="my-patients" element={user ? <MyPatientsPage /> : <Navigate to="/" />} />
        <Route path="/all-feedbacks" element={user ? <AllFeedbacksPage /> : <Navigate to="/" />} />
        <Route path="/all-bugs" element={user ? <AllBugsPage /> : <Navigate to="/" />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
