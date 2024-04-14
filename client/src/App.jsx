import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContext";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import EditEquipmentPage from "./pages/EditEquipmentPage";
import AllStaffPage from "./pages/AllStaffPage";
import AppointmentPage from "./pages/AppointmentPage";
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
import UnscheduledAppointments from "./pages/UnscheduledApptPage";
import AllEquipmentPage from "./pages/AllEquipmentPage";
import EditPatientInfoPage from "./pages/EditPatientInfoPage";
import EmergencyReassignment from "./pages/EmergencyAssignmentPage";
import DepartmentRatioPage from "./pages/DepartmentRatioPage";
import PatientInfo from "./pages/PatientInfo";
import DoctorInfo from "./pages/DoctorInfo";
import AllRoomsPage from "./pages/AllRoomsPage";
import AllPatientPage from "./pages/AllPatientPage";
import EditPatientPage from "./pages/EditPatientPage";
import PatientNotification from "./pages/PatientNotification";
import AllUsersPage from "./pages/AllUsersPage";
import EditUserPage from "./pages/EditUserPage";
import UserApprovalPage from "./pages/UserApprovalsPage";
import axios from "axios";
import DepartmentForm from "./pages/DepartmentForm";

import { GlobalContextProvider } from "./store/GlobalContext";

axios.defaults.withCredentials = true;



function App() {
  return (
    <BrowserRouter>

      <GlobalContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apppage" element={<AppPage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/all-staff" element={<AllStaffPage />} />
            <Route path="/all-equipments" element={<AllEquipmentPage />} />
            <Route path="/all-rooms" element={<AllRoomsPage />} />
            <Route path="/all-patients" element={<AllPatientPage />} />
            <Route path="/all-users" element={<AllUsersPage />} />
            <Route path="/book-appointment" element={<AppointmentPage />} />
            <Route path="/all-doctors" element={<AllDoctorsPage />} />
            <Route path="/edit-equipment/" element={<EditEquipmentPage />} />
            <Route path="/edit-room/" element={<EditRoomPage />} />
            <Route path="/edit-patient" element={<EditPatientPage />} />
            <Route path="/edit-user" element={<EditUserPage />} />
            <Route path="/department-staff" element={<DepartmentStaffPage />} />
            <Route path="/departmentpage" element={<DepartmentPage />} />
            <Route path="/new-equipment" element={<NewEquipmentPage />} />
            <Route path="/new-room" element={<NewRoomPage />} />
            <Route path="/new-patient" element={<NewPatientPage />} />
            <Route
              path="/resource-management"
              element={<ResourceManagementPage />}
            />
            <Route path="/bugs" element={<BugReport />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route
              path="/cancel-appointment"
              element={<CancelAppointmentForm />}
            />
            <Route path="/unscheduled" element={<UnscheduledAppointments />} />
            <Route
              path="/resource-management"
              element={<ResourceManagementPage />}
            />
            <Route path="/user-approvals" element={<UserApprovalPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/edit-patient-user-info"
              element={<EditPatientInfoPage />}
            />
            <Route path="/patient-info" element={<PatientInfo />} />
            <Route path="/doctorinfo" element={<DoctorInfo />} />
            <Route path="/emergency" element={<EmergencyReassignment />} />
            <Route path="/departmentratio" element={<DepartmentRatioPage />} />
            <Route path="/admin-notification" element={<PatientNotification />} />
               <Route path="/department-form" element={< DepartmentForm/>} />
          </Routes>
        </AuthContextProvider>
      </GlobalContextProvider>

    </BrowserRouter>
  );
}

export default App;
