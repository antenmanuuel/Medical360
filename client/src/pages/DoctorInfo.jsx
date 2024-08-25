import React, { useContext, useState, useEffect } from "react";
import Banner from "../components/Banner";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import MyCalendar from "./MyCalendar";

const DoctorInfo = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const [doctor, setDoctor] = useState(null);
  const [department, setDepartment] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const { getDoctor, getDepartment, getDoctorByUser, getEvents,getUser,BASE_URL} =
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
  const [averageTimesByDay, setAverageTimesByDay] =
    useState(initialAverageTimes);

  const getDayOfWeek = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
        new Date(event.start).getHours() * 60 +
        new Date(event.start).getMinutes();
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
          const userDatawithImage = await getUser(userData._id);
          setUser(userDatawithImage);
          console.log(`Image URL: ${BASE_URL}/${userDatawithImage.image}`);
          setImagePreview(`${BASE_URL}/${userDatawithImage.image}`);

         

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
    return <p>Loading...</p>;
  }
  const hasValidSchedule = Object.values(averageTimesByDay).some(
    times => times.averageStartTime !== 'N/A' || times.averageEndTime !== 'N/A'
  );
  const doctorName = location.state?.doctorName;
  const { patientId, patientName } = location.state || {};
  const previousPage = location.state?.origin || "/apppage";
 
  return (
    <>
      <Banner goBackPath={previousPage} showGoBackButton={true} />
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg max-w-5xl w-full min-h-[600px]">
          {/* Row 1: Image and Details */}
          <div className="flex -mx-4 items-start">
            <div
              className="flex-none rounded-full overflow-hidden border-4 border-white shadow-lg"
              style={{ width: "200px", height: "200px" }}
            >
              <img
                src={imagePreview}
                alt={doctorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 px-4 space-y-4">
              <div className="bg-[#2260FF] text-white p-4 rounded-lg">
                <h3 className="font-semibold text-md">Experience</h3>
                <p>{doctor.experience}</p>
              </div>

              <div className="bg-[#2260FF] text-white p-4 rounded-lg">
                <h3 className="font-semibold text-md">Focus</h3>
                <p>{doctor.profileDetails?.focusAreas?.join(", ")}</p>
                <h3 className="font-semibold text-md">Specialization</h3>
                <p>{doctor.profileDetails?.specialization?.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Name and Department */}
          <div className="flex justify-center items-center bg-white p-4 rounded-lg mt-4">
            <div>
              <h2 className="text-xl font-semibold text-center text-[#2260FF]">
                {doctorName}
              </h2>
              <p className="text-center">
                {department ? department : "Loading department..."}
              </p>
            </div>
          </div>

          {/* Row 3: Schedule */}
          <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg mt-4">
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 h-6"
                stroke="#2260FF"
                strokeWidth="2"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              <h3 className="text-lg text-[#2260FF]">Schedule</h3>
            </div>

            {hasValidSchedule ? (
              <div>
                {Object.entries(averageTimesByDay).map(([day, times]) => {
                  if (times.averageStartTime !== 'N/A' || times.averageEndTime !== 'N/A') {
                    return (
                      <div key={day}>
                        <p><b>{day}</b>: {times.averageStartTime} to {times.averageEndTime}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p>No schedule available to show.</p>
            )}
          </div>

          {/* Row 4: Profile */}
          <div className="bg-white p-4 rounded-lg mt-4">
            <h3 className="text-[#2260FF] font-semibold text-lg">Profile</h3>
            <p className="text-gray-600">{doctor.profileDetails.biography}</p>
          </div>

          {/* Row 5: Schedule Button */}
          {/* {!showCalendar ? (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowCalendar(true)} // Toggle calendar on button click
                className="bg-[#2260FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800"
              >
                Schedule
              </button>
            </div>
          ) : (
            <MyCalendar userId={userId} /> // Pass userId to MyCalendar
          )} */}
          <div className="flex justify-center mt-4">
            <Link
              to={`/doctor-schedule/${userId}`}
              className="bg-[#2260FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800"
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
