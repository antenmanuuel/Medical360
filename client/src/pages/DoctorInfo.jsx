import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import { useParams, useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DoctorInfo = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const [doctor, setDoctor] = useState(null);
  const [department, setDepartment] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { getDoctor, getDepartment, getDoctorByUser, getEvents, getUser, BASE_URL } =
    useGlobalContext();

  const initialAverageTimes = {
    Sunday: { averageStartTime: "N/A", averageEndTime: "N/A" },
    Monday: { averageStartTime: "N/A", averageEndTime: "N/A" },
    Tuesday: { averageStartTime: "N/A", averageEndTime: "N/A" },
    Wednesday: { averageStartTime: "N/A", averageEndTime: "N/A" },
    Thursday: { averageStartTime: "N/A", averageEndTime: "N/A" },
    Friday: { averageStartTime: "N/A", averageEndTime: "N/A" },
    Saturday: { averageStartTime: "N/A", averageEndTime: "N/A" },
  };
  const [averageTimesByDay, setAverageTimesByDay] = useState(initialAverageTimes);

  const getDayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(date).getDay()];
  };

  const getAverageTimesByDay = (events) => {
    const daysOfWeek = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };

    events.forEach((event) => {
      const day = getDayOfWeek(event.start);
      const startMinutes =
        new Date(event.start).getHours() * 60 + new Date(event.start).getMinutes();
      const endMinutes =
        new Date(event.end).getHours() * 60 + new Date(event.end).getMinutes();
      daysOfWeek[day].push({ startMinutes, endMinutes });
    });

    const averageTimes = {};
    Object.keys(daysOfWeek).forEach((day) => {
      if (daysOfWeek[day].length > 0) {
        const total = daysOfWeek[day].reduce(
          (acc, curr) => ({
            totalStart: acc.totalStart + curr.startMinutes,
            totalEnd: acc.totalEnd + curr.endMinutes,
          }),
          { totalStart: 0, totalEnd: 0 }
        );

        const count = daysOfWeek[day].length;
        const averageStart = formatTime(Math.round(total.totalStart / count));
        const averageEnd = formatTime(Math.round(total.totalEnd / count));
        averageTimes[day] = {
          averageStartTime: averageStart,
          averageEndTime: averageEnd,
        };
      } else {
        averageTimes[day] = { averageStartTime: "N/A", averageEndTime: "N/A" };
      }
    });

    return averageTimes;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHour}:${mins < 10 ? "0" : ""}${mins} ${suffix}`;
  };

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doc = await getDoctor(doctorId);
        if (doc) {
          setDoctor(doc);
          const dept = await getDepartment(doc.departmentName);
          setDepartment(dept.departmentName);
          const userData = await getDoctorByUser(doctorId);
          setUserId(userData._id);
          const userDataWithImage = await getUser(userData._id);
          setUser(userDataWithImage);
          setImagePreview(`${BASE_URL}/${userDataWithImage.image}`);

          const events = await getEvents(userData._id);
          const averageTimesByDayUpdated = getAverageTimesByDay(events);
          setAverageTimesByDay(averageTimesByDayUpdated);
        }
      } catch (error) {
        console.error("Failed to fetch doctor or department details", error);
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const hasValidSchedule = Object.values(averageTimesByDay).some(
    (times) => times.averageStartTime !== "N/A" || times.averageEndTime !== "N/A"
  );
  const doctorName = location.state?.doctorName;
  const previousPage = location.state?.origin || "/apppage";

  return (
    <>
      <Banner goBackPath={previousPage} showGoBackButton={true} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl w-full">
          {/* Row 1: Image and Details */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg mb-6 md:mb-0"
            >
              <img
                src={imagePreview}
                alt={doctorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:ml-8 flex-1 space-y-4">
              <div className="bg-blue-500 text-white p-4 rounded-md">
                <h3 className="font-semibold text-md">Experience</h3>
                <p>{doctor.experience}</p>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-md">
                <h3 className="font-semibold text-md">Focus</h3>
                <p>{doctor.profileDetails?.focusAreas?.join(", ")}</p>
                <h3 className="font-semibold text-md">Specialization</h3>
                <p>{doctor.profileDetails?.specialization?.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Name and Department */}
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <h2 className="text-xl font-semibold text-blue-600">{doctorName}</h2>
            <p>{department || "Loading department..."}</p>
          </div>

          {/* Row 3: Schedule */}
          <div className="mt-6 bg-gray-100 p-4 rounded-md text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Schedule</h3>
            {hasValidSchedule ? (
              Object.entries(averageTimesByDay).map(([day, times]) => (
                <p key={day} className="text-sm">
                  <b>{day}:</b> {times.averageStartTime} - {times.averageEndTime}
                </p>
              ))
            ) : (
              <p className="text-gray-600">No schedule available to show.</p>
            )}
          </div>

          {/* Row 4: Profile */}
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h3 className="text-blue-600 font-semibold text-lg">Profile</h3>
            <p className="text-gray-600">{doctor.profileDetails.biography}</p>
          </div>

          {/* Row 5: Schedule Button */}
          <div className="flex justify-center mt-8">
            <Link
              to={`/doctor-schedule/${userId}`}
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-md transition duration-300"
            >
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorInfo;
