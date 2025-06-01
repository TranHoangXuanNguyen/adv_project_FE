import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function TNotification() {
  const [activeButton, setActiveButton] = useState("All");
  const [dbNotifications, setDbNotifications] = useState([]);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notification/${userId}`)
      .then((response) => {
        console.log("Notification from BE:", response.data);
        setDbNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        alert("Failed to load notifications. Please try again later.");
      });
  }, []);
  const notifications = dbNotifications.map((n) => {
    let type = "info";
    if (n.content.toLowerCase().includes("due")) type = "warning";
    else if (n.content.toLowerCase().includes("missed")) type = "error";
    return {
      sender: n.sender_id,
      receiver: n.user_id,
      week_id: n.week_id,
      id: n.id,
      message: n.content.split(" ").slice(0, 5).join(" ") + "...",
      details: n.content,
      date: new Date(n.created_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      type,
    };
  });

  const handleOpenNotification = (notification) => {
    console.log("Opening notification:", notification);
    navigate(
      `/teacher/class_study/${notification.sender}/${notification.week_id}`
    );
  };

  const Notification = ({ notification }) => {
    const colorMap = {
      error: "bg-red-100 text-red-700",
      warning: "bg-yellow-100 text-yellow-700",
      info: "bg-blue-100 text-blue-700",
    };

    return (
      <div
        className={`group mb-3 p-3 rounded-xl ${
          colorMap[notification.type]
        } shadow-sm`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{notification.message}</h3>
          <span className="cursor-pointer text-gray-900 text-xl">⋮</span>
        </div>

        <p className="text-md mt-1 line-clamp-1 group-hover:line-clamp-none transition-all duration-200">
          {notification.details}
        </p>

        <div className="text-sm text-gray-500 mt-1 hidden group-hover:block transition-opacity duration-200">
          {notification.date}
        </div>

        <div className="mt-2 flex justify-end space-x-4 hidden group-hover:flex transition-opacity duration-200">
          <button
            className="text-blue-500 hover:underline text-sm"
            onClick={() => handleOpenNotification(notification)}
          >
            View task
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white shadow-lg  rounded-xl h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-justify-center">
          Notifications
        </h2>
      </div>

      {/* Filter buttons */}
      <div className="flex space-x-4 mb-3">
        {["All", "Unread", "Read"].map((type) => (
          <button
            key={type}
            className={`px-4 py-1 rounded-2xl text-sm border ${
              activeButton === type
                ? "border-blue-500 bg-blue-100 text-blue-700"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
            onClick={() => setActiveButton(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
