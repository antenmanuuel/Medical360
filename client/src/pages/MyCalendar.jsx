import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useGlobalContext } from "../hooks/useGlobalContext";
import EditEventModel from "./EditEventModel";
import { useAuthContext } from "../hooks/useAuthContext";
import Banner from "../components/Banner";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const location = useLocation();
  const { userId } = useParams();
  const { patientId, patientName, doctorId } = location.state || {};
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const { getEvents, createEvent, updateEvent, deleteEvent, lastUpdated } =
    useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventStatus, setEventStatus] = useState("available");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [countAvailable, setCountAvailable] = useState(0);
  const [countUnavailable, setCountUnavailable] = useState(0);
  const [view, setView] = useState("month");

  const fetchEvents = async () => {
    try {
      const response = await getEvents(userId);
      if (response && Array.isArray(response)) {
        const parsedEvents = response.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          status: event.status || "available",
        }));
        setEvents(parsedEvents);
        updateCounts(parsedEvents);
      } else {
        console.error("No events found");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [lastUpdated]);

  const eventPropGetter = (event) => {
    let backgroundColor;
    switch (event.status) {
      case "available":
        backgroundColor = "#28a745";
        break;
      case "unavailable":
        backgroundColor = "#dc3545";
        break;
      case "patient_assigned":
        backgroundColor = "#007bff";
        break;
      case "completed":
        backgroundColor = "#6c757d";
        break;
      default:
        backgroundColor = "#f8f9fa";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        border: "none",
        padding: "2px 6px",
      },
    };
  };

  const updateCounts = (eventsArray) => {
    const availableCount = eventsArray.filter(
      (event) => event.status === "available"
    ).length;
    const unavailableCount = eventsArray.filter(
      (event) => event.status === "unavailable"
    ).length;

    setCountAvailable(availableCount);
    setCountUnavailable(unavailableCount);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleSelectSlot = async ({ start, end }) => {
    if (userId === user.id) {
      const newEvent = {
        title: eventStatus === "available" ? "Available" : "Unavailable",
        start: new Date(start),
        end: new Date(end),
        allDay: false,
        userId,
        status: eventStatus,
      };

      try {
        const response = await createEvent(newEvent);
        if (response && response.event) {
          const eventWithDates = {
            ...response.event,
            start: new Date(response.event.start),
            end: new Date(response.event.end),
            status: response.event.status,
          };
          setEvents([...events, eventWithDates]);
        }
      } catch (error) {
        console.error("Error saving event:", error);
      }
    }
  };

  const handleSelectEvent = (event) => {
    if (userId === user.id) {
      setSelectedEvent(event);
      setShowModal(true);
    }
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  return (
    <>
      <Banner goBackPath={"/"} />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[90%] lg:w-[80%]">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Select Date</h2>
              <DatePicker
                selected={currentDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="mt-2 p-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mt-4 md:mt-0">
              <label className="font-semibold text-gray-600">
                Event Status:
              </label>
              <select
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value)}
                className="ml-2 p-2 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-green-600 font-bold">Available: {countAvailable}</p>
              <p className="text-red-600 font-bold">Unavailable: {countUnavailable}</p>
            </div>
          </div>
          <div className="mt-6">
            <Calendar
              localizer={localizer}
              events={events}
              view={view}
              onView={handleViewChange}
              startAccessor="start"
              endAccessor="end"
              selectable={userId === user.id}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              date={currentDate}
              onNavigate={setCurrentDate}
              style={{ height: "70vh" }}
              eventPropGetter={eventPropGetter}
            />
          </div>
          {showModal && (
            <EditEventModel
              event={selectedEvent}
              onSave={(event) => {
                setSelectedEvent(null);
                setShowModal(false);
              }}
              userId={userId}
              currentOwner={user.id}
              userAdmin={user.isAdmin}
              onDelete={() => {}}
              onClose={() => setShowModal(false)}
              patientName={patientName}
              doctorId={doctorId}
              patientId={patientId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MyCalendar;
