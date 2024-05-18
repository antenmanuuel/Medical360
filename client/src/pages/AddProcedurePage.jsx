import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useProcessContext } from "../hooks/useProcessContext";
import { TextField, Grid, Button } from "@mui/material";
import {
  TimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ScheduleModal from "./ScheduleModal";

function AddProcedurePage() {
  const { state } = useLocation();
  const {
    initOperation,
    initNotes,
    initDoctor,
    initRoom,
    initDepartment,
    initStartDate,
    initEndDate,
    editable,
  } = state;

  const procedureId = state.id;

  const {
    currentPatient,
    getPatient,
    doctors,
    getAllDoctors,
    departments,
    getAllDepartments,
    sendNotifications,
  } = useGlobalContext();
  const { addProcedure, getProcess, updateProcedure } = useProcessContext();
  const [operation, setOperation] = useState(initOperation);
  const [notes, setNotes] = useState(initNotes);
  const [currentDoctor, setDoctor] = useState(initDoctor);
  const [room, setRoom] = useState(initRoom);
  const [department, setDepartment] = useState(initDepartment);
  //change this part
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const[doctorfind,setDoctorFind]=useState(null);
  // const[patientfind,setPatientFind]=useState(null);
  //
  const [startDate, setStartDate] = useState(
    initStartDate ? dayjs(initStartDate) : dayjs(Date.now())
  );
  const [endDate, setEndDate] = useState(
    initEndDate ? dayjs(initEndDate) : startDate
  );
  const [startTime, setStartTime] = useState(
    initStartDate ? dayjs(initStartDate) : startDate
  );
  const [endTime, setEndTime] = useState(
    initEndDate ? dayjs(initEndDate) : startDate
  );
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDepartments = async () => {
      await getAllDepartments();
    };
    const fetchDoctors = async () => {
      await getAllDoctors();
    };

    if (!doctors) fetchDoctors();

    if (!departments) fetchDepartments();
  }, [doctors, departments]);


  const combineDateAndTime = (dateObj, timeObj) => {
    // Extract date components from the first Day.js object
    const year = dateObj.year();
    const month = dateObj.month();
    const day = dateObj.date();

    // Extract time components from the second Day.js object
    const hour = timeObj.hour();
    const minute = timeObj.minute();
    const second = timeObj.second();
    const millisecond = timeObj.millisecond();

    // Combine date and time components to create a new Day.js object
    return new Date(
      dayjs()
        .year(year)
        .month(month)
        .date(day)
        .hour(hour)
        .minute(minute)
        .second(second)
        .millisecond(millisecond)
    );
  };

  const handleAvailabilityClick = () => {
    if (currentDoctor) {
      setScheduleModalOpen(true);
    } else {
      alert("Please select a doctor first");
    }
  };
  const handleSelectEvent = (event) => {
    setStartDate(dayjs(event.start));
    setEndDate(dayjs(event.end));
    setStartTime(dayjs(event.start));
    setEndTime(dayjs(event.end));
    setScheduleModalOpen(false);
    setSelectedEvent(event); 
  };

  const addProcess = async () => {
    if (currentPatient) {
      if (
        !notes ||
        !currentDoctor ||
        !department ||
        !room ||
        !startDate ||
        !startTime ||
        !endDate ||
        !endTime
      ) {
        console.log({
          notes,
          currentDoctor,
          department,
          room,
          startDate,
          startTime,
          endDate,
          endTime,
        });
        alert("Please fill in all fields");
        return;
      }
      let newStartTime = combineDateAndTime(startDate, startTime);
      let newEndTime = combineDateAndTime(endDate, endTime);

      // update patient, get them, and return to patient info page
      let newProcedure = {
        start: newStartTime,
        end: newEndTime,
        operation: operation,
        notes: notes,
        roomNo: room,
        doctor: currentDoctor,
        department: department,
      };

      let message;
      let title;
      if (procedureId) {
        // procedure currently exists (it is being edits)
        title = `Change to Procedure in ${currentPatient.patientName}'s Care Plan`
        message = `${currentPatient.patientName}'s procedure that you're assigned to has been changed. Click to view their process.`
        // just update the old procedure
        updateProcedure(currentPatient.process, procedureId, newProcedure);
      } else {
        title = `New Procedure in ${currentPatient.patientName}'s Care Plan`
        message = `You have been assigned to a procedure in ${currentPatient.patientName}'s care plan. Click to view their process.`
        await addProcedure(currentPatient.process, newProcedure);
      }

      // send notification to all doctor overseeing
      let userIds = doctors.filter(doc => {
        return doc._id === currentDoctor;
      }).map(doc => doc.userId);

      sendNotifications(userIds, {
        title,
        message,
        date: Date.now(),
        read: false,
        patient: currentPatient._id,
      })

      await getProcess(currentPatient.process);
      await getPatient(currentPatient._id);
      navigate(`/process-details`);
    }
  };

  console.log("Current patient",currentPatient);
  console.log("Current Doctor",currentDoctor);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

     <Banner goBackPath={`/process-details`} />
      <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
          {currentPatient && <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">
            Procedure for {currentPatient.patientName}
          </h1>}
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900">
                Operation (if needed)
              </label>
              <input
                readOnly={!editable}
                type="text"
                value={operation}
                className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Operation (if needed)"
                onChange={(event) => setOperation(event.target.value)}
              />
            </div>
            {doctors && (
              <div>
                <label className="block text-sm font-medium text-blue-900">
                  Overseeing Doctor
                </label>
                <div className="relative mt-1">
                  <select
                    disabled={!editable}
                    value={currentDoctor}
                    onChange={(event) => setDoctor(event.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-blue-300 rounded-md bg-white text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    aria-label="Overseeing Doctor"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {departments && (
              <div>
                <label className="block text-sm font-medium text-blue-900">
                  Department
                </label>
                <div className="relative mt-1">
                  <select
                    disabled={!editable}
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-blue-300 rounded-md bg-white text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    aria-label="Department"
                  >
                    <option value="">Select Department</option>

                    {departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-blue-900">
                Room
              </label>
              <input
                readOnly={!editable}
                type="text"
                value={room}
                className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Room"
                onChange={(event) => setRoom(event.target.value)}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-blue-900">
                Notes
              </label>
              <textarea
                readOnly={!editable}
                rows="3"
                value={notes}
                className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Notes"
                onChange={(event) => setNotes(event.target.value)}
              ></textarea>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    Start Date
                  </label>
                  <DatePicker
                    readOnly={!editable}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      if (newValue > endDate) setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    Start Time
                  </label>
                  <TimePicker
                    readOnly={!editable}
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue);
                      if (newValue > endTime) setEndTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    End Date
                  </label>
                  <DatePicker
                    readOnly={!editable}
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                      if (newValue < startDate) setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    End Time
                  </label>
                  <TimePicker
                    readOnly={!editable}
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                      if (newValue < startTime) setStartTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </div>
          </form>
          {editable && (
            <div className="flex justify-center mt-4">
              <Button
                variant="contained"
                color="primary"
                className="px-8 py-3 rounded-lg font-semibold"
                onClick={addProcess}
              >
                Save Process
              </Button>
            </div>
          )}
          
          <div className="flex justify-center mt-4">
           { currentPatient && <Button
              variant="outlined"
              color="primary"
              className="px-8 py-3 rounded-lg font-semibold"
              onClick={handleAvailabilityClick}
            >
              Check Availability
            </Button>}
          </div>
        </div>
      </div>

      {currentDoctor && currentPatient && isScheduleModalOpen && (
        <ScheduleModal
          isScheduleOpen={isScheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          doctor={doctors.find((doc) => doc._id === currentDoctor)}
          patientId={currentPatient._id}
          patientName={currentPatient.patientName}
          onSelectEvent={handleSelectEvent}
        />
      )}
    </LocalizationProvider>
  );
}

export default AddProcedurePage;
