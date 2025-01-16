import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const { user } = useAuthContext();
  const { BASE_URL, getPatient } = useGlobalContext();
  const [notifs, setNotifs] = useState(user.notifications);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        `${BASE_URL}/users/get-notifications/${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const json = await response.json();
        setNotifs(json);
      }
    };
    fetchNotifications();
  }, []);

  const mark = async (notification, read) => {
    notification.read = read;
    const response = await fetch(
      `${BASE_URL}/users/notification/${user.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      }
    );
    if (response.ok) {
      setNotifs(await response.json());
    }
  };

  const deleteNotification = async (notification) => {
    const response = await fetch(
      `${BASE_URL}/users/notification/${user.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      }
    );
    if (response.ok) {
      setNotifs(notifs.filter((not) => not._id !== notification._id));
    }
  };

  const viewPatient = async (id) => {
    await getPatient(id);
    navigate(`/process-details/`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <Banner goBackPath="/apppage" />

      {/* Notifications Container */}
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Notifications</h1>

        {notifs && notifs.length > 0 ? (
          <div className="space-y-4">
            {notifs.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 rounded-lg shadow ${
                  notification.read
                    ? "bg-blue-100 border border-blue-300"
                    : "bg-white border border-gray-300"
                }`}
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {notification.title}
                </h2>
                <p className="text-gray-700 mt-2">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Date: {new Date(notification.date).toLocaleString()}
                </p>

                {notification.patient && (
                  <button
                    onClick={() => viewPatient(notification.patient)}
                    className="text-blue-600 hover:underline text-sm mt-2"
                  >
                    View Patient
                  </button>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-4">
                    {!notification.read ? (
                      <button
                        onClick={() => mark(notification, true)}
                        className="flex items-center text-green-600 hover:underline text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7 12h.01M7 16h.01M7 8h.01"
                          />
                        </svg>
                        Mark as Read
                      </button>
                    ) : (
                      <button
                        onClick={() => mark(notification, false)}
                        className="flex items-center text-yellow-600 hover:underline text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v4m0 4v8m0-8h4m-4 0H8"
                          />
                        </svg>
                        Mark as Unread
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => deleteNotification(notification)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-10">
            No notifications to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
